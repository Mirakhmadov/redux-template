import React, {Component} from 'react';
import "./Content.scss";
import NotFound from "./Public/NotFound";
import {connect} from "react-redux";
import Dashboard from "./Cabinet/Pages/Dashboard/Dashboard";
import Group from "./Cabinet/Pages/Group/Group";
import Course from "./Cabinet/Pages/Course/Course";
import Teacher from "./Cabinet/Pages/Teacher/Teacher";

class Content extends Component {
    componentDidMount() {
        this.setState({page : this.props.page})
        this.setState({subpage : this.props.subpage})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== prevState.page || prevProps.subpage !== prevState.subpage){
            this.setState({page : prevProps.page})
            this.setState({subpage : prevProps.subpage})
        }
    }


    state = {
        page : "",
        subpage : ""
    }

    render() {
        const {page, subpage, sidebar,roles} = this.props


        const choosePage = () => {
            switch (page) {
                case "home" :
                    return <Dashboard />
                case "group" :
                    return <Group />
                case "course" :
                    return <Course />
                case "teacher" :
                    return <Teacher />

                // case "section" :
                //     if (subpage && subpage !== ""){
                //         return <SectionOne identity={subpage} />
                //     }
                //     return <Section />

                default :
                    return <NotFound/>;
            }
        }


        const checkRole = () => {
            return roles[0] === "all" || roles.includes(page)
        }
        return (
            <div className={sidebar ? "content" : "content content-active"}>
                {checkRole() ? choosePage() : <NotFound />}
            </div>
        );
    }
}

Content.propTypes = {};

export default connect(
    ({
         app: {loading,attachmentUrl,operationCount},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl,operationCount
    })
)(Content);
