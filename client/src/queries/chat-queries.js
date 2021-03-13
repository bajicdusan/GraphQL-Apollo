import { gql } from 'apollo-boost';

const getChatsQuery = gql`
{
  chats {
    id
    header
  }
}
`;

const getMessagesQuery = gql`
{
  messages {
    id
    chat {
      id
      header
    }
    time
    user {
      id
      username
      password
      name
      email
    }
    text
  }
}
`;

const getChatUsersQuery = gql`
{
  chatUsers {
    id
    chat {
      id
      header
    }
    user {
      id
      username
      password
      name
      email
    }
  }
}
`;

const getUsersQuery = gql`
{
  users {
    id
    username
    password
    name
    email
  }
}
`;

// mutations
const addUserMutation = gql`
mutation ($username: String!, $password: String!, $name: String!, $email: String!) {
  addUser(username: $username, password: $password, name: $name, email: $email) {
    id
    username
    password
    name
    email
  }
}
`;

const addChatMutation = gql`
mutation ($header: String!) {
  addChat(header: $header) {
    id
    header
  }
}
`;

const addChatUserMutation = gql`
mutation ($chatId: ID!, $userId: ID!) {
  addChatUser(chatId: $chatId, userId: $userId) {
    id
    chat {
      id
      header
    }
    user {
      id
      username
      password
      name
      email
    }
  }
}
`;

// queries
const addMessageMutation = gql`
mutation ($chatId: ID!, $time: String!, $userId: ID!, $text: String!) {
  addMessage(chatId: $chatId, time: $time, userId: $userId, text: $text) {
    id
    chat {
      id
      header
    }
    time
    user {
      id
      username
      password
      name
      email
    }
    text
  }
}
`;

const getUserQuery = gql`
query ($id: ID) {
  user(id: $id) {
    id
    username
    password
    name
    email
  }
}
`;

const getChatQuery = gql`
query ($id: ID) {
  chat(id: $id) {
    id
    header
  }
}
`;

const getChatUserQuery = gql`
query ($id: ID) {
  chatUser(id: $id) {
    id
    chat {
      id
      header
    }
    user {
      id
      username
      password
      name
      email
    }
  }
}
`;

const getMessageQuery = gql`
query ($id: ID) {
  message(id: $id) {
    id
    chat {
      id
      header
    }
    time
    user {
      id
      username
      password
      name
      email
    }
    text
  }
}
`;

export { getChatsQuery, getChatUsersQuery, getUsersQuery, getMessagesQuery, addUserMutation, addChatMutation, addChatUserMutation, addMessageMutation, getUserQuery, getChatQuery, getChatUserQuery, getMessageQuery };