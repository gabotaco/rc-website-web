import React, {useEffect, useState} from 'react';
import { Container, Jumbotron, Button, Modal, ModalBody, ModalHeader, ModalFooter, Carousel, CarouselItem, CarouselCaption, CarouselControl, ButtonGroup, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import {Query} from "react-apollo";
import * as queries from "../../apollo/queries";
import LoadingIcon from "../_presentational/LoadingIcon";
import * as Api from '../../library/Api/api'

const ApplyScreen = () => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [isHired, setisHired] = useState(false);
    const [isValidMember, setIsValidMember] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const [rehire, setRehire] = useState(false);
    const [rehireCompany, setRehireCompany] = useState('rts');
    const [invalidDiscord, setInvalidDiscord] = useState(false);
    const [rehired, setRehired] = useState(false);
    const [items, setItems] = useState([]);
    const [appStatus, setAppStatus] = useState("Apply now!");
    const [pendingApplication, setPendingApplication] = useState(false);
    const [newHire, setNewHire] = useState(false);
    const [inGameId, setInGameId] = useState('');
    const [inGameName, setInGameName] = useState('');
    const [referredId, setReferredId] = useState('');
    const [applicationStep, setApplicationStep] = useState(1);
    const [gameIdLoading, setLoading] = useState(false);
    const [inGameIdErr, setInGameIdErr] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [playPerWeek, setPlayPerWeek] = useState("")
    const [company, setCompany] = useState("")
    const [notInDiscord, setNotInDiscord] = useState(false);
    const [country, setCountry] = useState('')
    const [why, setWhy] = useState('')
    const [anything, setAnything] = useState('')

    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);

    useEffect(() => {
        document.title = `RC - Apply`
    }, [])

    useEffect(() => {
        if (!authorizedUser) return;
        if (authorizedUser.permission > 1 || authorizedUser.company === "rts" || authorizedUser.company === "pigs") {
            setisHired(true);
        } else if (authorizedUser.company === 'fired' && authorizedUser.welcome) {
            setItems([
                {
                    message: <h5>So you're back, eh?</h5>
                },
                {
                    message: <h5>Well we're happy to see you...</h5>
                },
                {
                    message: <h5><i>crawwwwwling back</i></h5>
                },
                {
                    message: <h5>Back to RC</h5>
                },
                {
                    message: <h5>Yep, we thought you might come back</h5>
                },
                {
                    message: <h5>We couldn't be sure of course</h5>
                },
                {
                    message: <h5>But here you are</h5>
                },
                {
                    message: <h5>Right back here again</h5>
                },
                {
                    message: <h5>Right here at RC.</h5>
                },
                {
                    message: <React.Fragment>
                        {
                            invalidDiscord ? (
                                rehireCompany === 'rts' ? <h5>You must join <a href="https://discord.com/invite/9WRV87P" target="_blank">the company Discord</a> before you can be hired! <a href="https://discord.com/invite/9WRV87P" target="_blank" className="btn btn-rts btn-lg ml-1 mt-2">Join</a><br/>Go to the next slide after joining.</h5>
                                                        : <h5>You must join <a href="https://discord.com/invite/eSyN6BJ" target="_blank">the company Discord</a> before you can be hired! <a href="https://discord.com/invite/eSyN6BJ" target="_blank" className="btn btn-pigs btn-lg ml-1 mt-2">Join</a><br/>Go to the next slide after joining.</h5>
                                            )
                            :
                            (
                                isValidMember ? 
                                <h5>We have you as {authorizedUser.in_game_name}#{authorizedUser.in_game_id}. If this is not correct, please check with a manager to get this changed.
                                <br/>Your Company:  
                                <ButtonGroup>
                                    <Button color="rts" active={rehireCompany === 'rts'} onClick={() => setRehireCompany('rts')}>RTS</Button>
                                    <Button color="pigs" active={rehireCompany === 'pigs'} onClick={() => setRehireCompany('pigs')}>PIGS</Button>
                                </ButtonGroup>
                                </h5> 
                            : 
                                <h5>We have you as {authorizedUser.in_game_name}#{authorizedUser.in_game_id}. If this is not correct, please check with a manager to get this changed.
                                <br/>Unfortunately you're either currently in a company or no longer meet the minimum requirements (level 30 strength). If this is an error let a manager know. Otherwise, check back later.
                                </h5>)
                        }
                    </React.Fragment>
                },
                {
                    message: <React.Fragment>
                        {rehired ? (
                            rehireCompany === 'rts' ? <h5>Alright, you're hired. Type .roles in any channel of the PIGS and RTS Discord and let a manager know you need your roles in-game again.<br/>
                            <a href="https://docs.google.com/document/d/1FWgrc_7kowBbWLx2Ce0WHOIXy-vAcUCROe6UTMOszjM/edit" target="_blank" className="btn btn-rts btn-lg mr-1 mt-2">Handbook</a><a href="https://discord.com/invite/9WRV87P" target="_blank" className="btn btn-rts btn-lg ml-1 mt-2">Discord</a></h5>
                            :
                            <h5>Alright, you're hired. Type .roles in any channel of the PIGS and RTS Discord and let a manager know you need your roles in-game again.<br/>
                            <a href="https://docs.google.com/document/d/1NTAP7AkkNBiQehwCn8A-OTAExUVsIUbpXjNXAYmGmsk/edit" target="_blank" className="btn btn-pigs btn-lg ml-1 mt-2">Handbook</a><a href="https://discord.com/invite/eSyN6BJ" target="_blank" className="btn btn-pigs btn-lg ml-1 mt-2">Discord</a></h5>
                        ) 
                        :
                        <h5><LoadingIcon inline/> Hiring... Please wait.</h5>
                        }

                    </React.Fragment>
                }
            ])
            Api.getTycoonData(authorizedUser.in_game_id).then((res) => {
                let validMember = true;

                const companys = {
                    "corp2": "CoCo",
                    "corp6": "IA"
                }

                const groups = JSON.stringify(res.data.groups);
                for (let i = 0; i < Object.keys(companys).length; i++) {
                    if (groups.includes(Object.keys(companys)[i])) {
                        validMember = false;
                        break;
                    }
                }

                if (!res.data.gaptitudes_v) res.data.gaptitudes_v = res.data.gaptitudes
                const level = calculateLevel(res.data.gaptitudes_v.physical.strength)
                if (level < 30) {
                    validMember = false;
                }

                setRehire(true);
                setIsValidMember(validMember)
            }).catch((err) => {
                console.error(err);
                if (err.error === "Non-existant user") {
                    alert("We were unable to find your Tycoon user")
                } else if (err.error === "Tycoon Servers Offline") {
                    alert("Unable to get your data because the Tycoon servers are offline. Please try again later.")
                } else {
                    alert("There was an error getting their data")
                }
            })
        } else if (authorizedUser.company === 'fired' && !authorizedUser.welcome) {
            setItems([
                {
                    message: <h5>You're seeing this page because you're back, and you didn't leave on a good note.</h5>
                },
                {
                    message: <h5>We have you as {authorizedUser.in_game_name}#{authorizedUser.in_game_id}. If this is not correct, please check with a manager to get this changed.
                    <br/>Your Company:  
                    <ButtonGroup>
                        <Button color="rts" active={rehireCompany === 'rts'} onClick={() => setRehireCompany('rts')}>RTS</Button>
                        <Button color="pigs" active={rehireCompany === 'pigs'} onClick={() => setRehireCompany('pigs')}>PIGS</Button>
                    </ButtonGroup>
                    </h5> 
                },
                {
                    message: <h5><LoadingIcon inline/> Hiring... Please wait.</h5>
                }
            ])
            setRehire(true);
        } else {
            
        }
    }, [authorizedUser])

    useEffect(() => {
        if (rehired) {
            document.location.reload();
        }
    }, [modal])

    useEffect(() => {
        if (newHire) {
            Api.getInGameId().then((response) => {
                setInGameId(response.user_id)
            }).catch((err) => {
                console.error(err)
                if (err.error === "Tycoon Servers Offline") {
                    alert("Unable to get your data because the Tycoon servers are offline. Please try again later.")
                } else {
                    alert("Unable to get your in game ID");
                }
            })
        }
    }, [newHire])

    const applicationSteps = [
        {
            header: "You do not meet the minimum requirements.",
            body: "Please close the application and re-apply once you hit level 30 strength, it shouldn't take long! (If you are level 30 you need to leave the company you are in)",
            next: "Okay!"
        },
        {
            header: "Your Info",
            body: <Form noValidate>
                <FormGroup>
                    <Label>In-Game Name:</Label>
                    <Input valid={!!inGameName && /[a-zA-Z0-9]*/.test(inGameName)} invalid={!inGameName || !/[a-zA-Z0-9]*/.test(inGameName)} type="text" placeholder='Your answer' required value={inGameName} onChange={(ev) => setInGameName(ev.target.value.replace(/\n/g, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''))}/>
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify an in-game name.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>In-Game ID#</Label>
                    <Input valid={!!inGameId && !!parseInt(inGameId) && !inGameIdErr} invalid={!inGameId || !parseInt(inGameId) || inGameIdErr} type="number" placeholder='Your answer' required value={inGameId} onChange={(ev) => setInGameId(parseInt(ev.target.value))}/>
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        {inGameIdErr ? 'Player not found.' : 'Please specify an in-game id.'}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Were you referred by someone? If so, enter their in-game ID number below, otherwise skip ahead. (ex., 81915) YOU CAN ONLY REFFER ONE PERSON</Label>
                    <Input valid={!!referredId && !!parseInt(referredId)} type="number" placeholder='Your answer' value={referredId} onChange={(ev) => setReferredId(parseInt(ev.target.value))}/>
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                </FormGroup>
            </Form>
        },
        {
            header: "Your TT Background",
            body: <Form noValidate>
                <FormGroup>
                    <Label>How much do you play per week right now?</Label>
                    <Input valid={!!playPerWeek} invalid={!playPerWeek} type="select" required value={playPerWeek} onChange={(ev) => setPlayPerWeek(ev.target.value)}>
                        <option disabled value="">Choose...</option>
                        <option value="Under 4 hours.">Under 4 hours.</option>
                        <option value="Between 4 and 8 hours.">Between 4 and 8 hours.</option>
                        <option value="No, you don't understand. I love Tycoon.">No, you don't understand. I love Tycoon.</option>
                    </Input>
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please answer how long you play.
                    </FormFeedback>
                </FormGroup>
                <FormGroup> 
                    <Label>Which company do you want to join first?</Label>
                    <FormGroup check>
                        <Input name="company" onClick={() => {setCompany('rts'); setNotInDiscord(false)}} type="radio" valid={!!company && !notInDiscord} invalid={!company || notInDiscord}/>
                        <Label check>RTS</Label>
                        <FormText>RTS delivers vehicles. A person can spawn randomized sports cars or spawn randomized aircraft and drive/pilot them to their destinations.</FormText>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="company" onClick={() => {setCompany('pigs'); setNotInDiscord(false)}} type="radio" valid={!!company && !notInDiscord} invalid={!company || notInDiscord}/>
                        <Label check>PIGS</Label>
                        <FormText>PIGS perform heists. These missions can be performed solo but you're paid FAR better for doing jobs in a group.</FormText>
                        <FormFeedback valid>
                            Looks good!
                        </FormFeedback>
                        <FormFeedback>
                            {notInDiscord ? (company === "rts" ? <p>Please join <a className="text-primary font-italic font-weight-bold" href="https://discord.com/invite/9WRV87P" target="_blank">the company Discord</a>.</p> : <p>Please join <a className="text-primary font-italic font-weight-bold" href="https://discord.com/invite/eSyN6BJ" target="_blank">the company Discord</a>.</p>) : 'Please pick a company.'}
                        </FormFeedback>
                    </FormGroup>
                </FormGroup>
            </Form>
        },
        {
            header: "Help us get to know you!",
            body: <Form noValidate>
                <FormGroup>
                    <Label>What country or region are you from? If nothing else, what time zone are you in?</Label>
                    <Input value={country} onChange={(ev) => setCountry(ev.target.value.replace(/\n/g, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''))} valid={!!country && /[a-zA-Z0-9]*/.test(country)} invalid={!country || !/[a-zA-Z0-9]*/.test(country)} type="text" pattern="[a-zA-Z0-9]*" placeholder='Your answer' required/>
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify an answer.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>This sounds serious but it's totally not! Why should we choose you?</Label>
                    <Input type="textarea" placeholder='Your answer' rows="3" value={why} onChange={(ev) => setWhy(ev.target.value.replace(/\n/g, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''))} valid={!!why} invalid={!why} />
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify an answer.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Say anything! (Hobbies, interests, field of work, whatever makes you, you!)</Label>
                    <Input type="textarea" placeholder='Your answer' rows="3" value={anything} onChange={(ev) => setAnything(ev.target.value.replace(/\n/g, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''))} valid={!!anything} invalid={!anything} />
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify an answer.
                    </FormFeedback>
                </FormGroup>
            </Form>,
            next: 'Submit!'
        }
    ]

    if (activeIndex === 2 && !authorizedUser.welcome && authorizedUser.company === 'fired') {
        Api.hire(rehireCompany, authorizedUser.in_game_name, authorizedUser.in_game_id, authorizedUser.id, null).finally(() => {
            document.location.href = "http://secret.rockwelltransport.com"
        })
    } else if (activeIndex === 10 && !rehired) {
        if (!isValidMember) {
            setActiveIndex(0)
            toggle();
        } else {
            Api.hire(rehireCompany, authorizedUser.in_game_name, authorizedUser.in_game_id, authorizedUser.id, null).then(() => { 
                setisHired(true);
                setRehired(true);
            }).catch(err => {
                if (err.error === "Member not in Discord") {
                    setInvalidDiscord(true);
                    setActiveIndex(9);
                }
            })
        }
    }

    function calculateLevel(currentLevelExp) {
        return Math.floor((Math.sqrt(1 + 8 * currentLevelExp / 5) - 1) / 2)
    }

    function handleClickBack() {
        setActiveIndex(activeIndex - 1);
    }

    function handleClickNext() {
        setActiveIndex(activeIndex + 1);
    }

    function handleConfirm() {
        if (applicationStep === 0) {
            toggle2();
            return;
        } else if (applicationStep === 1) {
            if (!inGameName || !inGameId) {
                return;
            }

            setLoading(true);

            Api.getTycoonData(inGameId).then((response) => { 
                setLoading(false);
                let validMember = true;
                function timeConverter(UNIX_timestamp) {
                    var a = new Date(UNIX_timestamp * 1000);
                    return a.toISOString().slice(0, 19).replace('T', ' ')
                }

                function hasCooldown(val) {
                    if (val >= 1) {
                        if (val > Math.round((new Date()).getTime() / 1000)) {
                            return timeConverter(val);
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }

                if (response.data.licenses) {
                    setCooldown(hasCooldown(response.data.licenses.corp_cooldown))
                }

                const companys = {
                    "corp2": "CoCo",
                    "corp6": "IA",
                    "corp9": "RTS",
                    "corp11": "PIGS"
                }

                const groups = JSON.stringify(response.data.groups);
                for (let i = 0; i < Object.keys(companys).length; i++) {
                    if (groups.includes(Object.keys(companys)[i])) {
                        validMember = false;
                        break;
                    }
                }

                if (!response.data.gaptitudes_v) response.data.gaptitudes_v = response.data.gaptitudes
                const level = calculateLevel(response.data.gaptitudes_v.physical.strength)
                if (level < 30) {
                    validMember = false;
                }

                if (!validMember) {
                    setApplicationStep(0);
                } else {
                    setApplicationStep(applicationStep + 1);
                }
            }).catch((err) => { 
                setLoading(false);
                if (err.error === "Non-existant user") {
                    setInGameIdErr(true);
                    return;
                } else if (err.error === "Tycoon Servers Offline") {
                    alert("Unable to get your data because the Tycoon servers are offline. Please try again later.")
                } else {
                    console.error(err)
                    alert("There was a problem getting that in game ID")
                }
            })
        } else if (applicationStep === 2) {
            if (!playPerWeek || !company) {
                return;
            }

            Api.getIsInDiscord(company).then((response) => {
                if (!response.in_discord) {
                    setNotInDiscord(true);
                } else {
                    setApplicationStep(applicationStep + 1);
                }
            }).catch((err) => {
                console.error(err);
                alert("There was an error verifying that you are in the Discord");    
            })
        } else if (applicationStep === 3) {
            if (!country || !why || !anything) {
                return;
            }

            Api.apply(inGameName, inGameId, referredId, cooldown, playPerWeek, company, country, why, anything).then(() => { 
                document.location.reload();    
            }).catch((err) => {
                console.error(err);
                if (err.error === "Missing fields in application") {
                    alert("Failed to send one of your responses to the server. Make sure you didn't input any weird characters (emojis) or new lines");
                } else if (err.error === "You already have a pending application") {
                    alert("You already have a pending applcation, this one will be disregarded")
                    document.location.reload();
                } else if (err.error === "There was a problem adding your application to the database") {
                    alert("There was a problem adding your responses to the database")
                } else {
                    alert("There was a problem submitting your application.");
                }
            })
        }
    }

    return (
        <Query query={queries.GET_AUTH_USER}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon />
                if (error) {
                    console.error(error)
                    return "There was an error authenticating your request"
                }

                const {authorizedUser} = data
                setAuthorizedUser(authorizedUser) // This throws the warning of cannot update a component

                if (activeIndex >= items.length && items.length > 0) {
                    setActiveIndex(items.length - 1)
                }

                const slides = items.map((item, i) => {
                    return (
                        <CarouselItem key={i}>
                            <svg className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                                height="80vh" xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                                aria-label="Placeholder: First slide">
                            </svg>
                            <CarouselCaption
                                captionText={item.message}
                            />
                        </CarouselItem>
                    )
                })

                return (
                    <Container>
                        <Jumbotron>
                            <h1 className='display-4'>RTS + PIGS Application</h1>
                            <p className='lead'>Due to the unique structure of the Rockwell Corporation, there is no penalty for
                                switching between PIGS and RTS and no required cooldown.</p>
                            <hr className="my-4" />
                            <p>All progress is saved when you switch from one to the other.</p>
                            <Button color={isHired || rehire || pendingApplication ? 'success' : (appStatus === 'Rejected' ? 'danger' : 'primary')} size="lg" disabled={isHired || pendingApplication} onClick={() => (!rehire && !isHired) ? toggle2() : toggle()}>{isHired ? 'Hired!' : (rehire ? 'Rejoin' : appStatus)}</Button>
                        </Jumbotron>
                        {rehire && <Modal isOpen={modal} toggle={toggle} fade size="xl">
                            <ModalBody>
                                <Carousel interval={false} pause={false} id="rehire-carousel" next={handleClickNext} previous={handleClickBack} activeIndex={activeIndex}>
                                    {slides}
                                    <CarouselControl
                                        direction="prev"
                                        directionText="Previous"
                                        onClickHandler={handleClickBack}
                                    />
                                    <CarouselControl
                                        direction="next"
                                        directionText="Next"
                                        onClickHandler={handleClickNext}
                                    />
                                </Carousel>
                            </ModalBody>
                        </Modal>}
                        {!rehire && !isHired && <Query query={queries.GET_AUTH_USER_STATUS}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <LoadingIcon />
                                if (error) {
                                    console.error(error)
                                    return "There was an error authenticating your request"
                                }

                                if (data.getAuthUserStatus) {
                                    var {status} = data.getAuthUserStatus
                                }

                                if (status && status !== "Rejected") {
                                    setPendingApplication(true);
                                    setAppStatus(status);
                                    return (<React.Fragment></React.Fragment>)
                                } else if (status === "Rejected") {
                                    setAppStatus(status);
                                }

                                setNewHire(true);

                                return (
                                    <Modal fade isOpen={modal2} toggle={toggle2} backdrop={"static"} size="lg" keyboard={false}>
                                        <ModalHeader toggle={toggle2}>{applicationSteps[applicationStep].header}</ModalHeader>
                                        <ModalBody>
                                            {applicationSteps[applicationStep].body}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={toggle2}>Cancel</Button>
                                            <Button color="primary" onClick={handleConfirm} disabled={gameIdLoading}>{gameIdLoading ? <LoadingIcon inline /> : applicationSteps[applicationStep].next || "Next"}</Button>
                                        </ModalFooter>
                                    </Modal>
                                )
                            }
                        }
                        </Query>
                        }
                    </Container>
                )
            }
        }
        </Query>
    )
}

export default ApplyScreen
