import axios from './axios';
import { stateContext } from 'react-three-fiber';
// making axios requset to the server from where i get data, which then i store in users: data, and important to have type, then all data goes to reducer
export async function receiveFriendsWannabes() {
    const { data } = await axios.get('/friends-wannabes');
    return {
        type: 'RECEIVEFRIENDSWANNABES_USERS',
        users: data
    };    
}

export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/${id}`);
    return {
        type: 'ACCEPT_USERS',
        id
    };    
}

export async function endFriendShip(id) {
    await axios.post(`/end-friendship/${id}`);
    return {
        type: 'UNFRIEND_USERS',
        id
    };    
}

// CHAT

export function chatMessages(msgs) {
    return {
        type: 'USERS_MESSAGES',
        msgs: msgs
    };    
}

export function chatMessage(msg) {
    console.log("actions chatMessage ", msg);
    return {
        type: 'USER_MESSAGE',
        msg: msg
    };    
}

export function chatMessageNotitification(msgNot) {
    // console.log("msgNot.length", msgNot);
    return {
        type: 'MESSAGE_NOTIFICATION',
        msgNot: msgNot
    };    
}

export function onlineUsers(onlnUsr) {
    // console.log("msgNot", onlnUsr);
    return {
        type: 'ONLINE_USERS',
        onlnUsr: onlnUsr
    };    
}

export async function totalUsers() {
    const { data } = await axios.get('/total-clients');
    return {
        type: 'TOTAL_CLIENTS',
        users: data
    };   
}

export async function totalPilatesUsers() {
    const { data } = await axios.get('/pilates-customers');
    // console.log("totalpilates users", data);
    return {
        type: 'PILATES_USERS',
        pilates_users: data
    };   
}

export async function removePilatesUser(id) {
    const { data } = await axios.post(`/pilates-customers/${id}`);
    return {
        type: 'REMOVE_USER'
    };    
}

export async function totalYogaUsers() {
    const { data } = await axios.get('/yin-customers');
    return {
        type: 'YOGA_USERS',
        yoga_users: data
    };   
}

export async function removeYogaUsers(id) {
    await axios.post(`/yin-customers/${id}`);
    return {
        type: 'REMOVEYOGA_USERS'
    };   
}


export async function register() {
    const { data } = await axios.get('/register-newuser');
    return {
        type: 'REGISTER_USERS',
        users: data
    };   
}

export async function signUp(values) {
    const { data } = await axios.post('/register', values);
    console.log("action SIGNUP", data);  
    return {
        type: 'SIGNUP_FOR_CLASS',
        signPilatesUsers: data[0]
    };   
}

export async function newClients() {
    const { data } = await axios.get('/new-clients-per-day');
    // console.log("action new clients", data);  
    return {
        type: 'TODAYS_CLIENTS',
        client: data
    };   
}

export async function lastMonthClients() {
    const { data } = await axios.get('/last-month-clients');
    // console.log("action last month clients", data);  
    return {
        type: 'LASTMONTH_CLIENTS',
        prevClient: data
    };   
}

export async function getNotes() {
    // console.log("action getNotes", {value});  
    const { data } = await axios.get('/all-notes');
    return {
        type: 'GET_NOTES_DATA',
        allNotes: data
    };   
}

export async function addNotes(value) {
    const { data } = await axios.post('/notes', { value });
    // console.log("action getNotes", data);  
    return {
        type: 'ADD_NOTES_DATA',
        notes: data[0]
    };   
}

// export async function deleteNote(id) {
//     const { data } = await axios.post(`/delete-notes/${id}`);
//     console.log("data.id", data);
    
//     return {
//         type: 'DELETE_NOTES_DATA',
//         deleteNotes: data
//     };   
// }