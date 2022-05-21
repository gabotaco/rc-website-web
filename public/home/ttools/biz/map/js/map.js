function initMap(businesses) {
    if (!document.getElementById("navbar")) {
        return setTimeout(() => {
            initMap(businesses)
        }, 500);
    }
    const mapFolder = "/home/images/maps/";
    const customEmojiFolder = "/home/images/bizblips/"

    const isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

    var hdMap = !isMobileDevice;
    var imglink = (hdMap === true ? mapFolder + "updatedmap.png" : mapFolder + "updatedmobilemap.png");
    console.log(imglink)

    const mapdiv = document.getElementById("map");

    window.onresize = function (event) {
        mapdiv.style.height = window.innerHeight - document.getElementById("navbar").offsetHeight + "px";
    };

    mapdiv.style.height = window.innerHeight - document.getElementById("navbar").offsetHeight + "px";

    const map = L.map('map', {
        maxZoom: 2,
        minZoom: -4.5,
        zoomSnap: 0.25,
        crs: L.CRS.Simple
    });

    var bounds = [[-4642, -6296], [8958, 7318]];
    L.imageOverlay(imglink, bounds).addTo(map);
    map.fitBounds(bounds);

    function createDataIcon(name) {
        return L.icon({
            iconUrl: `${customEmojiFolder}${name}.png`,
            iconSize: [22, 23],
            iconAnchor: [11, 11.5],
            popupAnchor: [0, 0]
        });
    }
    function formatNumber(num) {
        if (!num) return "0"
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //fancy regex
    }
    function capitalizeString(special) {

        if (special.includes("_")) {
            let cap = ""
            special.split("_").forEach(word => {
                cap += capitalizeString(word) + " "
            });
            return cap
        } else {
            return special.charAt(0).toUpperCase() + special.slice(1)

        }
    }

    const validTypes = ["special", "garage", "atm", "spawn", "helipad", "jobcenter", "vehicle", "market", "marina", "repair", "self_storage", "boatshop", "marketplace", "fuel", "casino", "hangar", "biz_collection", "self_storage_train"]

    const bizParam = new URLSearchParams(window.location.search).get("biz");

    let biz = [];

    businesses.forEach(business => {
        if (bizParam) {
            if (business.name.includes(bizParam) || business.id.includes(bizParam) || business.position.name.includes(bizParam)) {
                biz.push(business)
            }
        } else {
            biz.push(business)
        }
    });

    biz.forEach(business => {
        L.marker([business.position.y, business.position.x], {
            icon: createDataIcon("position")
        }).addTo(map).bindPopup(`<div class="markerHead">Business</div>
<b>Name:</b> ${business.position.name}<hr><b>Bonus:</b> $${formatNumber(business.bonus)}<hr><b>Cost:</b> $${formatNumber(business.cost)}<hr><b>Level:</b> ${business.visuallvl}`).bindTooltip("Business", {
            offset: [0, -5],
            opacity: 0.8,
            direction: "top"
        });

        business.special.forEach(special => {
            if (validTypes.includes(special.type)) {
                L.marker([special.y || special.outside.y, special.x || special.outside.x], {
                    icon: createDataIcon(special.type)
                }).addTo(map).bindPopup(`<div class="markerHead">Business Bonus</div>
<b>Name:</b> ${special.name}<hr><b>Type:</b> ${capitalizeString(special.type)}`).bindTooltip(capitalizeString(special.type), {
                    offset: [0, -5],
                    opacity: 0.8,
                    direction: "top"
                });
            }
        });
    });

    if (biz.length == 1) {
        map.setView([biz[0].position.y, biz[0].position.x], -1)
    }
}