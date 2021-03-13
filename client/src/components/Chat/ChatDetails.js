import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getChatQuery } from '../../queries/chat-queries';

class ChatDetails extends Component {
    displayChatDetails(){
        const { chat } = this.props.data;
        if (chat) {
            return(
                <div>
                    <p>chatId: "{ chat.id }"</p>
                    <p>chat Header: "{ chat.header }"</p>
                </div>
            )
        } else {
            return (
                <div>No chats selected...</div>
            )
        }
    }

    render() {
        return (
            <div>
                <div id="chat-details">
                    { this.displayChatDetails() }
                </div>
            </div>
        );
    }
}

export default graphql(getChatQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.chatId
            }
        }
    }
})(ChatDetails);
