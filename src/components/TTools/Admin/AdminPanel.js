import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import * as Api from "../../../library/Api/api"
import LoadingIcon from "../../_presentational/LoadingIcon";
import FormattedNumber from "../../_common/FormattedNumber"
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import CustomTable from "../../_common/CustomTable"
import WebUserRow from "./WebUserRow"
const $ = require( 'jquery' );

const AdminPanel = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [charges, setCharges] = useState(<LoadingIcon />)
    const toggleNavbar = () => setCollapsed(!collapsed);

    function getVisible() {
        if (window.innerWidth <= 1199.98) {
            document.getElementById("left-nav").style.top = "0px"
            return;
        }
        var $el = $('#navbar'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

        if (visibleBottom - visibleTop < 0) {
            document.getElementById("left-nav").style.top = "0px"
        } else {
            document.getElementById("left-nav").style.top = visibleBottom - visibleTop + "px"
        }
    }

    useEffect(() => {
        Api.getCharges().then((response) => {
            setCharges(<FormattedNumber num={response[0]} />)
        }).catch((err) => {
            console.error(err)
            setCharges('UNKNOWN')
        })

        getVisible();
        $(window).on('scroll resize', getVisible);
        document.onresize = function () { getVisible() }
    }, [])

    return (
        <Container fluid style={Style.container}>
            <Row>
                <Col md="2" style={Style.leftColumn}>
                    <Navbar expand="xl" dark fixed="left" className="overflow-auto" style={Style.navbar} id="left-nav">
                        <h3>Key Info</h3>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse navbar isOpen={!collapsed}>
                            <Nav navbar>
                                <NavItem>
                                    Current Charges: {charges}
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Col>
                <Col xl="10" style={Style.rightColumn}>
                    <h1 className="text-center">Linked Website Users</h1>

                    <Query query={queries.GET_WEB_USERS}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <LoadingIcon />
                            if (error) {
                                console.error(error)
                                return "There was an error getting web users"
                            }
                            const {getWebUsers} = data
                            
                            const Formatters = {
                                table: (user) => {
                                    return (
                                        <WebUserRow user={user} authorizedUser={props.authorizedUser} />
                                    )
                                }
                            }
                            return (
                                <CustomTable config={config.table} headers={Headers.table} data={getWebUsers} format={Formatters.table} />
                            )
                        }
                    }
                    </Query>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminPanel

const Style = {
    container: {
        marginLeft: '0px',
        paddingLeft: '0px'
    },
    leftColumn: {
        paddingLeft: '0px'
    },
    rightColumn: {
        paddingLeft: '35px'
    },
    navbar: {
        backgroundColor: '#2e2e2e',
        maxHeight: '100vh'
    }
}

const config = {
    table: {
        id: 'admin-table',
        jquery: {
            "order": [
                [2, 'desc']
            ]
        }
    },
}

const Headers = {
    table: [
        'Discord ID',
        'In Game ID',
        'Perms'
    ]
}