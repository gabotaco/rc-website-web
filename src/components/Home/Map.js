import React, { useEffect } from 'react';

const Map = props => {
	useEffect(() => {
		if (props.loaded) {
			window.eval(
				`initMap(${JSON.stringify(props.members)}, ${JSON.stringify(
					props.managers
				)}, ${JSON.stringify(props.applicants)})`
			);
		}
	}, [props.loaded]);
	return (
		<div
			id="map"
			style={Styles.map}
			className="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
			tabIndex="0"
		/>
	);
};

export default Map;

const Styles = {
	map: {
		height: '100vh',
		position: 'relative',
		backgroundColor: '#0fa8d2',
	},
};
