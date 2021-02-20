import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Question extends Component {

    constructor (props) {
        super(props)
        this.state = {
            submitted : false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {

        this.setState(() => ({
            submitted : true
        }))
    }
    render () {

        const {authUser,question, authorOfQuestion, isAnswered} = this.props
        const {submitted} = this.state
        if (authUser === null) {
            return <Redirect to = {'/'}/>
        }

        if (submitted === true) {
            return <Redirect to = {{
				pathname: `/questions/${question.id}`,
				state: {
					isAnswered: isAnswered
				}
			}} />  
        }

        return (
            <div>
                <div>
                    question by {authorOfQuestion.name}
                </div>
                <div>option one: {question.optionOne.text}</div>
                <div>option two: {question.optionTwo.text}</div>
                
                <button onClick = {this.handleClick}>Show more</button>
            </div>
        )
    }
}


function mapStateToProps ({authUser, questions, users}, props) {

    const {id,isAnswered } = props
    const question = questions[id]
    const authorID = question.author
    const authorOfQuestion = users[authorID]

    return {
        authUser,
        question,
        authorOfQuestion,
        isAnswered
    }
}



export default connect(mapStateToProps)(Question)