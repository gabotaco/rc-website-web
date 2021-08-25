import React, {useEffect} from 'react';
import PermRender from '../../_common/PermRender';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Container } from 'reactstrap';
import ApplyNow from '../../_common/ApplyNow';
import StolenMoneyCalculator from "./member/StolenMoneyCalculator"
import SearchManagerPayouts from "./owner/SearchManagerPayouts"
import CompletedReferrals from "./owner/CompletedReferrals"
import CompanyActiveReferrals from "./managers/CompanyActiveReferrals"

const PayoutScreen = () => {

    useEffect(() => {
        document.title = `RC - Payout`
    }, [])

    return (
        <Query query={queries.GET_AUTH_USER}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                if (error) {
                    return null
                }
                const {authorizedUser} = data

                return (
                    <Container>
                        <PermRender perms={[3,2]} authorizedUser={authorizedUser}>
                            <h1>Perform a payout</h1>
                            {/* <PayoutContainer /> */}
                            <h1>Active Referrals</h1>
                            <CompanyActiveReferrals owner={authorizedUser.permission === 3} />
                        </PermRender>
                        <PermRender perms={[1]} authorizedUser={authorizedUser}>
                            <h1>Calculate a payout</h1>
                            {/* <PayoutContainer /> */}
                            <h1>Active Referrals</h1>
                            {/* <UserActiveReferrals /> */}
                        </PermRender>
                        <PermRender perms={[3]} authorizedUser={authorizedUser}>
                            <h1>Completed Referrals</h1>
                            <CompletedReferrals />
                            <h1>Search Manager Payouts</h1>
                            <SearchManagerPayouts />
                        </PermRender>
                        <PermRender perms={[3,2,1]} authorizedUser={authorizedUser}>
                            <h1>Stolen Money Calculator</h1>
                            <StolenMoneyCalculator />
                            <small>Auto-populated values will only refresh once per minute</small>
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

export default PayoutScreen
