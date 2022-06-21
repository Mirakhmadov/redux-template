import React, {Component} from 'react';
import {Menu} from "../Menu/Menu";
import {makeLowerCase} from "../../../utils/SecondaryFuncs/StringFuncs";
import {ROLE} from "../../../utils/constants";
import "./Sidebar.scss"

class Sidebar extends Component {
    render() {
        const {sidebar, menus, page}  = this.props
        return (
            <div className={sidebar ? "left-sidebar left-sidebar-active" : "left-sidebar"}>
                {
                    menus ? menus.map(item =>
                        <Menu
                            icon={item.icon}
                            role={makeLowerCase(localStorage.getItem(ROLE))}
                            name={item.name}
                            link={item.link}
                            page={page}
                        />
                    ) : ''
                }
            </div>
        );
    }
}

export default Sidebar;