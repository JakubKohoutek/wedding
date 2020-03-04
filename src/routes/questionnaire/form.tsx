import React, {useState, FormEvent, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {context} from '../../context';
import {logoutIfUnauthorized} from '../../utils/apiClient';
import {QuestionnaireDTO} from '../../../server/src/entity/Questionnaire';

const QuestionnaireForm: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    foodRequirements: false,
    foodRequirementsDetail: '',
    accomodationFriday: false,
    accomodationSaturday: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const {setUser} = useContext(context);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      logoutIfUnauthorized(response);

      if (response.status !== 201) {
        setSubmitting(false);
        const payload = await response.json();
        throw new Error(payload.error);
      }
      const payload: QuestionnaireDTO = await response.json();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
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
          Registrace
        </Typography>
      </Box>
      <form method="post" noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Jméno"
          name="username"
          autoFocus
          defaultValue={formData.name}
          onChange={(e): void => setFormData({...formData, name: e.target.value})}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Příjmení"
          name="surname"
          defaultValue={formData.surname}
          onChange={(e): void => setFormData({...formData, surname: e.target.value})}
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
  );
};

export default QuestionnaireForm;
