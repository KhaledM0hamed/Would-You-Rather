import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';

class Login extends Component { 

    constructor (props) {
        super(props)
        this.state = {
            text: '',
            submitted: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        const text = e.target.value 

        this.setState( ()=> ({
            text
        }))
    }

    handleSubmit (e) {
        e.preventDefault()
        const { text } = this.state 
        const { dispatch } = this.props 

        dispatch(setAuthUser(text))
        this.setState(() => ({
            text : '',
            submitted : true
        }))
    }

    render () {
        
        const { text } = this.state

        return (
            <div style={{textAlign: 'center', margin: '100px'}}>
                <div> Welcome to Would you Rather  ..?</div>
                <form onSubmit = {this.handleSubmit} >
                    <input
                        type="text"
                        value = {text}
                        onChange = {this.handleChange}
                    />
                    <button>LogIn</button>
                </form> 
                <p>usernames: sarahedo , tylermcginnis , johndoe</p>
            </div>
        )
    }
}

function mapStateToProps ({authUser}) {
    return {
        authUser,
    }
}

export default connect(mapStateToProps)(Login)