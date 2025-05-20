import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ setToken }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usuario || !contrasenna) {
      setError('Usuario o contraseña vacíos');
      return;
    }

    try {
      const response = await axios.post('https://massielrojas3227-001-site1.dtempurl.com/Cuenta/token', {
        usuario,
        contrasenna,
      });
      setToken(response.data.token);
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Ingresar Credenciales</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasenna}
            onChange={(e) => setContrasenna(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;
