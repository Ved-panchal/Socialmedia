import { Button, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, getUserPosts, getUserProfile } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  page = "",
}) => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (page == "Account") {
      dispatch(getMyPosts());
    } else if(page == "User") {
      dispatch(getUserPosts(params.id));
      dispatch(getUserProfile(params.id));
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {page == "Account" ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;