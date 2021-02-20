import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './Login'
class App extends Component {
    componentDidMount () {
        this.props.handleInitialData()
    }

    render() {
        const { authUser } = this.props
        return (
            <div>
                { authUser === null
                ? <Login />
                : <h1>Hello, How are you?</h1> 
                }
                
            </div>
        )
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    };
}

export default connect(mapStateToProps, { handleInitialData })(App)