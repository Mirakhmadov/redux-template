import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../../redux/actionFuncs/mainActions";
import Header from "../../../../component/MainComponents/Header/Header";
import {showHideDeleteModal, showHideModal} from "../../../../component/Modals/ModalFuncs";
import SimpleModal from "../../../../component/Modals/SimpleModal";
import {checkAttachment, checkStates} from "../../../../utils/SecondaryFuncs/StateFuncs";
import {toast} from "react-toastify";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {NoDataComponent} from "../../../../component/CustomComponents/ListComponents";
import {getListItemFunc} from "../../../../utils/SecondaryFuncs/ListFuncs";
import {getNumberLLL} from "../../../../utils/SecondaryFuncs/NumberFuncs";
import {Link} from "react-router-dom";
import {nameRole, routeRole} from "../../../../utils/SecondaryFuncs/RoleFuncs";
import {
    DeleteButton,
    EditButton,
    ViewButton
} from "../../../../component/CustomComponents/CustomForm/FormComponents/CustomButtons";
import DeleteModal from "../../../../component/Modals/DeleteModal";

class Course extends Component {

    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({api: "course"}))
    }

    state = {
        customForm: [
            {type: 'hidden', element: 'id'},
            {type: 'search', element: 'name', placeHolder: "kurs nomi"},

            {type: 'number', element: 'duration', placeHolder: "kurs davomiyligi (oy hisobida)"},
            {type: 'number', element: 'lessonDay', placeHolder: "1 oylik kunlar soni"},
            {type: 'number', element: 'price', placeHolder: "kurs narxi"},
            {type: 'textarea', element: 'description', placeHolder: "kurs haqida ma'lumot"},
            {type: 'file'}
        ]
    }

    render() {

        const {courseList,currentItem, dispatch, attachmentId, currentObject, attachmentUrl} = this.props

        const sModal = (item) => {dispatch(showHideModal(item))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item))}

        const saveItem = (e, v) => {
            if (checkStates(this.state, v) || checkAttachment(attachmentId, v, currentObject)) {
                dispatch(simpleAction(v, {cAPI: "course", type: v.id !== '' ? "edit" : "save"}))
            } else {
                toast.error("Ma'lumot to'liq kiritilishi kerak")
            }
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "course", type : 'delete'}))
        }

        return (
            <div className={""}>
                <Header title={"Kurslar ro'yxati"} addModal={sModal}
                        search={null} plus={true}/>

                <Container fluid>
                    <Row>
                        {courseList ? courseList.map(item =>
                            <Col md={3}>
                                <div className={"custom-card"}>
                                    <img src={attachmentUrl + getListItemFunc(item, ["attachment", "id"])} alt={""}
                                         className={"w-100"} style={{"max-height": "250px"}}/>
                                    <br/><br/>
                                    <h3>{item.name ?? ""}</h3>
                                    <hr/>
                                    <p><b>Muddat :</b> {item.duration ?? ""} oy</p>
                                    <p><b>Narxi :</b> {getNumberLLL(item.price)} so'm</p>

                                    <div className={"w-100 d-flex flex-row-reverse"}>
                                        <DeleteButton fun={() => dModal(item)}/>
                                        <EditButton fun={() => sModal(item)} />
                                        <Link to={`/${routeRole()}/course/${item.id ?? ""}`}> <ViewButton /> </Link>
                                    </div>
                                </div>
                            </Col>
                        ) : <NoDataComponent/>}
                    </Row>
                </Container>

                <SimpleModal onSubmit={saveItem} state={this.state}/>
                <DeleteModal onSubmit={deleteItem} />
            </div>
        );
    }
}

export default connect(
    ({
         app: {courseList, openModal, attachmentId, attachmentUrl, currentObject,currentItem},
         auth: {currentUser}
     }) => ({
        courseList, currentUser, openModal, attachmentId, currentObject, attachmentUrl,currentItem
    })
)(Course);