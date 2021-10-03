import React, {useState} from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useMutation } from 'react-apollo-hooks';
import * as queries from "../../../../apollo/queries"
import LoadingIcon from '../../../_presentational/LoadingIcon';

const CompanySelector = (props) => {
    const {member, perms} = props;
    const SET_MANAGER = useMutation(queries.SET_MEMBER_MANAGER)
    const CHANGE_COMPANY = useMutation(queries.SET_MEMBER_COMPANY)
    const FIRE_MEMBER = useMutation(queries.FIRE_MEMBER)

    const [modal, setModal] = useState(false);
    const [fireReason, setFireReason] = useState(member.fire_reason)
    const [welcome, setWelcome] = useState(member.welcome)
    const [loading, setLoading] = useState(false)

    const toggle = () => setModal(!modal);

    function managerOnClick() {
        SET_MANAGER({
            variables: {
                uid: member.id,
                manager: !member.manager
            }
        }).catch((err) => {
            console.error(err);
            alert("There was an error making them a manager")
        })
    }

    function rtsOnClick() {
        if (member.company === 'rts') return;

        CHANGE_COMPANY({
            variables: {
                uid: member.id,
                company: 'rts'
            }
        }).then(() => {
            alert(`RTS Rank: ${member.rts_rank}`)
        }).catch((err) => {
            console.error(err);
            alert("There was an error making them RTS")
        })
    }

    function pigsOnClick() {
        if (member.company === 'pigs') return;

        CHANGE_COMPANY({
            variables: {
                uid: member.id,
                company: 'pigs'
            }
        }).then(() => {
            alert(`PIGS Rank: ${member.pigs_rank}`)
        }).catch((err) => {
            console.error(err);
            alert("There was an error making them PIGS")
        })
    }

    function fireOnClick() {
        setLoading(true)
        FIRE_MEMBER({
            variables: {
                uid: member.id,
                reason: encodeURIComponent(fireReason),
                welcome: welcome
            }
        }).then(() => {
            setLoading(false)
            toggle();
        }).catch((err) => {
            console.error(err)
            alert("There was an error firing this memeber")
        })
    }

    return (
        <React.Fragment>
            <ButtonGroup>
                {perms > 2 && <Button onClick={managerOnClick} color="primary" active={member.manager} disabled={!member.welcome || member.company === 'fired' || member.manager}>Manager</Button>}
                <Button onClick={rtsOnClick} color="rts" active={member.company === 'rts'} disabled={!member.welcome}>RTS</Button>
                <Button onClick={pigsOnClick} color="pigs" active={member.company === 'pigs'} disabled={!member.welcome}>PIGS</Button>
                <Button onClick={toggle} color="yeet" active={member.company === 'fired'} disabled={modal}>YEET</Button>
            </ButtonGroup>
            <Modal isOpen={modal} toggle={toggle} fade>
                <ModalHeader toggle={toggle}>Fire {member.in_game_name}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Fire Reason:</Label>
                            <Input invalid={!fireReason} type="text" value={fireReason} onChange={(ev) => setFireReason(ev.target.value)}></Input>
                            <FormFeedback>
                                Please provide a reason.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={welcome} onClick={() => setWelcome(!welcome)}></Input>
                                Welcome Back?
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="danger" onClick={fireOnClick} disabled={loading}>{loading ? <LoadingIcon /> : 'Fire'}</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default CompanySelector
