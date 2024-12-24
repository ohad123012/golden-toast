import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, FC, useState } from 'react';
import {
  useAppDispatch,
  gradientBackgroundColor,
  updateUser,
} from '../../store';

interface Props {
  openModal?: boolean;
  setOpenModal?: Dispatch<React.SetStateAction<boolean>>;
  logInState?: boolean;
  setLogInState?: Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: FC<Props> = ({
  openModal,
  setOpenModal,
  logInState,
  setLogInState,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (openModal && setOpenModal) {
      setOpenModal(false);
    }
  };
  const handleLogOut = () => {
    dispatch(updateUser(null));
    if (openModal && setOpenModal && logInState && setLogInState) {
      setOpenModal(false);
      setLogInState(false);
    }
  };

  return (
    <div>
      <>
        <Dialog
          open={openModal ?? false}
          onClose={() => handleClose()}
          PaperProps={{
            sx: {
              background: gradientBackgroundColor,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: 'black',
            }}
          >
            settings
          </DialogTitle>
          <DialogContent sx={{ overflow: 'initial' }}>
            <Box
              sx={{
                display: 'flex',
                gridTemplateColumns: { sm: '1fr 1fr' },
                gap: 2,
                margin: '0.2rem',
              }}
            ></Box>

            <Button
              size="small"
              variant="contained"
              onClick={() => {
                handleLogOut();
              }}
            >
              Logout
            </Button>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};
