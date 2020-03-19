import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';

import {Questionnaire, QuestionnaireDTO} from '../../entity/Questionnaire';
import {UserDTO} from '../../entity/User';

export const recordAttendance = async (req: Request, res: Response): Promise<void> => {
  const answers = req.body as QuestionnaireDTO;

  const questionnaire = new Questionnaire();
  questionnaire.registratorId = answers.registratorId;
  questionnaire.name = answers.name;
  questionnaire.surname = answers.surname;
  questionnaire.foodRequirements = answers.foodRequirements;
  questionnaire.accommodationFriday = answers.accommodationFriday;
  questionnaire.accommodationSaturday = answers.accommodationSaturday;
  questionnaire.isChild = answers.isChild;
  questionnaire.age = answers.age || null;
  questionnaire.willAttend = answers.willAttend;

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

export const getAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.userId) {
      throw new Error('Missing user ID.');
    }

    const userId = parseInt(req.params.userId, 10);
    const questionnaireRepository = getRepository(Questionnaire);
    const foundRecords = await questionnaireRepository.find({
      registratorId: userId
    });

    res.status(200).send(foundRecords);
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id) {
      throw new Error('Missing ID.');
    }

    const user = req.user as UserDTO;

    const id = parseInt(req.params.id, 10);
    const questionnaireRepository = getRepository(Questionnaire);

    const foundRecords = await questionnaireRepository.findOneOrFail({id});

    if (foundRecords.registratorId !== user.id) {
      throw new Error('Can not delete record of another user');
    }

    await questionnaireRepository.delete({
      id
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};
