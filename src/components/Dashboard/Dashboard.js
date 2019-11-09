import React, { Component } from 'react';
import axios from '../../axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './Profile/Profile';
import ProfileImg from './Profile/ProfileImg/ProfileImg';
import BioEditor from './Profile/BioEditor/BioEditor';
import Uploader from './Uploader/Uploader';
import Header from '../Dashboard/Header/Header';
import OtherProfile from './OtherProfile/OtherProfile';
import FindPeople from '../Dashboard/FindPeople/FindPeople';
import Friends from './Friends/Friends';
import ChatRoom from './Chat/ChatRoom/ChatRoom';

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
            userId: data.id // logedin user id
        });
    }

    showUploader() {
        // console.log("toggled uploader");
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

                        <Route exact path="/" render={
                            () =>
                                <Profile
                                    id={this.state.id}
                                    firstName={firstName}
                                    lastName={lastName}
                                    click={this.logOutHandler}
                                    profilePic={
                                        <ProfileImg
                                            imgUrl={profilePic}
                                            firstName={firstName}
                                            lastName={lastName}
                                            click={() => this.showUploader()}
                                        />
                                    }
                                    bioEditor={
                                        <BioEditor
                                            bio={bio}
                                            setBio={(e) => this.setBio(e)}
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
                            path="/friends"
                            render={props => (
                                <Friends
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    userId={userId}
                                />
                            )}
                        />
                        {/* <Route path="/chat" component={Chat}/> */}
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