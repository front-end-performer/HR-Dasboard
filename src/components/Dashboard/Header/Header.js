import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { useSelector } from 'react-redux';
import ProfileImg from '../Profile/ProfileImg/ProfileImg';


const Header = ({ profilePic, click, clickUploader, firstName, lastName, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const chatMessageNotitification = useSelector(
        state => state && state.msgNot && state.msgNot[0].sender_id !== id
    );

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
                            <NavLink href="/find_people">
                                <FaUserFriends />
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
};

export default Header;