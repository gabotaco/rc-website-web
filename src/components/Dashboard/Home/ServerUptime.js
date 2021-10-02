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
                            <ServerRow server={"tycoon-w8r4q4.users.cfx.re"} name={"Server #1 (One Sync)"} members={members} />
                            <ServerRow server={"tycoon-2epova.users.cfx.re"} name={"Server #2"} members={members} />
                            <ServerRow server={"tycoon-2epovd.users.cfx.re"} name={"Server #3"} members={members} />
                            <ServerRow server={"tycoon-wdrypd.users.cfx.re"} name={"Server #4"} members={members} />
                            <ServerRow server={"tycoon-njyvop.users.cfx.re"} name={"Server #5 (Beta)"} members={members} />
                            <ServerRow server={"tycoon-2r4588.users.cfx.re"} name={"Server #6"} members={members} />
                            <ServerRow server={"tycoon-npl5oy.users.cfx.re"} name={"Server #7"} members={members} />
                            <ServerRow server={"tycoon-2vzlde.users.cfx.re"} name={"Server #8"} members={members} />
                            <ServerRow server={"tycoon-wmapod.users.cfx.re"} name={"Server #9"} members={members} />
                            <ServerRow server={"tycoon-wxjpge.users.cfx.re"} name={"Server #A"} members={members} />
                        </tbody>
                    </Table>
                )
            }
        }
        </Query>
        
    )
}

export default ServerUptime
