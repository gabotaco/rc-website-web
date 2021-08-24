// @flow
import React from 'react'
import FilterableTables from './FilterableTables'

const CompanyTables = (props) => {
    return (
        <FilterableTables startingFilter={props.startingCompany ? props.startingCompany.toUpperCase() : null} filters={['RTS', 'PIGS', 'BOTH']}
            tables={[
                {
                    filter: 'RTS',
                    headers: props.headers.rts,
                    data: props.data.rts,
                    formatter: props.formatters.rts,
                    config: props.config.rts
                },
                {
                    filter: 'PIGS',
                    headers: props.headers.pigs,
                    data: props.data.pigs,
                    formatter: props.formatters.pigs,
                    config: props.config.pigs
                },
                {
                    filter: 'BOTH',
                    headers: props.headers.both,
                    data: props.data.both,
                    formatter: props.formatters.both,
                    config: props.config.both
                }
            ]}
        />
    )
}

export default CompanyTables
