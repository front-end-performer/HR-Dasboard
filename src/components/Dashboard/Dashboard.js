import React, { Component } from 'react';
import axios from '../../axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Manager from './Manager';
import Profile from './Profile/Profile';
import ProfileImg from './Profile/ProfileImg/ProfileImg';
import Uploader from './Uploader/Uploader';
import Header from '../Dashboard/Header/Header';
import OtherProfile from './OtherProfile/OtherProfile';
import PilatesProfile from './PilatesProfile/PilatesProfile';
import FindPeople from '../Dashboard/FindPeople/FindPeople';
import ChatRoom from './Chat/ChatRoom/ChatRoom';
import YogaProfile from './YogaProfile/YogaProfile';


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: "",
            bio: "",
            userId: '',
            uploaderIsVisiable: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get('/user');
        this.setState({
            firstName: data.first,
            lastName: data.last,
            profilePic: data.imgurl,
            bio: data.bio,
            userId: data.id 
        });
    }

    showUploader() {
        let { uploaderIsVisiable } = this.state;
        this.setState({
            uploaderIsVisiable: !uploaderIsVisiable
        });
    }

    updateImg(img) {
        this.setState({
            profilePic: img,
            uploaderIsVisiable: false
        });
    }

    setBio(info) {
        this.setState({
            bio: info
        });
    }

    logOutHandler() {
        axios.get('/logout').then((result) => {
            console.log(result);
        });
    }

    render() {
        if (!this.state.userId) {
            return (
                <div className="loader">
                    <h1 className="logo__title">welcome</h1>
                </div>
            );
        }

        let { firstName, lastName, profilePic, uploaderIsVisiable, bio, userId } = this.state;

        if (!userId) {
            return null;
        }

        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header
                            id={this.state.userId}
                            profilePic={profilePic}
                            firstName={firstName}
                            lastName={lastName}
                            click={this.logOutHandler}
                            clickUploader={() => this.showUploader()}
                        />

                        <Route exact path="/" component={Manager}
                        />

                        <Route path="/profile" render={
                            () =>
                                <Profile
                                    id={this.state.id}
                                    firstName={firstName}
                                    lastName={lastName}
                                    bio={bio}
                                    click={this.logOutHandler}
                                    profilePic={
                                        <ProfileImg
                                            imgUrl={profilePic}
                                            firstName={firstName}
                                            lastName={lastName}
                                            click={() => this.showUploader()}
                                        />
                                    }
                                />
                        } />

                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    userId={userId}
                                />
                            )}
                        />

                        <Route
                            path="/pilates_user/:id"
                            render={props => (
                                <PilatesProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    userId={userId}
                                    bio={bio}
                                />
                            )}
                        />

                        <Route
                            path="/yoga_user/:id"
                            render={props => (
                                <YogaProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    userId={userId}
                                />
                            )}
                        />

                        <Route
                            path="/find_people"
                            render={props => (
                                <FindPeople
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    userId={userId}
                                />
                            )}
                        />
                        <Route
                            path="/chat"
                            render={props => (
                                <ChatRoom
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {uploaderIsVisiable && <Uploader bgClick={() => this.showUploader()} updateImg={(e) => this.updateImg(e)} />}
            </div>
        );
    }
}

export default Dashboard;