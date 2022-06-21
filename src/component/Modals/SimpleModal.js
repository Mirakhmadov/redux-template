import React, {Component} from 'react';
import {Button, Modal, ModalFooter, Row} from "reactstrap";
import {CustomForm} from "../CustomComponents/CustomForm/CustomForm";
import {connect} from "react-redux";
import {showHideModal} from "./ModalFuncs";
import {AvForm} from "availity-reactstrap-validation";

class SimpleModal extends Component {
    render() {
        const {state,currentObject, onSubmit, openModal, dispatch} = this.props;

        const hideModal = () => {
            dispatch(showHideModal(null))
        }


        return (
            <Modal isOpen={openModal} toggle={hideModal} size={"xl"}>
                <AvForm className={"col-12 p-5"} onValidSubmit={onSubmit}>
                    <h4 className={"title"}>{!(currentObject && currentObject.id) ? "Qo'shish" : "Tahrirlash"}</h4>

                    <Row>
                        <CustomForm state={state} dispatch={dispatch} object={currentObject}/>
                    </Row>

                    <ModalFooter className={"modal-footer mt-3"}>
                        <Button outline color="secondary" type={"button"} onClick={hideModal}>Bekor qilish</Button>
                        <Button color="primary" type={'submit'}>{!(currentObject && currentObject.id) ? "Qo'shish" : "Tahrirlash"}</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

SimpleModal.propTypes = {};
export default connect(
    ({
         app: {
             openModal,currentObject
         },
         auth: {}
     }) => ({
        openModal,currentObject
    })
)(SimpleModal);
