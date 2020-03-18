import React, {Component} from 'react'
import {ChatMessageComponent} from "../components"
import {connect} from 'react-redux'
import {setTypingValue} from "../../actions/chat";
import {Button, Tooltip} from '@material-ui/core'
import {Link} from 'react-router-dom';
import {removeNotifs} from "../../actions/notifications"
import {Person as PersonIcon, Event as EventIcon} from "@material-ui/icons"

class ChatWindowComponent extends Component {
    messagesEndRef = React.createRef()
    
    handleChange = (e) => {
        this.props.setTypingValue(e.target.value);        
    }

    sendMessage = () => {
        const messageObject = {from: this.props.user.id, text: this.props.message, room: this.props.room.uri}
        this.props.socket.newChatMessage(messageObject)
    }

    handleSubmit = (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            this.sendMessage()
        }
    }

    handleClick = (e) => {
        this.sendMessage()
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom = () => {    
        this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    determineOtherUser = () => {
        const user = this.props.user

        for (var key in this.props.room.members){
            if (key !== user.id.toString()){
                return this.props.room.members[key].id
            }
        }
    }
 
    render () {
    
        return (
            <div className="chat-window elevate" ref={this.chatsRef}>
                <div className="chat-header">
                    {this.props.room && this.props.room.meetup && 
                        <Link to={`/meetups/${this.props.room.uri}`}>
                            <Tooltip title="Go to Meetup">
                                <Button color="primary" startIcon={<EventIcon/>}>
                                  {this.props.room.name}
                                </Button>
                            </Tooltip>
                        </Link>
                    }
                    {this.props.room && this.props.room.friendship && 
                        <Link to={`/profile/${this.determineOtherUser()}`}>
                            <Tooltip title="Go to Profile">
                                <Button color="primary" startIcon={<PersonIcon/>}>Profile</Button>
                            </Tooltip>
                        </Link>
                    }
                </div>
                <div className="chat-messages-wrapper" >
                    <div className="chat-messages">
                        {this.props.activeChatMembers && this.props.messages && this.props.messages.map((msg) => <ChatMessageComponent user={this.props.user} message={msg.message} members={this.props.activeChatMembers}/>)}
                        <div ref={this.messagesEndRef} />
                    </div>
                </div>
                {this.props.activeChatMembers && <div ref={(el) => { this.messagesEnd = el; }} className="chat-input">
                    <form className="chat-input-form">
                        <input className="chat-input"
                            type="text"
                            onChange={this.handleChange} 
                            onKeyPress={this.handleSubmit}
                            value={this.props.message} 
                            placeholder="Type a message here...">
                        </input>
                    </form>
                    <div>
                        <Button onClick={() => this.handleClick()} style={{borderRadius: 15, fontSize: 10, fontFamily: "Lato", fontWeight: "700", backgroundColor: "#FFD460"}}>Send</Button>
                    </div>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    if (state.chat.activeRoom in state.chat.rooms){
        return {
            activeChatMembers: state.chat.rooms[state.chat.activeRoom].members,
            user: state.user.user,
            message: state.chat.setTypingValue,
            room: state.chat.rooms[state.chat.activeRoom]
        }
    } else {
        return {
            activeChatMembers: null,
            user: state.user.user,
        }
    }
    
}

const mapDispatchToProps = {
    setTypingValue,
    removeNotifs
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatWindowComponent)