import React from 'react'
import L from 'leaflet'
import { useEffect } from 'react'
export default function Map_test() {
    useEffect(() => {
        // let map = L.map("map", {
        //     // center: [39.90, 116.38],
        //     // zoom: 12,
        //     // minZoom: 2,
        //     // editable: true,
        //     // worldCopyJump: false,
        //     // mapChangeControl: true,
        //     // zoomControl: false
        //     
        // });
        // var map = L.map('map').setView([51.505, -0.09], 13);

        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // L.marker([51.5, -0.09]).addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
        let map = L.map('map').setView([39.9, 116.4], 18)

        L.tileLayer('https://webmap-tile.sf-express.com/MapTileService/rt?x={x}&y={y}&z={z}', {
        }).addTo(map)
        // map.setMapType("map");
        // map.attributionControl.setPrefix("");
        // map.attributionControl.setPosition("bottomleft");
        // L.control
        //     .zoom({
        //         position: "bottomright",
        //         zoomInTitle: "放大",
        //         zoomOutTitle: "缩小"
        //     })
        //     .addTo(map);
        // L.control.scale().addTo(map);
    }, [])
    return (
        <div >
            <div style={{ height: '100%', width: '100%' }}>
                <div className="map" id="map" style={{ height: '680px' }}>


                </div>
            </div>
        </div>
    )
}

