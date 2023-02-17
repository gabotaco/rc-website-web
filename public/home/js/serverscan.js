const playerMarkers = {};

const CEOID = 81915;

function initPlayers() {
	let scanInt = setInterval(scanServers, 20000);
	scanServers();
	let scanInactInt = setInterval(scanInactivePlayers, 25000);
	setTimeout(() => {
		clearInterval(scanInt);
		clearInterval(scanInactInt);
		alert('Timed out after 5 minutes, refresh the page to continue.');
	}, 300000); // 5mins
}

function scanInactivePlayers(skipCheck = false) {
	if (Object.keys(playerMarkers).length === 0) return;

	for (const key in playerMarkers) {
		if (
			skipCheck === true ||
			Date.now() - playerMarkers[key].nova.timestamp > 7000
		) {
			map.removeLayer(playerMarkers[key]);
			delete playerMarkers[key];
		}
	}
}

function scanServers() {
	for (const checkbox of serversList) {
		getServerData(checkbox);
	}
	setTimeout(() => redrawTheMap(globalMapInfo), 500);
}

function getServerData(checkbox) {
	fetch(`/api/tycoon/positions/${checkbox[0]}`)
		.then(res => {
			if (!res.ok) throw res;
			return res.json();
		})
		.then(res => {
			let looptimestamp = Date.now();
			for (let i = 0; i < res.players.length; i++) {
				if (res.players[i][3] === null || !members.includes(res.players[i][2]))
					continue;
				if (res.players[i][0] === 'null') {
					map.removeLayer(playerMarkers[res.players[i][2]]);
					delete playerMarkers[res.players[i][2]];
					continue;
				}

				if (playerMarkers[res.players[i][2]] === undefined) {
					if (CEOID == res.players[i][2]) {
						var colorClass = 'rc-ceo';
						var colorCode = 'hsl(0, 0%, 0%)';
					} else if (managerIDs.includes(res.players[i][2])) {
						var colorClass = 'rc-manager';
						var colorCode = 'hsl(129, 100%, 74%)';
					} else if (res.players[i][5]['group'] == 'pigs_job') {
						var colorClass = 'pigs-heist';
						var colorCode = 'hsl(299, 100%, 83%)';
					} else if (
						res.players[i][5]['group'] == 'rts_job' ||
						res.players[i][5]['group'] == 'rts_job_air' ||
						res.players[i][5]['group'] == 'rts_professional'
					) {
						var colorClass = 'rts-heist';
						var colorCode = 'hsl(25, 100%, 65%)';
					} else if (memberDetails[res.players[i][2]].Company == 'Applicant') {
						var colorClass = 'rc-applicant';
						var colorCode = 'hsl(0, 100%, 86%)';
					} else {
						var colorClass = 'rc-member';
					}

					playerMarkers[res.players[i][2]] = L.marker(
						[res.players[i][3].y, res.players[i][3].x],
						{
							icon: generateIcon(res.players[i][4], res.players[i][5]),
						}
					)
						.addTo(map)
						.bindPopup(parsePlayerInfo(res.players[i], checkbox))
						.bindTooltip(
							generateTag(res.players[i][5]['group']) +
								res.players[i][0] +
								` {${checkbox[2]}}`,
							{
								permanent: true,
								interactive: true,
								offset: [0, -5],
								opacity: 0.8,
								direction: 'top',
								className: colorClass,
							}
						);

					if (followedMember == res.players[i][2]) {
						map.setView([res.players[i][3].y, res.players[i][3].x]);
					}

					playerMarkers[res.players[i][2]].nova = {
						gameid: res.players[i][0] + '#' + res.players[i][2],
						timestamp: looptimestamp,
						vehicle: res.players[i][4],
						job: res.players[i][5],
						positions: [
							{
								lat: res.players[i][3].y,
								lng: res.players[i][3].x,
							},
						],
					};

					if (colorCode) {
						playerMarkers[res.players[i][2]].nova.color = colorCode;
					}
				} else {
					playerMarkers[res.players[i][2]].nova.positions.push({
						lat: res.players[i][3].y,
						lng: res.players[i][3].x,
					});
					while (playerMarkers[res.players[i][2]].nova.positions.length > 6) {
						playerMarkers[res.players[i][2]].nova.positions.shift();
					}

					playerMarkers[res.players[i][2]].setLatLng({
						lat: res.players[i][3].y,
						lng: res.players[i][3].x,
					});
					playerMarkers[res.players[i][2]].nova.timestamp = looptimestamp;
					playerMarkers[res.players[i][2]].bindPopup(
						parsePlayerInfo(res.players[i], checkbox)
					);

					if (
						playerMarkers[res.players[i][2]].nova.vehicle['vehicle_model'] !==
						res.players[i][4]['vehicle_model']
					) {
						playerMarkers[res.players[i][2]].setIcon(
							generateIcon(res.players[i][4], res.players[i][5])
						);
					}

					if (followedMember == res.players[i][2]) {
						map.setView([res.players[i][3].y, res.players[i][3].x]);
					}
				}
			}
		})
		.catch(() => {
			// empty function

			return;
		});
}

function parsePlayerInfo(data, checkbox) {
	return `<div class="markerHead" data-ingameid="${data[2]}">Player Info</div>
            <b>In Game:</b> ${data[0]} (${data[2]})<hr>
            <b>Company:</b> ${memberDetails[data[2]].Company.toUpperCase()} ${
		managerIDs.includes(data[2])
			? '(Manager)'
			: memberDetails[data[2]].Company != 'Applicant'
			? `(${memberDetails[data[2]].Rank})`
			: ''
	}<hr>
            <b>Job:</b> ${data[5].name || 'N/A'}<hr>
            ${
							data[4]['vehicle_label'] === 'NULL'
								? ''
								: `<b>Vehicle</b>: ${data[4]['vehicle_name']} (${
										vehicle_classes[data[4]['vehicle_class']]
								  })<hr>`
						}
            <b>${checkbox[1]}</b> <a href="fivem://connect/${
		checkbox[3]
	}?pure_1" title="Join: ${checkbox[0]}">JOIN</a>`;
}
