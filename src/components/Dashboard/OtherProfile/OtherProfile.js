import React, { Component } from 'react';
import axios from 'axios';
import Profile from '../Profile/Profile';
import ProfileImg from '../Profile/ProfileImg/ProfileImg';
import FriendButton from '../FriendButton/FriendButton';

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: "",
            bio: "",
            userId: "",
            userParamsId: ""
        };
    }

    async componentDidMount() {
        // let { userId } = this.props;
        // if there is no user with that id... reddirect them back to /
        // and the user is trying to visit their own page reddirect them back to it..

        try {
            const { data } = await axios.get(`/api/user/${this.props.match.params.id}`);
            this.setState({
                firstName: data.first,
                lastName: data.last,
                profilePic: data.imgurl,
                bio: data.bio,
                userId: data.id,
                userParamsId: this.props.match.params.id
            });
        } catch (error) {
            console.log(error.message);
            this.props.history.push('/');
        }
    }


    render() {
        let { firstName, lastName, profilePic, bio, userParamsId } = this.state;
        return (
            <React.Fragment>
                <Profile
                    firstName={firstName}
                    lastName={lastName}
                    click={this.logOutHandler}
                    profilePic={
                        <ProfileImg
                            imgUrl={profilePic}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    }
                    friendButton={
                        <FriendButton
                            userParamsId={userParamsId}
                        />
                    }
                    bio={bio}
                />
            </React.Fragment>
        );
    }
}

export default OtherProfile;