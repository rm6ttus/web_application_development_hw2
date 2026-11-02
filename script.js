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
        const article = document.createElement('article');
        article.className = 'post';

        // Post Header
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
        const formattedDate = post.createTime ? post.createTime.split('T')[0] : 'Unknown Date';
        timeTag.setAttribute('datetime', formattedDate);
        timeTag.textContent = formattedDate;

        postHeader.appendChild(postUser);
        postHeader.appendChild(timeTag);
        article.appendChild(postHeader);

        // Post Content Paragraph
        const contentP = document.createElement('p');
        contentP.textContent = post.content;
        article.appendChild(contentP);

        // Media/Image
        if (post.media) {
            const postImg = document.createElement('img');
            postImg.src = post.media;
            postImg.alt = 'Post media';
            postImg.className = 'post-image';
            article.appendChild(postImg);
        }

        // Post Footer (Likes and Like Button)
        const postFooter = document.createElement('div');
        postFooter.className = 'post-footer';

        const likesSpan = document.createElement('span');
        const likesCount = post.likes;
        likesSpan.textContent = `${likesCount} Likes`;

        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.textContent = 'Like';

        postFooter.appendChild(likesSpan);
        postFooter.appendChild(likeBtn);
        article.appendChild(postFooter);

        feedContainer.appendChild(article);
    });
}


// Fetch from the online source
/*
fetch('https://gist.githubusercontent.com/ameriloo/1fcb8a4eb011c2bc1bbccafe3810d132/raw/c65a8b948eb3d17ad2ef6c434420daf977dc0754/gistfile1.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        console.log("Posts downloaded successfully:", posts);
        renderPosts(posts);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
*/

// Fetch from the local JSON file integrated into your project
fetch('posts.json')
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


// Dropdown Menu Toggle Functionality
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

