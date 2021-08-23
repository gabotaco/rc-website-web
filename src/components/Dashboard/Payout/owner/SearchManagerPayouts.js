import React, {useState, useEffect} from 'react';
import { Label } from 'reactstrap';
import SearchableDropdown from '../../../_common/SearchableDropdown';
import { useQuery } from 'react-apollo-hooks';
import * as queries from "../../../../apollo/queries"
import ManagerPayoutTable from "./ManagerPayoutTable"

const SearchManagerPayouts = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [managerTable, setManagerTable] = useState(null)

    const {data, error, loading} = useQuery(queries.GET_ACTIVE_MANAGERS)
    function makeData(data) {
        return {
            inner: `${data.member.in_game_id} ${data.member.in_game_name}`,
            searchString: `${data.member.in_game_id} ${data.member.in_game_name} ${data.member.discord_id}`,
            data: data
        }
    }
    function managerSelected(data) {
        setIsLoading(true)
        setManagerTable(<React.Fragment><h1>{data.data.member.in_game_name}'s Payouts</h1><ManagerPayoutTable manager_id={data.data.id} /></React.Fragment>)
        setIsLoading(false)
    }

    return (
        <React.Fragment>
            <Label>Manager</Label>
            <SearchableDropdown placeholder="Manager name, game id, or discord" data={data.getActiveManagers ? data.getActiveManagers.map(makeData) : 'ERROR LOADING MANAGERS'} onSelected={managerSelected} isLoading={isLoading || loading} />
            {managerTable}
        </React.Fragment>
    )
}

export default SearchManagerPayouts
