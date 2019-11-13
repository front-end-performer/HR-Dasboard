import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";
import ProfileImg from '../Profile/ProfileImg/ProfileImg';

const FindPeople = () => {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        if (userInput == '') {
            (async () => {
                const { data } = await axios.get(`/find_recent`);
                setUsers(data);
            })();
        } else {
            let isIgnore = false;
            (async () => {
                const { data } = await axios.get(`/find/?val=${userInput}`);
                if (!isIgnore) {
                    setUsers(data);
                }

                return () => {
                    console.log('cleaning up!', userInput);
                    isIgnore = true;
                };
            })();
        }

    }, [userInput]);

    return (
        <section className="profile__container">
            <h1 className="findPeople__title"><span style={{backgroundColor: 'rgba(255,255,255, 0.7)'}} className="color_dark">Members</span></h1>
            <div className="user__result-container">
                <input className="find_people-input" name="search" type='text' onChange={e => setUserInput(e.target.value)} />
                <div className="user__result-box">
                    {users.map(user => {
                        return (
                            <Animated key={user.id} className="animated__findFriends-style" animationIn="swing" animationOut="fadeOut" isVisible={true}>
                                <div key={user.id} className="user__content">
                                    <Link to={`/user/${user.id}`}>
                                        <ProfileImg
                                            imgUrl={user.imgurl}
                                            firstName={user.first}
                                            lastName={user.last}
                                        />
                                        <h3 className="user__title">{`${user.first} ${user.last}`}</h3>
                                    </Link>
                                </div>
                            </Animated>
                        );
                    })}
                </div>
            </div>
        </section >
    );
};

export default FindPeople;