import React from 'react';
import Map from './Map'

const businesses = require('../storages.json')

const BizMap = (props) => {
    return (
        <Map businesses={businesses} loaded={props.loaded} />
    )
}

export default BizMap
