import React from 'react';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import './schedule.css';

const TimelineEvent: React.FC<{time: string; event: string; last?: boolean}> = ({
  time,
  event,
  last
}) => (
  <TimelineItem>
    <TimelineOppositeContent>
      <Typography className="schedule__time">{time}</Typography>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot />
      {last || <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent>
      <Typography>{event}</Typography>
    </TimelineContent>
  </TimelineItem>
);

const Schedule: React.FunctionComponent = () => {
  return (
    <div className="schedule">
      <h1>Harmonogram</h1>
      <Timeline align="left">
        <TimelineEvent time="10:00 - 12:00" event="Check-in pro ubytované" />
        <TimelineEvent
          time="10:00 - 12:00"
          event="Příjezd hostů, uvítání a malé pohoštění"
        />
        <TimelineEvent time="12:00 – 13:00" event="Obřad" />
        <TimelineEvent time="13:00 – 14:00" event="Společné focení" />
        <TimelineEvent time="14:00 – 15:30" event="Přípitek, slavnostní oběd" />
        <TimelineEvent time="15:30 – 16:30" event="Focení novomanželů" />
        <TimelineEvent time="16.30 – 17:30" event="Krájení svatebního dortu" />
        <TimelineEvent time="17:30" event="Tanec novomanželů" />
        <TimelineEvent time="17:30 – 23:30" event="Živá hudba, volná zábava" />
        <TimelineEvent time="18:00" event="Otevření večerního rautu" />
        <TimelineEvent
          time="23:30"
          event="Pokračování zábavy – diskotéka až do rána"
          last
        />
      </Timeline>
    </div>
  );
};

export default Schedule;
