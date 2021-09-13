import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  console.log("maaaappp func",countries);
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        
        {/* loop through all the countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
        
      </LeafletMap>
    </div>
  );
}

export default Map;