import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addMessageMutation, getChatsQuery, getUsersQuery, getMessagesQuery } from '../../queries/chat-queries';
import { flowRight } from 'lodash';

class AddMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatId: '',
            time: '',
            userId: '',
            text: ''
        };
    }

    displayChats() {
        var data = this.props.getChatsQuery;
        // console.log(this.props);
        if (data.loading) {
            return( <option disabled>Loading Chats...</option> );
        } else {
            return data.chats.map(chat => {
                return ( <option key={ chat.id } value={ chat.id }>{ chat.header }</option> );
            });
        }
    }

    displayUsers() {
        var data = this.props.getUsersQuery;
        // console.log(this.props);
        if (data.loading) {
            return( <option disabled>Loading Users...</option> );
        } else {
            return data.users.map(user => {
                return ( <option key={ user.id } value={ user.id }>{ user.username }</option> );
            });
        }
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.addMessageMutation({
            variables: {
                chatId: this.state.chatId,
                time: this.state.time,
                userId: this.state.userId,
                text: this.state.text
            },
            refetchQueries: [{ query: getMessagesQuery }]
        })
    }

    render() {
        return (
            <form id="add-message" onSubmit={ this.submitForm.bind(this) } >

                <div className="field">
                    <label>Chat:</label>
                    <select onChange={ (e) => this.setState({ chatId: e.target.value })} >
                        <option >Select Chat</option>
                        { this.displayChats() }
                    </select>
                </div>

                <div className="field">
                    <label>Time:</label>
                    <input type="text" onChange={ (e) => this.setState({ time: e.target.value })} />
                </div>

                <div className="field">
                    <label>User:</label>
                    <select onChange={ (e) => this.setState({ userId: e.target.value })} >
                        <option >Select User</option>
                        { this.displayUsers() }
                    </select>
                </div>

                <div className="field">
                    <label>Text:</label>
                    <input type="text" onChange={ (e) => this.setState({ text: e.target.value })} />
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default flowRight(
    graphql(getChatsQuery, { name: "getChatsQuery" }),
    graphql(getUsersQuery, { name: "getUsersQuery" }),
    graphql(addMessageMutation, { name: "addMessageMutation" })
)(AddMessage);
