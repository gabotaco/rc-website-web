import { makeApiRequest } from "./makeApiRequest";

export const restartAlfred = () => {
	return makeApiRequest({
		method: "GET",
		url: "/alfred/restart"
	}).then(response => {
		if (response.ok) return response;
		else throw response;
	});
};

export const logoutUser = () => {
	return makeApiRequest({
		method: "GET",
		url: "/auth/logout"
	});
};

export const getPositions = server => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/positions/${server}`
	});
};

export const getTycoonData = uid => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/data?${uid ? `id=${uid}` : ""}`
	});
};

export const getInGameId = (discord_id) => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/id?${discord_id ? `discord_id=${discord_id}` : ""}`
	});
};

export const getTycoonBiz = uid => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/biz?${uid ? `id=${uid}` : ""}`
	});
};

export const getServerPlayers = server => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/players/${server}`
	});
};

export const getBennysList = () => {
	return makeApiRequest({
		method: "GET",
		url: "/benny/list"
	});
};

export const searchBennys = vehicle => {
	return makeApiRequest({
		method: "GET",
		url: `/benny/search?name=${vehicle}`
	});
};

export const getCharges = () => {
	return makeApiRequest({
		method: "GET",
		url: "/tycoon/key"
	});
};

export const getApplicantDetails = uid => {
	return makeApiRequest({
		method: "GET",
		url: `/applicant/${uid}/details`
	});
};

export const getIsInDiscord = company => {
	return makeApiRequest({
		method: "GET",
		url: `/discord?company=${company}`
	});
};

export const hire = (company, name, game_id, discord, app_id) => {
	return makeApiRequest({
		method: "POST",
		url: `/member/hire`,
		body: {
			name: name,
			member: game_id,
			company: company,
			discord: discord,
			app_id: app_id
		}
	});
};

export const apply = (
	in_game_name,
	in_game_id,
	referred_id,
	cooldown,
	play_per_week,
	company,
	country,
	why,
	anything
) => {
	return makeApiRequest({
		method: "POST",
		url: "/apply",
		body: {
			in_game_name: encodeURIComponent(in_game_name),
			in_game_id: in_game_id,
			referred_id: referred_id,
			cooldown: cooldown,
			play_per_week: play_per_week,
			company: company,
			country: encodeURIComponent(country),
			why: encodeURIComponent(why),
			anything: encodeURIComponent(anything)
		}
	});
};

export const calculatePayout = (member_id, vouchers, company) => {
	return makeApiRequest({
		method: "POST",
		url: `/payout/calculate`,
		body: {
			member_id: member_id,
			vouchers: vouchers,
			company: company
		}
	});
};

export const confirmPayout = payout_id => {
	return makeApiRequest({
		method: "POST",
		url: `/payout/confirm`,
		body: {
			payout_id: payout_id
		}
	});
};

export const getPayoutDetails = (vouchers, company) => {
	return makeApiRequest({
		method: "GET",
		url: `/payout/calculate?vouchers=${vouchers}&company=${company}`
	});
};

export const payManager = (manager, company) => {
	return makeApiRequest({
		method: "PATCH",
		url: `/manager/pay`,
		body: {
			manager: manager,
			company: company
		}
	});
};

export const getCurrentVehicles = () => {
	return makeApiRequest({
		method: "GET",
		url: "/tycoon/currentvehicles"
	});
};

export const getBackpack = (game_id) => {
	return makeApiRequest({
		method: "GET",
		url: `/tycoon/backpack?${game_id ? `id=${game_id}` : ""}`
	});
};

export const setPublicApiKey = key => {
	return makeApiRequest({
		method: "POST",
		url: "/publickey",
		body: {
			public_key: key
		}
	});
};
