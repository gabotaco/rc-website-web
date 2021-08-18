import React, {useState} from "react";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import UserDropdownMenu from "./UserDropdownMenu";
import TToolsDropdownMenu from "./TToolsDropdownMenu";
import DashboardDropdownMenu from "./DashboardDropdownMenu";
import RestartButton from "./RestartButton";
import ApplyButton from "./ApplyButton";
import PermRender from "../_common/PermRender";

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar dark expand="md" style={Styles.Navbar} id="navbar">
      <NavbarBrand href="/app">
        <img src={require("../../assets/img/logo.png")} style={Styles.logo}
          className="d-inline-block align-top" alt="" />
        Rockwell Corporation
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <TToolsDropdownMenu routeName={props.routeName} />
          <DashboardDropdownMenu routeName={props.routeName} />
          <PermRender perms={[3,2,1]} authorizedUser={props.authorizedUser}>
            <NavItem active={props.routeName === "Profile"}>
              <NavLink href="/app/profile">Profile</NavLink>
            </NavItem>
          </PermRender>
        </Nav>
      </Collapse>
      <PermRender perms={[3,2]} authorizedUser={props.authorizedUser}>
        <RestartButton />
      </PermRender>
      <PermRender perms={[1,0]} authorizedUser={props.authorizedUser}>
        <ApplyButton authorizedUser={props.authorizedUser} />
      </PermRender>
      <UserDropdownMenu authorizedUser={props.authorizedUser} />
    </Navbar>
  );
}

export default AppNavbar;

const Styles = {
  logo: {
    height: 30
  },
  Navbar: {
    backgroundColor: "#363636"
  }
}
