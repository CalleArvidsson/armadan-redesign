import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Avatar, TextField, Typography, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import has from 'lodash/has';
import { useAuth } from 'contexts/authContext';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '8px',
    backgroundColor: '#f50057',
  },
  form: {
    width: '100%',
    marginTop: '8px',
  },
  submit: {
    margin: '24px 0 16px',
  },
  link: {
    alignSelf: 'center',
  },
});

interface UserSchema {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email('Ogiltig email').required('Ange email'),
  password: yup.string().required('Ange lösenord'),
});

const LoginForm: FC = () => {
  const { register, errors, handleSubmit } = useForm<UserSchema>({
    resolver: yupResolver(LoginSchema),
  });
  const { login, loginError, isAuthenticated } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/');
    }
  }, [isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logga in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit((data: UserSchema) => login?.(data))}>
          <TextField
            helperText={errors?.email?.message}
            error={has(errors, 'email')}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            inputRef={register}
          />
          <TextField
            helperText={errors?.password?.message}
            error={has(errors, 'password')}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Lösenord"
            type="password"
            id="password"
            autoComplete="off"
            inputRef={register}
          />
          {loginError ? <Alert severity="error">{loginError}</Alert> : null}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Logga in
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
