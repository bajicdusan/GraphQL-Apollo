import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getChatsQuery } from '../queries/chat-queries';

// components

class ChatsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayChats() {
        var data = this.props.data;
        if (data.loading) {
            return(<div>Loading Chats...</div>)
        } else {
            return data.chats.map(chat => {
                return(
                    <li key={ chat.id } onClick={(e) => { this.setState({ selected: chat.id })}}>{ chat.header }</li>
                );
            })
        }
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <ul id="chats-list">
                    { this.displayChats() }
                </ul>
            </div>
        );
    }
}

export default graphql(getChatsQuery)(ChatsList);
