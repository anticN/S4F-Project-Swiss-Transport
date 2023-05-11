import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Schweizer öffentlicher Verkehr</h1>
      </header>
      <div className='Choice'>
        <button className='choiceButton'>Ort</button>
        <button className='choiceButton'>Abfahrten</button>
        <button className='choiceButton'>Verbindungen</button>
      </div>
      <div className='inputChoice'>
        <form>
          <label for="location">Ort</label>
          <input type='text' name='location' className='inputfield' id='location' placeholder='Name des Ortes um die Stationen anzuzeigen'></input>
          <label for="date">Datum</label>
          <input type='text' name='date' className="datetimefield" id='date' placeholder='yyyy-mm-dd' defaultValue={new Date().toISOString().slice(0,10)}></input>
          <label for="time">Zeit</label>
          <input type='text' name='time' className="datetimefield" id='time' placeholder='hh:mm' defaultValue={new Date().toISOString().slice(11,16)}></input>
          <button className='submitButton' type='submit'>Suchen</button>
        </form>
      </div>
    </div>
  );
}

export default App;
