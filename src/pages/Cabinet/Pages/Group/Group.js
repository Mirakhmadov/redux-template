import React, {Component} from 'react';
import {showHideModal} from "../../../../component/Modals/ModalFuncs";
import {connect} from "react-redux";
import Header from "../../../../component/MainComponents/Header/Header";
import SimpleModal from "../../../../component/Modals/SimpleModal";

class Group extends Component {


    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "nomi"},
        ]
    }

    render() {
        const {openModal,dispatch} = this.props
        const sModal = (item) => {dispatch(showHideModal(item))}

        return (
            <div>
                <Header title={"Guruhlar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={false} plus={true} isFilter={true}/>


                <SimpleModal onSubmit={() => {}} state={this.state}/>
            </div>
        );
    }
}

export default connect(
    ({
         app: {loading, attachmentUrl, openModal},
         auth: {currentUser}
     }) => ({
        loading, currentUser, attachmentUrl, openModal
    })
)(Group);