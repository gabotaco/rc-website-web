import React, {useEffect, useState} from 'react';
import FormattedNumber from "../../_common/FormattedNumber"
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Api from "../../../library/Api/api"
import ServerPlayersTable from "./ServerPlayersTable"

const ServerRow = (props) => {
    const [serverData, setServerData] = useState('LOADING')
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    function toTimeFormat(ms_num) {
        var sec_num = ms_num / 1000
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        seconds = Math.round(seconds)
        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
    function getServerStatus() {
        Api.getServerPlayers(props.server).then((response) => {
            let members = [];
            let heistCount = 0;

            response.players.forEach(player => {
                if (props.members[player[2]]) {
                    members.push(player)
                }

                if (player[5] === "P.I.G.S. Robberrery") {
                    heistCount++
                }
            });


            setServerData({
                uptime: response.server.uptime,
                members: members,
                num_heisters: heistCount,
                dxp: !response.server.dxp[0] ? "No" : toTimeFormat(response.server.dxp[2] + response.server.dxp[3])
            })
        }).catch((err) => {
            setServerData('OFFLINE');
        })
    }
    useEffect(() => {
        setTimeout(() => {
            getServerStatus()
        }, 1 * 60 * 1000);
        getServerStatus()
    }, [])

    if (serverData === 'LOADING') {
        return (
            <tr>
                <td>{props.name}</td>
                <td><LoadingIcon sizeClass={'glimpsicon-32'} /></td>
                <td><LoadingIcon sizeClass={'glimpsicon-32'} /></td>
                <td><LoadingIcon sizeClass={'glimpsicon-32'} /></td>
                <td><LoadingIcon sizeClass={'glimpsicon-32'} /></td>
                <td><Button color={"info"} disabled><LoadingIcon sizeClass={'glimpsicon-32'} /></Button></td>
            </tr>
        )
    } else if (serverData === 'OFFLINE') {
        return (
            <tr>
                <td>{props.name}</td>
                <td>0</td>
                <td>0</td>
                <td>OFFLINE</td>
                <td>No</td>
                <td><Button color={"info"} disabled>Players</Button></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <Modal fade isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{props.name}'s Players</ModalHeader>
                    <ModalBody>
                        <ServerPlayersTable members={serverData.members}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
                <td><a href={`fivem://connect/${props.server}`}>{props.name}</a></td>
                <td>{serverData.members.length === 0 ? "None" : <FormattedNumber num={serverData.members.length} />}</td>
                <td>{serverData.num_heisters === 0 ? "None" : <FormattedNumber num={serverData.num_heisters} />}</td>
                <td>{serverData.uptime}</td>
                <td>{serverData.dxp}</td>
                <td><Button color={"info"} onClick={toggle}>Players</Button></td>
            </tr>
        )
    }
}

export default ServerRow
