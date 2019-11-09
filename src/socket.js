import * as io from 'socket.io-client';
import { chatMessages, chatMessage, chatMessageNotitification, onlineUsers } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on(
            'chatMessages',
            msgs => store.dispatch(
                chatMessages(msgs)
            )
        );

        socket.on(
            'chatMessage',
            msg => store.dispatch(
                chatMessage(msg)
            )
        );

        socket.on(
            'chatMessageNotitification',
            msgNot => store.dispatch(
                chatMessageNotitification(msgNot)
            )
        );

        socket.on(
            'onlineUsers',
            onlnUsr => {
                return store.dispatch(
                    onlineUsers(onlnUsr)
                );
            }
        );
    }
};