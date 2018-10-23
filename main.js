const url = "http://localhost:3000"

document.addEventListener('DOMContentLoaded', () => {

// fill titles 
// add event listener to titles
// on click of title, display content
// update edit button
// update delete button
    getBlogs()

// add event listener of create button

// add event listener to edit button

// add event listener to delete button

})

// get all blogs
const getBlogs = () => {
    axios.get(`${url}/post`)
    .then((response) => {
        // console.log(response.data)
        let pastPosts = response.data
        pastPosts.forEach((post) => {
            titleChoices(post.title, post.id)
        })
        const titleDisplay = document.getElementById('display-title')
        const contentDisplay = document.getElementById('display-content')
        titleDisplay.innerText = pastPosts[0].title
        contentDisplay.innerText = pastPosts[0].content
    })
}

// create title buttons
const titleChoices = (postTitle, postId) => {
    const postList = document.getElementById('post-list')
    let listItem = document.createElement('li')
    postList.appendChild(listItem)
    let postLink = document.createElement('a')
    postLink.classList.add('post-title')
    postLink.setAttribute('data-id', postId)
    postLink.innerText = postTitle
    listItem.appendChild(postLink)
    postLink.addEventListener('click', displayPost)
}

const displayPost = (e) => {
    // get one blog and display title and content
    let postId = e.target.getAttribute('data-id')
    getOneBlog(postId)
    const editButton = document.getElementById('edit-button')
    const deleteButton = document.getElementById('delete-button')
    // add id to edit and delete buttons
    editButton.setAttribute('data-id', postId)
    deleteButton.setAttribute('data-id', postId)
}

// get one blog
const getOneBlog = (postId) => {
    axios.get(`${url}/post/${postId}`)
    .then((response) => {
        const titleDisplay = document.getElementById('display-title')
        const contentDisplay = document.getElementById('display-content')
        titleDisplay.innerText = response.data[0].title
        contentDisplay.innerText = response.data[0].content
    })
}

// create new blog post
const createNewBlog = () => {

}

//update blog post
const updateBlog = () => {

}

// delete blog post
const deleteBlog = () => {

}