import React, {Component} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import {FilterSvg, SearchSvg} from "../../Icons";
import "./Header.scss"
import {AvForm, AvField} from "availity-reactstrap-validation";
import {getListFilterFun} from "../../../utils/SecondaryFuncs/InputFuncs";
import {connect} from "react-redux";
import {getListAction} from "../../../redux/actionFuncs/mainActions";

class Header extends Component {
    render() {

        const {title,search, calendar, isFilter, filter, addModal, openModal,plus, dispatch} = this.props

        const filterDate = (e,v) => {
            dispatch(getListFilterFun(e,v,filter))
        }

        const clearFilterFun = () => {
            dispatch(getListAction({api : filter}))
        }

        return (
            <Container fluid className={"header-div"}>
                <Row>
                    <Col lg={6} md={5} sm={12}>
                        <h3>{title}</h3>
                    </Col>
                    <Col lg={6} md={7} sm={12} className={"text-right"}>
                        <Row>
                            <Col sm={6} xs={6}>
                                <div className={"searchInputGroup"}>
                                    <input type="text" className="mainInput" placeholder={"Qidirish..."} onChange={search}/>
                                    <span className={"searchIcon"}>
                                        <SearchSvg />
                                    </span>
                                    <div className={"calendarIcon"}>
                                        <span onClick={calendar} style={{cursor : "pointer"}}>
                                            <FilterSvg />
                                        </span>
                                        {isFilter ?
                                            <div className={"filterModal"}>
                                                <AvForm onValidSubmit={filterDate}>
                                                    <AvField type={"datetime-local"} name={"startDate"} label={"Boshlanish sana"} />

                                                    <AvField type={"datetime-local"} name={"endDate"} label={"Tugash sana"} />

                                                    <AvField type={"hidden"} name={"date"} defaultValue={true} />

                                                    <Button type={"submit"} color={"primary"}>Saralash</Button>
                                                    <Button type={"button"} color={"outline-secondary"} className={"mx-1"} onClick={clearFilterFun}>Bekor qilish</Button>
                                                </AvForm>
                                            </div>
                                            : ''
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} xs={6}>
                                {plus === true ?
                                    <div className={"btnAdd"} onClick={addModal}>
                                        {openModal ? "Bekor Qilish" : "Qo'shish"}
                                    </div>
                                    :
                                    ''
                                }
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </Container>
        );
    }
}

Header.propTypes = {};

export default connect(
    ({
         app: {openModal
         },
         auth: {}
     }) => ({
    })
)(Header);