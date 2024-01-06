import React from 'react'
import { useEffect } from 'react'
// import L from '../../../plugins/leaflet/leaflet'
import '../../../plugins/leaflet/leaflet'
import L from 'leaflet'
export default function Map() {
    useEffect(() => {
        //这里其实就是初始化一下，创建一个图层，并进行初始化
        var test = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
            maxZoom: 18,
            minZoom: 5
        }); 
        let map = L.map("map", {
            center: [39.90, 116.38],
            zoom: 12,
            layers: [test],
            minZoom: 2,
            editable: true,
            worldCopyJump: false,
            mapChangeControl: true,
            zoomControl: false
        });
        // L.control.layers(baseLayers, null).addTo(map);
        // map.setMapType("map");
        map.attributionControl.setPrefix("");
        map.attributionControl.setPosition("bottomleft");
        L.control
            .zoom({
                position: "bottomright",
                zoomInTitle: "放大",
                zoomOutTitle: "缩小"
            })
            .addTo(map);
        L.control.scale().addTo(map);
    }, [])
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div className="map" id="map" style={{ height: '800px' }}>
            </div>
        </div>
    )
}
