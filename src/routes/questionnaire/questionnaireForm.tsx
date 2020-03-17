import React, {useState, FormEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {QuestionnaireDTO} from '../../../server/src/entity/Questionnaire';

type Props = {
  userId: number;
  className?: string;
};

const QuestionnaireForm: React.FunctionComponent<Props> = ({userId, className}) => {
  const [formData, setFormData] = useState<QuestionnaireDTO>({
    registratorId: userId,
    name: '',
    surname: '',
    foodRequirements: '',
    accommodationFriday: false,
    accommodationSaturday: true,
    isChild: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    <form onSubmit={handleSubmit} className={className}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Jméno"
        name="name"
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
      <TextField
        margin="normal"
        fullWidth
        id="foodRequirements"
        label="Speciální požadavky na jídlo"
        helperText="Např. vegetarian, vegan, alergie na lepek,..."
        name="foodRequirements"
        defaultValue={formData.foodRequirements}
        onChange={(e): void => {
          setFormData({...formData, foodRequirements: e.target.value});
        }}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.accommodationFriday}
              onChange={(e): void =>
                setFormData({...formData, accommodationFriday: e.target.checked})
              }
              value="accommodationFriday"
              color="primary"
            />
          }
          label="Mám zájem o ubytování v pátek"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.accommodationSaturday}
              onChange={(e): void =>
                setFormData({...formData, accommodationSaturday: e.target.checked})
              }
              value="accommodationSaturday"
              color="primary"
            />
          }
          label="Mám zájem o ubytování v sobotu"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isChild}
              onChange={(e): void =>
                setFormData({...formData, isChild: e.target.checked})
              }
              value="isChild"
              color="primary"
            />
          }
          label="Jsem dítě do 14 let"
        />
      </FormGroup>
      {formData.isChild && (
        <TextField
          margin="normal"
          fullWidth
          required
          id="age"
          name="age"
          label="Můj věk"
          defaultValue={formData.age}
          onChange={(e): void =>
            setFormData({...formData, age: parseInt(e.target.value, 10)})
          }
        />
      )}

      <Button
        disabled={submitting}
        type="submit"
        variant="contained"
        color="primary"
        className="questionnaire__submit-button">
        {submitting ? 'Odesílám...' : 'Odeslat'}
      </Button>
    </form>
  );
};

export default QuestionnaireForm;
