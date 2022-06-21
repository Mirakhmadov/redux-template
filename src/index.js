import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss"

// if (process.env.NODE_ENV !== "development")
//     console.log = () => {};


const root = (
    <>
        <ToastContainer/>
        <BrowserRouter><App/></BrowserRouter>
    </>
);
ReactDOM.render(root, document.getElementById("root"));
