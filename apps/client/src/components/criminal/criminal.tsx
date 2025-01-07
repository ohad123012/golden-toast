import { FC, PropsWithChildren } from 'react';
import {
  criminalButtonStyle,
  criminalIconStyle,
  useGetUserByUserIdQuery,
  useUpdateCriminalPersonaNonGrataMutation,
} from '../../store';
import { CriminalType } from '../../store/types/criminalType';

import styles from './criminal.module.css';
import { IconButton } from '@mui/material';
import { PersonOff, Gavel } from '@mui/icons-material';
interface Props {
  criminal: CriminalType;
}
export const Criminal: FC<Props & PropsWithChildren> = ({ criminal }) => {
  const { data: incriminatedUser } = useGetUserByUserIdQuery(criminal.userId);
  const [updateCriminalToPersonaNonGrata] =
    useUpdateCriminalPersonaNonGrataMutation();
  return (
    <div className={styles.box}>
      <div className={styles.criminal}>
        <div className={styles.user}>
          <Gavel />
          {incriminatedUser?.username}
        </div>
        <IconButton
          sx={criminalButtonStyle}
          onClick={() => {
            updateCriminalToPersonaNonGrata({
              id: criminal.id,
              isPersonaNonGrata: true,
            });
          }}
        >
          <PersonOff sx={criminalIconStyle} />
        </IconButton>
      </div>
    </div>
  );
};
