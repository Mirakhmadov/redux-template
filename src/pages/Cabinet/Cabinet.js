import React, {Component} from 'react';
import './Cabinet.scss';
import Content from "../Content";
import {connect} from "react-redux";
import {getListAction} from "../../redux/actionFuncs/mainActions";
import CustomNavbar from "../../component/MainComponents/CustomNavbar/CustomNavbar";
import {makeLowerCase} from "../../utils/SecondaryFuncs/StringFuncs";
import {ROLE} from "../../utils/constants";
import SidebarButton from "../../component/MainComponents/SidebarButton/SidebarButton";
import Sidebar from "../../component/MainComponents/Sidebar/Sidebar";
import {FaHome, FaUsers,FaBook, FaUserAstronaut} from "react-icons/fa"


class Cabinet extends Component {
    componentDidMount() {
    }


    state = {
        active: false,
        sidebar: true,
        menus: [
            {icon: <FaHome/>, name: "bosh sahifa", link: "home"},
            {icon: <FaUsers/>, name: "guruhlar", link: "group"},
            {icon: <FaBook/>, name: "Kurslar", link: "course"},
            {icon: <FaUserAstronaut/>, name: "O'qituvchilar", link: "teacher"},
        ],
        roles: [
            "all"
        ]
    }


    render() {

        const {page, subpage, identity} = this.props.match.params;
        const {menus, sidebar, roles} = this.state

        return (
            <div className={"container-table"}>
                <CustomNavbar role={makeLowerCase(localStorage.getItem(ROLE))}/>
                <SidebarButton sidebar={sidebar} func={() => this.setState({sidebar: !sidebar})}/>

                <div className={"main-content"}>
                    <Sidebar sidebar={sidebar} menus={menus} page={page}/>
                    <Content page={page} subpage={subpage} identity={identity} sidebar={sidebar} roles={roles}/>
                </div>
            </div>
        );
    }
}

Cabinet.propTypes = {};

export default connect(
    ({
         app: {loading, attachmentUrl},
         auth: {currentUser}
     }) => ({
        loading, currentUser, attachmentUrl
    })
)(Cabinet);