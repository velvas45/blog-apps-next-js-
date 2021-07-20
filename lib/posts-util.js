import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'


const postsDirectory = path.join(process.cwd(), 'data', 'posts') 

function getPostsFiles() {
return fs.readdirSync(postsDirectory)
}

function getPostData(postIdentifier){
    const postSlug = postIdentifier.replace(/\.md$/, "") // removes the file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    // mengekstrak metadata dan content yg terdapat di markdown file
    const {data,content} = matter(fileContent)


    const postData = {
        slug: postSlug,
        ...data,
        content
    }

    return postData
}

function getAllPosts(){
    const postFiles = getPostsFiles()

    // for(const postFile of postFiles){
    //     const postData = getPostData(postFile)
    // }

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile)
    })

    const sortedPosts = allPosts.sort((postA,postB) => postA.date > postB.date ? -1 : 1)

    return sortedPosts
}

function getFeaturedPosts(){
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter(post => post.isFeatured)

    return featuredPosts
}

export {getFeaturedPosts, getAllPosts, getPostData,getPostsFiles}