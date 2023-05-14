'use strict'


const tabs = document.querySelectorAll('.contribute_tab');
const tabsContainer = document.querySelector('.contribute_tab-container');
const tabsContent = document.querySelectorAll('.contribute_content');

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_list_group');
const overlay = document.querySelector('.overlay');
const navItems = document.querySelectorAll('.nav_item');

// hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
});

// sticky nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver
( stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

// headerObserver.observe(header);

// scroll to contribute
const contributeScroll = document.querySelector('.btn-contribute');
const section3 = document.querySelector('#section-3')

contributeScroll.addEventListener('click', function(e) {
    // e.preventDefault();

    section3
    .scrollIntoView({behavior: "smooth"});
})



// nav links scroll to section
document.querySelector('.nav_list_group').addEventListener('click', function(e) {
    e.preventDefault();
    // console.log(e.target);

    if(e.target.classList.contains('nav_link')) {
        const id = e.target.getAttribute('href');
        console.log(id)
        document.querySelector(id)
        .scrollIntoView({behavior: "smooth"});
    }
});


// tabbed component - contribute section
tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.contribute_tab');
    // console.log(clicked);

    //guard clause
    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('contribute_tab-active'));
    clicked.classList.add('contribute_tab-active');

    tabsContent.forEach(content => content.classList.remove('contribute_content-active'));

    document.querySelector(`.contribute_content-${clicked.dataset.tab}`).classList.add('contribute_content-active');
});