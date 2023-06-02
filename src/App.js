import { useState } from 'react';
//import Zug from '/icons/Zug_r.png';
import Image from "react";
import './App.css';

function App() {
  const [activeButton, setActiveButton] = useState("button1");
  const [content, setContent] = useState(`
        <label for="station">Station</label>
        <input type='text' name='station' class='inputfield' id='station' required placeholder='Name der Station um die Abfahrten anzuzeigen'></input>`
  );

  const [respContent, setRespContent] = useState("")

  function checkCategory(res, index) {
    switch (res.stationboard[index].category) {
      case "T":
        return `<img src="/icons/tram_r.png" alt="Tram" />`
        break;
      case "B":
        return `<img src='/icons/Bus_r.png' alt="Bus" />`
        break;
      case "S":
        return `<img src="/icons/zug_r.png" alt="S-Bahn" />`
        break;
      case "BAT":
        return `<img src="/icons/Schiff_r.png" alt="Boot" />`
        break;
      case "FUN":
        return `<img src="/icons/Standseilbahn_r.png" alt="Standseilbahn" />`
        break;
      case "M":
        return `<img src="/icons/Metro_r_de.png" alt="Metro" />`
        break;
      case "PB":
        return `<img src="/icons/Luftseilbahn_r.png" alt="Luftseilbahn" />`
        break;
        // todo add IC, IR, RE, EC, TGV etc.

    }
  }

  function handleStation(res, formData) {
    console.log(res);
    let stations = []
    for(let i = 0; i < res.stationboard.length; i++) {
      let dateTime = res.stationboard[i].passList[0].departure.split('T')
      let time = dateTime[1].split('+')
      stations.push(`
        <div class="responseTable">
          <p>${checkCategory(res, i)} ${res.stationboard[i].category}${res.stationboard[i].number} nach ${res.stationboard[i].to}</p>
          <p>Abfahrt am ${dateTime[0]} um ${time[0]}</p>
      </div>`)
    }
    setRespContent(`
    <h2 class="nextDepart">Abfahrten von ${res.station.name} am ${formData.get("date")} ab ${formData.get("time")}</h2>
    <div class='respContent'>
      ${stations.join('')}
    </div>
    `)
  }


  const handleClick = (button) => {
    setActiveButton(button);

    if (button === 'button1') {
      setContent(`
        <label for="station">Station</label>
        <input type='text' name='station' class='inputfield' id='station' required placeholder='Name der Station um die Abfahrten anzuzeigen'></input>
        `);
    } else if (button === 'button2') {
      setContent(`
      <label for="depart">Abfahrt</label>
        <input type='text' name='depart' class='inputfield2' id='depart' required placeholder='Name des Abfahrtorts'></input>
      <label for="arrive">Ankunft</label>
        <input type='text' name='arrive' class='inputfield2' id='arrive' required placeholder='Name des Ankunftsorts'></input>
      `)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // hier kommt der API request hin
    const formData = new FormData(e.target);
    const station = formData.get('station');
    console.log(station);
    if (activeButton === 'button1') {
      fetch(`http://transport.opendata.ch/v1/stationboard?station=${station}&datetime=${formData.get("date")} ${formData.get("time")}&limit=10`)
        .then(response => response.json())
        .then(data => handleStation(data, formData))
        //.then(data => handleStation(data))
        .catch(error => console.log(error));

    } else if (activeButton === 'button2') {
      fetch(`http://transport.opendata.ch/v1/connections?from=${formData.get("depart")}&to=${formData.get("arrive")}&date=${formData.get("date")}&time=${formData.get("time")}&limit=10`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Schweizer öffentlicher Verkehr</h1>
      </header>
      <div className='main'>
        <div className='Choice'>
          <button onClick={() => handleClick("button1")} className={activeButton === "button1" ? "active" : "choiceButton"} >Abfahrten</button>
          <button onClick={() => handleClick("button2")} className={activeButton === "button2" ? "active" : "choiceButton"}>Verbindungen</button>
        </div>
        <div className='inputChoice'>
          <form id='form' onSubmit={handleSubmit}>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
            <label for="date">Datum</label>
            <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0, 10)}></input>
            <label for="time">Zeit</label>
            <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toLocaleString().slice(10, 15)}></input>
            <button className='submitButton' type='submit'>Suchen</button>
          </form>
        </div>
        <div className='response'>
          <div className='respContent' dangerouslySetInnerHTML={{ __html: respContent }} />
        </div>
      </div>
    </div>
  );
}

export default App;
