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
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
export const LogInModal: FC<Props> = ({ openModal, setOpenModal }) => {
  const { data: users } = useGetAllUsersQuery();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [doesUserExist, setDoesUserExist] = useState<boolean>(true);

  const [userExistPasswordWrong, setUserExistPasswordWrong] =
    useState<boolean>();

  const [open, setOpen] = useState<boolean>(true);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const handleClose = () => {
    setOpenModal(false);
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
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2,
              margin: '0.3rem',
              marginBottom: '0.1rem',
            }}
          >
            <TextField
              error={!doesUserExist}
              type="text"
              label="username"
              helperText={!doesUserExist ? 'Invalid username' : ' '}
              slotProps={{ formHelperText: { sx: { marginLeft: '0' } } }}
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <FormControl>
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!doesUserExist || userExistPasswordWrong}
              >
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
                }}
                value={password}
              />
              <FormHelperText
                sx={{ color: formHelperTextRedColor, marginLeft: '0' }}
              >
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
              disabled={!username || !password}
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
      {openSignUp && (
        <SignUpModal logInState={openModal} setLogInState={setOpenModal} />
      )}
    </>
  );
};
