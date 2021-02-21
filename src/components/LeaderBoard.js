import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LeaderBoard extends Component {
    render () {
        const {authUser, users} = this.props
        if ( authUser == null) {
            return <Redirect to={'/login'} />
        }
        return (
            <div className='center'>
            <hr/>
            <h1>LeaderBoard</h1>
            <hr/>

            <ul>
            {
                this.props.users.map((user, index) => (
                    <li key = {user.id}>
                        <div>
                            <div>
                                <div>
                                    <img src={user.avatarURL} alt='Avatar' className='user-avatar'/>
                                    <h3>{index + 1}. {user.name}</h3>
                                </div>
                                <div>
                                    <p><b>Questions Asked:</b> {user.questions.length}</p>
                                </div>
                                <div>
                                    <p><b>Questions Answered:</b> {Object.keys(user.answers).length}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </li>    
                ))
            }
            </ul>
            </div>
        )
    }
}


function mapStateToProps({authUser, users}) {

    return {
        users: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map((user) => users[user]),
        authUser
    }
}


export default connect(mapStateToProps)(LeaderBoard)