import React, { PropsWithChildren } from 'react';
import { MeetingRoom } from '@mui/icons-material';
import { FuncButton } from '../func-button';
import styles from './buttons-container.module.css';

interface Props {
  gridArea: string;
}

console.log(styles.ButtonsContainer);
export const ButtonsContainer: React.FC<Props & PropsWithChildren> = ({
  gridArea,
}) => {
  return (
    <div className={styles.buttonsContainer}>
      <FuncButton Icon={MeetingRoom} />
      <FuncButton Icon={MeetingRoom} />

      <FuncButton Icon={MeetingRoom} />
    </div>
  );
};
