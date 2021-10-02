import React, {useState} from 'react';
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Form, Input, Button, FormFeedback, Label, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as Api from '../../../library/Api/api'
import FormattedNumber from "../../_common/FormattedNumber"

const SearchUserDetails = () => {
    const [inGameID, setInGameID] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [member, setMember] = useState(null);
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
          'Nov', 'Dec'
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        if (sec.length === 1)
          sec = '0' + sec;
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    function hasCooldown(val) {
        if (val >= 1) {
            if (val > Math.round((new Date()).getTime() / 1000)) {
                return timeConverter(val);
            } else {
                return "No";
            }
        } else {
            return "No"
        }
    }

    function inCompany(grp) {
        const companys = {
            "corp11": "PIGS",
            "corp2": "CoCo",
            "corp6": "IA",
            "corp9": "RTS"
        }
        const groups = JSON.stringify(grp);
        let company = "No"
        for (let i = 0; i < Object.keys(companys).length; i++) {
            if (groups.includes(Object.keys(companys)[i])) {
                company = companys[Object.keys(companys)[i]]
                break;
            }
        }
        return company
    }
    
    function handleSubmitClick() {
        setLoading(true)
        Api.getTycoonData(inGameID).then((response) => {
            if (!response.data.gaptitudes_v) response.data.gaptitudes_v = response.data.gaptitudes;
            setMember(response)
            setLoading(false);
            toggle();
        }).catch((err) => {
            setLoading(false)
            console.error(err);
            if (err.error === "Non-existant user") {
                setMember("INVALID")
            } else {
                alert("There was an error getting their data")
            }
        })
    }
    
    function calculateLevel(currentLevelExp) {
        return Math.floor((Math.sqrt(1 + 8 * currentLevelExp / 5) - 1) / 2)
    }

    function makeSkillContainer(currentLevel, maxLevel, skillName) {
        return <Progress multi className = "my-1" style={Styles.skillProgressContainer}>
            <Progress striped={currentLevel >= maxLevel} bar color={currentLevel >= maxLevel ? 'warning' : 'primary'} min={1} max={maxLevel} value={currentLevel}>
                <span className="text-white font-weight-bold" style={Styles.levelText}>{skillName} | Level {<FormattedNumber num={currentLevel}/>} / {<FormattedNumber num={maxLevel} />}</span>
            </Progress>
        </Progress>
    }


    return (
        <Form inline className="my-2 my-lg-0" noValidate autoComplete="off">
            {member && <Modal isOpen={modal} toggle={toggle} fade>
                <ModalHeader toggle={toggle}>Details for user {member.user_id}</ModalHeader>
                <ModalBody>
                    <b>Cooldown?</b> {hasCooldown(member.data.licenses.corp_cooldown)} <br/>
                    <b>Company?</b> {inCompany(member.data.groups)} <br/>
                    <hr />
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.physical.strength), 30, "Strength")}
                    <hr />
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.piloting.piloting), 100,
                      "Airline Pilot")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.train.bus), 100, "Bus Driver")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.business.business), 100, "Business")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.piloting.cargos), 100, "Cargo Pilot")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.train.train), 100, "Conductor")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.ems.ems), 100, "EMS")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.ems.fire), 100, "Fire")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.farming.farming), 100, "Farming")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.farming.fishing), 100, "Fishing")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.casino.casino), 100, "Gambling")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.trucking.garbage), 100,
                      "Garbage Collections")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.piloting.heli), 100,
                      "Helicopter Pilot")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.hunting.skill), 100, "Hunting")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.trucking.mechanic), 100, "Mechanic")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.farming.mining), 50, "Mining")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.player.player), 100, "Player")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.trucking.postop), 100, "PostOP")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.player.racing), 100, "Racing")}
                    {makeSkillContainer(calculateLevel(member.data.gaptitudes_v.trucking.trucking), 100, "Trucking")}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>}
            <Label className="sr-only">In Game ID</Label>
            <Input invalid={(inGameID !== undefined && inGameID < 1) || member === "INVALID"} type="number" className="mr-sm-2" min="2" placeholder="In game ID" required value={inGameID || ''} onChange={(ev) => setInGameID(parseInt(ev.target.value))} />
            <Button color="success" outline className="my-2 my-sm-0" onClick={handleSubmitClick}>{loading ? <LoadingIcon /> : 'Search'}</Button>
            <FormFeedback>Please specify a valid member ID.</FormFeedback>
        </Form>
    )
}

export default SearchUserDetails

const Styles = {
    skillProgressContainer: {
        height: '1.5rem',
        backgroundColor: "#00264d",
        position: 'relative'
    },
    levelText: {
        fontSize: '1.2rem',
        fontWeight: 900,
        position: 'absolute',
        display: 'block',
        width: '100%'
    }
}