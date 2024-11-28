import { MeetingRoom } from '@mui/icons-material';
import { ActionIconButton } from '../action-icon-button';
import styles from './buttons-container.module.css';

export const ButtonsContainer: React.FC = ({}) => {
  return (
    <div className={styles.buttonsContainer}>
      <ActionIconButton Icon={MeetingRoom} />
      <ActionIconButton Icon={MeetingRoom} />
      <ActionIconButton Icon={MeetingRoom} />
    </div>
  );
};
