import React from "react";
// import Colors from "Colors";
// import axios from "./axios";
// import ProfilePic from "./profilepic";
// import BioEditor from "./BioEditor";

export default function Aboutme() {
    return (
        <div className="aboutMe">
            <p className="aboutmeTitle">About Me</p>
            <div className="meContainer">
                <img className="mememe" src="mememe.jpg"></img>
                <p className="meText">
                    Hi there! My name is Dganit, an Israeli who lives in Berlin,
                    Germany, for the past decade. I have curly hair, which I
                    have been strugling with for years. <br></br>
                    When I discovered "Curly Girl", this finally changed and I
                    could finally enjoy my hair and not battle with it. However,
                    I was still struggling with reading labels and understanding
                    the ingredients list.<br></br>I was praying someone would
                    just create a magic trick which will make things easier for
                    me. When I started learning Web Development, It was obvious
                    to me that now, when I have the tools and knowledge, I am
                    the person who will build this tool. As my graduation
                    project from{" "}
                    <a href="https://www.spiced-academy.com/">
                        "Spiced Academy"{" "}
                    </a>
                    during February of 2020, I built this website, in hope that
                    it would beome a useful tool for me and other curlies.
                </p>
            </div>
        </div>
    );
}
