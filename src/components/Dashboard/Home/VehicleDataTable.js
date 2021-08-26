import React from 'react';
import { Table } from 'reactstrap';
import CopyTextButton from '../../_common/CopyTextButton';

const VehicleDataTable = (props) => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Code</th>
                    <th scope="col">Author</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((vehicle, i) => {
                        return (
                            <tr key={vehicle.name}>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.class}</td>
                                <td><CopyTextButton text={vehicle.code} size="sm" id={`vehicle-${i}`} label="Copy Code"/></td>
                                <td>{vehicle.author || "Unknown"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default VehicleDataTable
