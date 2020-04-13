import {GET_ROOMS_SUCCESS, GET_ROOMS_REQUEST, GET_ROOMS_ERROR, SET_ACTIVE_ROOM,
    GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR, 
    GET_MORE_MESSAGES_REQUEST, GET_MORE_MESSAGES_SUCCESS, GET_MORE_MESSAGES_ERROR, 
    SET_TYPING_VALUE, ADD_MESSAGE, REMOVE_ACTIVE_ROOM} from "../constants/action-types"
import {axiosClient} from '../accounts/axiosClient'

export const getRooms = () => async dispatch => {
    dispatch({type: GET_ROOMS_REQUEST})
    try {
        const response = await axiosClient.get(
            "/api/chats/", {headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }}
        )
        console.log(response.data)
        setTimeout(() => dispatch({type: GET_ROOMS_SUCCESS, payload: response.data.rooms}), 200)
    } catch(e){
        console.log(e);
        dispatch({type: GET_ROOMS_ERROR, payload: e})
    }
}

export const getMessages = (room) => async dispatch => {
    dispatch({type: GET_MESSAGES_REQUEST})
    try {
        const response = await axiosClient.get(
            `/api/chats/${room}/messages/`, {headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        console.log(response.data)
        setTimeout(() => dispatch({type: GET_MESSAGES_SUCCESS, payload: response.data}), 200)
    } catch(e){
        console.log(e)
        dispatch({type: GET_MESSAGES_ERROR, payload: e})
    }
}

export const getMoreMessages = (room, last_message_id) => async dispatch => {
    dispatch({type: GET_MORE_MESSAGES_REQUEST})
    try {
        const response = await axiosClient.get(
            `/api/chats/${room}/messages/`, {params: {last: last_message_id}, headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        console.log(response.data)
        setTimeout(() => dispatch({type: GET_MORE_MESSAGES_SUCCESS, payload: response.data}), 200)
    } catch(e){
        console.log(e)
        dispatch({type: GET_MORE_MESSAGES_ERROR, payload: e})
    }

}

export const setActiveRoom = (room) => {
    console.log("set Active room action")
    return {
        type: SET_ACTIVE_ROOM,
        payload: {"uri": room}
    }
}

export const removeActiveRoom = () => {
    return {
        type: REMOVE_ACTIVE_ROOM
    }
}

export const setTypingValue = (value) => {
    return {
        type: SET_TYPING_VALUE,
        payload: value
    }
}

export const addMessage = (message) => async dispatch => {
    try {
        console.log(message);
        dispatch({type: ADD_MESSAGE, payload: {"message": message}})
    } catch(e){
        console.log(e);
    }
}