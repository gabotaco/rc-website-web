import React from 'react';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Table } from 'reactstrap';
import ApplicantRow from "./ApplicantRow"

const ApplicationsTable = () => {

    return (
        <Query query={queries.GET_ACTIVE_APPLICANTS}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon />
                if (error) {
                    console.error(error)
                    return "There was an error getting active applicants"
                }

                const applications = data.getActiveApplicants;

                return (
                    <Table hover>
                        <thead>
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Company</th>
                                <th scope="col">In-Game</th>
                                <th scope="col">Country</th>
                                <th scope="col">Time</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((applicant, i) => {
                                return <ApplicantRow applicant={applicant} key={i} />
                            })}
                        </tbody>
                    </Table>
                )
            }
        }
        </Query>
        
    )
}

export default ApplicationsTable
