import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, endFriendShip } from '../../../actions';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";
import FriendsList from './FriendsList/FriendList';
import ProfileImg from '../Profile/ProfileImg/ProfileImg';

const Friends = () => {
    const dispatch = useDispatch();
    const wannabs = useSelector(
        state => state.users && state.users.filter(accept => accept.accepted == false)
    );

    const friends = useSelector(
        state => state.users && state.users.filter(accept => accept.accepted == true)
    );


    useEffect(
        () => {
            dispatch(
                receiveFriendsWannabes()
            );
        }, []);

    if (!wannabs) {
        return null;
    }

    return (
        <section className="friends__container">
            <div className="friends__container-content">
                <div className="friends__content">
                    <h3 className="bg_white-opacity">want to be your friends</h3>
                    {wannabs.length == 0 && <p className="friendsList__container-paragraph">no pending friends</p>}
                    <div className="friends__content-box">
                        {wannabs.map(wanna => {
                            return (
                                <div className="friends__content-item" key={wanna.id}>
                                    <Link key={wanna.id} to={`/user/${wanna.id}`}>
                                        <FriendsList
                                            key={wanna.id}
                                            firstName={wanna.first}
                                            lastName={wanna.last}
                                            userId={wanna.userId}
                                            friendsImg={
                                                <ProfileImg
                                                    imgUrl={wanna.imgurl}
                                                />
                                            }
                                        />
                                    </Link>
                                    <div className="wanna_btn-container">
                                        <button className="friends__btn width_40" onClick={() => dispatch(endFriendShip(wanna.id))}>no</button>
                                        <button className="friends__btn  width_40" onClick={() => dispatch(acceptFriendRequest(wanna.id))}>{wanna.id && "yes"}</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="friends__content">
                    <h3 className="bg_white-opacity">your current friends</h3>
                    {friends.length == 0 && <p className="friendsList__container-paragraph">no friends yet</p>}
                    <div className="friends__content-box">
                        {friends.map(friend => {
                            return (
                                <Animated key={friend.id} className="animated__findFriends-style" animationIn="swing" animationOut="fadeOut" isVisible={true}>
                                    <div key={friend.id}>
                                        <Link key={friend.id} to={`/user/${friend.id}`}>
                                            <FriendsList
                                                key={friend.id}
                                                firstName={friend.first}
                                                lastName={friend.last}
                                                userId={friend.userId}
                                                friendsImg={
                                                    <ProfileImg
                                                        imgUrl={friend.imgurl}
                                                    />
                                                }
                                            />
                                        </Link>
                                        <button className="friends__btn" onClick={() => dispatch(endFriendShip(friend.id))}>{friend.id && "cancel friendship"}</button>
                                    </div>
                                </Animated>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Friends;