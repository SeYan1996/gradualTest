import { graphql } from "../gql";

export const FETCH_MESSAGE_QUERY = graphql(`
  query FetchMessages($input: FetchMsgInput!) {
    fetchMessages(fetchMsgInput: $input) {
      _id
      channelId
      from
      mentionUserIdList
      replyMsgId
      type
      content {
        text
        imgUrl
        file
      }
      createTime
    }
  }
`);

export const SEND_MESSAGE_MUTATION = graphql(`
  mutation SendMessage($sendMessageInput: SendMessageInput!) {
    sendMessage(sendMessageInput: $sendMessageInput)
  }
`);
