import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 20.593683, lng: 78.962883 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then((data) => {
        setCountryInfo(data);

      })
  }, []);

  useEffect(() => {
    //the code inside here will run once 
    //when the component loads and not again

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res => res.json()))
        .then((data) => {
          console.log("appp", data)
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ));
          //for table of total cases
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    }

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ?
      "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(res => res.json())
      .then((data) => {
        setCountry(countryCode);
        //all of the data from the country response
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });

  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              {/* loop through all the countries and show a drop down */}
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>  {country.name} </MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>


        <div className="app__stats">

          {/* infobox corona cases*/}
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />

          <InfoBox
            isRed
            active={casesType === 'active'}
            onClick={e => setCasesType("active")}
            title="Active Cases"
            cases={prettyPrintStat(countryInfo.active)}
          />

          {/* infobox recovery*/}
          <InfoBox
            active={casesType === "recovered"}
            onClick={e => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />

          {/* infobox death*/}
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={e => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />

        </div>

        {/* map */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>
      <Card className="app__right">
        <CardContent>
          <div className="table">
            {/* table  */}
            <h3>Live cases by Country</h3>
            <Table countries={tableData} />
          </div>



          {/* graph */}
          <div className="graph">
            <h3>Worldwide new {casesType}</h3>

            <LineGraph className="app__graph" casesType={casesType} />
          </div>

        </CardContent>

      </Card>
    </div>
  );
}

export default App;
