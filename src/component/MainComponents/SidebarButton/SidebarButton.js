import {AngleRightSvg} from "../../Icons";
import "./SidebarButton.scss"


const SidebarButton = (props) => {
    const {sidebar,func} = props
    return (
        <div className={sidebar ? "open-close open-close-active" : "open-close"} onClick={func}>
            <div className={"open-close-btn"}>
                <AngleRightSvg/>
            </div>
        </div>
    )
}

export default SidebarButton