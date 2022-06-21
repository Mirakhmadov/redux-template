import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import axios from "axios";

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Main Page</h2>

                <hr/>
                <Link to={"/login"}>
                    Login
                </Link>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;