import React, { useEffect, useState } from 'react';

import BizMap from './BizMap';

const BizMapScreen = () => {
	const [loaded, setLoaded] = useState(false);

	useStyles(Styles.raw);
	useLink('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');

	useEffect(() => {
		document.title = `RC - Home`;

		document.body.style = Styles.body;

		let localJs = false;
		let tries = 0;

		const leafScript = document.createElement('script');

		leafScript.src = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js';

		leafScript.onload = () => {
			loadScript(
				'https://cdn.jsdelivr.net/gh/Sumbera/gLayers.Leaflet@master/L.CanvasLayer.js'
			).then(() => {
				if (localJs) {
					setLoaded(true);
				} else {
					const int = setInterval(() => {
						if (localJs) {
							setLoaded(true);
						}

						// 1 minute
						if (tries > 120) {
							clearInterval(int);
						}

						tries++;
					}, 500);
				}
			});
		};
		document.body.appendChild(leafScript);

		loadScript('/home/ttools/biz/map/js/map.js').then(() => {
			localJs = true;
		});
	}, []);

	return <BizMap loaded={loaded} />;
};

export default BizMapScreen;

const Styles = {
	body: {
		overflow: 'hidden',
	},
	raw: `
    .dropdown-menu {
        width: 100%;
    }

    .rc-member {
        background: #ffffff;
        color: black;
    }

    .rc-manager {
        background: #7aff8e;
        color: black;
    }

    .rc-ceo {
        background: #000000;
        color: white;
    }

    .pigs-heist {
        background: #fea6ff;
        color: black;
    }

    .rts-heist {
        background: #ff974d;
        color: black;
    }

    .rc-applicant {
        background: #ffbaba;
        color: black;
    }
    `,
};

function loadScript(url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;

		script.onload = resolve;
		script.onerror = reject;

		document.body.appendChild(script);
	});
}

function useLink(url) {
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;

		document.body.appendChild(link);

		return () => {
			document.body.removeChild(link);
		};
	}, [url]);
}

function useStyles(body) {
	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = body;

		document.body.appendChild(style);

		return () => {
			document.body.removeChild(style);
		};
	}, [body]);
}
