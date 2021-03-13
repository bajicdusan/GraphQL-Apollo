import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUserQuery } from '../../queries/chat-queries';

class UserDetails extends Component {
    displayUserDetails(){
        // console.log("user-details-below:")
        // console.log(this.props.data);

        const { user } = this.props.data;
        if (user) {
            return(
                <div>
                    <p>UserId: "{ user.id }"</p>
                    <p>Username: "{ user.username }"</p>
                    <p>Password: "{ user.password }"</p>
                    <p>Name: "{ user.name }"</p>
                    <p>Email: "{ user.email }"</p>
                </div>
            )
        } else {
            return (
                <div>No user selected...</div>
            )
        }
    }

    render() {
        return (
            <div>
                <div id="user-details">
                    { this.displayUserDetails() }
                </div>
            </div>
        );
    }
}

export default graphql(getUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.userId
            }
        }
    }
})(UserDetails);
