import { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIRichTextEditor from 'mui-rte';
import { EditorState, convertToRaw } from 'draft-js';
import { Box, Typography, Button, Paper, TextField } from '@material-ui/core';
import { Post, PartialBy } from 'types';

interface Props {
  onConfirm(post: PartialBy<Omit<Post, 'createdAt'>, 'id'>): void;
  onCancel(): void;
  post: Partial<Post>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
  },
  formTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
  },
  form: {
    width: '100%',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
  },
  btn: {
    marginLeft: theme.spacing(1),
  },
}));

const NewPostForm: FC<Props> = ({ onConfirm, onCancel, post }) => {
  const [title, setTitle] = useState(post.title ? post.title : '');
  const [author, setAuthor] = useState(post.author ? post.author : '');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const classes = useStyles();

  useEffect(() => {
    setTitle(post.title || '');
    setAuthor(post.author || '');
  }, [post.title, post.author]);

  const resetForm = () => {
    setTitle('');
    setEditorState(EditorState.createEmpty());
    setAuthor('');
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" className={classes.formTitle}>
        {post.id ? 'Uppdatera inlägg' : 'Nytt inlägg'}
      </Typography>
      <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Titel"
          name="title"
          autoFocus
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <MUIRichTextEditor
          controls={['bold', 'italic', 'underline', 'strikethrough', 'clear']}
          label="Nytt inlägg.."
          defaultValue={post.body}
          onChange={setEditorState}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="author"
          label="Namn"
          name="author"
          autoComplete="off"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <Box className={classes.btnGroup}>
          <Button
            name="cancel"
            variant="contained"
            color="default"
            onClick={() => {
              resetForm();
              onCancel();
            }}
          >
            Avbryt
          </Button>
          <Button
            name="submit"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => {
              let body;

              if (editorState) {
                body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
              } else if (post.body) {
                body = post.body;
              } else {
                body = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
              }

              onConfirm({
                ...(post.id ? { id: post.id } : {}),
                title,
                body,
                author,
              });
              resetForm();
            }}
          >
            Spara
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default NewPostForm;
