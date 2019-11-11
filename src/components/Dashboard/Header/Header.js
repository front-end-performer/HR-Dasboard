import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBell, FaHome } from "react-icons/fa";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes } from '../../../actions';
import ProfileImg from '../Profile/ProfileImg/ProfileImg';


const Header = ({ profilePic, click, clickUploader, firstName, lastName, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();
    const friends = useSelector(
        state => state.users && state.users.filter(accept => accept.accepted == true)
    );

    const chatMessageNotitification = useSelector(
        state => state && state.msgNot && state.msgNot[0].sender_id !== id
    );

    chatMessageNotitification && console.log("chatMessageNot", chatMessageNotitification);

    useEffect(
        () => {
            dispatch(
                receiveFriendsWannabes()
            );
        }, []);

    if (!friends) {
        return null;
    }

    return (
        <Container>
            <Navbar light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{alignItems: 'center'}}>
                        <NavItem className="navigation__item">
                            <NavLink href="/">
                                <FaHome />
                            </NavLink>
                        </NavItem>
                        <NavItem className="navigation__item">
                            <NavLink href="#">
                                <FaEnvelope />{chatMessageNotitification && <span className="notification__count"></span>}
                            </NavLink>
                        </NavItem>
                        <NavItem className="navigation__item">
                            <NavLink href="#">
                                <FaBell />
                            </NavLink>
                        </NavItem>
                        <NavItem className="navigation__item">
                            <NavLink onClick={click} href="/logout">logout</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">{firstName} {lastName}</NavLink>
                        </NavItem>
                        <div onClick={clickUploader} href="/" style={{ width: 40, objectFit: 'contain' }}>
                            <ProfileImg
                                imgUrl={profilePic}
                            />
                        </div>
                    </Nav>
                </Collapse>
            </Navbar>
        </Container>
    );
    // <section className="header">
    //     {/* <div className="logo__container">
    //         <Link to="/"><h1 className="dashboard__title color-white">Social network</h1></Link>
    //     </div> */}
    //     <ul className="navigation__container">
    //         <li className="navigation__item">
    //             <Link to="/">home</Link>
    //         </li>
    //         <li className="navigation__item">
    //             <Link to="/chat">chat {chatMessageNotitification && <span className="notification__count">new</span>}</Link>
    //         </li>
    //         <li className="navigation__item">
    //             <Link to="/find_people">find people</Link>
    //         </li>
    //         <li className="navigation__item">
    //             <Link to="/friends">friends
    //                 <Animated className="animated__findFriends-style" animationIn="flash" animationOut="fadeOut" isVisible={true}><span className="notification__count">{friends.length}</span>
    //                 </Animated>
    //             </Link>
    //         </li>
    //         <li className="navigation__item bg_dark">
    //             <Animated animationIn="shake" isVisible={true}>
    //                 <a onClick={click} href="/logout">logout</a>
    //             </Animated>
    //         </li>
    //         <li className="navigation__item">
    //             <p>{firstName} {lastName}</p>
    //         </li>
    //         <li onClick={clickUploader} className="navigation__item profile_img">
    //             <ProfileImg
    //                 imgUrl={profilePic}
    //             />
    //         </li>
    //     </ul>
    // </section>
    // );
};

export default Header;