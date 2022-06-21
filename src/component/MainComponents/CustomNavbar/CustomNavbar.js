import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AlertSvg} from "../../Icons";
import {logout} from "../../../redux/actions/AuthActions";
import {connect} from "react-redux";
import "./CustomNavbar.scss"
import {Button, Col, Modal, ModalFooter, Row} from "reactstrap";
import {getOneAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {RefreshButton} from "../../CustomComponents/CustomForm/FormComponents/CustomButtons";
import {getNumberLLL} from "../../../utils/SecondaryFuncs/NumberFuncs";
import {imageRole, nameRole, orderSA, orderAccountant} from "../../../utils/SecondaryFuncs/RoleFuncs";
import logoUt from "../../../resources/favicon/logout.png"

class CustomNavbar extends Component {

    state = {
        modal: false
    }

    render() {
        const {operationCount, currentUser, role, dispatch, course} = this.props


        return (
            <div className={"custom-navbar"}>
                <div className={'left-side'}>
                    <Link to={`/${role.toLowerCase()}/home`} className={"logotip"}>
                        <p>
                            RTM
                        </p>
                    </Link>
                </div>
                <div className={"center-side"}>

                </div>
                <div className={"right-side"}>
                    <div className={"alert mr-3"}>
                        <Link to={`/${role.toLowerCase()}/new-operations`}>
                            <AlertSvg/>
                            <span className={"position-absolute"}>99</span>
                        </Link>
                    </div>
                    <div className={"profile-div"}>
                        <div className={"profile-icon"}>
                            <Link to={`/${role.toLowerCase()}/profile`}>
                                <div>
                                    <Row>
                                        <Col className={"p-0"}>
                                            <img src={imageRole(currentUser)} alt={""} className={"rounded-circle"}/>
                                        </Col>
                                        <Col className={"px-1"}>
                                            <p className={"mb-0 pt-1 profil-userName"}>Username</p>
                                            <p className={"profil-userRole mb-0"}>user role</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={"exit"}>
                        <img src={logoUt} alt="" onClick={() => {
                            this.props.dispatch(logout())
                        }}/>
                    </div>
                </div>

            </div>
        );
    }
}

CustomNavbar.propTypes = {};

export default connect(
    ({
         app: {loading, attachmentUrl, operationCount, course},
         auth: {currentUser}
     }) => ({
        loading, currentUser, attachmentUrl, operationCount, course
    })
)(CustomNavbar);