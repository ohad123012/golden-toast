import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, FC, useState } from 'react';
import {
  useAppDispatch,
  gradientBackgroundColor,
  updateUser,
} from '../../store';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;

  setLogInState: Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: FC<Props> = ({
  openModal,
  setOpenModal,
  setLogInState,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleLogOut = () => {
    dispatch(updateUser(null));

    setOpenModal(false);
    setLogInState(false);
  };

  return (
    <div>
      <>
        <Dialog
          open={openModal}
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
          <DialogContent>
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
