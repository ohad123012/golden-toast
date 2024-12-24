import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Dispatch, FC, useState } from 'react';
import {
  updateUser,
  useGetAllUsersQuery,
  useAppDispatch,
  gradientBackgroundColor,
  formHelperTextRedColor,
  visibilityHoverShadow,
  visibilityHoverColor,
} from '../../store';
import { SignUpModal } from '../sign-up-modal';
import { toast } from 'react-toastify';

interface Props {
  openModal?: boolean;
  setOpenModal?: Dispatch<React.SetStateAction<boolean>>;
}
export const LogInModal: FC<Props> = ({ openModal, setOpenModal }) => {
  const { data: users } = useGetAllUsersQuery();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [areAllFieldsTyped, setAreAllFieldsTyped] = useState<boolean>(false);
  const [doesUserExist, setDoesUserExist] = useState<boolean>(true);

  const [userExistPasswordWrong, setUserExistPasswordWrong] =
    useState<boolean>();

  const [open, setOpen] = useState<boolean>(true);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const handleClose = () => {
    if (openModal && setOpenModal) {
      setOpenModal(false);
    }
    setOpen(false);
  };

  const handleConfirm = (username: string | null, password: string | null) => {
    const existingUsernames = users?.map((user) => {
      return user.username;
    });
    if (existingUsernames?.includes(username ?? '')) {
      users?.find((user) => {
        if (user.username === username && user.password === password) {
          setDoesUserExist(true);
          toast.success('Logged in ', {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          dispatch(updateUser(user));
          setOpen(false);
        } else if (user.username === username && user.password !== password) {
          setPassword('');
          setUserExistPasswordWrong(true);
          setDoesUserExist(true);
        }
      });
    } else {
      setPassword('');
      setDoesUserExist(false);
      setUserExistPasswordWrong(false);
    }
  };
  const handleMoveToSignUp = () => {
    setOpen(false);
    setOpenSignUp(true);
  };

  const checkAllFields = (username: string | null, password: string | null) => {
    const areAllFieldValues = !!username && !!password;
    if (areAllFieldValues) {
      setAreAllFieldsTyped(true);
    } else {
      setAreAllFieldsTyped(false);
    }
  };
  const areAllNotNull = !!username && !!password;

  return (
    <>
      <Dialog
        open={open}
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
          Welcome to golden-toast by Ohad Lazar
        </DialogTitle>
        <DialogContent sx={{ overflow: 'initial' }}>
          <Box
            sx={{
              display: 'flex',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2,
              margin: '0.2rem',
            }}
          >
            <TextField
              error={!doesUserExist}
              type="text"
              label="username"
              helperText={!doesUserExist ? 'Invalid username' : ' '}
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setUsername(e.target.value);
                checkAllFields(e.target.value, password);
              }}
              value={username}
            />
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                error={!doesUserExist || userExistPasswordWrong}
                label="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        '&:hover': {
                          backgroundColor: visibilityHoverColor,
                          boxShadow: visibilityHoverShadow,
                        },
                      }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setPassword(e.target.value);
                  checkAllFields(username, e.target.value);
                }}
                value={password}
              />
              <FormHelperText sx={{ color: formHelperTextRedColor }}>
                {!doesUserExist || userExistPasswordWrong
                  ? 'Invalid password'
                  : ' '}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gridTemplateColumns: { sm: '1fr 1fr ' },
              gap: 2,
              paddingTop: '0.5rem',
              justifyContent: 'flex-end',
              boxShadow: 'none',
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => handleMoveToSignUp()}
            >
              Sign up
            </Button>
            <Button
              disabled={!areAllNotNull || !areAllFieldsTyped}
              size="small"
              variant="contained"
              onClick={() => {
                handleConfirm(username, password);
              }}
            >
              confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {openSignUp && <SignUpModal />}
    </>
  );
};
