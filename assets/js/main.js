(function($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper'),
        $banner = $('#banner'),
        $header = $('#header');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Mobile?
    if (browser.mobile) $body.addClass('is-mobile');
    else {
        breakpoints.on('>medium', function() {
            $body.removeClass('is-mobile');
        });
        breakpoints.on('<=medium', function() {
            $body.addClass('is-mobile');
        });
    }

    // Scrolly.
    $('.scrolly').scrolly({
        speed: 1500,
        offset: $header.outerHeight()
    });

    // Menu.
    $('#menu')
        .append('<a href="#menu" class="close"></a>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-menu-visible'
        });

    // Header.
    if ($banner.length > 0 && $header.hasClass('alt')) {
        $window.on('resize', function() {
            $window.trigger('scroll');
        });

        $banner.scrollex({
            bottom: $header.outerHeight() + 1,
            terminate: function() {
                $header.removeClass('alt');
            },
            enter: function() {
                $header.addClass('alt');
            },
            leave: function() {
                $header.removeClass('alt');
            }
        });
    }

    // Add IntersectionObserver for spotlight animations
    document.addEventListener('DOMContentLoaded', function() {
        const spotlights = document.querySelectorAll('.spotlight');

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        spotlights.forEach(spotlight => {
            observer.observe(spotlight);
        });

        // Add IntersectionObserver for "What We Do" section animations
        const whatWeDoSection = document.querySelector('#what-we-do');

        const whatWeDoObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    } else {
                        entry.target.classList.remove('animate'); // Optional: remove this line if you want the animation to stay
                    }
                });
            },
            {
                threshold: 0.1 // Trigger animation when 10% of the section is visible
            }
        );

        whatWeDoObserver.observe(whatWeDoSection);
    });

    // Gallery functionality
    const galleryContainer = document.querySelector('.gallery-container');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    let scrollAmount = 0;
    const scrollStep = 300; // Adjust this value to control scroll speed

    prevBtn.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        galleryContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        scrollAmount += scrollStep;
        galleryContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Interactive Image Enlargement
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const description = item.querySelector('.image-description');

        item.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.2)';
            description.style.opacity = '1';
        });

        item.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
            description.style.opacity = '0';
        });
    });
})(jQuery);
