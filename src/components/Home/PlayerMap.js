import React from 'react';
import {Query} from "react-apollo";
import LoadingIcon from "../../components/_presentational/LoadingIcon";
import * as queries from "../../apollo/queries";
import Map from './Map'

const PlayerMap = () => {
    return (
        <Query query={queries.GET_ALL_MEMBERS}>
            {
                ({loading, error, data}) => {
                    if (loading) return <LoadingIcon />
                    if (error) {
                        console.error(error)
                        return "Error getting company members"
                    }

                    const {members, managers, applicants} = data.getAllMembers
                    return <Map members={members} managers={managers} applicants={applicants} />;
                }
            }
        </Query>
    )
}

export default PlayerMap
