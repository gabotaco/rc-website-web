import React, {useEffect, useState} from 'react';

import BizMap from "./BizMap"

const BizMapScreen = () => {
    const [loaded, setLoaded] = useState(false)

    useStyles(Styles.raw)
    useLink("https://unpkg.com/leaflet@1.6.0/dist/leaflet.css")

    useEffect(() => {
        document.title = `RC - Home`

        document.body.style = Styles.body

        const leafScript = useScript("https://unpkg.com/leaflet@1.6.0/dist/leaflet.js")
        leafScript.onload = () => {
            const layerScript = (useScript("https://cdn.jsdelivr.net/gh/Sumbera/gLayers.Leaflet@master/L.CanvasLayer.js"))
            layerScript.onload = () => {
                setLoaded(true)
            }
            document.body.appendChild(layerScript)
        }
        document.body.appendChild(leafScript)

        document.body.appendChild(useScript('/home/ttools/biz/map/js/map.js'))
    }, [])

    return (
        <BizMap loaded={loaded} />
    )
}

export default BizMapScreen

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