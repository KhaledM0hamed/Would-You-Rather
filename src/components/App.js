import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Login'
import Nav from './Nav'
import Home from './Home'

import NotFound from './NotFound'

class App extends Component {
    componentDidMount () {
        this.props.handleInitialData()
    }

    render() {
        const { authUser } = this.props
        return (
            <Router>
                <div>
                    { authUser !== null && <Nav />}
                    <div>
                        <Switch>
                        <Route path = '/login' exact component = {Login}/>
                        <Route path = '/' exact component = {Home} />
                        {/* <Route path = '/questions/:id' exact component = {QuestionPage}/>
                        <Route path = '/questions/:id/vote' component = {QuestionVote}/>
                        <Route path = '/questions/:id/result' component = {QuestionResult}/>
                        <Route path = '/new' component = {NewQuestion}/>
                        <Route path = '/leaderboard' component = {LeaderBoard}/>*/}
                        <Route component = {NotFound}/> 
                        </Switch>
                    </div>
                    
                </div>
            </Router>
        )
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    };
}

export default connect(mapStateToProps, { handleInitialData })(App)