import { FC, PropsWithChildren } from 'react';
import {
  criminalButtonStyle,
  criminalIconStyle,
  criminalIconStyleButton,
  personaNonGrataIconStyle,
  useGetUserByUserIdQuery,
  useUpdateCriminalPersonaNonGrataMutation,
} from '../../store';
import { CriminalType } from '../../store/types/criminalType';

import styles from './persona-non-grata.module.css';
import { IconButton } from '@mui/material';
import { PersonOff, Gavel } from '@mui/icons-material';
interface Props {
  persona: CriminalType;
}
export const PersonaNonGrata: FC<Props & PropsWithChildren> = ({ persona }) => {
  const { data: incriminatedUser } = useGetUserByUserIdQuery(persona.userId);
  const [updateCriminalFromPersonaNonGrata] =
    useUpdateCriminalPersonaNonGrataMutation();
  return (
    <div className={styles.box}>
      <div className={styles.criminal}>
        <div className={styles.user}>
          <PersonOff sx={personaNonGrataIconStyle} />
          {incriminatedUser?.username}
        </div>
        <IconButton
          sx={criminalButtonStyle}
          onClick={() => {
            updateCriminalFromPersonaNonGrata({
              id: persona.id,
              isPersonaNonGrata: false,
            });
          }}
        >
          <Gavel sx={criminalIconStyleButton} />
        </IconButton>
      </div>
    </div>
  );
};
