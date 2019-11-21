import axios from './axios';
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

export function chatMessages(msgs) {
    return {
        type: 'USERS_MESSAGES',
        msgs: msgs
    };    
}

export function chatMessage(msg) {
    return {
        type: 'USER_MESSAGE',
        msg: msg
    };    
}

export function chatMessageNotitification(msgNot) {
    return {
        type: 'MESSAGE_NOTIFICATION',
        msgNot: msgNot
    };    
}

export function onlineUsers(onlnUsr) {
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
    return {
        type: 'PILATES_USERS',
        pilates_users: data
    };   
}

export async function removePilatesUser(id) {
    await axios.post(`/pilates-customers/${id}`);
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
    return {
        type: 'SIGNUP_FOR_CLASS',
        signPilatesUsers: data[0]
    };   
}

export async function newClients() {
    const { data } = await axios.get('/new-clients-per-day'); 
    return {
        type: 'TODAYS_CLIENTS',
        client: data
    };   
}

export async function lastMonthClients() {
    const { data } = await axios.get('/last-month-clients');
    return {
        type: 'LASTMONTH_CLIENTS',
        prevClient: data
    };   
}

export async function getNotes() {
    const { data } = await axios.get('/all-notes');
    return {
        type: 'GET_NOTES_DATA',
        allNotes: data
    };   
}

export async function addNotes(value) {
    const { data } = await axios.post('/notes', { value });
    return {
        type: 'ADD_NOTES_DATA',
        notes: data[0]
    };   
}