import React, {useEffect} from 'react';
import PermRender from '../_common/PermRender';
import {Query} from "react-apollo";
import * as queries from "../../apollo/queries";
import LoadingIcon from "../_presentational/LoadingIcon";
import { Container } from 'reactstrap';
import ApplyNow from "../_common/ApplyNow"
import MemberProgress from "./members/MemberProgress"
import MemberTurnins from "./members/MemberTurnins"
import ManagerPayouts from './managers/ManagerPayouts'
import ManagerCashout from './managers/ManagerCashout'

const ProfileScreen = () => {

    useEffect(() => {
        document.title = `RC - Profile`
    }, [])

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

                return (
                <Container>
                    <PermRender perms={[3,2,1]} authorizedUser={authorizedUser}>
                        <MemberProgress />
                        <h1>Your turn ins</h1>
                        <MemberTurnins />
                    </PermRender>
                    <PermRender perms={[3,2]} authorizedUser={authorizedUser}>
                        <h1>Your payouts</h1>
                        <ManagerPayouts />
                        <h1>Your cashout</h1>
                        <ManagerCashout />
                        <small>Auto-populated values will only refresh once per every 2 minutes</small>
                    </PermRender>
                    <PermRender perms={[0]} authorizedUser={authorizedUser}>
                        <ApplyNow />
                    </PermRender>
                </Container>
                )
            }
        }
        </Query>
    )
}

export default ProfileScreen
