import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMessageQuery } from '../../queries/chat-queries';

class MessageDetails extends Component {
    displayMessageDetails(){
        const { message } = this.props.data;
        if (message) {
            return(
                <div>
                    <p>MessageId: "{ message.id }"</p>
                    <p>Message Text: "{ message.text }"</p>
                    <p>Message Time: "{ message.time }"</p>
                    <p>Chat header: "{ message.chat.header }"</p>
                    <p>Chat Id: "{ message.chat.id }"</p>
                    <p>userId: "{ message.user.id }"</p>
                    <p>username: "{ message.user.username }"</p>
                    <p>password: "{ message.user.password }"</p>
                    <p>name: "{ message.user.name }"</p>
                    <p>email: "{ message.user.email }"</p>
                </div>
            )
        } else {
            return (
                <div>No message selected...</div>
            )
        }
    }

    render() {
        return (
            <div>
                <div id="message-details">
                    { this.displayMessageDetails() }
                </div>
            </div>
        );
    }
}

export default graphql(getMessageQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.messageId
            }
        }
    }
})(MessageDetails);
