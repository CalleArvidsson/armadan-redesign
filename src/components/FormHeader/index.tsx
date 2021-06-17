import { FC, ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface Props {
  title: string;
  startComp?: ReactNode;
}

const FormHeader: FC<Props> = ({ children, title, startComp }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      {startComp}
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default FormHeader;
