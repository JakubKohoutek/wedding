import React, {useState, FormEvent} from 'react';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import {QuestionnaireDTO} from '../../../server/src/entity/Questionnaire';

type Props = {
  userId: number;
  onSubmitFinish: () => void;
  className?: string;
};

const QuestionnaireForm: React.FunctionComponent<Props> = ({
  userId,
  className,
  onSubmitFinish
}) => {
  const [formData, setFormData] = useState<QuestionnaireDTO>({
    registratorId: userId,
    name: '',
    surname: '',
    willAttend: true,
    foodRequirements: '',
    accommodationFriday: false,
    accommodationSaturday: false,
    isChild: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setSubmitting(true);
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
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
      onSubmitFinish();
    }
  };

  if (error) {
    return (
      <Alert severity="error">
        Ups, někde se stala chybka, prosím, kontaktuj nás. Podrobnosti: {error}
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Typography variant="h6">Dotazník ke Tvé účasti</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Jméno"
        name="name"
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
      <FormGroup className="questionnaire__checkboxes">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.willAttend}
              onChange={(e): void =>
                setFormData({...formData, willAttend: e.target.checked})
              }
              value="willAttend"
              color="default"
            />
          }
          label="Plánuji se zúčastnit"
        />
      </FormGroup>
      <Typography className="questionnaire__paragraph">
        V rámci akce je plánován oběd: <br />
        &bull; Předkrm: Tradiční šunková rolka s křenovou šlehačkou a křupavou bagetkou
        (1,3,7)
        <br />
        &bull; Polévka: Hovězí vývar s julienne zeleninou, játrovými knedlíčky a domácími
        nudlemi (1,3,7,9)
        <br />
        &bull; Hlavní jídlo: svatební hovězí pečeně na smetaně s brusinkami, houskové
        knedlíky (1,3,7,9,10)
      </Typography>
      <Typography>
        Samozřejmě, večer nebude chybět ani raut, ale jeho konkrétní složení zatím nevíme.
      </Typography>
      <Typography variant="body2" align="right">
        <a
          href="https://www.strava.cz/Strava/Napoveda/cz/Prilohy/alergeny.pdf"
          target="_blank"
          rel="noopener noreferrer">
          seznam alergenů
        </a>
      </Typography>
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
      <Typography className="questionnaire__paragraph">
        Na místě je možnost ubytování přímo v místě konání - pěkné hotelové pokoje, včetně
        snídaně. Vzhledem k tomu, že někteří přijedou z daleka, potřebujeme předem vědět,
        jestli budeš chtít zůstat a juchat s námi (nejlépe) až do rána nebo pozdní noci,
        či zda máš v plánu odjet bez noclehu. Samozřejmě, pokud si chceš pobyt prodloužit,
        je možné přijet už v pátek a případně s námi posedět.
      </Typography>
      <Typography>
        Mimochodem, přespání je možné samozřejmě i pro ty, co to mají blízko.
      </Typography>
      <FormGroup className="questionnaire__checkboxes">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.accommodationFriday}
              onChange={(e): void =>
                setFormData({...formData, accommodationFriday: e.target.checked})
              }
              value="accommodationFriday"
              color="default"
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
              color="default"
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
              color="default"
            />
          }
          label="Jsem dítě do 15 let"
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
          defaultValue={formData.age || undefined}
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
