import React, { useEffect, useState } from 'react'
import './SharedPost.css'
import Post from '../Post/Post'
import Loader from '../Loader/Loader'
import { sharePost } from '../../Actions/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'

const SharedPost = () => {
    const params = useParams()
    const alert = useAlert()
    const dispatch = useDispatch()
    const [dataReady, setDataReady] = useState(false)

    useEffect(() => {
        dispatch(sharePost(params.id))
            .then(() => {
                setDataReady(true)
            })
            .catch((error) => {
                console.error('Error fetching post:', error)
                setDataReady(true) // Set dataReady to true even in case of an error to avoid infinite loading.
            })
    }, [dispatch, params.id])

    const { loading: postLoading, post } = useSelector(
        (state) => state.uniquePost
    )

    const { error: likeError, message } = useSelector((state) => state.like)

    useEffect(() => {
        if (likeError) {
            alert.error(likeError)
            dispatch({ type: 'clearErrors' })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: 'clearMessage' })
        }
    }, [dispatch, likeError, alert, message])

    return postLoading || !dataReady ? (
        <Loader />
    ) : (<div className='postsection'>
            {
                <Post
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                isShared={true}
                />
            }
            </div>
    )
}

export default SharedPost
