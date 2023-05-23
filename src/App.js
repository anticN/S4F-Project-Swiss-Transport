import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(true);

  const handleClick = event => {
    setIsActive(current => !current);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Schweizer öffentlicher Verkehr</h1>
      </header>
      <div className='main'>
        <div className='Choice'>
          <button className={isActive ? "activeChoiceButton" : "choiceButton"} onClick={handleClick}>Abfahrten</button>
          <button className={isActive ? "choiceButton" : "activeChoiceButton"} onClick={handleClick}>Verbindungen</button>
        </div>
        <div className='inputChoice'>
          <form>
            <label for="station">Station</label>
            <input type='text' name='station' className='inputfield' id='station' placeholder='Name der Station um die Abfahrten anzuzeigen'></input>
            <label for="date">Datum</label>
            <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0,10)}></input>
            <label for="time">Zeit</label>
            <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toISOString().slice(11,16)}></input>
            <button className='submitButton' type='submit'>Suchen</button>
          </form>
        </div>
        </div>
    </div>
  );
}

export default App;
