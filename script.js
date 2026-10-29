// Fetch the JSON file from your online endpoint
fetch('https://jsonhosting.com/api/json/d0284f9c')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parses the text into a JavaScript array/object
    })
    .then(posts => {
        console.log("Successfully fetched posts:", posts);
 
        // Loop through your posts and render them on your page
        posts.forEach(post => {
            console.log(post.author.name, ":", post.content);
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });

