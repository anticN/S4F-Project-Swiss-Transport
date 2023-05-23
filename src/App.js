//import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {
  const [activeButton, setActiveButton] = useState("button1");
  const [content, setContent] = useState(`
    <form className="forms">
        <label for="station">Station</label>
        <input type='text' name='station' className='inputfield' id='station' placeholder='Name der Station um die Abfahrten anzuzeigen'></input>
        <label for="date">Datum</label>
        <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0,10)}></input>
        <label for="time">Zeit</label>
        <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toISOString().slice(11,16)}></input>
      <button className='submitButton' type='submit'>Suchen</button>
  </form>`);

  const handleClick = (button) => {
    setActiveButton(button);

    if (button === 'button1') {
      setContent(`
      <form>
        <label for="station">Station</label>
        <input type='text' name='station' className='inputfield' id='station' placeholder='Name der Station um die Abfahrten anzuzeigen'></input>
        <label for="date">Datum</label>
        <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0,10)}></input>
        <label for="time">Zeit</label>
        <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toISOString().slice(11,16)}></input>
    <button className={'submitButton'} type='submit'>Suchen</button>
  </form>`);
    }else if (button === 'button2') {
      setContent(`<form>
      <label for="depart">Abfahrt</label>
        <input type='text' name='depart' className='inputfield' id='depart' placeholder='Name des Abfahrtorts'></input>
      <label for="arrive">Ankunft</label>
        <input type='text' name='arrive' className='inputfield' id='arrive' placeholder='Name des Ankunftsorts'></input>
      <label for="date">Datum</label>
        <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0,10)}></input>
      <label for="time">Zeit</label>
        <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toISOString().slice(11,16)}></input>
    <button className='submitButton' type='submit'>Suchen</button>
  </form>`)
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
        <div className='inputChoice content' dangerouslySetInnerHTML={{ __html: content}} />
        </div>
    </div>
  );
}

export default App;
