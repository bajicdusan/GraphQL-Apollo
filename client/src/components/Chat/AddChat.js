import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addChatMutation, getChatsQuery } from '../../queries/chat-queries';
import { flowRight } from 'lodash';

class AddChat extends Component {
    constructor(props){
        super(props);
        this.state = {
            header: ''
        };
    }

    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.addChatMutation({
            variables: {
                header: this.state.header
            },
            refetchQueries: [{ query: getChatsQuery }]
        })
    }

    render() {
        return (
            <form id="add-chat" onSubmit={ this.submitForm.bind(this) } >

                <div className="field">
                    <label>Chat Header:</label>
                    <input type="text" onChange={ (e) => this.setState({ header: e.target.value })} />
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default flowRight(
    graphql(addChatMutation, { name: "addChatMutation" })
)(AddChat);
