import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, FC, useState } from 'react';
import {
  useAppDispatch,
  gradientBackgroundColor,
  updateUser,
} from '../../store';

interface Props {
  openFromApp?: boolean;
  setOpenFromApp?: Dispatch<React.SetStateAction<boolean>>;
  logInState?: boolean;
  setLogInState?: Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: FC<Props> = ({
  openFromApp,
  setOpenFromApp,
  logInState,
  setLogInState,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [allFieldsTyped, setAllFieldsTyped] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (openFromApp && setOpenFromApp) {
      setOpenFromApp(() => (openFromApp = false));
    }
  };
  const handleLogOut = () => {
    dispatch(updateUser(null));
    if (openFromApp && setOpenFromApp && logInState && setLogInState) {
      setOpenFromApp(() => (openFromApp = false));
      setLogInState(() => (logInState = false));
    }
  };

  return (
    <div>
      <>
        <Dialog
          open={openFromApp ?? false}
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
