import React from "react";
// import Uploader from "./uploader";
// import axios from "axios";

console.log("results");
export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props");
    }
    render() {
        console.log("this.props", this.props);
        console.log("this.state", this.state);
        return (
            <div>
                <p className="in my ressults"> {this.props.myResults}</p>
            </div>
        );
    }
}
