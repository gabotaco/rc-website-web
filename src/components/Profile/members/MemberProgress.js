import React from 'react';
import MemberDetailsTable from "./progress/MemberDetailsTable"
import PigsProgress from "./progress/PigsProgress"
import RtsProgress from "./progress/RtsProgress"
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";

const MemberProgress = () => {
    return (
        <Query query={queries.GET_AUTH_USER_PROGRESS}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                if (error) {
                    return null
                }
                const {member, pigs, rts, company} = data.getAuthUserProgress
                return (
                    <div>
                        <MemberDetailsTable member={member} />
                        <h1>Your progress</h1>
                        <PigsProgress member={member} pigs={pigs} company={company} />
                        <RtsProgress member={member} rts={rts} company={company} />
                    </div>
                )
            }
        }
        </Query>
    )
}

export default MemberProgress
