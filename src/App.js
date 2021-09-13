import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Card } from 'antd';



function App() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(response.data)

    };
    loadCountries();

  },[]);
 
   
  const searchCountries = (text) =>{
    let matches = countries.filter((country) => {
      const regex = new RegExp(`${text}`,'gi');
      return country.name.match(regex) || country.capital.match(regex);
    });
    setCountryMatch(matches);
  }


     
  
  return (
    <div className="container text-center">
      <div className="row">
      <div className="col">
      <h2 className="text-center">Country Search</h2>
      <Input className="text-center" style={{ width: '40%', marginTop: '10px'}} 
      placeholder='Enter Country or Capital Name'
      onChange={(e) => searchCountries(e.target.value)}
      />
      {countryMatch && countryMatch.map((item,index) => (
        <div className="d-flex justify-content-center" key ={index} style={{  marginTop: '5px',textAlign: 'center'}}>
      
          <Card  style={{ width: '30%', marginTop: '5px', backgroundColor: 'blue',borderRadius: '3px',color: 'whitesmoke'}} title= {`country: ${item.name}`}>
             capital: {item.capital} 
          </Card>
          
        </div>
        
      ) )}
    </div>
    
    </div>
    </div>
  );
}

export default App;
