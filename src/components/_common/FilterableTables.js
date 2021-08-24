// @flow
import React, {useState} from 'react'
import {ButtonGroup, Button} from 'reactstrap'
import CustomTable from './CustomTable'

const FilterableTables = (props) => {
    const [activeFilter, setActiveFilter] = useState(props.startingFilter || props.filters[0])

    return (
        <div>
            <ButtonGroup className="mb-2">
                {props.filters.map((filter, i) => {
                    return <Button color="primary" key={i} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</Button>
                })}
            </ButtonGroup>
            {props.tables.map((table, i) => {
                if (activeFilter === table.filter) {
                    return <CustomTable key={i} headers={table.headers} data={table.data} format={table.formatter} config={table.config} />
                }
            })}
        </div>
    )
}

export default FilterableTables
