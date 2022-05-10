import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Navbar, NavbarToggler, Collapse, Nav, NavItem, Form, Input, ButtonGroup, Button, Progress } from 'reactstrap';
import LoadingIcon from "../../_presentational/LoadingIcon";
import * as Api from "../../../library/Api/api"
import FormattedNumber from '../../_common/FormattedNumber';
const $ = require( 'jquery' );
const storages = require("./storages.json");
const vehicleNames = require("./vehicles.json");

const BizHomeScreen = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [totalStorageWeight, setTotalStorageWeight] = useState(<LoadingIcon inline sizeClass={'glimpsicon-16'} />);
    const [totalOwnedVehicles, setTotalOwnedVehicles] = useState(<LoadingIcon inline sizeClass={'glimpsicon-16'} />);
    const [totalItemQuantity, setTotalItemQuantity] = useState(<LoadingIcon inline sizeClass={'glimpsicon-16'} />);
    const [premiumStatus, setPremiumStatus] = useState(<LoadingIcon inline sizeClass={'glimpsicon-16'} />);
    const [cooldown, setCooldown] = useState(10)
    const [refreshTime, setRefreshTime] = useState((parseInt(localStorage.getItem("storage-time")) || 0) + (10 * 60000))
    const [activeTable, setActiveTable] = useState("STORAGE")
    const [status, setStatus] = useState("Getting initial data...")
    const [gettingStorage, setGettingStorage] = useState(true)

    function getVisible() {
        if (window.innerWidth <= 1199.98) {
            document.getElementById("left-nav").style.top = "0px"
            return;
        }
        if (!document.getElementById("navbar")) {
            return setTimeout(() => {
                getVisible()
            }, 1);
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

    function trackDataTime() {
        if (props.searchingOther) {
            setCooldown(0);
            return;
        }
        const diffMs = refreshTime - Date.now();
        const diffMins = Math.ceil(((diffMs % 86400000) % 3600000) / 60000); // minutes
        setCooldown(diffMins)
        if (diffMins > 0) {
            setTimeout(trackDataTime, 30 * 1000);
        }
    }

    function calculateLevel(currentLevelExp) {
        return Math.floor((Math.sqrt(1 + 8 * currentLevelExp / 5) - 1) / 2)
    }

    function getStorage(id, name) {
        
    }

    function getData() {
        let businesses = {};
        let hasPremium = false;
        let strengthLevel = 0;
        setStatus("Getting user data...")
        Api.getTycoonData(props.game_id).then((response) => {
            if (response.error) {
                setTotalStorageWeight('Unknown');
                setTotalOwnedVehicles('Unknown');
                setTotalItemQuantity('Unknown');
                setPremiumStatus('Unknown');
                setGettingStorage(false);
                return;
            }
            if (response.data.groups.license_premium) {
                hasPremium = true;
                setPremiumStatus(<span className="text-success">Active</span>)
            } else {
                setPremiumStatus(<span className="text-danger">Inactive</span>)
            }
            setStatus("Getting Inventory...");
            const storageObject = { "id": "inv", "name": "Player", "cost": 0, "fee": 0, "items": [], "capacity": strengthLevel * 10, "quantity": 0, used: 0, unused: 0, percentage: 0 }
            strengthLevel = calculateLevel(response.data.gaptitudes.physical.strength)
            if (hasPremium) {
                storageObject.capacity *= 1.15
            }
            storageObject.capacity = Math.ceil(storageObject.capacity);
            let storageUsed = 0;

            Object.keys(response.data.inventory).forEach(key => {
                const item = response.data.inventory[key]
                storageUsed += Math.floor((item.weight * item.amount) * 100) / 100;
                storageObject.quantity += item.amount


                storageObject.items.push({ "name": item.name, "quantity": item.amount, "weight": Math.floor((item.weight * item.amount) * 100) / 100 });
            });
            setTotalItemQuantity(<FormattedNumber num={storageObject.quantity} />);
            setTotalStorageWeight(<FormattedNumber num={storageUsed} />);
            storageObject.used = storageUsed;
            storageObject.unused = Math.floor((storageObject.capacity - storageUsed) * 100) / 100;
            storageObject.percentage = storageUsed / storageObject.capacity || 0
            setStatus("Getting businesses...")
            Api.getTycoonBiz(props.game_id).then((response) => {
                businesses = response.businesses;

                setStatus("Getting faction ID...")
                Api.getTycoonFaction(props.game_id).then((response) => {
                    if (response.faction_id) {
                        getStorage(response.faction_id, "faction")
                    } else {
                        getStorage(0, "self")
                    }
                })
            })
            setStatus("Getting owned vehicles...")
            Api.getTycoonVehicles(props.game_id).then((response) => {
                
            })
        })
    }

    useEffect(() => {
        getVisible();
        getData();
        $(window).on('scroll resize', getVisible);
        document.onresize = function () { getVisible() }
    }, [])

    useEffect(() => {
        trackDataTime();
    }, [refreshTime])

    return (
        <Container fluid style={Style.container}>
            <Row>
                <Col md="2" style={Style.leftColumn}>
                    <Navbar expand="xl" dark fixed="left" className="overflow-auto" style={Style.navbar} id="left-nav">
                        <h3>Storage Info</h3>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse navbar isOpen={!collapsed}>
                            <Nav navbar>
                                <NavItem>
                                    {props.ttperm >= 1 && <Form inline className="my-2 my-lg-0">
                                        <Input className="mr-sm-2" type="search" placeholder="In Game ID" name="id" data-do-enter />
                                    </Form>}
                                </NavItem>
                                <NavItem>
                                    <h4 className="my-4">Player ID: {props.game_id}</h4>
                                </NavItem>
                                <NavItem>
                                    <p>Total Storage Weight: {totalStorageWeight}</p>
                                </NavItem>
                                <NavItem>
                                    <p>Total Owned Vehicles: {totalOwnedVehicles}</p>
                                </NavItem>
                                <NavItem>
                                    <p>Total Item Quantity: {totalItemQuantity}</p>
                                </NavItem>
                                <NavItem>
                                    <p>Premium Status: {premiumStatus}</p>
                                </NavItem>
                                <NavItem>
                                    <Button color="danger" size="lg" disabled={cooldown > 0}>{cooldown > 0 ? `Refresh in ${cooldown}m` : 'Refresh Data'}</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Col>
                <Col xl="10" style={Style.rightColumn}>
                    <Container className="text-center">
                        <h1 className="display-4">Storages</h1>
                        <p className="small">Note: This page will only refresh once every 10 minutes.</p>
                        <ButtonGroup className="mb-3">
                            <Button color="info" active={activeTable === "STORAGE"} onClick={() => setActiveTable("STORAGE")}>Storages</Button>
                            <Button color="info" active={activeTable === "ITEMS"} onClick={() => setActiveTable("ITEMS")}>Items</Button>
                            <Button color="info" active={activeTable === "VEHICLES"} onClick={() => setActiveTable("VEHICLES")}>Vehicles</Button>
                        </ButtonGroup>
                        {gettingStorage && <Row className="mb-3">
                            <Col xs="6" style={Style.noPadding}>
                                <Progress multi style={Style.leftProgress}>
                                    <Progress bar color="warning" striped animated style={Style.miniProgress}>
                                    </Progress>
                                </Progress>
                            </Col>
                            <Col xs="6" style={Style.noPadding}>
                                <Progress multi style={Style.rightProgress}>
                                    <Progress bar color="success" striped animated>
                                    </Progress>
                                </Progress>
                            </Col>
                        </Row>}
                    </Container>
                    <h4>{status}</h4>
                    {/* tables and show and hide based on activeTable */}
                </Col>
            </Row>
        </Container>
    )
}

export default BizHomeScreen

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
    },
    leftProgress: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    rightProgress: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    miniProgress: {
        marginLeft: "auto",
        marginRight: 0
    },
    noPadding: {
        paddingRight: 0,
        paddingLeft: 0
    }
}
