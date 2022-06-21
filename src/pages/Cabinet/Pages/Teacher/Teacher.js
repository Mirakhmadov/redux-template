import React, {Component} from 'react';
import {showHideDeleteModal, showHideModal} from "../../../../component/Modals/ModalFuncs";
import Header from "../../../../component/MainComponents/Header/Header";
import SimpleModal from "../../../../component/Modals/SimpleModal";
import DeleteModal from "../../../../component/Modals/DeleteModal";
import {connect} from "react-redux";
import {checkAttachment, checkStates} from "../../../../utils/SecondaryFuncs/StateFuncs";
import {simpleAction} from "../../../../redux/actionFuncs/mainActions";
import {toast} from "react-toastify";

class Teacher extends Component {

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

        const {courseList, currentItem, dispatch, attachmentId, currentObject, attachmentUrl} = this.props

        const sModal = (item) => {
            dispatch(showHideModal(item))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item))
        }

        const saveItem = (e, v) => {
            if (checkStates(this.state, v) || checkAttachment(attachmentId, v, currentObject)) {
                // dispatch(simpleAction(v, {cAPI: "course", type: v.id !== '' ? "edit" : "save"}))
            } else {
                toast.error("Ma'lumot to'liq kiritilishi kerak")
            }
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "course", type : 'delete'}))
        }


        return (
            <div>
                <Header title={"O'qituvchilar ro'yxati"} addModal={sModal}
                        search={null} plus={true}/>


                <SimpleModal onSubmit={saveItem} state={this.state}/>
                <DeleteModal onSubmit={deleteItem} />
            </div>
        );
    }
}

export default connect(
    ({
         app: {teacherList, openModal, attachmentId, attachmentUrl, currentObject,currentItem},
         auth: {currentUser}
     }) => ({
        teacherList, currentUser, openModal, attachmentId, currentObject, attachmentUrl,currentItem
    })
)(Teacher);