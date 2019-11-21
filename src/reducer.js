export const reducer = (state = {}, action) => {  

    if (action.type == 'RECEIVEFRIENDSWANNABES_USERS') {
        state = {
            ...state,
            users: action.users
        };
    }

    if (action.type == 'ACCEPT_USERS') {
        state = {
            ...state,
            users: state.users.map(
                user => {
                    if (user.id == action.id) {
                        return {
                            ...user,
                            accepted: action.type == 'ACCEPT_USERS'
                        };
                    } else {
                        return user;
                    }
                }
            )
        };
    }

    if (action.type == 'UNFRIEND_USERS') {
        state = {
            ...state,
            users: state.users.filter(
                user => user.id != action.id
            )
        };
    }

    if (action.type == 'USERS_MESSAGES') {
        state = {
            ...state,
            msgs: action.msgs
        };
    }

    if (action.type == 'USER_MESSAGE') {
        state = {
            ...state,
            msgs: state.msgs.concat(action.msg)
        };
    }

    if (action.type == 'MESSAGE_NOTIFICATION') {
        state = {
            ...state,
            msgNot: action.msgNot
        };
    }

    if (action.type === 'ONLINE_USERS') {
        state = {
            ...state,
            onlnUsr: action.onlnUsr
        };
    }

    if (action.type === 'TOTAL_CLIENTS') {
        state = {
            ...state,
            data: action.users
        };
    }

    if (action.type === 'REGISTER_USERS') {
        state = {
            ...state,
            users: action.users
        };
    }

    if (action.type === 'PILATES_USERS' || action.type === 'SIGNUP_FOR_CLASS') {
        state = {
            ...state,
            pilates_users: action.pilates_users
        }
    }

    if (action.type === 'REMOVE_USER') {
        state = {
            ...state,
            pilates_users: action.id
        }
    }

    if (action.type === 'YOGA_USERS') {
        state = {
            ...state,
            yoga_users: action.yoga_users
        }
    }

    if (action.type === 'REMOVEYOGA_USERS') {
        state = {
            ...state,
            data: action.id
        }
    }

    if (action.type === 'TODAYS_CLIENTS') { 
        state = {
            ...state, 
            client: action.client
        }
    }

    if (action.type === 'LASTMONTH_CLIENTS') { 
        state = {
            ...state, 
            prevClient: action.prevClient
        }
    }
    
    if (action.type === 'GET_NOTES_DATA') { 
        state = {
            ...state, 
            getNotes: action.allNotes
        }
    }

    if (action.type === 'ADD_NOTES_DATA') { 
        state = {
            ...state, 
            getNotes: [...state.getNotes, action.notes]
        }
    }

    if (action.type === 'DELETE_NOTES_DATA') { 
        state = {
            ...state, 
            getNotes: action.deleteNotes
        }
    }

    return state;
};