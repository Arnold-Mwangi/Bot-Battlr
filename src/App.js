import './App.css';
import BotContext from './BotContext';


function App() {
  return (
    <div className="App"  style={{
      overflowY: 'auto', // Add vertical scroll if the content overflows
      maxHeight: '100vh', // Set the maximum height of the container
  }}>
     
      <BotContext />
    </div>
  );
}

export default App;
