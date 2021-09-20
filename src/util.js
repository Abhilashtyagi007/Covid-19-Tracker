import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 80,
  },
  active: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 100,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 150,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 100,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);


};

// draw circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType = "cases", backgroundImage) =>
  //console.log("inUtil",typeof(data));

  data.map((country) => (

    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.3}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='info-container'>

          <div className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />

          <div className="info-name">{country.country}</div>

          <div className="info-active">Active: {numeral(country.active).format("0,0")}</div>

          <div className="info-confirmed">Case: {numeral(country.cases).format("0,0")}</div>

          <div className="info-recovered">Recovery: {numeral(country.recovered).format()}</div>

          <div className="info-deaths">Death: {numeral(country.deaths).format("0,0")}</div>

        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0"


