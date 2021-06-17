import { FC } from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Errors from 'common/enums';

interface Props {
  text?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.disabled,
    fontSize: 60,
  },
  text: {
    color: theme.palette.text.disabled,
  },
}));

const Error: FC<Props> = ({ text = Errors.GENERAL }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ErrorOutline className={classes.icon} />
      <Typography className={classes.text} variant="h4">
        {text}
      </Typography>
    </Box>
  );
};

export default Error;
