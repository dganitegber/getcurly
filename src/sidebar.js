import React from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeSidebar = this.closeSidebar.bind(this);
    }

    refresh() {
        this.props.clearResults();
        this.props.hideSidebar();
    }

    closeSidebar() {
        console.log("I clisked the X");
        this.props.hideSidebar();
        console.log("props after hideSidebar", this.props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className={`sidebarContainer ${this.props.classToAdd}`}>
                    <div
                        className="closeSidebar"
                        onClick={e => this.closeSidebar(e)}
                    >
                        x
                    </div>
                    <div
                        onClick={e => this.closeSidebar(e)}
                        className="sidebarLinks"
                    >
                        <Link to="/">
                            <div
                                onClick={e => this.refresh(e)}
                                className="barLink toUploder"
                            >
                                Upload an Image
                            </div>
                        </Link>
                        <Link to="/profile">
                            <div
                                onClick={e => this.closeSidebar(e)}
                                className="barLink profileLink"
                                clickHandler={() => history.push("/")}
                            >
                                Profile
                            </div>
                        </Link>
                        <Link to="/products">
                            <div
                                onClick={e => this.closeSidebar(e)}
                                className="barLink products"
                            >
                                Products
                            </div>
                        </Link>
                        <Link to="/search">
                            <div
                                onClick={e => this.closeSidebar(e)}
                                className="barLink products"
                            >
                                Search Products
                            </div>
                        </Link>

                        <Link to="/useful">
                            <div
                                onClick={e => this.closeSidebar(e)}
                                className="barLink useful"
                            >
                                Useful Information
                            </div>
                        </Link>
                        <Link to="/aboutme">
                            <div
                                onClick={e => this.closeSidebar(e)}
                                className="barLink about-Me"
                            >
                                {" "}
                                Who am I
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
