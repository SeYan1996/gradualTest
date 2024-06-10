/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  _id: Scalars['ID']['output'];
  createTime: Scalars['DateTime']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastMsgId: Scalars['ID']['output'];
  members: Array<ChannelMember>;
  /** 频道名称 */
  name?: Maybe<Scalars['String']['output']>;
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  joinedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type ChannelMemberInfo = {
  __typename?: 'ChannelMemberInfo';
  _id: Scalars['String']['output'];
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** userName */
  userName?: Maybe<Scalars['String']['output']>;
};

export type CountUnreadMsgArgs = {
  /** channelId */
  channelId: Scalars['String']['input'];
  /** UserId */
  userId: Scalars['String']['input'];
};

export type CreateChannelInput = {
  /** name */
  name: Scalars['String']['input'];
};

export type FetchMsgInput = {
  /** channelId */
  channelId: Scalars['String']['input'];
  pageSize?: Scalars['Int']['input'];
  /** 开始查询的消息Id 为空时查询最新消息 */
  startMsgId?: InputMaybe<Scalars['String']['input']>;
  /** userId */
  userId: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID']['output'];
  channelId: Scalars['ID']['output'];
  content: MsgContent;
  createTime: Scalars['DateTime']['output'];
  /** 发送者Id */
  from: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  /** 提及用户Id列表 */
  mentionUserIdList?: Maybe<Array<Scalars['ID']['output']>>;
  /** 引用的消息Id  */
  replyMsgId?: Maybe<Scalars['ID']['output']>;
  type: MsgType;
};

export type MsgContent = {
  __typename?: 'MsgContent';
  /** 文件链接 */
  file?: Maybe<Scalars['String']['output']>;
  /** 图片链接 */
  imgUrl?: Maybe<Scalars['String']['output']>;
  /** 文本内容 */
  text?: Maybe<Scalars['String']['output']>;
};

