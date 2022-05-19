import * as queries from "../../apollo/queries";

import LoadingIcon from "../../components/_presentational/LoadingIcon";
import Map from './Map'
import {Query} from "react-apollo";
import React from 'react';

const PlayerMap = (props) => {
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
                    return <Map members={members} managers={managers} applicants={applicants} loaded={props.loaded}/>;
                }
            }
        </Query>
    )
}

export default PlayerMap
