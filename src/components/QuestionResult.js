import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionResult extends Component {
    constructor (props) {
        super(props)
        this.state = {
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        this.setState( () => ({
            clicked: true
        }))
    }

    render () {
        const { authUser,question, users } = this.props
        const {clicked} = this.state

        if ( authUser == null) {
            return <Redirect to={'/login'} />
        }
        if (clicked === true) {
            return <Redirect to = {`/`}/>  
        }

        return (
            <div className='center'>
                <div>
                    <img alt='avatar' src={users[question.author].avatarURL} className='user-avatar'/> 
                </div>
                <div>question by {users[question.author].name}</div>
                <div>option one: {question.optionOne.text}</div>
                <div>option two: {question.optionTwo.text}</div>
                <div>The answer is: {users[authUser].answers[question.id]}</div>
                <button onClick = {this.handleClick}>Go home</button>
            </div>
        )
    }
}

function mapStateToProps ({authUser, questions, users}, props) {
    const {id} = props.match.params
    const question = questions[id]

    return {
        authUser,
        question,
        users,
    }
}

export default connect (mapStateToProps)(QuestionResult)