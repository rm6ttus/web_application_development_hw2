// Function to dynamically create and render the webpage elements matching your JSON structure
function renderPosts(posts) {
    const feedContainer = document.getElementById('posts-feed');
    
    // Clear out any existing content and keep the welcome banner
    feedContainer.innerHTML = `
        <div class="welcome-banner">
            <h1>Campus Feed</h1>
            <p>Latest updates and posts from students and faculty.</p>
        </div>
    `;

    posts.forEach(post => {
        // Create the <article class="post"> element
        const article = document.createElement('article');
        article.className = 'post';

        // 1. Post Header
        const postHeader = document.createElement('div');
        postHeader.className = 'post-header';

        const postUser = document.createElement('div');
        postUser.className = 'post-user';

        const avatarImg = document.createElement('img');
        avatarImg.src = post.author.avatar || 'images/user_avatar.png';
        avatarImg.alt = 'Avatar';
        avatarImg.className = 'avatar-img';

        const authorH2 = document.createElement('h2');
        authorH2.className = 'post-author';
        authorH2.textContent = post.author.name;

        postUser.appendChild(avatarImg);
        postUser.appendChild(authorH2);

        const timeTag = document.createElement('time');
        // Using createTime from your JSON
        const formattedDate = post.createTime ? post.createTime.split('T')[0] : '2026-10-03';
        timeTag.setAttribute('datetime', formattedDate);
        timeTag.textContent = formattedDate;

        postHeader.appendChild(postUser);
        postHeader.appendChild(timeTag);
        article.appendChild(postHeader);

        // 2. Post Content Paragraph
        const contentP = document.createElement('p');
        contentP.textContent = post.content;
        article.appendChild(contentP);

        // 3. Optional Media/Image (using 'media' property from your JSON)
        if (post.media) {
            const postImg = document.createElement('img');
            postImg.src = post.media;
            postImg.alt = 'Post media';
            postImg.className = 'post-image';
            article.appendChild(postImg);
        }

        // 4. Post Footer (Likes and Like Button)
        const postFooter = document.createElement('div');
        postFooter.className = 'post-footer';

        const likesSpan = document.createElement('span');
        const likesCount = post.likes !== undefined ? post.likes : 0;
        likesSpan.textContent = `${likesCount} Likes`;

        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.textContent = 'Like';
        
        // Interactive like functionality
        likeBtn.addEventListener('click', () => {
            likesSpan.textContent = `${likesCount + 1} Likes`;
            likeBtn.disabled = true;
        });

        postFooter.appendChild(likesSpan);
        postFooter.appendChild(likeBtn);
        article.appendChild(postFooter);

        // Append the fully constructed post article into the main feed container
        feedContainer.appendChild(article);
    });
}


// --- TASK 4: Fetch from the online source (Commented out as requested in Task 5) ---
/*
fetch('https://jsonhosting.com/api/json/2e19da6d')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        console.log("Successfully fetched posts from online endpoint:", posts);
        renderPosts(posts);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });
*/


// --- TASK 5: Fetch from the local JSON file integrated into your project ---
fetch('posts.json') // Make sure your local JSON file is named 'posts.json' in your folder
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        console.log("Successfully fetched posts from local file:", posts);
        renderPosts(posts);
    })
    .catch(error => {
        console.error('Error fetching the local JSON data:', error);
    });

    
// --- TASK 7: Dropdown Menu Toggle Functionality ---
const avatarBtn = document.getElementById('avatar-btn');
const userDropdown = document.getElementById('user-dropdown');

if (avatarBtn && userDropdown) {
    // Toggle dropdown visibility when clicking the avatar photo
    avatarBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        userDropdown.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', () => {
        if (userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    });
}