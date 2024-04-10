import { useContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { AuthContext } from '../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
      })
      .then(() => {
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Ironhacker123!"
            value={username}
            onChange={handleUsername}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div>
          If you do not have an account yet, you can create your account{' '}
          <Link to={'/signup'}>here</Link>
        </div>
      </Container>
    </div>
  );
}
export default Login;
