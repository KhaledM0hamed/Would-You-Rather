import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveAnswer } from "../actions/questions";
import {handleInitialData} from "../actions/shared";

class QuestionVote extends Component {
    constructor (props) {
        super(props)
        this.state = {
            option: '',
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleVote = this.handleVote.bind(this)
    }

    componentWillMount () {
        this.props.dispatch(handleInitialData())
    }

    handleChange (event) {
        const {name, value,} =  event.target
        this.setState(()=>({
            [name] : value
        }))
    }

    handleVote (event) {
        event.preventDefault()
        const {option} = this.state
        const {dispatch, authUser, question} = this.props

        const answer = {
            authedUser: authUser,
            qid : question.id,
            answer : option
        }
        dispatch(handleSaveAnswer(answer))
        this.setState(() => ({
            submitted : true,
        }))
    }

    render () {
        const { option, submitted } = this.state
        const { authUser, question, users } = this.props

        if ( authUser == null) {
            return <Redirect to={'/login'} />
        }
        if (submitted === true) {
            return <Redirect to = {`/questions/${question.id}/result`}/>  
        }
        return (
            <div className='center'>
                <div>
                    <img alt='avatar' src={users[question.author].avatarURL} className='user-avatar'/> 
                </div>
                <div>question by {users[question.author].name}</div>
                <div>Would You Rather .. ?</div>
                <form action="">
                    <input
                        id = "one"
                        name="option"
                        type="radio"
                        value="optionOne"
                        checked = {option === 'optionOne'}
                        onChange = {this.handleChange}
                    />
                    <label htmlFor="one">{question.optionOne.text}</label>
                    <br/>
                    <input
                        id = "two"
                        name="option" 
                        type="radio" 
                        value="optionTwo"
                        checked = {option === 'optionTwo'}
                        onChange = {this.handleChange}

                    />
                    <label htmlFor="two">{question.optionTwo.text}</label>
                    <br/>
                    <button onClick = {this.handleVote}>Vote</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ( {authUser, questions, users}, props) {
    (handleInitialData())
    const {id} = props.match.params
    const question = questions[id]

    return {
        authUser,
        question,
        users,
    }
}
export default connect (mapStateToProps)(QuestionVote)