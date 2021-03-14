import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/Book/BookList';
import AddBook from './components/Book/AddBook';
import UsersList from "./components/User/UsersList";
import AddUser from "./components/User/AddUser";
import ChatUserList from "./components/ChatUser/ChatUserList";
import AddChatUser from "./components/ChatUser/AddChatUser";
import MessageList from "./components/Message/MessageList";
import AddMessage from "./components/Message/AddMessage";
import ChatsList from "./components/Chat/ChatsList";
import AddChat from "./components/Chat/AddChat";

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
            <AddUser />
        </div>
        <div id="chatUsers">
            <p>List of ChatUsers:</p>
            <ChatUserList />
            <AddChatUser />
        </div>
        <div id="messages">
            <p>List of Messages:</p>
            <MessageList />
            <AddMessage />
        </div>
        <div id="chats">
            <p>List of Chats:</p>
            <ChatsList />
            <AddChat />
        </div>
    </ApolloProvider>
  );
}

export default App;
