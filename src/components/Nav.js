import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/authUser'
class Nav extends Component {
    
    constructor (props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    
    logout () {
        const { dispatch } = this.props
        dispatch(logout())
    }

    render () {

        return (
            <nav className='nav'>
                <ul>
                    <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' activeClassName='active'>
                            Create New Poll
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            LeaderBoard
                        </NavLink>
                    </li>
                    <li className='User'>
                        <p>{ this.props.authUser }</p>
                        ...........
                        <a onClick={this.logout} href='/'>Logout</a>
                    </li>
                    
                </ul>
            </nav>
        )
    } 
}

function mapStateToProps ({authUser}) {
    return {
        authUser,
    }
}

export default connect(mapStateToProps)(Nav)