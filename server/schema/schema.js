const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const Chat = require('../models/chat');
const ChatUser = require('../models/chatUser');
const Message = require('../models/message');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// Book
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

// Author
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: ( ) => ({
        id: { type: GraphQLID },
        header: { type: GraphQLString }
    })
});

const ChatUserType = new GraphQLObjectType({
    name: 'ChatUser',
    fields: ( ) => ({
        id: { type: GraphQLID },
        chat: {
            type: ChatType,
            resolve(parent, args){
                return Chat.findById(parent.chatId);
            }
        },
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: ( ) => ({
        id: { type: GraphQLID },
        chat: {
            type: ChatType,
            resolve(parent, args){
                return Chat.findById(parent.chatId);
            }
        },
        time: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        },
        text: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Book
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Book.findById(args.id);
            }
        },
        // Author
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        // Book
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        // Author
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        },
        chat: {
            type: ChatType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Chat.findById(args.id);
            }
        },
        chats: {
            type: new GraphQLList(ChatType),
            resolve(parent, args){
                return Chat.find({});
            }
        },
        chatUser: {
            type: ChatUserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return ChatUser.findById(args.id);
            }
        },
        chatUsers: {
            type: new GraphQLList(ChatUserType),
            resolve(parent, args){
                return ChatUser.find({});
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Message.findById(args.id);
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args){
                return Message.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Author
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        // Book
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let user = new User({
                    username: args.username,
                    password: args.password,
                    name: args.name,
                    email: args.email
                });
                return user.save();
            }
        },
        addChat: {
            type: ChatType,
            args: {
                header: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let chat = new Chat({
                    header: args.header
                });
                return chat.save();
            }
        },
        addChatUser: {
            type: ChatUserType,
            args: {
                chatId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let chatUser = new ChatUser({
                    chatId: args.chatId,
                    userId: args.userId
                });
                return chatUser.save();
            }
        },
        addMessage: {
            type: MessageType,
            args: {
                chatId: { type: new GraphQLNonNull(GraphQLID) },
                time: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                text: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let message = new Message({
                    chatId: args.chatId,
                    time: args.time,
                    userId: args.userId,
                    text: args.text
                });
                return message.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});