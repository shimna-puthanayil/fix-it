import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Scroll/scrollToTop";
import "@fontsource/roboto/300.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ComplaintProvider  from "./utils/GlobalState";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./styles";
const httpLink = createHttpLink({ uri: "/graphql" });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const theme = createTheme();
function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ComplaintProvider>
          <ScrollToTop />
          <Outlet />
        </ComplaintProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default App;
