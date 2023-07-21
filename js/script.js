'use strict';

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

    function generateTitleLinks() {
        const articleTitles = document.querySelectorAll('.titles a');
        const articles = document.querySelectorAll('.post');
        const titleList = document.querySelector('.titles');
        titleList.innerHTML = '';

        for (const article of articles) {
            const articleTitle = article.querySelector('.post-title').textContent;
            const articleID = article.getAttribute('id');
            const linkHTML = `<li><a href="#${articleID}">${articleTitle}</a></li>`;
            titleList.insertAdjacentHTML('beforeend', linkHTML);
        }

        const articleLinks = document.querySelectorAll('.titles a');
        for (const articleLink of articleLinks) {
            articleLink.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
});
