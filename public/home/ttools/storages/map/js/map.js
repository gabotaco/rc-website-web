function initMap(storages) {
	if (!document.getElementById('navbar')) {
		return setTimeout(() => {
			initMap(storages);
		}, 500);
	}
	const mapFolder = '/home/images/maps/';
	const customEmojiFolder = '/home/images/bizblips/';

	const isMobileDevice =
		typeof window.orientation !== 'undefined' ||
		navigator.userAgent.indexOf('IEMobile') !== -1;

	var hdMap = !isMobileDevice;
	var imglink =
		hdMap === true
			? mapFolder + 'updatedmap.png'
			: mapFolder + 'updatedmobilemap.png';
	console.log(imglink);

	const mapdiv = document.getElementById('map');

	window.onresize = function (event) {
		mapdiv.style.height =
			window.innerHeight -
			document.getElementById('navbar').offsetHeight +
			'px';
	};

	mapdiv.style.height =
		window.innerHeight - document.getElementById('navbar').offsetHeight + 'px';

	const map = L.map('map', {
		maxZoom: 2,
		minZoom: -4.5,
		zoomSnap: 0.25,
		crs: L.CRS.Simple,
	});

	var bounds = [
		[-4642, -6296],
		[8958, 7318],
	];
	L.imageOverlay(imglink, bounds).addTo(map);
	map.fitBounds(bounds);

	function createDataIcon(name) {
		return L.icon({
			iconUrl: `${customEmojiFolder}${name}.png`,
			iconSize: [22, 23],
			iconAnchor: [11, 11.5],
			popupAnchor: [0, 0],
		});
	}
	function formatNumber(num) {
		if (!num) return '0';
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //fancy regex
	}
	function capitalizeString(special) {
		if (special.includes('_')) {
			let cap = '';
			special.split('_').forEach(word => {
				cap += capitalizeString(word) + ' ';
			});
			return cap;
		} else {
			return special.charAt(0).toUpperCase() + special.slice(1);
		}
	}

	const strParam = new URLSearchParams(window.location.search).get('storage');

	let str = [];

	Object.keys(storages).forEach(storage => {
		if (strParam) {
			if (
				storages[storage].name.includes(strParam) ||
				storages[storage].id.includes(strParam)
			) {
				str.push(storages[storage]);
			}
		} else {
			str.push(storages[storage]);
		}
	});

	str.forEach(storage => {
		L.marker([storage.storage_locations[0].y, storage.storage_locations[0].x], {
			icon: createDataIcon('self_storage'),
		})
			.addTo(map)
			.bindPopup(
				`<div class="markerHead">${storage.name}</div><hr>
<b>Size:</b>${formatNumber(storage.size)}<br/><b>Cost:</b> $${formatNumber(
					storage.cost
				)}<br/><b>Fee:</b> $${storage.fee / 100}`
			)
			.bindTooltip(storage.name, {
				offset: [0, -5],
				opacity: 0.8,
				direction: 'top',
			});
	});

	if (str.length == 1) {
		map.setView(
			[str[0].storage_locations[0].y, str[0].storage_locations[0].x],
			-1
		);
	}
}
