import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getChatUsersQuery } from '../../queries/chat-queries';

// components
import ChatUserDetails from './ChatUserDetails';

class ChatUserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayChatUsers() {
        var data = this.props.data;
        if (data.loading) {
            return(<div>Loading ChatUsers...</div>)
        } else {
            return data.chatUsers.map(chatUser => {
                return(
                    <li key={ chatUser.id } onClick={(e) => { this.setState({ selected: chatUser.id })}}>{ chatUser.id }</li>
                );
            })
        }
    }

    render() {
        // console.log("chatUserList-below:")
        // console.log(this.props);

        return (
            <div>
                <ul id="chatUser-list">
                    { this.displayChatUsers() }
                </ul>
                <ChatUserDetails chatUserId={ this.state.selected }/>
            </div>
        );
    }
}

export default graphql(getChatUsersQuery)(ChatUserList);
