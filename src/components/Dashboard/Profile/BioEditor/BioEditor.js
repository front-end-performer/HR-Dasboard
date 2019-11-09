import React, { Component } from 'react';
import axios from '../../../../axios';
import { Animated } from "react-animated-css";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaValue: "",
            isVisiableTextArea: false
        };
    }

    handleChange(e) {
        this.setState({
            textAreaValue: e.target.value
        });
    }

    toggleTextArea() {
        let { isVisiableTextArea } = this.state;
        this.setState({
            isVisiableTextArea: !isVisiableTextArea
        });
    }

    handleBio() {
        let { textAreaValue } = this.state;
        let bio = {
            textAreaValue: textAreaValue
        };
        axios.post('/bio', bio).then(({ data }) => {
            console.log("handleBio result", data);
            this.props.setBio(textAreaValue);
            this.setState({
                isVisiableTextArea: false
            });
        }).catch((error) => {
            console.log("handlBio error", error);
        });
    }

    render() {
        let { isVisiableTextArea, textAreaValue } = this.state;
        let { bio } = this.props;
        return (
            <React.Fragment>
                {bio ? <p className="bio__content">{bio}: <a id="edit" onClick={() => this.toggleTextArea()} href="#">edit</a></p> : <p className="bio__content">add your bio now: <a id="add" onClick={() => this.toggleTextArea()} href="#">add</a></p>}
                {
                    isVisiableTextArea &&
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <div>
                            <textarea id="textarea" name="textarea" value={textAreaValue} onChange={(e) => this.handleChange(e)} cols={40} rows={10} />
                            <button id="save_btn" onClick={() => this.handleBio()}>save</button>
                        </div>
                    </Animated>
                }
            </React.Fragment>
        );
    }
}

export default BioEditor;