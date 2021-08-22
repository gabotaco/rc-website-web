import React, {useEffect} from 'react';
import PermRender from '../../_common/PermRender';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Redirect } from "react-router";
import AdminPanel from "./AdminPanel"

const TToolsAdminScreen = () => {

    useEffect(() => {
        document.title = `RC - TTools Admin`
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
                <React.Fragment>
                    <PermRender ttperms={[3]} authorizedUser={authorizedUser}>
                        <AdminPanel authorizedUser={authorizedUser} />
                    </PermRender>
                    <PermRender ttperms={[2,1,0]} authorizedUser={authorizedUser}>
                        <Redirect to="/home/ttools" />
                    </PermRender>
                </React.Fragment>
                )
            }
        }
        </Query>
    )
}

export default TToolsAdminScreen
