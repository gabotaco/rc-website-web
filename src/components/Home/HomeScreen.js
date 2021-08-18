import React, {useEffect} from 'react';
import PlayerMap from "./PlayerMap"

const HomeScreen = () => {

    useStyles(Styles.raw)
    useLink("https://unpkg.com/leaflet@1.6.0/dist/leaflet.css")

    useEffect(() => {
        document.title = `RC - Home`

        document.body.style = Styles.body    

        const leafScript = useScript("https://unpkg.com/leaflet@1.6.0/dist/leaflet.js")
        leafScript.onload = () => {
            document.body.appendChild(useScript("https://cdn.jsdelivr.net/gh/Sumbera/gLayers.Leaflet@master/L.CanvasLayer.js"))
        }
        document.body.appendChild(leafScript)
        
        document.body.appendChild(useScript('/app/js/map.js'))
        document.body.appendChild(useScript("/app/js/icons.js"))
        document.body.appendChild(useScript("/app/js/hud.js"))
        document.body.appendChild(useScript("/app/js/markers.js"))
        document.body.appendChild(useScript("/app/js/serverscan.js"))
        document.body.appendChild(useScript("/app/js/canvas.js"))
    }, [])

    return (
        <PlayerMap />
    )
}

export default HomeScreen

const Styles = {
    body: {
        overflow: 'hidden'
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
    `
}

function useScript(url) {
    const script = document.createElement("script")

    script.src = url;
    
    return script;
}

function useLink(url) {
    useEffect(() => {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = url

        document.body.appendChild(link)

        return () => {
            document.body.removeChild(link)
        }
    }, [url])
}

function useStyles(body) {
    useEffect(() => {
        const style = document.createElement("style")
        style.innerHTML = body

        document.body.appendChild(style)

        return () => {
            document.body.removeChild(style)
        }
    }, [body])
}