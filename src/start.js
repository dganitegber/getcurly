import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import Profile from "./profile";

//redux Boiler Plate
import { composeWithDevTools } from "redux-devtools-extension"; //allows to use redux devtools
import { createStore, applyMiddleware } from "redux"; //store IS redux. an object that containt the redux state as well as methods we can use to interact with state.
import reduxPromise from "redux-promise"; //our action creator can return promises thanks to this line.
import { Provider } from "react-redux";
// import * as io from "socket.io-client";
import reducer from "./reducers";

// import { init } from "./sockets";
const store = createStore(
    //creates the store, passing it reducer and then everything else.
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

// io.connect();

// socket.on('hello'. msg=>{
//     console.log('hello');
// })

console.log("hi!");

let elem;
// if (location.pathname == "/results") {
//     elem = <Results />;
if (location.pathname == "/") {
    elem = <App />;
} else {
    // init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(elem, document.querySelector("main"));
