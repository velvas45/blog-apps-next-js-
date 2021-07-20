import Head from 'next/head'

import Hero from '../components/homePage/Hero'
import FeaturedPosts from '../components/homePage/FeaturedPosts'
// import {useEffect} from 'react'
import { getFeaturedPosts } from '../lib/posts-util'


function HomePage({posts}){
    return (
        <>
            <Head>
                <title>Helmi' Blog</title>
                <meta name='description' content='I post about programming and web development'/>
            </Head>
            <Hero/>
            <FeaturedPosts  posts={posts}/>
        </>
    )
}

export default HomePage

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 1800
    }
}

// 1) Hero => Present ourselves
// 2) Featured Posts