import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            setToAnswered: false
        }
        this.toggleQuestions = this.toggleQuestions.bind(this)
    }

    toggleQuestions (e, setToAnswered) {
        e.preventDefault()
        this.setState( () => ({
            setToAnswered: setToAnswered
        }))

    }
    
    render () {
        const {questions, authUser} = this.props
        const { setToAnswered } = this.state
        const answeredQuestionsIds = Object.keys(questions)
            .filter((question) => (questions[question].optionOne.votes.indexOf(authUser) > -1) || (questions[question].optionTwo.votes.indexOf(authUser) > -1))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        
            const unansweredQuestionsIds = Object.keys(questions)
            .filter((question) => (questions[question].optionOne.votes.indexOf(authUser) === -1) && (questions[question].optionTwo.votes.indexOf(authUser) === -1))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        
        if ( authUser == null) {
            return <Redirect to={'/login'} />
        }
        
        return (
            <div >
                <h1 className='center'>Questions</h1>
                <div className='center'>
                    {setToAnswered === false
                    ? <button onClick={(e) => this.toggleQuestions(e, true)}>Show answered Polls</button> 
                    : <button onClick={(e) => this.toggleQuestions(e, false)}>Show Unanswered Polls</button>}
                </div>
                <ul >
                    {setToAnswered
                    ? answeredQuestionsIds.map ( (id) => (
                        <li key={id}><Question id={id} isAnswered = {setToAnswered}/></li>
                    ))
                    : unansweredQuestionsIds.map ( (id) => (
                        <li key={id}><Question id={id} isAnswered = {setToAnswered}/></li>
                    ))}
                </ul>
            </div>

        ) 
    }
}

function mapStateToProps({ authUser, questions}) {


    return {
        authUser,
        questions
    }
}

export default connect(mapStateToProps)(Home)
