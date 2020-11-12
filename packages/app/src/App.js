import './App.css';
import { useUser } from '@bufferapp/app-shell';

function App() {
  const user = useUser();
  console.log(user);
  return (
    <div className="App">
      <h1>Hey {user.email}!</h1>
      <p>Your feature flips are</p>
      <ul>
        {user.featureFlips.map(flip => <li>{flip}</li>)}
      </ul>
    </div>
  );
}

export default App;
