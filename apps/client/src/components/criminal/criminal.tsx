import { FC, PropsWithChildren } from 'react';
import {
  buttonStyle,
  criminalButtonStyle,
  criminalIconStyle,
  iconColor,
  iconStyles,
  personaNonGrataIconStyleButton,
  removeCriminalButtonStyle,
  removeCriminalIconStyle,
  RootState,
  useAppSelector,
  useDeleteCriminalMutation,
  useGetUserByUserIdQuery,
  useUpdateCriminalPersonaNonGrataMutation,
} from '../../store';
import { CriminalType } from '../../store/types/criminalType';

import styles from './criminal.module.css';
import { IconButton } from '@mui/material';
import { PersonOff, Gavel, PersonRemove } from '@mui/icons-material';
interface Props {
  criminal: CriminalType;
}
export const Criminal: FC<Props & PropsWithChildren> = ({ criminal }) => {
  const user = useAppSelector((state: RootState) => state.user.value);

  const { data: incriminatedUser } = useGetUserByUserIdQuery(criminal.userId);
  const [updateCriminalToPersonaNonGrata] =
    useUpdateCriminalPersonaNonGrataMutation();
  const [deleteCriminal] = useDeleteCriminalMutation();
  return (
    <div className={styles.box}>
      <div className={styles.criminal}>
        <div className={styles.user}>
          <Gavel sx={criminalIconStyle} />
          {incriminatedUser?.username}
        </div>
        {user?.isAdmin && (
          <>
            <IconButton
              onClick={() => deleteCriminal(criminal.id)}
              sx={removeCriminalButtonStyle}
            >
              <PersonRemove sx={removeCriminalIconStyle} />
            </IconButton>

            <IconButton
              sx={criminalButtonStyle}
              onClick={() => {
                updateCriminalToPersonaNonGrata({
                  id: criminal.id,
                  isPersonaNonGrata: true,
                });
              }}
            >
              <PersonOff sx={personaNonGrataIconStyleButton} />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};
