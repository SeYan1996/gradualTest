/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateChannel($createChannelInput: CreateChannelInput!) {\n    createChannel(createChannelInput: $createChannelInput) {\n      name\n    }\n  }\n": types.CreateChannelDocument,
    "\n  query findChannels($keyword: String!) {\n    channels(keyword: $keyword) {\n      _id\n      name\n    }\n  }\n": types.FindChannelsDocument,
    "\n  query SearchChannelUser($searchChannelUserArgs: SearchChannelUserArgs!) {\n    searchChannelUser(searchChannelUserArgs: $searchChannelUserArgs) {\n      _id\n      userName\n      avatar\n    }\n  }\n": types.SearchChannelUserDocument,
    "\n  query FetchMessages($input: FetchMsgInput!) {\n    fetchMessages(fetchMsgInput: $input) {\n      _id\n      channelId\n      from\n      mentionUserIdList\n      replyMsgId\n      type\n      content {\n        text\n        imgUrl\n        file\n      }\n      createTime\n    }\n  }\n": types.FetchMessagesDocument,
    "\n  mutation SendMessage($sendMessageInput: SendMessageInput!) {\n    sendMessage(sendMessageInput: $sendMessageInput)\n  }\n": types.SendMessageDocument,
    "\n  mutation UserLogin($userLoginInput: UserLoginInput!) {\n    userLogin(userLoginInput: $userLoginInput) {\n      _id\n      userName\n      avatar\n    }\n  }\n": types.UserLoginDocument,
    "\n  mutation JoinChannel($userId: String!, $channelId: String!) {\n    joinChannel(userId: $userId, channelId: $channelId) {\n      lastReadMsgId\n      joinedAt\n    }\n  }\n": types.JoinChannelDocument,
    "\n  mutation QuitChannel($userId: String!, $channelId: String!) {\n    quitChannel(userId: $userId, channelId: $channelId)\n  }\n": types.QuitChannelDocument,
    "\n  query GetUserChannels($userId: String!) {\n    userChannels(userId: $userId) {\n      channelId\n      lastReadMsgId\n      mentioned\n      joinedAt\n      userChannelDetail {\n        _id\n        name\n      }\n    }\n  }\n": types.GetUserChannelsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannel($createChannelInput: CreateChannelInput!) {\n    createChannel(createChannelInput: $createChannelInput) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannel($createChannelInput: CreateChannelInput!) {\n    createChannel(createChannelInput: $createChannelInput) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findChannels($keyword: String!) {\n    channels(keyword: $keyword) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  query findChannels($keyword: String!) {\n    channels(keyword: $keyword) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchChannelUser($searchChannelUserArgs: SearchChannelUserArgs!) {\n    searchChannelUser(searchChannelUserArgs: $searchChannelUserArgs) {\n      _id\n      userName\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query SearchChannelUser($searchChannelUserArgs: SearchChannelUserArgs!) {\n    searchChannelUser(searchChannelUserArgs: $searchChannelUserArgs) {\n      _id\n      userName\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchMessages($input: FetchMsgInput!) {\n    fetchMessages(fetchMsgInput: $input) {\n      _id\n      channelId\n      from\n      mentionUserIdList\n      replyMsgId\n      type\n      content {\n        text\n        imgUrl\n        file\n      }\n      createTime\n    }\n  }\n"): (typeof documents)["\n  query FetchMessages($input: FetchMsgInput!) {\n    fetchMessages(fetchMsgInput: $input) {\n      _id\n      channelId\n      from\n      mentionUserIdList\n      replyMsgId\n      type\n      content {\n        text\n        imgUrl\n        file\n      }\n      createTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($sendMessageInput: SendMessageInput!) {\n    sendMessage(sendMessageInput: $sendMessageInput)\n  }\n"): (typeof documents)["\n  mutation SendMessage($sendMessageInput: SendMessageInput!) {\n    sendMessage(sendMessageInput: $sendMessageInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserLogin($userLoginInput: UserLoginInput!) {\n    userLogin(userLoginInput: $userLoginInput) {\n      _id\n      userName\n      avatar\n    }\n  }\n"): (typeof documents)["\n  mutation UserLogin($userLoginInput: UserLoginInput!) {\n    userLogin(userLoginInput: $userLoginInput) {\n      _id\n      userName\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation JoinChannel($userId: String!, $channelId: String!) {\n    joinChannel(userId: $userId, channelId: $channelId) {\n      lastReadMsgId\n      joinedAt\n    }\n  }\n"): (typeof documents)["\n  mutation JoinChannel($userId: String!, $channelId: String!) {\n    joinChannel(userId: $userId, channelId: $channelId) {\n      lastReadMsgId\n      joinedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QuitChannel($userId: String!, $channelId: String!) {\n    quitChannel(userId: $userId, channelId: $channelId)\n  }\n"): (typeof documents)["\n  mutation QuitChannel($userId: String!, $channelId: String!) {\n    quitChannel(userId: $userId, channelId: $channelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserChannels($userId: String!) {\n    userChannels(userId: $userId) {\n      channelId\n      lastReadMsgId\n      mentioned\n      joinedAt\n      userChannelDetail {\n        _id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserChannels($userId: String!) {\n    userChannels(userId: $userId) {\n      channelId\n      lastReadMsgId\n      mentioned\n      joinedAt\n      userChannelDetail {\n        _id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;