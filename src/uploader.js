import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: true,
            first: false,
            second: false,
            third: false,
            fourth: false,
            myResultsEmpy: false,
            oops: false
        };
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.accordionClick = this.accordionClick.bind(this);

        console.log("props from uploader", props);
    }
    componentDidMount() {
        console.log("mounted");
        this.setState({
            showUploader: true,
            first: false,
            second: false,
            third: false,
            fourth: false,
            myResultsEmpy: false,
            oops: false
        });
    }

    fileSelectedHandler(e) {
        console.log("I changed", this.state);
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    uploadImage() {
        // console.log("this state", this.state);
        this.setState({ waiting: true });
        var formData = new FormData();
        formData.append("file", this.state.file);
        // console.log("formData: ", formData);

        // this.props.showUploader();
        axios
            .post("/upload", formData)
            .then(data => {
                console.log(data);
                var goodRes = data.data.data[0];
                console.log("data.data.data[0]", data.data.success);
                var goodResArray = Array.from(goodRes);
                console.log("goodResArray", goodResArray);
                // var goodResArray2 = [
                //     ...new Set(goodResArray.map(JSON.stringify))
                // ];
                if (data.data.success == false) {
                    this.setState({
                        showUploader: false,
                        noConnectioError: true,
                        waiting: false
                    });
                    console.log("this.state from false", this.state);
                } else if (goodResArray.length != 0) {
                    var sulfates = [];
                    var silicones = [];
                    var alcohols = [];
                    var otherDrying = [];
                    for (var i = 0; i < goodResArray.length; i++) {
                        if (goodResArray[i].type == "sulfates") {
                            sulfates.push(goodResArray[i]);
                        }
                        if (goodResArray[i].type == "silicones") {
                            silicones.push(goodResArray[i]);
                        }
                        if (goodResArray[i].type == "alcohols") {
                            alcohols.push(goodResArray[i]);
                        }
                        if (goodResArray[i].type == "other drying agents") {
                            otherDrying.push(goodResArray[i]);
                        }
                    }

                    var newSulfates = Array.from(
                        new Set(sulfates.map(JSON.stringify))
                    ).map(JSON.parse);

                    // console.log("newSulfates", newSulfates);

                    var newSilicones = Array.from(
                        new Set(silicones.map(JSON.stringify))
                    ).map(JSON.parse);
                    var newOtherDrying = Array.from(
                        new Set(otherDrying.map(JSON.stringify))
                    ).map(JSON.parse);
                    // console.log("newSilicones", newSilicones);

                    var newAlcohols = Array.from(
                        new Set(alcohols.map(JSON.stringify))
                    ).map(JSON.parse);
                    this.setState({
                        myResults: [
                            newSulfates,
                            newSilicones,
                            newAlcohols,
                            newOtherDrying
                        ],
                        waiting: false,
                        showUploader: false
                    });
                    console.log(
                        "this.state.myResults.length",
                        this.state.myResults.length
                    );
                } else {
                    this.setState({
                        myResultsEmpy: true,
                        waiting: false,
                        showUploader: false
                    });
                    console.log(this.state);
                }
            })

            .catch(err => {
                console.log("this.state.myResults", this.state.myResults);
                console.log("error in upload: ", err);
            });
    }
    accordionClick() {
        console.log("I clisked the accordion");
        this.props.openAccordion();
        console.log("props after hideSidebar", this.props);
    }
    render() {
        return (
            <div className="main">
                <div className="modalUploader">
                    {this.state.showUploader && (
                        <div className="modalUploaderMain">
                            <p className="intro">
                                Hi. This website is designed to make your life
                                easier. It's simple: click the frame, snap an
                                image of a product's lable, and hit the "Get
                                Results" button. In a few seconds you will know
                                if this product is compatible with CG or not.
                            </p>
                            <label htmlFor="uploader" className="uploaderLable">
                                Enter your files
                                <input
                                    id="uploader"
                                    type="file"
                                    onChange={e => this.fileSelectedHandler(e)}
                                    accept="image/*"
                                    name="file"
                                    img="imagePreviewUrl"
                                />
                                <img
                                    className="preview"
                                    src={this.state.imagePreviewUrl}
                                ></img>
                                <button
                                    className="uploadButton"
                                    onClick={e => this.uploadImage(e)}
                                >
                                    {" "}
                                    Get results{" "}
                                </button>
                            </label>
                        </div>
                    )}

                    {this.state.myResults && (
                        <div className="resultTitleTop">
                            <div className="resultTitle">
                                <img src="stop.png"></img>
                                <p>
                                    {" "}
                                    STOP! This product isnt compatible with the
                                    CG method.
                                </p>
                            </div>
                            <div className="accordionBars">
                                {this.state.myResults[0][0] && (
                                    <button
                                        className="accordion"
                                        onClick={() =>
                                            this.setState({
                                                first: !this.state.first
                                            })
                                        }
                                    >
                                        {this.state.myResults[0][0].type}{" "}
                                    </button>
                                )}
                                {this.state.first && (
                                    <div className="panel">
                                        {this.state.myResults[0].map(
                                            (result, item) => (
                                                <p
                                                    className="chemGroup"
                                                    key={item}
                                                >
                                                    {result.name}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                                {this.state.myResults[1][0] && (
                                    <button
                                        className="accordion"
                                        onClick={() =>
                                            this.setState({
                                                second: !this.state.second
                                            })
                                        }
                                    >
                                        {this.state.myResults[1][0].type}{" "}
                                    </button>
                                )}
                                {this.state.second && (
                                    <div className="panel">
                                        {this.state.myResults[1].map(
                                            (result, item) => (
                                                <p
                                                    className="chemGroup"
                                                    key={item}
                                                >
                                                    {result.name}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                                {this.state.myResults[2][0] && (
                                    <button
                                        className="accordion"
                                        onClick={() =>
                                            this.setState({
                                                third: !this.state.third
                                            })
                                        }
                                    >
                                        {this.state.myResults[2][0].type}{" "}
                                    </button>
                                )}
                                {this.state.third && (
                                    <div className="panel">
                                        {this.state.myResults[2].map(
                                            (result, item) => (
                                                <p
                                                    className="chemGroup"
                                                    key={item}
                                                >
                                                    {result.name}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                                {this.state.myResults[3][0] && (
                                    <button
                                        className="accordion"
                                        onClick={() =>
                                            this.setState({
                                                fourth: !this.state.fourth
                                            })
                                        }
                                    >
                                        {this.state.myResults[3][0].type}{" "}
                                    </button>
                                )}
                                {this.state.fourth && (
                                    <div className="panel">
                                        {this.state.myResults[3].map(
                                            (result, item) => (
                                                <p
                                                    className="chemGroup"
                                                    key={item}
                                                >
                                                    {result.name}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="grow">
                                {" "}
                                help us grow! Add this produt to our{" "}
                                <Link to="/products"> Database </Link>
                            </p>
                        </div>
                    )}
                    {this.state.myResultsEmpy == true && (
                        <div className="resultTitleTop">
                            <div className="resultTitle">
                                <img src="go.png"></img>
                                <p> COOL! This product Is cool for curlies.</p>
                            </div>
                            <div>
                                <p className="grow">
                                    {" "}
                                    help us grow! Add this produt to our{" "}
                                    <Link to="/products"> Database </Link>
                                </p>
                            </div>
                        </div>
                    )}
                    {this.state.waiting && (
                        <img
                            className="waits"
                            src="minifindstore_spin.gif"
                        ></img>
                    )}
                    {this.state.noConnectioError && (
                        <div className="oopsDiv">
                            <img
                                className="oopserrorimg"
                                src="/1_NWsriD1xdDlAlbm4tmjz4g.jpeg"
                            ></img>
                            <p className="oopsError">
                                On no! Something went wrong :( We're not exactly
                                sury why, but please try again! Make sure you
                                are loading an image with text on it.{" "}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
