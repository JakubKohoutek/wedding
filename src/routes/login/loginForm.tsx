import React, {useState, FormEvent, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {ValidationError} from '../../types/formTypes';
import {UserDTO} from '../../../server/src/entity/User';

import {context} from '../../context';

type Props = {
  showRegistrationForm: () => void;
};

const LoginForm: React.FunctionComponent<Props> = ({showRegistrationForm}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const {setUser} = useContext(context);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    const response = await fetch('http://localhost:3232/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    if (response.status !== 200) {
      setSubmitting(false);
      const payload = await response.json();

      console.log(payload);
      setErrors(payload.errors);
      return;
    }

    const payload: UserDTO = await response.json();

    setUser(payload);
    setSubmitting(false);
  };

  return (
    <Paper elevation={2} className="login__paper">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column">
        <Typography component="h1" variant="h4" gutterBottom>
          Přihlášení
        </Typography>
      </Box>
      <form method="post" noValidate onSubmit={handleLogin}>
        <TextField
          error={errors.some((error) => error.field === 'email')}
          helperText={errors.find((error) => error.field === 'email')?.error}
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
          error={errors.some((error) => error.field === 'password')}
          helperText={errors.find((error) => error.field === 'password')?.error}
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
        <div className="login__buttons">
          <Button variant="outlined" color="secondary" onClick={showRegistrationForm}>
            Registrovat
          </Button>
          <Button
            disabled={submitting}
            type="submit"
            variant="contained"
            color="primary"
            className="login__submit-button">
            {submitting ? 'Ověřuji...' : 'Přihlásit'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default LoginForm;
