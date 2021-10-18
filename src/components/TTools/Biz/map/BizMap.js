import React from 'react';
import Map from './Map'

const businesses = require('../businesses.json')

const BizMap = (props) => {
    return (
        <Map businesses={businesses} loaded={props.loaded} />
    )
}

export default BizMap
