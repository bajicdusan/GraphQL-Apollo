import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/Book/BookList';
import AddBook from './components/Book/AddBook';
import UsersList from "./components/User/UsersList";
import ChatUserList from "./components/ChatUser/ChatUserList";
import MessageList from "./components/Message/MessageList";
import ChatsList from "./components/Chat/ChatsList";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
        <div id="users">
            <p>List of Users:</p>
            <UsersList />
        </div>
        <div id="chatUsers">
            <p>List of ChatUsers:</p>
            <ChatUserList />
        </div>
        <div id="messages">
            <p>List of Messages:</p>
            <MessageList />
        </div>
        <div id="chats">
            <p>List of Chats:</p>
            <ChatsList />
        </div>
    </ApolloProvider>
  );
}

export default App;
