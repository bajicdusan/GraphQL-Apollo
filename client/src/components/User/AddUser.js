import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addUserMutation, getUsersQuery } from '../../queries/chat-queries';
import { flowRight } from 'lodash';

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: ''
        };
    }

    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.addUserMutation({
            variables: {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email
            },
            refetchQueries: [{ query: getUsersQuery }]
        })
    }

    render() {
        return (
            <form id="add-user" onSubmit={ this.submitForm.bind(this) } >

                <div className="field">
                    <label>username:</label>
                    <input type="text" onChange={ (e) => this.setState({ username: e.target.value })} />
                </div>

                <div className="field">
                    <label>password:</label>
                    <input type="text" onChange={ (e) => this.setState({ password: e.target.value })} />
                </div>

                <div className="field">
                    <label>name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
                </div>

                <div className="field">
                    <label>email:</label>
                    <input type="text" onChange={ (e) => this.setState({ email: e.target.value })} />
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default flowRight(
    graphql(addUserMutation, { name: "addUserMutation" })
)(AddUser);
