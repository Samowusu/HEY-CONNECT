import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPosts } from "../../state/postsSlice";
import axios from "axios";
import { PostWidget } from "./PostWidget";

export function AllPostsWidget({ isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsSlice.posts);
  const token = useSelector((state) => state.userSlice.token);
  const { userId } = useParams();

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://hey-connect-server.onrender.com/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { posts } = response.data;

      console.log({ posts });

      dispatch(setPosts({ posts }));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `https://hey-connect-server.onrender.com/posts/${userId}/userPosts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { userPosts } = response.data;
      dispatch(setPosts({ posts: userPosts }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          post,
          location,
          postPicture,
          userPicturePath,
          likes,
          comments,
          fileName,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            post={post}
            location={location}
            postPicture={postPicture}
            userPicturePath={fileName}
            likes={likes}
            comments={comments}
            fileName={fileName}
          />
        )
      )}
    </>
  );
}
