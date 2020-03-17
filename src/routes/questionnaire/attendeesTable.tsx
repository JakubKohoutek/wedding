import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import {QuestionnaireDTO} from '../../../server/src/entity/Questionnaire';

import {getAttendees, deleteAttendee} from '../../utils/apiClient';

type Props = {
  userId: number;
};

export const AttendeesTable: React.FC<Props> = ({userId}) => {
  const [attendees, setAttendees] = useState<QuestionnaireDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (deleting) {
      return;
    }
    getAttendees(userId)
      .then(async (response: Response) => {
        if (response.status !== 200) {
          const result = await response.json();
          throw new Error(result.error);
        }

        const result: QuestionnaireDTO[] = await response.json();
        setAttendees(result);
      })
      .catch((error: Error) => {
        console.error(error);
      })
      .finally((): void => {
        setLoading(false);
      });
  }, [userId, loading, deleting]);

  const handleDeleteAttendee = (id?: number) => async (): Promise<void> => {
    setDeleting(true);
    try {
      await deleteAttendee(id);
    } catch (error) {
      console.error(error);
    }
    setDeleting(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Jméno</TableCell>
            <TableCell align="right">Požadavky na jídlo</TableCell>
            <TableCell align="right">Ubytování pátek</TableCell>
            <TableCell align="right">Ubytování sobota</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendees.map((row) => (
            <TableRow key={`${row.name}-${row.surname}`}>
              <TableCell component="th" scope="row">
                {`${row.name} ${row.surname}`}
              </TableCell>
              <TableCell align="right">{row.foodRequirements}</TableCell>
              <TableCell align="right">
                {row.accommodationFriday ? 'Ano' : 'Ne'}
              </TableCell>
              <TableCell align="right">
                {row.accommodationSaturday ? 'Ano' : 'Ne'}
              </TableCell>
              <TableCell align="right">
                <DeleteForeverOutlinedIcon
                  color="secondary"
                  fontSize="small"
                  onClick={handleDeleteAttendee(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
