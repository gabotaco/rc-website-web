import React, {useEffect} from 'react';
import PermRender from '../../_common/PermRender';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Container } from 'reactstrap';
import ApplyNow from '../../_common/ApplyNow';
import TopTurninForm from "./TopTurninForm"

const CompanyManagementScreen = () => {

    useEffect(() => {
        document.title = `RC - Management`
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
                        <PermRender perms={[3,2,1]} authorizedUser={authorizedUser}>
                            <h1>Company Members</h1>
                            {/* <CompanyMembersTable /> */}
                        </PermRender>
                        <PermRender perms={[3]} authorizedUser={authorizedUser}>
                            <h1>Managers Cashouts</h1>
                            {/* <ManagerCashoutTable /> */}
                        </PermRender>
                        <PermRender perms={[3,2]} authorizedUser={authorizedUser}>
                            <h1>Get Top Turnins</h1>
                            <TopTurninForm />
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

export default CompanyManagementScreen
