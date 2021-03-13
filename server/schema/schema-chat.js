const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/Author');
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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: ( ) => ({
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
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        chat: {
            type: ChatType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Chat.findById(args.id);
            }
        },
        chatUser: {
            type: ChatUserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return ChatUser.findById(args.id);
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Message.findById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
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