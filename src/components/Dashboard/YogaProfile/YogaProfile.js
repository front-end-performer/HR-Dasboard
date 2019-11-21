import React, { Component } from 'react';
import axios from 'axios';
import Profile from '../Profile/Profile';
import ProfileImg from '../Profile/ProfileImg/ProfileImg';

class YogaProfile extends Component {
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
        try {
            const { data } = await axios.get(`/yogaUser/${this.props.match.params.id}`);
            console.log("data YogaProfile ==> ", data);
            
            this.setState({
                firstName: data.first,
                lastName: data.last,
                profilePic: data.imgurl,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
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
        let { firstName, lastName, profilePic, bio, phone, email, gender } = this.state;
        return (
            <React.Fragment>
                <Profile
                    firstName={firstName}
                    lastName={lastName}
                    phone={phone}
                    email={email}
                    gender={gender}
                    click={this.logOutHandler}
                    profilePic={
                        <ProfileImg
                            imgUrl={profilePic}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    }
                    bio={bio}
                />
            </React.Fragment>
        );
    }
}

export default YogaProfile;