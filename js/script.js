
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-'
function calculateTagsParams(tags) {
    let min = Infinity;
    let max = -Infinity;

    for (const tag in tags) {
        const tagCount = tags[tag];
        min = Math.min(min, tagCount);
        max = Math.max(max, tagCount);
    }

    return {
        min: min,
        max: max
    };
}

function calculateTagClass(count, params) {
    const classCount = optCloudClassCount;
    const classPrefix = optCloudClassPrefix;

    const normalizedCount = count - params.min
    const normalizedMax = params.max - params.min
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (classCount - 1) + 1 );

    return classPrefix + classNumber
}

document.addEventListener('DOMContentLoaded', function () {

    const articleTemplate = document.getElementById("article-template").innerHTML
    const compiledArticleTemplate = Handlebars.compile(articleTemplate)

    const articles = [
        {
            articleId: "article-1",
            title: "Improve Your Language Ability",
            author: "by Marion Berry",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["English Ability"]
        },

        {
            articleId: "article-2",
            title: "School or Work",
            author: "by George Tuxedo",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["English Ability School Workplace"]
        },
        {
            articleId: "article-3",
            title: "Grocery Shopping",
            author: "by George Tuxedo",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["English Ability Food Dish"]
        },

        {
            articleId: "article-4",
            title: "Home",
            author: "by Marion Berry",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["English Ability Home Opportunities"]
        },

        {
            articleId: "article-5",
            title: "Family",
            author: "by Kitty Toebean",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["English Ability Family"]
        },

        {
            articleId: "article-6",
            title: "Pets",
            author: "by Marion Berry",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["Pets Home Travel"]
        },

        {
            articleId: "article-7",
            title: "Weather",
            author: "by Kitty Toebean",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["Weather Home"]
        },

        {
            articleId: "article-8",
            title: "Clothing",
            author: "by Theo Tabby",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["Clothes Weather Home"]
        },

        {
            articleId: "article-9",
            title: "Friends",
            author: "by Marion Berry",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["Friends English Weather"]
        },

        {
            articleId: "article-10",
            title: "Travel",
            author: "by George Tuxedo",
            content: "Tip: Travel can be a diverse topic to talk about. It can mean to travel from one place to-->\n" +
                "                            another using a specific mode of transportation. Or, it can be the kind of travel where you-->\n" +
                "                            visit another city or country. As we said, it is somewhat crucial for asking directions to-->\n" +
                "                            be able to go to your destination, so practice questions like, “How do we get there?” “Where-->\n" +
                "                            is the bus stop?” “Point me to the hospital.” Learning such questions may be handy for-->\n" +
                "                           different types of situations, especially in an emergency",
            tags: ["Travel"]
        },

    ]

    for (const article of articles) {
        const articleHtml = compiledArticleTemplate(article);
        document.querySelector(".posts").insertAdjacentHTML("beforeend", articleHtml)
    }

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

        const tagsParams = calculateTagsParams(tagsCount)
        console.log('tagsParams: ', tagsParams)
        for (const tag in tagsCount) {
            const tagClass = calculateTagClass(tagsCount[tag], tagsParams);
            const tagHTML = `<li><a class="${tagClass}" href="#tag-${tag}">${tag}</a><span>(${tagsCount[tag]})</span></li>`;
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

        const authorsInfo = {};

        for (const article of articles) {
            const author = article.getAttribute('data-author');

            if (!author) {
                continue;
            }


            if (!authorsInfo[author]) {
                authorsInfo[author] = {
                    count: 0,
                    link: `#author-${author}`,
                };
            }

            authorsInfo[author].count++;
        }

        const authorsList = document.querySelector('.authors');
        authorsList.innerHTML = '';

        for (const author in authorsInfo) {
            const { count, link } = authorsInfo[author];
            const authorHTML = `<li><a href="${link}">${author}</a> (${count})</li>`;
            authorsList.insertAdjacentHTML('beforeend', authorHTML);
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
        const author = article.getAttribute('data-author');
        const authorID = `author-${author}`;

        if (!author) {
            return '';
        }

        return `<div class="post-tags">
        <p><strong>Author:</strong></p>
        <ul class="list list-horizontal"><li><a href="#${authorID}">${author}</a></li></ul>
      </div>`;
    }

    function addClickListenersToAuthorsSection() {
        const authorLinks = document.querySelectorAll('.authors a');

        for (const authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    }

    function displayFirstPost(){
        const firstPost = document.querySelector('.titles a');
        if (firstPost) {
            firstPost.click()
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

    displayFirstPost()
});
