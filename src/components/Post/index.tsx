import { FC } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from '@apollo/client';
import { Paper, Typography, Grid, IconButton, Box, CircularProgress } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import draftToHtml from 'draftjs-to-html';
import dayjs from 'dayjs';
import { useRemovePost } from 'mutations/index';
import useConfirm from 'hooks/useConfirm';
import { Post as PostType } from 'types';

interface Props {
  post: PostType;
  isEditMode?: boolean;
  onEdit?(): void;
}

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(1),

    '& + &': {
      marginTop: theme.spacing(2),
    },
  },
  edit: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    alignContent: 'center',
  },
  title: {
    fontWeight: 500,
  },
  meta: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  iconButton: {
    padding: 0,
    height: 30,
    width: 30,

    '& + &': {
      marginLeft: theme.spacing(0.5),
    },
  },
  body: {
    marginBottom: theme.spacing(0.5),

    '& > p': {
      margin: 0,
    },
  },
}));

const Post: FC<Props> = ({ post, isEditMode = false, onEdit = () => {} }) => {
  const [removePost, { loading: isRemoving }] = useRemovePost();
  const confirm = useConfirm();
  const classes = useStyles();
  const postClass = classNames(classes.post, {
    [classes.edit]: isEditMode,
  });

  return (
    <Paper square className={postClass}>
      <Typography variant="h5" className={classes.title}>
        {post.title}
      </Typography>
      {isEditMode ? (
        <Box className={classes.box}>
          <IconButton className={classes.iconButton} onClick={onEdit} aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton
            disabled={isRemoving}
            className={classes.iconButton}
            onClick={() => {
              confirm({
                title: 'Ta bort inlägg',
                description: 'Är du säker på att du vill ta bort inlägget?',
                onConfirm() {
                  removePost({ variables: { id: post.id } });
                },
              });
            }}
            aria-label="delete"
          >
            {isRemoving ? <CircularProgress size={24} role="status" /> : <Delete />}
          </IconButton>
        </Box>
      ) : (
        <>
          <Typography
            variant="body1"
            className={classes.body}
            dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(post.body)).replace(/<p><\/p>/g, '<br/>') }}
          />
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" className={classes.meta}>
                {`Inlagd av: ${post.author}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.meta}>
                {dayjs(post.createdAt).format('YYYY-MM-DD')}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export const fragments = {
  post: gql`
    fragment PostFragment on Post {
      title
      author
      body
      createdAt
    }
  `,
};

export default Post;
