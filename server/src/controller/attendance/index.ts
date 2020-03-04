import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';

import {Questionnaire, QuestionnaireDTO} from '../../entity/Questionnaire';

export const recordAttendance = async (req: Request, res: Response): Promise<void> => {
  const answers = req.body as QuestionnaireDTO;

  const questionnaire = new Questionnaire();
  questionnaire.registratorId = answers.registratorId;
  questionnaire.name = answers.name;
  questionnaire.surname = answers.surname;
  questionnaire.foodRequirements = answers.foodRequirements
    ? answers.foodRequirementsDetail
    : '';
  questionnaire.accomodationFriday = answers.accomodationFriday;
  questionnaire.accomodationSaturday = answers.accomodationSaturday;
  questionnaire.isChild = answers.isChild;
  questionnaire.age = answers.age;

  const errors = await validate(questionnaire);

  if (errors.length > 0) {
    const sanitizedErrors = errors.map((error) => ({
      field: error.property,
      error: Object.values(error.constraints)[0]
    }));

    res.status(400).send({errors: sanitizedErrors});
    return;
  }

  try {
    const questionnaireRepository = getRepository(Questionnaire);
    await questionnaireRepository.save(questionnaire);
    res.status(200).send(answers);
  } catch (e) {
    console.error(e);
    res.status(500).send();
    return;
  }
};
