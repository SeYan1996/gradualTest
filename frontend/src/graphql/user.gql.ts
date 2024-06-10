import { graphql } from "../gql";

export const LOGIN_MUTATION = graphql(`
  mutation UserLogin($userLoginInput: UserLoginInput!) {
    userLogin(userLoginInput: $userLoginInput) {
      _id
      userName
      avatar
    }
  }
`);

export const JOIN_CHANNEL_MUTATION = graphql(`
  mutation JoinChannel($userId: String!, $channelId: String!) {
    joinChannel(userId: $userId, channelId: $channelId) {
      lastReadMsgId
      joinedAt
    }
  }
`);

export const QUIT_CHANNEL_MUTATION = graphql(`
  mutation QuitChannel($userId: String!, $channelId: String!) {
    quitChannel(userId: $userId, channelId: $channelId)
  }
`);

export const USER_CHANNEL_QUERY = graphql(`
  query GetUserChannels($userId: String!) {
    userChannels(userId: $userId) {
      channelId
      lastReadMsgId
      mentioned
      joinedAt
      userChannelDetail {
        _id
        name
      }
    }
  }
`);
