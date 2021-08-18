function createGUIblock(callback) {
    map.addControl(new(L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            return callback(L.DomUtil.create("div"));
        }
    })));
}

function initGUI() {
    createGUIblock(DIVBLOCK => {

        DIVBLOCK.innerHTML = `
        <div class="divBlock">
            <input type='text' id="findplayerinputfield" placeholder="Find player by ID" class="form-control form-control-sm">
        </div>
        `;

        return DIVBLOCK;
    });

    createGUIblock(DIVBLOCK => {
        DIVBLOCK.innerHTML = `
        <div class="divBlock">
        <button type="button" class="btn btn-pigs" data-toggle="button" aria-pressed="false" autocomplete="off" onclick="togglePIGSLocations()">
        Toggle Heist Locations
      </button>
        </div>`

        return DIVBLOCK
    })

    createGUIblock(DIVBLOCK => {
        DIVBLOCK.innerHTML = `
        <input type="button" value="Spawner Toggles" onclick="toggleGUIblock(this);return;" class="toggleButton btn btn-rts">
        <div class="divBlock">
            <div class="btn-group-vertical">
                <button onclick="toggleRtsCar()" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false">
                    Car Spawners
                </button>
                <button onclick="toggleRtsHeavy()" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false">
                    Heavy Spawners
                </button>
                <button onclick="toggleAviator()" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false">
                    Aviator Spawners
                </button>
            </div>
        </div>`

        toggleGUIblock(DIVBLOCK.children[0])

        return DIVBLOCK
    })

    document.getElementById('findplayerinputfield').onkeypress = function (e) {
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            findplayer(e.target.nextSibling);
            return false;
        }
    }

    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            // const overalDiv = L.DomUtil.create('div', 'leaflet-control-attribution leaflet-control')
            // overalDiv.innerHTML = `<a href="http://ttmap.online/" title="The original TT Map" style="outline: currentcolor none medium;">TTMap</a>`

            // return overalDiv;
        },

        onRemove: function (map) {
            // Nothing to do here
        }
    });

    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    }

    L.control.watermark({
        position: 'bottomleft'
    }).addTo(map);
}

function toggleGUIblock(el) {
    el.nextElementSibling.style.display = (el.nextElementSibling.style.display === "none" ? "block" : "none");
}

const playerTooltipClass = document.createElement("style")
playerTooltipClass.type = "text/css"
playerTooltipClass.innerHTML = ".player-tooltip {display: block !important;}"
document.getElementsByTagName('head')[0].appendChild(playerTooltipClass);

function togglePlayerToolTips() {
    (playerTooltipClass.innerHTML == ".player-tooltip {display: block !important;}" ? playerTooltipClass.innerHTML = ".player-tooltip {display: none !important;}" : playerTooltipClass.innerHTML = ".player-tooltip {display: block !important;}")
}

const pigsLocationClass = document.createElement("style")
pigsLocationClass.type = "text/css"
pigsLocationClass.innerHTML = '.heist {display: none !important;}'
document.getElementsByTagName('head')[0].appendChild(pigsLocationClass);

function togglePIGSLocations() {
    (pigsLocationClass.innerHTML == '.heist {display: none !important;}' ? pigsLocationClass.innerHTML = '.heist {display: block !important;}' : pigsLocationClass.innerHTML = '.heist {display: none !important;}')
}

const rtsHqClass = document.createElement("style")
rtsHqClass.type = "text/css"
rtsHqClass.innerHTML = ".rts-hq {display: block !important;}"
document.getElementsByTagName('head')[0].appendChild(rtsHqClass);

function toggleRtsHQ() {
    (rtsHqClass.innerHTML == '.rts-hq {display: none !important;}' ? rtsHqClass.innerHTML = '.rts-hq {display: block !important;}' : rtsHqClass.innerHTML = '.rts-hq {display: none !important;}')
}

const rtsCarClass = document.createElement("style")
rtsCarClass.type = "text/css"
rtsCarClass.innerHTML = ".rts-car-spawner {display: none !important;}"
document.getElementsByTagName('head')[0].appendChild(rtsCarClass);

function toggleRtsCar() {
    (rtsCarClass.innerHTML == '.rts-car-spawner {display: none !important;}' ? rtsCarClass.innerHTML = '.rts-car-spawner {display: block !important;}' : rtsCarClass.innerHTML = '.rts-car-spawner {display: none !important;}')
}

const rtsHeavyClass = document.createElement("style")
rtsHeavyClass.type = "text/css"
rtsHeavyClass.innerHTML = ".rts-heavy-spawner {display: none !important;}"
document.getElementsByTagName('head')[0].appendChild(rtsHeavyClass);

function toggleRtsHeavy() {
    (rtsHeavyClass.innerHTML == '.rts-heavy-spawner {display: none !important;}' ? rtsHeavyClass.innerHTML = '.rts-heavy-spawner {display: block !important;}' : rtsHeavyClass.innerHTML = '.rts-heavy-spawner {display: none !important;}')
}

const rtsAviatorClass = document.createElement("style")
rtsAviatorClass.type = "text/css"
rtsAviatorClass.innerHTML = ".rts-aviator-spawner {display: none !important;}"
document.getElementsByTagName('head')[0].appendChild(rtsAviatorClass);

function toggleAviator() {
    (rtsAviatorClass.innerHTML == '.rts-aviator-spawner {display: none !important;}' ? rtsAviatorClass.innerHTML = '.rts-aviator-spawner {display: block !important;}' : rtsAviatorClass.innerHTML = '.rts-aviator-spawner {display: none !important;}')
}

const pigsHqClass = document.createElement("style")
pigsHqClass.type = "text/css"
pigsHqClass.innerHTML = ".pigs-hq {display: block !important;}"
document.getElementsByTagName('head')[0].appendChild(pigsHqClass);

function togglePigsHq() {
    (pigsHqClass.innerHTML == '.pigs-hq {display: none !important;}' ? pigsHqClass.innerHTML = '.pigs-hq {display: block !important;}' : pigsHqClass.innerHTML = '.pigs-hq {display: none !important;}')
}

function findplayer(input) {
    if (!input.previousSibling.value) return;
    let found = Object.values(playerMarkers).find(item => (item.nova.gameid).toLowerCase().includes((input.previousSibling.value).toLowerCase()));
    if (found) {
        input.previousSibling.style.backgroundColor = "lime";
        map.flyTo(found._latlng, -1, {
            animate: true,
            duration: .5
        });
        return false;
    } else {
        input.previousSibling.style.backgroundColor = "red";
    }

}

var players_showBoxes = true;
const customstyle = document.createElement('style');
customstyle.type = "text/css";
document.head.append(customstyle);