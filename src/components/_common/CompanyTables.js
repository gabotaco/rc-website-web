// @flow
import React, {useState} from 'react'
import {ButtonGroup, Button} from 'reactstrap'
import CustomTable from './CustomTable'

const CompanyTables = (props) => {
    const [activeCompany, setActiveCompany] = useState(props.startingCompany || 'rts')

    return (
        <div>
            <ButtonGroup className="mb-2">
                <Button color="primary" active={activeCompany === 'rts'} onClick={() => setActiveCompany('rts')}>RTS</Button>
                <Button color="primary" active={activeCompany === 'pigs'} onClick={() => setActiveCompany('pigs')}>PIGS</Button>
                <Button color="primary" active={activeCompany === 'both'} onClick={() => setActiveCompany('both')}>BOTH</Button>
            </ButtonGroup>
            {activeCompany === 'rts' && <CustomTable headers={props.headers.rts} data={props.data.rts} format={props.formatters.rts} config={props.config.rts} />}
            {activeCompany === 'pigs' && <CustomTable headers={props.headers.pigs} data={props.data.pigs} format={props.formatters.pigs} config={props.config.pigs} />}
            {activeCompany === 'both' && <CustomTable headers={props.headers.both} data={props.data.both} format={props.formatters.both} config={props.config.both} />}
        </div>
    )
}

export default CompanyTables
