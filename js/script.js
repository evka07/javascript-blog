'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const articleTitles = document.querySelectorAll('.titles a')
    const articles = document.querySelectorAll('.post')

    for (const titleLink of articleTitles) {
        titleLink.addEventListener('click', (event) => {
            event.preventDefault();
            for (const link of articleTitles) {
                link.classList.remove("active")
            }
            for (const postTitle of articles) {
                postTitle.classList.remove('active')
            }

            titleLink.classList.add('active')
            const articleID = titleLink.getAttribute("href")
            const targetArticle = document.querySelector(articleID)

            if (targetArticle) {
                targetArticle.classList.add('active')
            }
        })
    }


})