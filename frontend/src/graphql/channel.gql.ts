import { graphql } from "../gql";

export const CREATE_CHANNEL_MUTATION = graphql(`
  mutation CreateChannel($createChannelInput: CreateChannelInput!) {
    createChannel(createChannelInput: $createChannelInput) {
      name
    }
  }
`);

export const FIND_CHANNELS_QUERY = graphql(`
  query findChannels($keyword: String!) {
    channels(keyword: $keyword) {
      _id
      name
    }
  }
`);

export const SEARCH_CHANNEL_USER = graphql(`
  query SearchChannelUser($searchChannelUserArgs: SearchChannelUserArgs!) {
    searchChannelUser(searchChannelUserArgs: $searchChannelUserArgs) {
      _id
      userName
      avatar
    }
  }
`);
