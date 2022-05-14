import React from 'react';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Table } from 'reactstrap';
import ServerRow from "./ServerRow"

const ServerUptime = () => {

    return (
        <Query query={queries.GET_ALL_MEMBERS_SIMPLE}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon />
                if (error) {
                    console.error(error)
                    return "There was an error getting all members"
                }
                const memberArray = data.getAllMembers.members
                
                const members = {}

                memberArray.forEach(member => {
                    members[member.in_game_id] = true;
                });

                return (
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th scope="col">Server</th>
                                <th scope="col">Members</th>
                                <th scope="col">Heisters</th>
                                <th scope="col">Uptime</th>
                                <th scope="col">Dxp</th>
                                <th scope="col">Names</th> 
                            </tr>
                        </thead>
                        <tbody>
                            <ServerRow server={"server.tycoon.community:30120"} name={"Server #2"} members={members} />
                            <ServerRow server={"server.tycoon.community:30121"} name={"Server #5 (Beta)"} members={members} />
                            <ServerRow server={"tycoon-w8j4eb.users.cfx.re"} name={"Event Server"} members={members} />
                        </tbody>
                    </Table>
                )
            }
        }
        </Query>
        
    )
}

export default ServerUptime
