import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ChildCareOutlinedIcon from '@material-ui/icons/ChildCareOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import BedIcon from '@material-ui/icons/LocalHotelOutlined';

import {QuestionnaireDTO} from '../../../server/src/entity/Questionnaire';

import {getAttendees, deleteAttendee} from '../../utils/apiClient';

type Props = {
  userId: number;
};

const renderYesIcon = (): JSX.Element => (
  <CheckIcon fontSize="small" className="attendees-table__icon" />
);

const renderNoIcon = (): JSX.Element => (
  <CloseIcon fontSize="small" className="attendees-table__icon" />
);

export const AttendeesTable: React.FC<Props> = ({userId}) => {
  const [attendees, setAttendees] = useState<QuestionnaireDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

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
    if (!id) {
      return;
    }

    setDeleting(id);
    try {
      await deleteAttendee(id);
    } catch (error) {
      console.error(error);
    }
    setDeleting(null);
  };

  if (attendees.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        component="h1"
        variant="h6"
        gutterBottom
        className="questionnaire__paragraph">
        Seznam Tvých odpovědí
      </Typography>
      <TableContainer component={Paper} className="attendees-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Jméno</TableCell>
              <TableCell align="right" />
              <TableCell align="right">Účast</TableCell>
              <TableCell align="right">Požadavky na jídlo</TableCell>
              <TableCell align="right">
                <BedIcon className="attendees-table__icon" /> pátek
              </TableCell>
              <TableCell align="right">
                <BedIcon className="attendees-table__icon" /> sobota
              </TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.map((row) => (
              <TableRow key={row.id || 0}>
                <TableCell component="th" scope="row">
                  {`${row.name} ${row.surname} `}
                </TableCell>
                <TableCell align="right">
                  {row.isChild && (
                    <ChildCareOutlinedIcon
                      fontSize="small"
                      className="attendees-table__icon"
                      titleAccess={`${row.age} let`}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.willAttend ? renderYesIcon() : renderNoIcon()}
                </TableCell>
                <TableCell align="right">{row.foodRequirements}</TableCell>
                <TableCell align="right">
                  {row.accommodationFriday ? renderYesIcon() : renderNoIcon()}
                </TableCell>
                <TableCell align="right">
                  {row.accommodationSaturday ? renderYesIcon() : renderNoIcon()}
                </TableCell>
                <TableCell align="right">
                  {deleting === row.id ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : (
                    <DeleteForeverOutlinedIcon
                      className="attendees-table__delete-icon"
                      color="secondary"
                      fontSize="small"
                      titleAccess="Odstranit"
                      onClick={handleDeleteAttendee(row.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
