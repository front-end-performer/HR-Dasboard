import React from 'react';

const FriendsList = ({ firstName, lastName, friendsImg, frindsButton, btn }) => {

    return (
        <div className="friendsList__container">
            {friendsImg}
            <h3 className="user__title bg_white-opacity">{firstName} {lastName}</h3>
            {frindsButton}
            <img className="user__content-img" src="../assets/coriander_img.png" alt="coriander_img" />
            {btn}
        </div>
    );
};

export default FriendsList;