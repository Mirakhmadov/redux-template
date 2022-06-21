import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./Menu.scss";
import {makeFirstCapital} from "../../../utils/SecondaryFuncs/StringFuncs";

export class Menu extends Component {
    render() {
        const {icon, name, page, link, role} = this.props

        return (
            link ?
                <Link to={`/${role}/${link}`} className={"menu" + (page === link ? " active-menu" : "")}>
                    {icon}
                    <span className={"mb-0"}>{makeFirstCapital(name)}</span>
                </Link>
                : ""
        );
    }

}