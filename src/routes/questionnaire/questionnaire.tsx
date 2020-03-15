import React, {useContext} from 'react';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';

import QuestionnaireForm from './questionnaireForm';
import {context} from '../../context';

import './questionnaire.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const Questionnaire: React.FunctionComponent = () => {
  const {user} = useContext(context);

  if (!user.id) {
    return (
      <div className="questionnaire">
        <Alert severity="error">
          Moc nás to mrzí, ale někde se stala chybka = chybí ID. Dejte nám to prosím
          vědět, opravíme to.
        </Alert>
      </div>
    );
  }

  return (
    <div className="questionnaire">
      <ThemeProvider theme={theme}>
        <Paper elevation={2} className="questionnaire__paper">
          <Typography component="p" gutterBottom>
            Aby nám všem bylo v náš velký den fajn a každý měl všechno to, co potřebuje,
            je potřeba některé věci předem trochu naplánovat. Proto bychom rádi zjistili
            několik základních informací o všech účastnících.
          </Typography>
          <Typography component="p" gutterBottom>
            Prosíme proto o vyplnění krátkého dotazníku registrovaného uživatele. Nechť
            vyplní informace i o ostatních účastnících, které plánuje vzít s sebou.
          </Typography>
          <QuestionnaireForm userId={user.id} />
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Questionnaire;
