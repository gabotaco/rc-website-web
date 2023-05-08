import Map from './Map';
import React from 'react';

const storages = require('../storages.json');

const StorageMap = props => {
	return <Map storages={storages} loaded={props.loaded} />;
};

export default StorageMap;
