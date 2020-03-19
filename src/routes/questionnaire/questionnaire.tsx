import React, {useContext, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import QuestionnaireForm from './questionnaireForm';
import {context} from '../../context';
import {AttendeesTable} from './attendeesTable';

import './questionnaire.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const Questionnaire: React.FunctionComponent = () => {
  const {user} = useContext(context);
  const [formIsOpen, setFormIsOpen] = useState(false);

  if (!user.id) {
    return (
      <div className="questionnaire">
        <Alert severity="warning">
          Zdá se, že nejsi přihlášený. Prosím, <a href="/login">přihlaš se</a>
        </Alert>
      </div>
    );
  }

  return (
    <div className="questionnaire">
      <ThemeProvider theme={theme}>
        <Paper elevation={2} className="questionnaire__paper">
          {formIsOpen ? (
            <QuestionnaireForm
              userId={user.id}
              onSubmitFinish={(): void => setFormIsOpen(false)}
            />
          ) : (
            <div className="questionnaire__attendees-list">
              <Typography component="p" gutterBottom>
                Aby nám všem bylo v náš velký den fajn a každý měl všechno to, co
                potřebuje, snažíme se některé věci trochu předem naplánovat. Proto bychom
                rádi zjistili, kdo z pozvaných nakonec dorazí a pár dalších informací.
              </Typography>
              <Typography component="p" gutterBottom>
                Prosíme tak o vyplnění krátkého dotazníku. Ten je možné vyplnit vícekrát i
                za lidi, které plánuješ vzít s sebou (není třeba, aby se každý účastník
                zvlášť registroval).
              </Typography>
              <AttendeesTable userId={user.id} />
              <Button
                onClick={(): void => setFormIsOpen(true)}
                variant="contained"
                color="primary"
                className="questionnaire__submit-button">
                Vyplnit dotazník
              </Button>
            </div>
          )}
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Questionnaire;
