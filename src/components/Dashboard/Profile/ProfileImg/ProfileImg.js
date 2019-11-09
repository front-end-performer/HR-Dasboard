import React from 'react';

const ProfileImg = ({ firstName, lastName, imgUrl, click }) => {
    imgUrl = imgUrl || './assets/generic-user.png'; // setting pic by default, best to put null

    function handleErrorImg (e) {
        e.target.setAttribute('src', '../assets/generic-user.png');
    }

    return (
        <div className="user__image">
            <img
                onError={(e) => handleErrorImg(e)}
                onClick={click}
                src={imgUrl}
                alt={`${firstName} ${lastName}`} />
        </div>
    );
};

export default ProfileImg;