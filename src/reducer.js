export const reducer = (state = {}, action) => {  // if there is global state, then it will be passed to the state={}, or will stay just empty object

    // here alwasy reducer makes copie of the object state 
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
        console.log("action.type ==>", action.msg);
        state = {
            ...state,
            msgs: state.msgs.concat(action.msg)
        };
    }

    if (action.type == 'MESSAGE_NOTIFICATION') {
        console.log("action.type ==>", action.msgNot);
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

    if (action.type === 'PILATES_USERS') { 
        state = {
            ...state,
            pilates_users: action.data
        }
    }

      if (action.type === 'REMOVE_USER') { 
        state = {
            ...state,
            data: action.id
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

    // if (action.type === 'SIGNUP_FOR_CLASS') { 
    //     console.log("action", action.type);
    //     state = {
    //         ...state,
    //         sign: action.data
    //     }
    // }

    return state;
};


// ... - spread operator is good for making copies of arrays and objects
// state = {
//     ...state.
// }

// let arr = [1, 2, 3];
// let newArr = [0, ...arr]; // add item to the begining of the copy array 
// let newArr = [...arr, 4];// add item to the end of the copy array 

// map - array method, its a loop on each item and return brand new array for us and lets modified immutabaly. 
// filter - array method, also loop. good for removing one item or multiply items in array. rteyrun brand new array that doesnt include the items we filtered out

