import AppConfigs from "../../config/app_configs";

const apiHeaders = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
}

const getUrl = (uri) => {
    return AppConfigs.server_url+uri
}


export const makeApiRequest = (params) => {
    return fetch(getUrl(params.url), {
        method: params.method,
        headers: apiHeaders,
        body: params.body,
        credentials: 'include'
    })
    .then((response) => {
		if(response.ok) {
			return response.json()
		} else {
			throw response
		}
	}).catch((error) => {
        throw new Error(error)
	})
}