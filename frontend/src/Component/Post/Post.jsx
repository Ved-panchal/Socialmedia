import { Avatar, Button, Typography, Dialog } from '@mui/material'
import React, { useEffect } from 'react'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
    Share,
    ShareOutlined,
} from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import './Post.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addCommentOnPost,
    deletePost,
    likePost,
    updatePost,
} from '../../Actions/Post'
import { getFollowingPosts, getMyPosts, getUserPosts, getUserProfile, loadUser } from '../../Actions/User'
import User from '../User/User'
import CommentCard from '../CommentCard/CommentCard'
import { sharePost } from '../../Actions/Post'
import { useAlert } from 'react-alert'

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    page = "Post",
    isShared = false,
}) => {
    const [liked, setLiked] = useState(false)
    const [likesUser, setLikesUser] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const [commentToggle, setCommentToggle] = useState(false)
    const [captionValue, setCaptionValue] = useState(caption)
    const [captionToggle, setCaptionToggle] = useState(false)
    const [shareLink, setShareLink] = useState(false)
    const [shareableURL, setShareableURL] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()
    const params = useParams()
    const { user } = useSelector((state) => state.user)

    const handleLike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId))
        if (page === "Account") {
            dispatch(getMyPosts())
        } else if (isShared) {
            dispatch(sharePost(params.id))
        } else if(page === "Home") {
            dispatch(getFollowingPosts())
        } else if(page === "User") {
            dispatch(getUserPosts(params.id));
            dispatch(getUserProfile(params.id));
        }
    }

    const shareHandler = () => {
        const shareableURL = `${window.location.origin}/post/${postId}`
        setShareLink(true)
        setShareableURL(shareableURL)
        navigator.clipboard.writeText(shareableURL).then(() => {
            alert.success("Link is Copied")
        }).then(() => {
            setShareLink(false)
        })
        
    }

    const addCommentHandler = async (e) => {
        e.preventDefault()
        await dispatch(addCommentOnPost(postId, commentValue))

        if (page == "Account") {
            dispatch(getMyPosts())
        } else if(page == "User") {
            dispatch(getUserPosts(params.id));
            dispatch(getUserProfile(params.id));
        } else {
            dispatch(getFollowingPosts())
        }
    }

    const updateCaptionHandler = (e) => {
        e.preventDefault()
        dispatch(updatePost(captionValue, postId))
        dispatch(getMyPosts())
    }

    const deletePostHandler = async () => {
        await dispatch(deletePost(postId))
        dispatch(getMyPosts())
        dispatch(loadUser())
    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id])

    return (
        <div className="post">
            <div className="postHeader">
                {page == "Account" ? (
                    <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>
                ) : null}
            </div>

            <img src={postImage} alt="Post" />

            <div className="postDetails">
                <Avatar
                    src={ownerImage}
                    alt="User"
                    sx={{
                        height: '3vmax',
                        width: '3vmax',
                    }}
                />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: 'center' }}
                >
                    {caption}
                </Typography>
            </div>

            <button
                style={{
                    border: 'none',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    margin: '1vmax 2vmax',
                }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? (
                        <Favorite style={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorder />
                    )}
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                <Button onClick={shareHandler}>
                    {shareLink ? <Share /> : <ShareOutlined />}
                </Button>

                {isDelete ? (
                    <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button>
                ) : null}
            </div>

            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>

                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>

            <Dialog
                open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>

                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here..."
                            required
                        />

                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </form>

                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                                page = {page}
                            />
                        ))
                    ) : (
                        <Typography>No comments Yet</Typography>
                    )}
                </div>
            </Dialog>

            <Dialog
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>

                    <form
                        className="commentForm"
                        onSubmit={updateCaptionHandler}
                    >
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption Here..."
                            required
                        />

                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

export default Post
