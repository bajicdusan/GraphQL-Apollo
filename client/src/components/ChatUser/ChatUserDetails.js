import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getChatUserQuery } from '../../queries/chat-queries';

class ChatUserDetails extends Component {
    displayChatUserDetails(){
        const { chatUser } = this.props.data;
        if (chatUser) {
            return(
                <div>
                    <p>ChatUserId: "{ chatUser.id }"</p>
                    <p>Chat Id: "{ chatUser.chat.id }"</p>
                    <p>Chat header: "{ chatUser.chat.header }"</p>
                    <p>userId: "{ chatUser.user.id }"</p>
                    <p>username: "{ chatUser.user.username }"</p>
                    <p>password: "{ chatUser.user.password }"</p>
                    <p>name: "{ chatUser.user.name }"</p>
                    <p>email: "{ chatUser.user.email }"</p>
                </div>
            )
        } else {
            return (
                <div>No chat user selected...</div>
            )
        }
    }

    render() {
        return (
            <div>
                <div id="chatUser-details">
                    { this.displayChatUserDetails() }
                </div>
            </div>
        );
    }
}

export default graphql(getChatUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.chatUserId
            }
        }
    }
})(ChatUserDetails);
