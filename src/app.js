import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./profile";
import Uploader from "./uploader";
import Sidebar from "./sidebar";
import Results from "./results";
import { Products } from "./products";
import Aboutme from "./aboutme";
import Useful from "./useful";
import Search from "./search";
// import { OtherProfile } from "./other-profile";
// import Search from "./search";
// import Friends from "./friends";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "   ",
            showUploader: true,
            openAccordion: false
        };
        this.showSidebar = this.showSidebar.bind(this);
        this.hideSidebar = this.hideSidebar.bind(this);
        this.myResults = this.myResults.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.clearResults = this.clearResults.bind(this);
        // this.openAccordion = this.openAccordion.bind(this);
    }

    // postBio(e) {
    //     e.preventDefault();
    //     axios
    //         .post("/bio", {
    //             bio: this.state.value
    //         })
    //         .then(data => {
    //             this.setState({ bio: data.data, bioEditorVisible: false });
    //         });
    // }

    // componentDidMount() {
    //     axios.get("/user").then(({ data }) => this.setState(data));
    // }
    myResults(data) {
        this.setState({ myResults: data });
        console.log(this.state.myResulst);
    }

    showSidebar() {
        console.log("I clicked the hamburger");
        this.setState({
            sidebarVisible: true,
            showUploader: true,
            sideBarClass: "sidebarContainerOpens",
            myResults: false,
            myResultsEmpy: false
        });
    }
    uploadImage(e) {
        console.log("this state", this.state);
        e.preventDefault();
        this.setState({ showUploader: false });
        var formData = new FormData();
        formData
            .append("file", this.state.file)
            // console.log("formData: ", formData);
            .then(
                axios.post("/upload", formData).then(data => {
                    console.log(data.data.data);
                    this.props
                        .myRes({ myResulst: data.data.data })
                        // this.setState({ resultsBack: true, myResulst: data.data.data });
                        .then(this.props.history.push("/results"));
                    // var remLines = data.data;
                    // console.log("remlines", remLines);
                    // var ingredients = remLines.split(",");
                    // for (var i = 0; i < ingredients.length; i++) {
                    //     ingredients[i].replace(/↵/g, "");
                    // }
                    // console.log("after loop", ingredients);
                })
            )
            .catch(err => {
                console.log("error in upload: ", err);
            });
    }
    clearResults() {
        console.log("im i clear results");
        this.setState({
            myResults: false,
            showUploader: true,
            myResultsEmpy: false
        });
        console.log("this.state from clear results", this.state);
    }

    hideSidebar() {
        console.log("i closed the sidebar");
        this.setState({
            sidebarVisible: false,
            sideBarClass: "sidebarContainerCloses"
        });
        console.log("state", this.state);
    }
    showUploader() {
        this.setState({
            showUploader: false
        });
        console.log("state", this.state);
    }

    // updateBio(bio) {
    //     this.setState({ bio: bio });
    // }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="topBar">
                        <img
                            className="hamburger"
                            src="hamburger.png"
                            onClick={e => this.showSidebar(e)}
                        />
                        <Sidebar
                            hideSidebar={this.hideSidebar}
                            classToAdd={this.state.sideBarClass}
                            clearResults={this.clearResults}
                        />
                        <h1 className="title"> Get Curly </h1>
                        <Link to="/">
                            <div className="hiddenLink"> ` `</div>
                        </Link>
                    </div>
                    <div className="frontpage">
                        {this.state.showUploader == true && (
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Uploader
                                        showUploader={this.showUploader}
                                        myResults={this.state.myResults}
                                        myResultsEmpy={this.state.myResultsEmpy}
                                        openAccordion={this.openAccordion}
                                    />
                                )}
                            />
                        )}

                        <Route
                            exact
                            path="/products"
                            render={() => <Products />}
                        />
                        <Route
                            exact
                            path="/aboutme"
                            render={() => <Aboutme />}
                        />
                        <Route exact path="/search" render={() => <Search />} />

                        <Route exact path="/useful" render={() => <Useful />} />
                        <Route
                            exact
                            path="/profile"
                            render={() => (
                                <Profile
                                    clickHandler={() =>
                                        this.setState({
                                            uploaderVisible: true
                                        })
                                    }
                                    clickHandler2={() =>
                                        this.setState({
                                            bioEditorVisible: true
                                        })
                                    }
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Route
                            exact
                            path="/results"
                            resultsBack={this.state.resultsBack}
                            myResults={this.state.myResults}
                            component={Results}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
