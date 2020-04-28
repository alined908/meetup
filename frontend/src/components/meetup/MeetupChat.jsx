import React, {Component} from 'react'
import {ChatWindow} from '../components'
import {getMessages, addMessage, setActiveRoom, getRoom, removeActiveRoom} from "../../actions/chat"
import AuthenticationService from "../../accounts/AuthenticationService"
import WebSocketService from "../../accounts/WebSocket";
import {connect} from 'react-redux'
import styles from '../../styles/meetup.module.css'

class MeetupChat extends Component {
    constructor(props){
        super(props)
        this.state = {
            chatSocket: new WebSocketService(),
        }
    }

    componentDidMount() {
        const uri = this.props.meetup.uri
        this.getRoomInfo(uri)
        const chatSocket = this.state.chatSocket
        const chatPath = `/ws/chat/${uri}/`;
        const token = AuthenticationService.retrieveToken()
        chatSocket.addChatCallbacks(this.props.getMessages, this.props.addMessage)
        chatSocket.connect(chatPath, token)
    }

    getRoomInfo(uri){
        this.props.getRoom(uri);
        this.props.setActiveRoom(uri);
        this.props.getMessages(uri);
    }

    componentWillUnmount(){
        this.props.removeActiveRoom()
        this.state.chatSocket.disconnect()
    }

    render () {
        const renderChatWindow = () => {
            if (this.props.isMessagesInitialized || this.props.isMessagesFetching) {
                return <ChatWindow
                            meetup={true}
                            hideChat={this.props.hideChat}
                            messages={this.props.messages}
                            socket={this.state.chatSocket} 
                            activeRoom={this.props.activeRoom} 
                            isMessagesInitialized={this.props.isMessagesInitialized} 
                        />
            } else {
                return <ChatWindow meetup={true} socket={this.state.socket} activeRoom={null} messages={[]}/>
            }
        }

        return (
            <div className={styles.meetupChat}>
                {renderChatWindow()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isMessagesInitialized: state.chat.isMessagesInitialized,
        activeRoom: state.chat.activeRoom,
        messages: state.chat.messages,
        isMessagesFetching: state.chat.isMessagesFetching
    }
}

const mapDispatchToProps = {
    getMessages,
    addMessage,
    setActiveRoom,
    getRoom,
    removeActiveRoom
}   

export default connect(mapStateToProps, mapDispatchToProps)(MeetupChat)