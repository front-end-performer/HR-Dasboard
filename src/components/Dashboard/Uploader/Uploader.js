import React, { Component } from 'react';
import axios from '../../../axios';
import { Animated } from "react-animated-css";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            fileErrorSize: false
        };
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props", this.props);
    }

    onChangeHandler(event) {
        console.log(event.target.files[0].size);

        if (event.target.files[0].size > 2097152) {
            this.setState({
                selectedFile: null,
                fileErrorSize: false
            });
        } else {
            this.setState({
                selectedFile: event.target.files[0],
                fileErrorSize: true
            });
        }

    }

    upload() {
        let { selectedFile } = this.state;
        let fd = new FormData;
        fd.append('image', selectedFile);

        // console.log("this.state.selectedFile", selectedFile);

        axios.post('/upload', fd).then(({ data }) => {
            // console.log("upload result", result.data);
            //unshift the new img into the array
            console.log("upload", data);

            // this.imagesArr.unshift(result.data);
            this.props.updateImg(data.url);
        }).catch(error => {
            console.log(error.message);
            this.error = true;
        });
    }

    render() {
        let { bgClick } = this.props;
        let { fileErrorSize } = this.state;
        return (
            <React.Fragment>
                <Animated className="animation-style" animationIn="rubberBand" isVisible={true}>
                    <div className="uploader_modal">
                        <h3>Upload your avatar!</h3>
                        <input className="file-input" type="file" name="file" onChange={(event) => this.onChangeHandler(event)} />
                        <button
                            onClick={() => this.upload()}
                            className={!fileErrorSize ? 'opacity' : ''}
                            disabled={!fileErrorSize}
                        >upload</button>
                    </div>
                    <div onClick={bgClick} className="uploader_bg"></div>
                </Animated>
            </React.Fragment>
        );
    }
}

export default Uploader;