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
const navBtns = document.querySelector('.nav_list_group-btns');

// hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    // navBtns.classList.toggle("active");
});

const removeHamburger = function() {
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

overlay.addEventListener('click', removeHamburger);

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



// slider
const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slider_container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // functions
    // create dots
    const createDots = function() {
        slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
        });
    };

    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach
        (dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }

    const goToSlide = function(slide) {
        slides.forEach((s, i) => (s.style.transform =
        `translateX(${100 * (i - slide)}%)`
        ));
    }

    // next slide
    const nextSlide = function() {
        if(curSlide === maxSlide - 1) {
        curSlide = 0;
        } else {
        curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    // previous slide
    const prevSlide = function() {
        if(curSlide === 0) {
        curSlide = maxSlide - 1;
        } else {
        curSlide--;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }


    // initialize defaults
    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();

    // btn handlers
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);


    // arrow key slide
    slidesContainer.addEventListener('keydown', function(e) {
        console.log('eee')
        if(e.key === 'ArrowLeft') prevSlide();
        if(e.key === 'ArrowRight') nextSlide();
    });

    // swipe slide mobile
    let touchstartX = 0;
    let touchendX = 0;
        
    function checkDirection() {
        if (touchendX < touchstartX) nextSlide();
        if (touchendX > touchstartX) prevSlide();
    }

    slidesContainer.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })

    slidesContainer.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        checkDirection()
    })


    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
        };
    });
}

slider();


