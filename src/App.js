import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <Home token={token} />
      )}
    </div>
  );
}

export default App;
