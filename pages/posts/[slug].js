import Head from 'next/head'

import PostContent from "../../components/posts/postDetail/PostContent";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

export default function PostDetailPage({post}) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name='description' content={post.excerpt}/>
            </Head>
            <PostContent post={post} />
        </>
    )
}


export function getStaticProps(context){
    const {params:{slug}} = context

    const postData = getPostData(slug)

    return {
        props:{
            post:postData
        },
        revalidate: 600
    }
}

export function getStaticPaths(){
    const postFilenames = getPostsFiles()

    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, "") )

    return {
        paths: slugs.map(slug => ({params: {slug: slug}})),
        fallback: 'blocking'
    }
}
