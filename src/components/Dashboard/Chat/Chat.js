import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../../socket';

const Chat = () => {
    const [name, setName] = useState('');
    const url = "../assets/insight.mp3";
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState();
    const chatMessages = useSelector(
        state => state && state.msgs
    );
    

    const toggle = () => setPlaying(!playing);

    const elemRef = useRef();
    useEffect(() => {
        playing ? audio.play() : audio.pause();
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages, playing]);

    const keyCheck = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('chatMessage', name);
            socket.emit('chatMessageNotitification', name);
            toggle();
            setName('');
        }
    };


    const keyCheckOut = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            toggle();
        }
    };

    const submitHandle = () => {
        socket.emit('chatMessage', name);
        socket.emit('chatMessageNotitification', name);
        setName('');
    };

    return (
        <div className="chat__container-content">
            <div className="chat__container-wall" ref={elemRef}>
                {chatMessages && chatMessages.map((chtmsg, index) => {
                    return (
                        <div className="chat__content" key={index}>
                            <div className="user_title">
                                <span>
                                    {chtmsg.first}
                                </span>
                                <img src={chtmsg.imgurl} style={{ width: "40px", height: "40px", objectFit: 'contain' }} alt={chtmsg.first} />
                            </div>
                            <span className="messages">
                                {chtmsg.message}
                            </span>
                        </div>
                    );
                })}
            </div>
            <textarea
                name="textarea"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyUp={keyCheckOut}
                onKeyDown={keyCheck}
                className="textarea inner-shadow"
                placeholder="type your message here"
                rows={10}
                cols={30}>
            </textarea>
            <button onClick={() => submitHandle()} className="chat_btn"><img className="chat_img" src="../assets/send_icon.png" /></button>
        </div>
    );
};

export default Chat;