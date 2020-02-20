import React, {useState, FormEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './login.css';

const Map: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch('http://localhost:3232/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'same-origin',
      body: JSON.stringify(formData)
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login">
      <Paper elevation={2} className="login__paper">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column">
          <Typography component="h1" variant="h4" gutterBottom>
            Registrace
          </Typography>
        </Box>
        <form method="post" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Jméno a Příjmení"
            name="username"
            autoComplete="username"
            autoFocus
            defaultValue={formData.username}
            onChange={(e): void => setFormData({...formData, username: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            defaultValue={formData.email}
            onChange={(e): void => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Heslo"
            type="password"
            id="password"
            autoComplete="new-password"
            defaultValue={formData.password}
            onChange={(e): void => setFormData({...formData, password: e.target.value})}
          />
          <Button
            disabled={submitting}
            type="submit"
            variant="contained"
            color="primary"
            className="login__submit-button">
            {submitting ? 'Registruji...' : 'Registrovat'}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Map;
