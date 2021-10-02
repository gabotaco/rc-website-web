import React from 'react';
import {Query} from "react-apollo";
import LoadingIcon from '../../_presentational/LoadingIcon';
import * as queries from "../../../apollo/queries"
import ManagerCashoutTable from "./ManagerCashoutTable"

const ManagerCashoutContainer = (props) => {
    return (
        <Query query={queries.GET_ALL_MANAGERS}>
            {
                ({loading, error, data, refetch}) => {
                    if (loading) return <LoadingIcon />
                    if (error) {
                        console.error(error)
                        return "There was an error loading active managers"
                    }

                    const managers = data.getAllManagers

                    return <ManagerCashoutTable managers={managers} refetch={refetch}/>
                }
            }
        </Query>
    )
}

export default ManagerCashoutContainer
