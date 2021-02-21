import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {handleSaveQuestion} from '../actions/questions'

class NewQuestion extends Component {
    constructor (props) {
        super(props)
        this.state = {
            optionOne : '',
            optionTwo : '',
            submitted : false
        }
        this.handleOptionOneChange = this.handleOptionOneChange.bind(this)
        this.handleOptionTwoChange = this.handleOptionTwoChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleOptionOneChange (e) {
        const optionOne = e.target.value
        this.setState(() => ({
            optionOne
        }))
    }

    handleOptionTwoChange (e) {
        const optionTwo = e.target.value
        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit (e) {
        e.preventDefault()

        const {optionOne, optionTwo } = this.state
        const {dispatch, authUser}= this.props 
        const question = {
            optionOneText : optionOne,
            optionTwoText : optionTwo,
            author : authUser
        }
        dispatch(handleSaveQuestion(question))
        this.setState(() => ({
            optionOne : '',
            optionTwo : '',
            submitted : true
        }))
    }

    render () {
        const {authUser} = this.props
        const {optionOne,optionTwo, submitted} = this.state
        
        if ( authUser == null) {
            return <Redirect to={'/login'} />
        }
        if (submitted === true) {
            return <Redirect to = {'/'}/>
        }
        return (
            <div className='center'>
                <hr/>
                <h1 className='center'>Would You Rather ?</h1>
                <hr/>
                <br/>
                <form onSubmit = {this.handleSubmit}>
                    {/* <div> Would you Rather .. ? </div> */}
                    <input
                        type="text"
                        value = {optionOne}
                        onChange = {this.handleOptionOneChange}
                        placeholder = 'Option #1'
                    />
                    <br/>
                    <br/>
                    <input
                        type="text"
                        value = {optionTwo}
                        onChange = {this.handleOptionTwoChange}
                        placeholder = 'Option #2'
                    />
                    <br/>
                    <br/>
                    <button >Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({authUser}) {

    return {
        authUser
    }
}
export default connect(mapStateToProps)(NewQuestion)