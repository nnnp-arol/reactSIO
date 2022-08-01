import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'


const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([{
    body: "message test",
    from: "user1"
  }])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: "me"
    }
    setMessages([newMessage, ...messages])
    setMessage('')
  }

  useEffect(() => {
    const receiveMessage = message => {
      setMessages([message, ...messages])
    }
    socket.on('message', receiveMessage)

    return () => {
    socket.off('message', receiveMessage)

    }
  }, [messages])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
        <button>send</button>
      </form>

      {
        messages.map((message, index) => {
          <div key={index}>
            <p>{message.from}: {message.body}</p>
          </div>
        })
      }
    </div>
  );
}

export default App;
