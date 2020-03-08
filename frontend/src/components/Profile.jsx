import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Typography, Button, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Friend from "./invite/Friend"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            friends: [],
            userLoaded: false
        }
    }

    componentDidMount(){
        this.getInformation()
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.getInformation()
        }
    }

    getInformation = async () => {
        const [profile, friends] = await Promise.all([
            axios.get(`http://localhost:8000/api/users/${this.props.match.params.id}/`), 
            axios.get(
                `http://localhost:8000/api/users/${this.props.match.params.id}/friends/`, {headers: {
                    "Authorization": `JWT ${localStorage.getItem('token')}`
                }}
            )]
        )
        this.setState({user: profile.data, friends: friends.data, userLoaded: true})
    }

    renderProfile = () => {
        return (
            <div className="profile">
                <div className="pic"><img className="user-avatar" src={this.state.user.avatar}></img></div>
                <div>
                    <Typography variant="h4">
                        {this.state.user.first_name} {this.state.user.last_name}
                    </Typography>
                    {this.state.user.email}
                </div>
            </div>
        )     
    }
    
    renderFriends = (isUser) => {
        return (
            <>
                <div className="inner-header">
                    <Typography variant="h5">Friends</Typography>
                </div>
                <div className="friends">
                    <Grid container spacing={3}> 
                        
                        {this.state.friends.map((friend) => 
                            <Grid item xs={4}>
                                <Friend isUserFriend={isUser} friend={friend}/>
                            </Grid>
                        )}
                        
                    </Grid>
                </div> 
            </>
        )
    }

    render () {
        const isUser = this.props.user.id.toString() === this.props.match.params.id;

        return (
            <div className="inner-wrap">
                <div className="inner-header">
                    <Typography variant="h5">Profile</Typography>
                    {isUser && 
                        <Link to="/profile/edit">
                            <Button variant="contained" color="primary">Edit Profile</Button>
                        </Link>
                    }
                </div>
                {this.state.userLoaded && this.renderProfile()}
                {this.state.userLoaded && this.renderFriends(isUser)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, null)(Profile)