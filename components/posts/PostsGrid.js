import PostItem from './PostItem'
import classes from './postsGrid.module.css'

export default function PostsGrid({posts, ...props}) {
    return (
        <ul className={classes.grid}>
            {posts.map(post => <PostItem key={post.slug} post={post}/>)}
        </ul>
    )
}
