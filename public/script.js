const btn = document.getElementById('submit');

btn.addEventListener('click',(e)=>{
    e.preventDefault();

    
})
document.addEventListener('DOMContentLoaded', async () => {
    // Function to fetch and display all posts
    const fetchAndDisplayPosts = async () => {
      try {
        const response = await fetch('/getposts');
        const postsHTML = await response.text();
  
        // Update the post container with the retrieved HTML
        document.getElementById('postContainer').innerHTML = postsHTML;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    // Call the function on page load
    fetchAndDisplayPosts();
  
    // Handle form submission
    document.getElementById('addPostForm').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const postLink = document.getElementById('postLink').value;
      const postDescription = document.getElementById('postDescription').value;
  
      try {
        // Send a POST request to add a new post
        await fetch('/addpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `postLink=${encodeURIComponent(postLink)}&postDescription=${encodeURIComponent(postDescription)}`,
        });
  
        // Fetch and display all posts after submitting the form
        fetchAndDisplayPosts();
      } catch (error) {
        console.error('Error adding post:', error);
      }
    });
  });
  