import { useState } from 'react';
import './App.css';

function App() {
  const [activeButton, setActiveButton] = useState("button1");
  const [content, setContent] = useState(`
        <label for="station">Station</label>
        <input type='text' name='station' class='inputfield' id='station' required placeholder='Name der Station um die Abfahrten anzuzeigen'></input>`
  );

  const [respContent, setRespContent] = useState(`<h2 class="nextDepart">Geben Sie eine Station ein um die Abfahrten anzuzeigen</h2>
  <h4>Es kann sein, dass der erste Request ein wenig länger dauert.</h4>`);

  const [details, setDetails] = useState(false);

  function returnCategory(category) {
    switch (category) {
      case "T":
        return `<img src="/icons/Tram_r.png" alt="Tram" />`
      case "B":
        return `<img src='/icons/Bus_r.png' alt="Bus" />`
      case "S":
        return `<img src="/icons/Zug_r.png" alt="S-Bahn" />`
      case "BAT":
        return `<img src="/icons/Schiff_r.png" alt="Boot" />`
      case "FUN":
        return `<img src="/icons/Standseilbahn_r.png" alt="Standseilbahn" />`
      case "M":
        return `<img src="/icons/Metro_r_de.png" alt="Metro" />`
      case "PB":
        return `<img src="/icons/Luftseilbahn_r.png" alt="Luftseilbahn" />`
      case "ICE":
        return `<img src="/icons/ice.svg" alt="ICE" />`
      case "IC":
        return `<img src="/icons/ic.svg" alt="IC" />`
      case "IR":
        return `<img src="/icons/ir.svg" alt="IR" />`
      case "RE":
        return `<img src="/icons/re.svg" alt="RE" />`
      case "TGV":
        return `<img src="/icons/tgv.svg" alt="TGV" />`
      default:
        return `default`
        // todo EC etc.
      }
  }

  function checkCategory(res, index, jIndex=0) {
    // überprüft die Kategorie des Verkehrsmittels und gibt das passende Icon zurück
    if (res.stationboard){
      return returnCategory(res.stationboard[index].category)
    }else if (res.connections) {
      return returnCategory(res.connections[index].sections[jIndex].journey.category)
    }
  }


  function checkGleisKante(res, index) {
    // Gibt das Gleis/Kante zurück, wenn es vorhanden ist
    if (res.stationboard){
      if(res.stationboard[index].passList[0].platform !== null) {
        return `, auf Gleis/Kante <span class="important">${res.stationboard[index].passList[0].platform}</span>`
      }else{
        return ``
      }
    }else if(res.connections) {
      if(res.connections[index].from.platform !== null) {
        return `, auf Gleis/Kante <span class="important">${res.connections[index].from.platform}</span>`
      }else{
        return ``
      }
    }
  }

  function checkDelay(res, index) {
    // überprüft ob es Verspätungen bei einer Abfahrt gibt
    if(res.stationboard){
      if(res.stationboard[index].passList[0].delay === 0 || res.stationboard[index].passList[0].delay === null) {
        return ``
      }else{
        return `<span style="color: red;"><b> +${res.stationboard[index].passList[0].delay}</b></span>`
      }

    }else if (res.connections) {
      if(res.connections[index].from.delay === 0 || res.connections[index].from.delay === null) {
        return ``
      }else{
        return `<span style="color: red;"><b> +${res.connections[index].from.delay}</b></span>`
      }
    }
  }

  function checkDuration(duration) {
    if(duration[0]==="00"){
      return `${duration[1]}min`
    }else{
      return `${duration[0]}h ${duration[1]}min`
    }
  }

  function handleStation(res, formData) {
    // überprüft ob eine Station gefunden wurde
    if (res.station.name === null) {
      setRespContent(`<h2 class="nextDepart">Keine Station gefunden</h2>`)
    }else{
      console.log(res);
    let stations = []
    // erstellt die HTML Elemente für die Abfahrten
    for(let i = 0; i < res.stationboard.length; i++) {
      let dateTime = res.stationboard[i].passList[0].departure.split('T')
      let time = dateTime[1].split('+')
      stations.push(`
        <div class="responseTable" id="resp${i}" onclick="(${handleDivClick})()">
          <p>${checkCategory(res, i)} <span class="important">${res.stationboard[i].category}${res.stationboard[i].number}</span> nach ${res.stationboard[i].to}</p>
          <p>Abfahrt am <span class="important">${dateTime[0]}</span> um <span class="important">${time[0]}</span>${checkDelay(res, i)}${checkGleisKante(res, i)}</p>
      </div>`)
    }
    setRespContent(`
    <h2 class="nextDepart">Abfahrten von ${res.station.name} am ${formData.get("date")} ab ${formData.get("time")}</h2>
    <div class='respContent'>
      ${stations.join('')}
    </div>
    `)
    }
  }

  // Verbindungen anzeigen
  function handleConnection(res, formData) {
    if (res.from.name === null || res.to.name === null) {
      setRespContent(`<h2 class="nextDepart">Keine Verbindungen gefunden</h2>`)
    }else{
      console.log(res);
      let connections = []
      for(let i = 0; i < res.connections.length; i++) {
        for(let j = 0; j < res.connections[i].sections.length; j++){
          //hier kommt noch ein for loop für die sections hin
        let dateTime = res.connections[i].from.departure.split('T')
        let time = dateTime[1].split('+')
        let duration = res.connections[i].duration.split('d')
        let split_dur = duration[1].split(':')
        // <p>Dauer: <span class="important">${checkDuration(split_dur)}</span></p>
        connections.push(`
          <div class="responseTable" id="resp${i}" onclick=${handleDivClick()}>
            <p>${checkCategory(res, i, j)} <span class="important">${res.connections[i].sections[j].journey.category}${res.connections[i].sections[j].journey.number}</span> nach ${res.connections[i].sections[j].journey.to}</p>
            <p>Abfahrt am <span class="important">${dateTime[0]}</span> um <span class="important">${time[0]}</span>${checkDelay(res, i)}${checkGleisKante(res, i)}</p>
        </div>`)
      }
      setRespContent(`
      <h2 class="nextDepart">Verbindungen von ${res.from.name} nach ${res.to.name} am ${formData.get("date")} ab ${formData.get("time")}</h2>
      <div class='respContent'>
        ${connections.join('')}
      </div>
      `)
      }
        
    }
  }

  const handleDivClick = () => {
    setDetails(!details)
    return (
      <div className="details">
        {respContent}
        <p>Test</p>
      </div>
    )
  }

  const handleClick = (button) => {
    // ändert den aktiven Button und den Inhalt des Formulars
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
    // verhindert das Neuladen der Seite und ruft die Funktionen für die API Requests auf
    e.preventDefault();
    // setzt den Ladebildschirm
    setRespContent(`<div class="loading-wave">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>
`)

    // hier kommt der API request hin
    const formData = new FormData(e.target);
    const station = formData.get('station');
    
    if (activeButton === 'button1') {
      console.log(station);
      fetch(`http://transport.opendata.ch/v1/stationboard?station=${station}&datetime=${formData.get("date")} ${formData.get("time")}&limit=10`)
        .then(response => response.json())
        .then(data => handleStation(data, formData))
        .catch(error => setRespContent(`<h2 class="nextDepart" style="color: red;">Es ist ein Fehler aufgetreten</h2>`));

    } else if (activeButton === 'button2') {
      fetch(`http://transport.opendata.ch/v1/connections?from=${formData.get("depart")}&to=${formData.get("arrive")}&date=${formData.get("date")}&time=${formData.get("time")}&limit=10`)
        .then(response => response.json())
        .then(data => handleConnection(data, formData))
        .catch(error => setRespContent(`<h2 class="nextDepart" style="color: red;">Es ist ein Fehler aufgetreten</h2>`));
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
            <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}></input>
            <button className='submitButton' type='submit' id='btn'>Suchen</button>
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
