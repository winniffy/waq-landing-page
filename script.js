'use strict'




// tabbed component - contribute section
const tabs = document.querySelectorAll('.contribute_tab');
const tabsContainer = document.querySelector('.contribute_tab-container');
const tabsContent = document.querySelectorAll('.contribute_content');

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.contribute_tab');
    // console.log(clicked);

    //gaurd clause
    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('contribute_tab-active'));
    clicked.classList.add('contribute_tab-active');

    tabsContent.forEach(content => content.classList.remove('contribute_content-active'));

    document.querySelector(`.contribute_content-${clicked.dataset.tab}`).classList.add('contribute_content-active');
});