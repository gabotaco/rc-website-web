import React from 'react'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {withRouter} from "react-router";

const TToolsDropdownMenu = ({history, routeName}) => {
    return (
        <UncontrolledDropdown nav inNavbar setActiveFromChild>
            <DropdownToggle caret nav>
                TTools
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    href="/app/ttools"
                    onClick={()=> history.push('/app/ttools')}
                    active={routeName === "TTools Home"}
                >
                    <i className={"bi bi-house"} style={Styles.icon}/>
                    Home
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    href="/app/ttools/biz"
                    onClick={()=> history.push('/app/ttools/biz')}
                    active={routeName === "Businesses"}
                >
                    <i className={"bi bi-building"} style={Styles.icon}/>
                    Businesses
                </DropdownItem>
                <DropdownItem
                    href="/app/ttools/storage"
                    onClick={()=> history.push('/app/ttools/storage')}
                    active={routeName === "Storages"}
                >
                    <i className={"bi bi-archive"} style={Styles.icon}/>
                    Storages
                </DropdownItem>
                <DropdownItem
                    href="/app/ttools/trucking"
                    onClick={()=> history.push('/app/ttools/trucking')}
                    active={routeName === "Trucking"}
                >
                    <i className={"bi bi-truck"} style={Styles.icon}/>
                    Trucking
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default withRouter(TToolsDropdownMenu)

const Styles = {
    icon: {
        marginRight: "10px",
        transition: "opacity 0.3s !important",
        transform: "rotate(0deg) !important",
        display: 'inline-block'
    }
}