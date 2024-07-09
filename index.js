console.log(maplibregl.getVersion());

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);


console.log(location);

const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [9.191055668590025, 47.730026636912584],
    zoom: 8,
});

map.on("load", function () {
    map.addSource("geojson", {
        type: "geojson",
        data: `${location.protocol}//${location.host}${location.pathname}/polygon.geojson`,
    });


    map.addLayer({
        id: "geojson",
        type: "fill",
        source: "geojson",
        paint: {
            "fill-color": "red",
            "fill-opacity": 0.5

        },
    });

    map.addSource("pmtiles", {
        type: "vector",
        url: `pmtiles://${location.protocol}//${location.host}${location.pathname}polygon.pmtiles`,
    });

    map.addLayer({
        id: "pmtiles",
        type: "fill",
        source: "pmtiles",
        "source-layer": "polygon",
        layout: {},
        paint: {
            "fill-color": "green",
            "fill-opacity": 0.5
        },
    });

    map.flyTo({
        center: [9.191055668590025, 47.730026636912584],
        zoom: 14,
        duration: 5000
    })
});

