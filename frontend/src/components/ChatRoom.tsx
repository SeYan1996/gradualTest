import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useMemo, useCallback, useEffect } from "react";

import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import {
  useChat,
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  Presence,
  UserStatus,
  ConversationId,
  Conversation as BaseConversation,
  TypingUsersList,
} from "@chatscope/use-chat";
import { MessageContent, TextContent, User } from "@chatscope/use-chat";
import { useAuth } from "../contexts/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { USER_CHANNEL_QUERY } from "../graphql/user.gql";
import { SEND_MESSAGE_MUTATION } from "../graphql/message.gql";
import { MsgType } from "../gql/graphql";

type ConversationData = {
  name: string;
};

function createConversation(
  id: ConversationId,
  name: string
): BaseConversation<ConversationData> {
  return new BaseConversation({
    id,
    participants: [
      // new Participant({
      //   id: name,
      //   role: new ConversationRole([]),
      // }),
    ],
    unreadCounter: 0, //"99+" as any,
    typingUsers: new TypingUsersList({ items: [] }),
    draft: "",
    data: { name },
  });
}

export const ChatRoom = () => {
  // Get all chat related values and methods from useChat hook
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    currentMessage,
    setCurrentMessage,
    sendTyping,
    setCurrentUser,
    addConversation,
  } = useChat();

  const { userInfo } = useAuth();
  const [sendMsgMutation] = useMutation(SEND_MESSAGE_MUTATION);

  const user = useMemo(() => {
    return new User({
      id: userInfo?._id as string,
      presence: new Presence({ status: UserStatus.Available, description: "" }),
      username: userInfo?.userName,
      avatar: userInfo?.avatar,
      bio: "哈哈哈，好开心",
    });
  }, [userInfo]);

  // 获取频道列表
  const { loading, error, data, refetch } = useQuery(USER_CHANNEL_QUERY, {
    variables: { userId: user.id },
    skip: !user.id, // Skip the query if userId is not available
  });

  useEffect(() => {
    setCurrentUser(user);
    // 获取用户频道列表 创建对话
    refetch({ userId: user.id }).then(({ data }) => {
      data.userChannels?.forEach((channel) => {
        addConversation(
          createConversation(
            channel.channelId,
            channel.userChannelDetail?.name as string
          )
        );
      });
    });
  }, [user, setCurrentUser, refetch]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3000/message/sse/${user.id}`
    );

    eventSource.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      const message = new ChatMessage({
        id: msg._id,
        content: msg.content.text as unknown as MessageContent<TextContent>,
        contentType: MessageContentType.TextPlain,
        senderId: msg.from,
        direction:
          msg.from == user.id
            ? MessageDirection.Outgoing
            : MessageDirection.Incoming,
        status: MessageStatus.Sent,
      });

      sendMessage({
        message,
        conversationId: msg.channelId,
        senderId: msg.from,
      });
      // 如果不是当前会话 则会话未读+1
      if (activeConversation?.id !== msg.channelId) {
        // conversations.map((conversation) => {
        //   if (conversation.id === msg.channelId) {
        //     conversation.unreadCounter++;
        //   }
        // });
        conversations.some((conversation) => {
          if (conversation.id === msg.channelId) {
            conversation.unreadCounter++;
            return true;
          }
          return false;
        });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [user]);

  // Get current user data
  const [currentUserAvatar, currentUserName] = useMemo(() => {
    if (activeConversation) {
      const participant =
        activeConversation.participants.length > 0
          ? activeConversation.participants[0]
          : undefined;

      if (participant) {
        const user = getUser(participant.id);
        if (user) {
          return [<Avatar src={user.avatar} />, user.username];
        }
      }
    }

    return [undefined, undefined];
  }, [activeConversation, getUser]);

  const handleChange = (value: string) => {
    setCurrentMessage(value);
    if (activeConversation) {
      sendTyping({
        conversationId: activeConversation?.id,
        isTyping: true,
        userId: user.id,
        content: value,
        throttle: true,
      });
    }
  };

  const handleSend = async (text: string) => {
    if (activeConversation) {
      await sendMsgMutation({
        variables: {
          sendMessageInput: {
            channelId: activeConversation.id,
            from: user.id,
            type: MsgType.Text,
            content: {
              text,
            },
          },
        },
      });
    }
  };

  const getTypingIndicator = useCallback(() => {
    if (activeConversation) {
      const typingUsers = activeConversation.typingUsers;

      if (typingUsers.length > 0) {
        const typingUserId = typingUsers.items[0].userId;

        // Check if typing user participates in the conversation
        if (activeConversation.participantExists(typingUserId)) {
          const typingUser = getUser(typingUserId);

          if (typingUser) {
            return (
              <TypingIndicator content={`${typingUser.username} is typing`} />
            );
          }
        }
      }
    }

    return undefined;
  }, [activeConversation, getUser]);

  return (
    <MainContainer responsive>
      <Sidebar position="left" scrollable>
        <ConversationHeader style={{ backgroundColor: "#fff" }}>
          <Avatar src={user.avatar} />
          <ConversationHeader.Content>
            {user.username}
          </ConversationHeader.Content>
        </ConversationHeader>
        <ConversationList>
          {conversations.map((c) => {
            const [avatar, name] = (() => {
              const participant =
                c.participants.length > 0 ? c.participants[0] : undefined;

              if (participant) {
                const user = getUser(participant.id);
                if (user) {
                  return [<Avatar src={user.avatar} />, user.username];
                }
              }
              return [<Avatar size="sm" src={user.avatar} />, c.data.name];
            })();

            return (
              <Conversation
                key={c.id}
                name={name}
                info={
                  c.draft
                    ? `Draft: ${c.draft
                        .replace(/<br>/g, "\n")
                        .replace(/&nbsp;/g, " ")}`
                    : ``
                }
                active={activeConversation?.id === c.id}
                unreadCnt={c.unreadCounter}
                // lastActivityTime={""}
                onClick={() => setActiveConversation(c.id)}
              >
                {avatar}
              </Conversation>
            );
          })}
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        {activeConversation && (
          <ConversationHeader>
            {currentUserAvatar}
            <ConversationHeader.Content userName={currentUserName} />
          </ConversationHeader>
        )}
        <MessageList typingIndicator={getTypingIndicator()}>
          {activeConversation &&
            currentMessages.map((g) => (
              <MessageGroup key={g.id} direction={g.direction}>
                <MessageGroup.Messages>
                  {g.messages.map((m: ChatMessage<MessageContentType>) => (
                    <Message
                      key={m.id}
                      model={{
                        type: "html",
                        payload: m.content,
                        direction: m.direction,
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageGroup.Messages>
              </MessageGroup>
            ))}
        </MessageList>
        <MessageInput
          value={currentMessage}
          onChange={handleChange}
          onSend={handleSend}
          disabled={!activeConversation}
          attachButton={false}
          placeholder="Type here..."
        />
      </ChatContainer>
    </MainContainer>
  );
};
