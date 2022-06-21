import React from "react";
import {CustomSelect} from "./FormComponents/CustomSelect";
import {CustomCheckbox, CustomInput, CustomRadio} from "./FormComponents/CustomInput";
import CustomFileInput from "./FormComponents/CustomFileInput";
import {SingleSelect} from "./FormComponents/SingleSelect";
import {CustomSelectUser} from "./FormComponents/CustomSelectUser";
import {Col} from "reactstrap";

export const CustomForm = (props) => {
    const {state,dispatch,object} = props

    const chooseType = (item, object) => {
        switch (item.type) {
            case "select" : return <CustomSelect parent={item.parent} child={item.child} array={item.array} element={item.element} func={item.func} dispatch={dispatch}
                                         state={state} secondElement={item.secondElement} object={object} placeHolder={item.placeHolder}/>

            case "select_user" : return <CustomSelectUser object={object} array={item.array} element={item.element}/>

            case "file" : return <CustomFileInput object={object} multi={item.multi}/>;

            case "single_select_role" : return <SingleSelect array={item.array} element={item.element} object={object}/>

            case "checkbox" : return  <CustomCheckbox element={item.element} placeHolder={item.placeHolder} object={object} />

            case "radio" : return <CustomRadio element={item.element} array={item.array} object={object}/>

            default : return <CustomInput type={item.type} element={item.element} required={item.required} placeHolder={item.placeHolder} object={object}/>
        }
    }

    return (
        state ? state.customForm.map((item) =>
            item.type !== "hidden" ?
            <Col md={6} style={{"max-height" : "300px"}}>
                {chooseType(item,object)}
            </Col> : chooseType(item, object)
        ) : ''
    );
}