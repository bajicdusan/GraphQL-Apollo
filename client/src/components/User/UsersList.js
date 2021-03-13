import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUsersQuery } from '../../queries/chat-queries';

// components
import UserDetails from './UserDetails';

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayUsers() {
        // console.log("user-list-below:")
        // console.log(this.props.data);

        var data = this.props.data;
        if (data.loading) {
            return(<div>Loading Users...</div>)
        } else {
            // console.log(data.users);

            return data.users.map(user => {
                // console.log(user);

                return(
                    <li key={ user.id } onClick={(e) => { this.setState({ selected: user.id })}}>{ user.name }</li>
                );
            })
        }
    }

    render() {
        // console.log("userList-below:")
        // console.log(this.props);

        return (
            <div>
                <ul id="user-list">
                    { this.displayUsers() }
                </ul>
                <UserDetails userId={ this.state.selected }/>
            </div>
        );
    }
}

export default graphql(getUsersQuery)(UsersList);
