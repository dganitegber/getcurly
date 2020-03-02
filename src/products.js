import React from "react";
import axios from "./axios";

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.handleChangeButtons = this.handleChangeButtons.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleChangeButtons(e) {
        this.setState({ fitsSystem: e.target.value });
    }
    submit() {
        axios
            .post("/addproduct", {
                productName: this.state.productName,
                brandname: this.state.brandname,
                producttype: this.state.producttype,
                fitsSystem: this.state.fitsSystem
            })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        thanks: true,
                        brandname: "",
                        producttype: "",
                        productName: ""
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div className="registrationfields">
                {this.state.error && (
                    <div className="error">
                        something went wrong, please try again.
                    </div>
                )}
                <input
                    className="registerfield productName"
                    name="productName"
                    placeholder="Product name"
                    value={this.state.productName}
                    onChange={e => this.handleChange(e)}
                />
                {this.state.productName === undefined && this.state.error && (
                    <div className="error">Please fill in product's name!</div>
                )}
                <input
                    className="BrandName registerfield"
                    name="brandname"
                    placeholder="Brand name"
                    value={this.state.brandname}
                    onChange={e => this.handleChange(e)}
                />
                {this.state.brandname === undefined && this.state.error && (
                    <div className="error">Please fill in your last name!</div>
                )}
                <input
                    className="productType registerfield"
                    name="producttype"
                    placeholder="Product Type"
                    value={this.state.producttype}
                    onChange={e => this.handleChange(e)}
                />
                {this.state.productType === undefined && this.state.error && (
                    <div className="error">Please fill your Email adress!</div>
                )}

                <div className="radioMatch">
                    <p>Does this product fits the CG system?</p>
                    <input
                        id="radiotrue"
                        type="radio"
                        name="gender"
                        value={true}
                        onChange={this.handleChangeButtons}
                    ></input>
                    <label htmlFor="true">Yes</label>
                    <input
                        id="radiofalse"
                        type="radio"
                        name="gender"
                        value={false}
                        onChange={this.handleChangeButtons}
                    ></input>
                    <label htmlFor="false">No</label>
                </div>

                <button
                    className="submit-btn-register"
                    onClick={e => this.submit(e)}
                >
                    Submit now! <i className="fas fa-users"></i>
                </button>
                {this.state.thanks && (
                    <p>
                        {" "}
                        Thank you! This product has been logged in our database
                    </p>
                )}
            </div>
        );
    }
}
