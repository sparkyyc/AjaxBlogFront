const url = "https://powerful-taiga-43473.herokuapp.com"

document.addEventListener('DOMContentLoaded', () => {

    // fill titles 
    // add event listener to titles
    // on click of title, display content
    // update edit button
    // update delete button
    getBlogs()

    // add event listener of create button
    const newPostButton = document.getElementById('create-button')
    const createPostSection = document.getElementById('create-section')
    const editButton = document.getElementById('edit-button')
    const editPostSection = document.getElementById('edit-section')
    const editForm = document.getElementById('edit-form')
    const createForm = document.getElementById('post-form')
    const deleteButton = document.getElementById('delete-button')

    newPostButton.addEventListener('click', () => {
        createPostSection.classList.toggle('hide')
        editPostSection.classList.add('hide')
    })
    
    createForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let formValues = e.target.elements
        let postData = {}
        for (let i = 0; i < formValues.length - 1; i++) {
            postData[formValues[i].name] = formValues[i].value
        }
        axios.post(`${url}/post`, postData)
            .then((response) => {
                createPostSection.classList.toggle('hide')
                getBlogs()
            })
    })
    // add event listener to edit button
    editButton.addEventListener('click', () => {
        editPostSection.classList.toggle('hide')
        createPostSection.classList.add('hide')
    })

    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let formValues = e.target.elements
        let putData = {}

        for (let i = 0; i < formValues.length - 1; i++) {
            let inputName = formValues[i].name
            if (formValues[i].value !== "") {
                putData[inputName] = formValues[i].value
            }
        }
        let putId = document.getElementById('edit-button').getAttribute('data-id')
        console.log(putData)
        axios.put(`${url}/post/${putId}`, putData)
            .then((response) => {
                console.log(response.data[0])
                editPostSection.classList.toggle('hide')
                getBlogs(response.data[0].title, response.data[0].content)
            }).catch((err) => {
                console.log(err)
            })
    })
    // add event listener to delete button
    deleteButton.addEventListener('click', (e) => {
        let deleteId = e.target.getAttribute('data-id')
        console.log(deleteId)
        axios.delete(`${url}/post/${deleteId}`)
        .then((response) => {
            getBlogs()
        })
        .catch((err) => {
            console.log(err)
        })
    })
})

// get all blogs
const getBlogs = (title, content) => {
    let postList = document.getElementById('post-list')
    // clear table
    while (postList.firstChild) {
        postList.removeChild(postList.firstChild)
    }
    axios.get(`${url}/post`)
        .then((response) => {
            // console.log(response.data)
            let pastPosts = response.data
            pastPosts.forEach((post) => {
                titleChoices(post.title, post.id)
            })
            const titleDisplay = document.getElementById('display-title')
            const contentDisplay = document.getElementById('display-content')
            if(!title || !content) {
            titleDisplay.innerText = pastPosts[0].title
            contentDisplay.innerText = pastPosts[0].content
            const editButton = document.getElementById('edit-button')
            editButton.setAttribute('data-id', pastPosts[0].id)
            const deleteButton = document.getElementById('delete-button')
            deleteButton.setAttribute('data-id', pastPosts[0].id)
            } else {
                titleDisplay.innerText = title
                contentDisplay.innerText = content
            }
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

    const createPostSection = document.getElementById('create-section')
    const editPostSection = document.getElementById('edit-section')
    createPostSection.classList.add('hide')
    editPostSection.classList.add('hide')
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