import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'


const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMessage(e.target.value)}/>
        <button>send</button>
      </form>
    </div>
  );
}

export default App;
