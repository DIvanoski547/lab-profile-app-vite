import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import authService from '../services/auth.service';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlecampus = (e) => setCampus(e.target.value);
  const handlecourse = (e) => setCourse(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password, campus, course };

    authService
      .signup(requestBody)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
       const errorMessage = error.response.data.message;
       setErrorMessage(errorMessage);
      });
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
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

        <label htmlFor="campus">Campus:</label>

        <select
          type="text"
          name="campus"
          value={campus}
          onChange={handlecampus}
        >
          <option></option>
          <option>Madrid</option>
          <option>Barcelona</option>
          <option>Miami</option>
          <option>Paris</option>
          <option>Berlin</option>
          <option>Amsterdam</option>
          <option>Mexico</option>
          <option>Sao Paulo</option>
          <option>Lisbon</option>
          <option>Remote</option>
        </select>

        <label htmlFor="course">Course:</label>
        <select
          type="text"
          name="course"
          value={course}
          onChange={handlecourse}
        >
          <option></option>
          <option>Web Dev</option>
          <option>UX/UI</option>
          <option>Data Analytics</option>
          <option>Cyber Security</option>
        </select>
        <br />
        <button type="submit">Create the Account</button>

        <div>
          If you signup, you agree with all our terms and conditions where we
          can do whatever we want with the data!
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
}

export default Signup;