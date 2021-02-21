import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Question extends Component {

    constructor (props) {
        super(props)
        this.state = {
            submitted: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.setState( ()=> ({
            submitted: true
        }))
    }

    render () {
        const {
            questionId,
            authUser,
            question,
            questions,
            users } = this.props
            
        const { submitted } = this.state
        
        const answeredQuestionsIds = Object.keys(questions)
            .filter((question) => (questions[question].optionOne.votes.indexOf(authUser) > -1) || (questions[question].optionTwo.votes.indexOf(authUser) > -1))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        
        const unansweredQuestionsIds = Object.keys(questions)
            .filter((question) => (questions[question].optionOne.votes.indexOf(authUser) === -1) && (questions[question].optionTwo.votes.indexOf(authUser) === -1))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            
        const isAnsweredCheck = answeredQuestionsIds.includes( questionId,0)
            
        if ( authUser === null) {
            return <Redirect to={'/login'} />
        }

        if(isAnsweredCheck){
            console.log('qesf', question)
            const answer = users[authUser].answers[questionId]
            const optionOneVotes = question.optionOne.votes.length
            const optionTwoVotes = question.optionTwo.votes.length

            return(
                <div className='center'>
                    <div>
                        <img alt='avatar' src={users[question.author].avatarURL} className='user-avatar'/> 
                    </div>
                    <div>Question posted by: {users[question.author].name}</div>
                    <div>Option one: {question.optionOne.text}</div>
                    <div>Option two: {question.optionTwo.text}</div>
                    <div>You answered: {answer}</div>
                    {answer === 'optionOne'
                        ? <div>
                                <div>Number of votes : {optionOneVotes} </div>
                                <div>Percentage : {optionOneVotes/(optionTwoVotes+optionOneVotes)*100}%</div>
                        </div>

                        : <div>
                                <div>Number of votes : {optionTwoVotes} </div>
                                <div>Percentage : {optionTwoVotes/(optionOneVotes+optionTwoVotes)*100}%</div>
                        </div>
                    }
                </div>)
        }

        if (submitted === true) {
            return <Redirect to = {`/questions/${question.id}/vote`}/>  
        }

        return (
            <div className='center'>
                <div>
                    <img alt='avatar' src={users[question.author].avatarURL} className='user-avatar'/> 
                </div>
                <div>Question by: {users[question.author].name}</div>
                <div>Option one: {question.optionOne.text}</div>
                <div>Option two: {question.optionTwo.text}</div>
                
                <button onClick = {this.handleClick}>Vote</button>
            </div>
        )
    }
}

function mapStateToProps ({ authUser, questions, users }, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        questionId: id,
        authUser,
        question,
        questions,
        users
    }
}

export default connect(mapStateToProps)(Question)
