import React from 'react';
import { Button } from 'reactstrap';

const ApplicantRow = ({applicant}) => {

    return (
        <tr key={applicant.id}>
            <td>{applicant.status_info ? (applicant.status === 'Contacted' ? applicant.status_info : `${applicant.status} (${applicant.status_info})`) : applicant.status}</td>
            <td>{applicant.company.toUpperCase()}</td>
            <td>{applicant.in_game_id} {applicant.in_game_name}</td>
            <td>{applicant.country}</td>
            <td data-order={new Date(applicant.createdAt).toISOString()}>{new Date(applicant.createdAt).toDateString()}</td>
            <td><Button color="info">Details</Button></td>
        </tr>
    )
}

export default ApplicantRow
