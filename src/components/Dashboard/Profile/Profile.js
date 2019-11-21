import React, { useState } from 'react';
import Chat from '../Chat/Chat';
import { Card, CardBody, Col } from 'reactstrap';
import { Animated } from "react-animated-css";

const Profile = ({ firstName, lastName, profilePic, click, friendButton, phone, email, address }) => {
    const [isVisiable, setVisiable] = useState(false);

    const handleClick = () => {
        setVisiable(!isVisiable);
    };

    return (
        <section className="profile__container">
            <div className="profile__container-content">
                <div className="new1">
                    <div className="lg_img">
                        {profilePic}
                    </div>
                    {friendButton}
                </div>
                <div className="new2">
                    <div className="new2__box">
                        <h1>{firstName} {lastName}!</h1>
                        <Col md={12} xl={12} lg={12} xs={12}>
                            <Card>
                                <CardBody className="dashboard__card-widget">
                                    <div className="card__title">
                                        <h5 className="bold-text">Client details</h5>
                                        <ul>
                                            <li>Email: {email}</li>
                                            <li>Phone: {phone ? phone : `...`}</li>
                                            <li>Address: {address && <span>...</span>}</li>
                                            <li>Contracts due date: ...</li>
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </div>
                <Animated className="animation-zIndex" animationIn="flash" animationInDelay={3000} animationOut="fadeOut" isVisible={true}>
                    <img className="coriander_chat-icon" src="../assets/msgIcon.png" onClick={handleClick} alt="coriander_chat-icon" />
                </Animated>
                {isVisiable && <Chat />}
            </div>
            <div className="mobile__footer">
                <a onClick={click} href="/logout">logout</a>
            </div>
        </section>
    );
};

export default Profile;

