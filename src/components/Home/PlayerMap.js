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
                    if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'}/>
                    if (error) {
                        return <p>Error getting company members.</p>
                    }

                    const {members, managers, applicants} = data.getAllMembers
                    return <Map members={members} managers={managers} applicants={applicants} />;
                }
            }
        </Query>
    )
}

export default PlayerMap
