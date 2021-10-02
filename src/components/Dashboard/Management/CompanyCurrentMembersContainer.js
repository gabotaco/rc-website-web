import React from 'react';
import {Query} from "react-apollo";
import LoadingIcon from '../../_presentational/LoadingIcon';
import * as queries from "../../../apollo/queries"
import CompanyCurrentMembersTable from './CompanyCurrentMembersTable';

const CompanyCurrentMembersContainer = (props) => {
    return (
        <Query query={queries.GET_MEMBER_RANKINGS}>
            {
                ({loading, error, data, refetch}) => {
                    if (loading) return <LoadingIcon />
                    if (error) {
                        console.error(error)
                        return "There was an error loading member rankings"
                    }

                    const members = data.getMemberRankings

                    return <CompanyCurrentMembersTable members={members} />
                }
            }
        </Query>
    )
}

export default CompanyCurrentMembersContainer
