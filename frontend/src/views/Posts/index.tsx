import { FC, useState } from 'react';
import { gql } from '@apollo/client';
import { Button, Backdrop, Zoom } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PostFeed, { fragments, PostFeedData } from 'components/PostFeed';
import withQuery from 'common/withQuery';
import { useAddPost, useUpdatePost } from 'mutations/index';
import NewPostForm from 'components/NewPostForm';
import FormHeader from 'components/FormHeader';
import { AddPostInput, UpdatePostInput } from 'types';

interface Props {
  data: PostFeedData;
}

const query = gql`
  query PostsQuery {
    ...PostFeedFragment
  }
  ${fragments.posts}
`;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const PostPage: FC<Props> = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [addPost] = useAddPost();
  const [updatePost] = useUpdatePost();
  const [post, setPost] = useState({});
  const classes = useStyles();

  const handleConfirm = (postData: AddPostInput | UpdatePostInput) => {
    if ('id' in postData) {
      updatePost({ variables: { input: postData } });
    } else {
      addPost({
        variables: {
          input: postData,
        },
      });
    }

    setShowForm(false);
    setPost({});
  };

  return (
    <>
      <FormHeader title="Inlägg">
        <Button color="secondary" startIcon={<Add />} variant="outlined" size="small" onClick={() => setShowForm(true)}>
          Nytt inlägg
        </Button>
      </FormHeader>
      <PostFeed
        data={data}
        isEditMode
        onEdit={(postNode) => {
          setPost(postNode);
          setShowForm(true);
        }}
      />
      <Backdrop className={classes.backdrop} open={showForm}>
        <Zoom in={showForm}>
          <NewPostForm
            onCancel={() => {
              setShowForm(false);
              setPost({});
            }}
            onConfirm={handleConfirm}
            post={post}
          />
        </Zoom>
      </Backdrop>
    </>
  );
};

export default withQuery<PostFeedData, Record<string, unknown>>(PostPage, { query });
