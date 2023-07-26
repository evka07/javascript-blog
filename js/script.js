document.addEventListener('DOMContentLoaded', function () {
    function titleClickHandler(event) {
        event.preventDefault();
        const clickedElement = this;

        const activeLinks = document.querySelectorAll('.titles a.active');
        for (const activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        clickedElement.classList.add('active');

        const activeArticles = document.querySelectorAll('.post.active');
        for (const activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        const articleID = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(articleID);

        if (targetArticle) {
            targetArticle.classList.add('active');
        }
    }

    function generateTitleLinks(tag = null, author = null) {
        const articles = document.querySelectorAll('.post');
        const titleList = document.querySelector('.titles');
        titleList.innerHTML = '';

        for (const article of articles) {
            const articleTitle = article.querySelector('.post-title').textContent;
            const articleID = article.getAttribute('id');
            const articleTags = article.getAttribute('data-tags').split(' ');
            const articleAuthor = article.getAttribute('data-author');

            if ((tag && !articleTags.includes(tag)) || (author && articleAuthor !== author)) {
                continue;
            }

            const linkHTML = `<li><a href="#${articleID}">${articleTitle}</a></li>`;
            titleList.insertAdjacentHTML('beforeend', linkHTML);
        }

        const articleLinks = document.querySelectorAll('.titles a');
        for (const articleLink of articleLinks) {
            articleLink.addEventListener('click', titleClickHandler);
        }
    }

    function generateTags() {
        const articles = document.querySelectorAll('.post');
        const tagsList = document.querySelector('.tags');
        tagsList.innerHTML = '';

        const tagsCount = {};

        for (const article of articles) {
            const tags = article.getAttribute('data-tags').split(' ');
            for (const tag of tags) {
                if (!tagsCount[tag]) {
                    tagsCount[tag] = 0;
                }
                tagsCount[tag]++;
            }
        }
        for (const tag in tagsCount) {
            const tagHTML = `<li><a href="#tag-${tag}">${tag}</a><span>(${tagsCount[tag]})</span></li>`;
            tagsList.insertAdjacentHTML('beforeend', tagHTML);
        }
    }

    function generateTagsSection() {
        const articles = document.querySelectorAll('.post');

        for (const article of articles) {
            const tagsWrapper = article.querySelector('.post-tags');
            const tagsHTML = generateTagsHTML(article);
            tagsWrapper.innerHTML = tagsHTML;
        }
    }

    function generateTagsHTML(article) {
        const tags = article.getAttribute('data-tags').split(' ');
        let tagsHTML = '';

        for (const tag of tags) {
            tagsHTML += `<li><a href="#tag-${tag}">${tag}</a></li>`;
        }

        return `<div class="post-tags">
            <p><strong>Tags:</strong></p>
            <ul class="list list-horizontal">${tagsHTML} </ul>
          </div>`;
    }

    function tagClickHandler(event) {
        event.preventDefault();

        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const tag = href.replace('#tag-', '');

        const activeTagLinks = document.querySelectorAll('.tags li a.active');
        for (const activeTagLink of activeTagLinks) {
            activeTagLink.classList.remove('active');
        }

        const foundTagLinks = document.querySelectorAll(`.tags li a[href="${href}"]`);
        for (const foundTagLink of foundTagLinks) {
            foundTagLink.classList.add('active');
        }

        generateTitleLinks(tag);
    }

    function addClickListenersToTags() {
        // const tagLinks = document.querySelectorAll('.tags li a');
        const tagLinks = document.querySelectorAll('.post-tags li a , .tags li a');

        for (const tagLink of tagLinks) {
            tagLink.addEventListener('click', tagClickHandler);
        }
    }


    function authorClickHandler(event) {
        event.preventDefault();

        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const author = href.replace('#author-', '');

        generateTitleLinks(null, author);
    }

    function addClickListenersToAuthors() {
        const authorLinks = document.querySelectorAll('.post-author a');

        for (const authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    }

    function generateAuthors() {
        const articles = document.querySelectorAll('.post');

        const authorsList = document.querySelector('.authors');
        authorsList.innerHTML = '';

        const authors = {};

        for (const article of articles) {
            const author = article.getAttribute('data-author');
            const authorID = `author-${author}`;

            if (!author || authors[authorID]) {
                continue;
            }

            const authorHTML = `<li><a href="#${authorID}">${author}</a></li>`;
            authorsList.insertAdjacentHTML('beforeend', authorHTML);

            authors[authorID] = true;
        }
    }

    function generateAuthorsSection() {
        const articles = document.querySelectorAll('.post');

        for (const article of articles) {
            const authorWrapper = article.querySelector('.post-author');
            const authorHTML = generateAuthorsHTML(article);
            authorWrapper.innerHTML = authorHTML;
        }
    }

    function generateAuthorsHTML(article) {
        const authors = article.getAttribute('data-author').split(' ');
        let authorHTML = '';

        for (const author of authors) {
            authorHTML += `<li><a href="#tag-${author}">${author}</a></li>`;
        }

        return `<div class="post-tags">
            <p><strong></strong></p>
            <ul class="list list-horizontal">${authorHTML} </ul>
          </div>`;
    }

    function addClickListenersToAuthorsSection() {
        const authorLinks = document.querySelectorAll('.authors a');

        for (const authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    }

    generateAuthors()
    addClickListenersToAuthorsSection();
    generateTagsSection();
    generateAuthorsSection()
    generateTitleLinks();
    generateTags();
    addClickListenersToTags();
    addClickListenersToAuthors();
});
