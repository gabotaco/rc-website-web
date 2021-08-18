import {makeApiRequest} from "./makeApiRequest"

export const restartAlfred = () => {
    return makeApiRequest({
        method: 'GET',
        url: '/manager/restart'
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
