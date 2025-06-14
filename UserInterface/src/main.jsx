// We're calling in React — the main detective who builds our app.
import React from 'react'

// We also need ReactDOM — the assistant who helps React place things on the screen.
import ReactDOM from 'react-dom/client'

// Our main app used to be 'App.jsx', but now we’re using a new main path file called 'Routing'.
// So we’ll use that instead. (Imagine 'Routing' as the one who shows people around the website.)
import Routing from './routes/Routing'

// This is where all the styling and clothing of our app is kept.
import './index.css'

// Here's the main command: We’re finding the place in the HTML called ‘root’.
// That’s like the empty room where our React app will be built.
ReactDOM.createRoot(document.getElementById('root')).render(
  // We’re using StrictMode — it’s like hiring a coach who double-checks our app for mistakes.
  <React.StrictMode>
     {/* Instead of saying “App, start the show!”, we’re now saying “Routing, guide the users!”. */}
     <Routing/>
  </React.StrictMode>,
)
