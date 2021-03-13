import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUsersQuery } from '../queries/chat-queries';

// components

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayUsers() {
        var data = this.props.data;
        if (data.loading) {
            return(<div>Loading Users...</div>)
        } else {
            return data.users.map(user => {
                return(
                    <li key={ user.id } onClick={(e) => { this.setState({ selected: user.id })}}>{ user.email }</li>
                );
            })
        }
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <ul id="user-list">
                    { this.displayUsers() }
                </ul>
            </div>
        );
    }
}

export default graphql(getUsersQuery)(UsersList);