export type MsgContentInput = {
  /** 文件链接 */
  file?: InputMaybe<Scalars['String']['input']>;
  /** 图片链接 */
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  /** 文本内容 */
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum MsgType {
  File = 'File',
  Img = 'Img',
  Text = 'Text'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  joinChannel: UserChannelInfo;
  quitChannel: Scalars['Boolean']['output'];
  removeChannel: Channel;
  removeMessage: Message;
  sendMessage: Scalars['Boolean']['output'];
  updateChannelLastReadMsgId: Scalars['Boolean']['output'];
  updateMessage: Message;
  userLogin: User;
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationQuitChannelArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveChannelArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSendMessageArgs = {
  sendMessageInput: SendMessageInput;
};


export type MutationUpdateChannelLastReadMsgIdArgs = {
  channelId: Scalars['String']['input'];
  lastReadMsgId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUserLoginArgs = {
  userLoginInput: UserLoginInput;
};

export type Query = {
  __typename?: 'Query';
  channel: Channel;
  channels: Array<Channel>;
  countUnreadMsg: Scalars['Float']['output'];
  fetchMessages: Array<Message>;
  searchChannelUser: Array<ChannelMemberInfo>;
  user: User;
  userChannels: Array<UserChannelInfo>;
  users: Array<User>;
};


export type QueryChannelArgs = {
  id: Scalars['String']['input'];
};


export type QueryChannelsArgs = {
  keyword: Scalars['String']['input'];
};


export type QueryCountUnreadMsgArgs = {
  countUnreadMsgArgs: CountUnreadMsgArgs;
};


export type QueryFetchMessagesArgs = {
  fetchMsgInput: FetchMsgInput;
};


export type QuerySearchChannelUserArgs = {
  searchChannelUserArgs: SearchChannelUserArgs;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserChannelsArgs = {
  userId: Scalars['String']['input'];
};

export type SearchChannelUserArgs = {
  /** channelId */
  channelId: Scalars['String']['input'];
  /** UserId */
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type SendMessageInput = {
  channelId: Scalars['String']['input'];
  content: MsgContentInput;
  /** 发送者Id */
  from: Scalars['String']['input'];
  /** 提及用户Id列表 */
  mentionUserIdList?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 回复消息Id  */
  replyMsgId?: InputMaybe<Scalars['String']['input']>;
  type: MsgType;
};

export type UpdateMessageInput = {
  channelId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<MsgContentInput>;
  /** 发送者Id */
  from?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** 提及用户Id列表 */
  mentionUserIdList?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 回复消息Id  */
  replyMsgId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MsgType>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  channelMap?: Maybe<Array<UserChannelInfo>>;
  createTime: Scalars['DateTime']['output'];
  isDeleted: Scalars['Boolean']['output'];
  /** userName */
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserChannelInfo = {
  __typename?: 'UserChannelInfo';
  /** 频道ID */
  channelId: Scalars['String']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 最后一次读取的消息ID */
  lastReadMsgId?: Maybe<Scalars['String']['output']>;
  mentioned: Scalars['Boolean']['output'];
  userChannelDetail?: Maybe<Channel>;
};

export type UserLoginInput = {
  /** userName */
  userName: Scalars['String']['input'];
};

export type CreateChannelMutationVariables = Exact<{
  createChannelInput: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', name?: string | null } };

export type FindChannelsQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type FindChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', _id: string, name?: string | null }> };

export type SearchChannelUserQueryVariables = Exact<{
  searchChannelUserArgs: SearchChannelUserArgs;
}>;


export type SearchChannelUserQuery = { __typename?: 'Query', searchChannelUser: Array<{ __typename?: 'ChannelMemberInfo', _id: string, userName?: string | null, avatar?: string | null }> };

export type FetchMessagesQueryVariables = Exact<{
  input: FetchMsgInput;
}>;


export type FetchMessagesQuery = { __typename?: 'Query', fetchMessages: Array<{ __typename?: 'Message', _id: string, channelId: string, from: string, mentionUserIdList?: Array<string> | null, replyMsgId?: string | null, type: MsgType, createTime: any, content: { __typename?: 'MsgContent', text?: string | null, imgUrl?: string | null, file?: string | null } }> };

export type SendMessageMutationVariables = Exact<{
  sendMessageInput: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UserLoginMutationVariables = Exact<{
  userLoginInput: UserLoginInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'User', _id: string, userName?: string | null, avatar?: string | null } };

export type JoinChannelMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  channelId: Scalars['String']['input'];
}>;


export type JoinChannelMutation = { __typename?: 'Mutation', joinChannel: { __typename?: 'UserChannelInfo', lastReadMsgId?: string | null, joinedAt?: any | null } };

export type QuitChannelMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  channelId: Scalars['String']['input'];
}>;


export type QuitChannelMutation = { __typename?: 'Mutation', quitChannel: boolean };

export type GetUserChannelsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserChannelsQuery = { __typename?: 'Query', userChannels: Array<{ __typename?: 'UserChannelInfo', channelId: string, lastReadMsgId?: string | null, mentioned: boolean, joinedAt?: any | null, userChannelDetail?: { __typename?: 'Channel', _id: string, name?: string | null } | null }> };


export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createChannelInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createChannelInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createChannelInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const FindChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findChannels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindChannelsQuery, FindChannelsQueryVariables>;
export const SearchChannelUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchChannelUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchChannelUserArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchChannelUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchChannelUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchChannelUserArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchChannelUserArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<SearchChannelUserQuery, SearchChannelUserQueryVariables>;
export const FetchMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchMsgInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fetchMsgInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"mentionUserIdList"}},{"kind":"Field","name":{"kind":"Name","value":"replyMsgId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}}]}}]}}]} as unknown as DocumentNode<FetchMessagesQuery, FetchMessagesQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendMessageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendMessageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendMessageInput"}}}]}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userLoginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userLoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userLoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const JoinChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastReadMsgId"}},{"kind":"Field","name":{"kind":"Name","value":"joinedAt"}}]}}]}}]} as unknown as DocumentNode<JoinChannelMutation, JoinChannelMutationVariables>;
export const QuitChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"QuitChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quitChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}]}]}}]} as unknown as DocumentNode<QuitChannelMutation, QuitChannelMutationVariables>;
export const GetUserChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserChannels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userChannels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"lastReadMsgId"}},{"kind":"Field","name":{"kind":"Name","value":"mentioned"}},{"kind":"Field","name":{"kind":"Name","value":"joinedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userChannelDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserChannelsQuery, GetUserChannelsQueryVariables>;