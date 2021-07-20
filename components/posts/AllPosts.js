import classess from './allPosts.module.css'
import PostsGrid from './PostsGrid'

export default function AllPosts({posts}) {
    return (
        <section className={classess.posts}> 
            <h1>All Posts</h1>
            <PostsGrid posts={posts}/>
        </section>
    )
}
