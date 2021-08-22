import {makeApiRequest} from "./makeApiRequest"

export const restartAlfred = () => {
    return makeApiRequest({
        method: 'GET',
        url: '/alfred/restart'
    }).then((response) => {
        if (response.ok) return response;
        else throw response;
    })
}

export const logoutUser = () => {
    return makeApiRequest({
        method: 'GET',
        url: '/auth/logout'
    })
}

export const getPositions = (server) => {
    return makeApiRequest({
        method: 'GET',
        url: `/tycoon/positions/${server}`
    })
}

export const getTycoonData = (uid) => {
    return makeApiRequest({
        method: 'GET',
        url: `/tycoon/data?${uid ? `id=${uid}` : ''}`
    })
}

export const getServerPlayers = (server) => {
    return makeApiRequest({
        method: 'GET',
        url: `/tycoon/players/${server}`
    })
}

export const getBennysList = () => {
    return makeApiRequest({
        method: 'GET',
        url: '/benny/list'
    })
}

export const searchBennys = (vehicle) => {
    return makeApiRequest({
        method: 'GET',
        url: `/benny/search?name=${vehicle}`
    })
}

export const getCharges = () => {
    return makeApiRequest({
        method: 'GET',
        url: '/tycoon/key'
    })
}

export const getApplicantDetails = (uid) => {
    return makeApiRequest({
        method: 'GET',
        url: `/applicant/${uid}/details`
    })
}

export const hire = (company, name, game_id, discord, app_id) => {
    return makeApiRequest({
        method: 'POST',
        url: `/member/hire`,
        body: {
            name: name,
            member: game_id,
            company: company,
            discord: discord,
            app_id: app_id
        }
    })
}