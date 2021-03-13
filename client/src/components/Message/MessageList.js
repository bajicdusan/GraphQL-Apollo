import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMessagesQuery } from '../../queries/chat-queries';

// components
import MessageDetails from './MessageDetails';

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayMessages() {
        var data = this.props.data;
        if (data.loading) {
            return(<div>Loading messages...</div>)
        } else {
            return data.messages.map(message => {
                return(
                    <li key={ message.id } onClick={(e) => { this.setState({ selected: message.id })}}>{ message.text }</li>
                );
            })
        }
    }

    render() {
        // console.log("messageList-below:")
        // console.log(this.props);

        return (
            <div>
                <ul id="message-list">
                    { this.displayMessages() }
                </ul>
                <MessageDetails messageId={ this.state.selected }/>
            </div>
        );
    }
}

export default graphql(getMessagesQuery)(MessageList);
