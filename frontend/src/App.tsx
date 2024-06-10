import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ChatRoom } from "./components/ChatRoom";
import { Box } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import {
  BasicStorage,
  ChatMessage,
  ChatProvider,
  IStorage,
  MessageContentType,
  UpdateState,
} from "@chatscope/use-chat";
import { ExampleChatService } from "@chatscope/use-chat/dist/examples";
import { nanoid } from "nanoid";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

function App() {
  const { isLoggedIn } = useAuth();
  const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
    return new ExampleChatService(storage, updateState);
  };
  const messageIdGenerator = (message: ChatMessage<MessageContentType>) =>
    nanoid();
  const groupIdGenerator = () => nanoid();
  const storage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });
  return (
    <Box
      sx={{
        height: "40rem",
        width: "60rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <ApolloProvider client={client}>
        {isLoggedIn ? (
          <ChatProvider
            serviceFactory={serviceFactory}
            storage={storage}
            config={{
              typingThrottleTime: 250,
              typingDebounceTime: 900,
              debounceTyping: true,
            }}
          >
            <ChatRoom />
          </ChatProvider>
        ) : (
          <Login />
        )}
      </ApolloProvider>
    </Box>
  );
}

export default App;
