import React from 'react'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {withRouter} from "react-router";
import PermRender from '../_common/PermRender';

const DashboardDropdownMenu = ({history, authorizedUser, routeName}) => {
    return (
        <UncontrolledDropdown className="btn-rotate" nav setActiveFromChild>
            <DropdownToggle caret nav>
                Dashboard
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    href="/app/dashboard"
                    onClick={()=> history.push('/app/dashboard')}
                    active={routeName === "Dashboard Home"}
                >
                    <i className={"bi bi-house"} style={Styles.icon}/>
                    Home
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    href="/app/dashboard/company"
                    onClick={()=> history.push('/app/dashboard/company')}
                    active={routeName === "Company"}
                >
                    <i className={"bi bi-kanban"} style={Styles.icon}/>
                    Management
                </DropdownItem>
                <PermRender perms={[3,2,1]} authorizedUser={authorizedUser}>
                    <DropdownItem
                        href="/app/dashboard/payout"
                        onClick={()=> history.push('/app/dashboard/payout')}
                        active={routeName === "Payout"}
                    >
                        <i className={"bi bi-wallet"} style={Styles.icon}/>
                        Payout
                    </DropdownItem>
                </PermRender>
                <PermRender perms={[3,2]} authorizedUser={authorizedUser}>
                    <DropdownItem
                        href="/app/dashboard/hire"
                        onClick={()=> history.push('/app/dashboard/hire')}
                        active={routeName === "Applications"}
                    >
                        <i className={"bi bi-file-person"} style={Styles.icon}/>
                        Applications
                    </DropdownItem>
                </PermRender>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default withRouter(DashboardDropdownMenu)

const Styles = {
    icon: {
        marginRight: "10px",
        transition: "opacity 0.3s !important",
        transform: "rotate(0deg) !important",
        display: 'inline-block'
    }
}