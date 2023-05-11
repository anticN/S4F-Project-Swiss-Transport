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
        <label for="location">Ort</label>
        <input type='text' name='location' className='inputfield' id='location' placeholder='Name des Ortes um die Stationen anzuzeigen'></input>
      </div>
    </div>
  );
}

export default App;
