/* =========================================================
   RAMA ELDI — PREMIUM PORTFOLIO
   SITE.JS — FULL UPDATED VERSION
========================================================= */


/* =========================================================
   PAGE LOADER
   Berjalan secepat mungkin agar tidak stuck.
========================================================= */

(function startPortfolioLoader() {

    const pageLoader =
        document.getElementById("pageLoader");

    const loaderPercent =
        document.getElementById("loaderPercent");

    const loaderLine =
        document.getElementById("loaderLine");


    /* Jika loader tidak ditemukan,
       jangan hentikan JavaScript lainnya. */

    if (!pageLoader) {
        return;
    }


    /* Hindari double loader */

    if (
        pageLoader.dataset.started === "true"
    ) {
        return;
    }


    pageLoader.dataset.started =
        "true";


    let progress = 0;

    const duration = 1100;

    const startTime =
        performance.now();


    function animateLoader(currentTime) {

        const elapsed =
            currentTime - startTime;


        progress =
            Math.min(
                elapsed / duration,
                1
            );


        const percentage =
            Math.floor(
                progress * 100
            );


        /* COUNTER */

        if (loaderPercent) {

            loaderPercent.textContent =
                percentage;

        }


        /* PROGRESS LINE */

        if (loaderLine) {

            loaderLine.style.width =
                percentage + "%";

        }


        /* CONTINUE */

        if (progress < 1) {

            requestAnimationFrame(
                animateLoader
            );

        }

        /* FINISH */

        else {

            if (loaderPercent) {

                loaderPercent.textContent =
                    "100";

            }


            if (loaderLine) {

                loaderLine.style.width =
                    "100%";

            }


            setTimeout(
                function () {

                    pageLoader.classList.add(
                        "loaded"
                    );


                    document.body.classList.add(
                        "page-ready"
                    );

                },
                300
            );

        }

    }


    requestAnimationFrame(
        animateLoader
    );

})();



/* =========================================================
   MAIN APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const navbar =
            document.querySelector(
                ".navbar"
            );


        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const navLinks =
            document.querySelectorAll(
                ".nav-menu a"
            );


        const projectCards =
            document.querySelectorAll(
                ".project"
            );


        const modal =
            document.getElementById(
                "projectModal"
            );


        const modalClose =
            document.getElementById(
                "modalClose"
            );


        const modalOverlay =
            document.querySelector(
                ".modal-overlay"
            );


        const scrollProgress =
            document.getElementById(
                "scrollProgress"
            );


        /* =================================================
           MOBILE MENU ELEMENTS
        ================================================= */

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const mobileMenuLinks =
            document.querySelectorAll(
                "[data-menu-link]"
            );


        /* =================================================
           MODAL ELEMENTS
        ================================================= */

        const modalNumber =
            document.getElementById(
                "modalNumber"
            );


        const modalCategory =
            document.getElementById(
                "modalCategory"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalDescription =
            document.getElementById(
                "modalDescription"
            );


        const modalOverview =
            document.getElementById(
                "modalOverview"
            );


        const modalProblem =
            document.getElementById(
                "modalProblem"
            );


        const modalSolution =
            document.getElementById(
                "modalSolution"
            );


        const modalFeatures =
            document.getElementById(
                "modalFeatures"
            );


        const tech1 =
            document.getElementById(
                "tech1"
            );


        const tech2 =
            document.getElementById(
                "tech2"
            );


        const tech3 =
            document.getElementById(
                "tech3"
            );



        /* =================================================
           NAVBAR SCROLL
        ================================================= */

        function updateNavbar() {

            if (!navbar) {
                return;
            }


            if (window.scrollY > 50) {

                navbar.classList.add(
                    "scrolled"
                );

            }

            else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateNavbar,
            {
                passive: true
            }
        );


        updateNavbar();



        /* =================================================
           MOBILE MENU
        ================================================= */

        function openMobileMenu() {

            if (!mobileMenu) {
                return;
            }


            mobileMenu.classList.add(
                "active"
            );


            if (menuToggle) {

                menuToggle.classList.add(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            document.body.classList.add(
                "menu-open"
            );

        }



        function closeMobileMenu() {

            if (!mobileMenu) {
                return;
            }


            mobileMenu.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }



        function toggleMobileMenu() {

            if (!mobileMenu) {
                return;
            }


            if (
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            }

            else {

                openMobileMenu();

            }

        }



        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    toggleMobileMenu();

                }
            );

        }



        /* =================================================
           MOBILE MENU LINKS
        ================================================= */

        mobileMenuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            href &&
                            href.startsWith("#")
                        ) {

                            const target =
                                document.querySelector(
                                    href
                                );


                            if (target) {

                                event.preventDefault();


                                closeMobileMenu();


                                setTimeout(
                                    function () {

                                        target.scrollIntoView(
                                            {
                                                behavior:
                                                    "smooth",

                                                block:
                                                    "start"
                                            }
                                        );

                                    },
                                    100
                                );

                            }

                        }

                        else {

                            closeMobileMenu();

                        }

                    }
                );

            }
        );



        /* =================================================
           CLOSE MOBILE MENU + MODAL WITH ESC
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                    closeProjectModal();

                }

            }
        );



        /* =================================================
           RESET MOBILE MENU ON DESKTOP
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900
                ) {

                    closeMobileMenu();

                }

            }
        );



        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        if (
            sections.length &&
            navLinks.length &&
            "IntersectionObserver" in window
        ) {

            const navObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                const id =
                                    entry.target.id;


                                navLinks.forEach(
                                    function (link) {

                                        link.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                const activeLink =
                                    document.querySelector(
                                        `.nav-menu a[href="#${id}"]`
                                    );


                                if (activeLink) {

                                    activeLink.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25,

                        rootMargin:
                            "-20% 0px -60% 0px"
                    }
                );


            sections.forEach(
                function (section) {

                    navObserver.observe(
                        section
                    );

                }
            );

        }



        /* =================================================
           SMOOTH NAVIGATION
        ================================================= */

        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            !href.startsWith("#")
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        closeMobileMenu();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }
                );

            }
        );



        /* =================================================
           HERO BUTTON SMOOTH SCROLL
        ================================================= */

        const smoothButtons =
            document.querySelectorAll(
                'a[href="#projects"], ' +
                'a[href="#about"], ' +
                'a[href="#contact"]'
            );


        smoothButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            button.getAttribute(
                                "href"
                            );


                        if (!href) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }
                );

            }
        );



        /* =================================================
           SCROLL REVEAL
           
           IMPORTANT:
           CSS menggunakan .reveal.show
           sehingga JS harus menggunakan .show.
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".section-header, " +
                ".about-layout, " +
                ".skill-large, " +
                ".journey-item, " +
                ".journey-highlight, " +
                ".project, " +
                ".contact-inner, " +
                ".signature-main, " +
                ".signature-status, " +
                ".signature-links"
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            revealElements.length &&
            "IntersectionObserver" in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "show"
                                    );


                                    revealObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12,

                        rootMargin:
                            "0px 0px -60px 0px"
                    }
                );


            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }

        else {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "show"
                    );

                }
            );

        }



        /* =================================================
           CUSTOM CINEMATIC CURSOR
        ================================================= */

        const customCursor =
            document.querySelector(
                ".custom-cursor"
            );


        const cursorDot =
            document.querySelector(
                ".cursor-dot"
            );


        const cursorRing =
            document.querySelector(
                ".cursor-ring"
            );


        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0;


        if (
            customCursor &&
            cursorDot &&
            cursorRing &&
            !isTouchDevice
        ) {

            let mouseX = 0;

            let mouseY = 0;

            let currentX = 0;

            let currentY = 0;


            document.addEventListener(
                "mousemove",
                function (event) {

                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;


                    customCursor.classList.add(
                        "visible"
                    );

                }
            );


            function animateCursor() {

                currentX +=
                    (
                        mouseX -
                        currentX
                    ) * 0.15;


                currentY +=
                    (
                        mouseY -
                        currentY
                    ) * 0.15;


                cursorDot.style.left =
                    mouseX + "px";


                cursorDot.style.top =
                    mouseY + "px";


                cursorRing.style.left =
                    currentX + "px";


                cursorRing.style.top =
                    currentY + "px";


                requestAnimationFrame(
                    animateCursor
                );

            }


            animateCursor();



            /* Cursor interaction targets */

            const cursorTargets =
                document.querySelectorAll(
                    "a, button, .project, .mega-button, .text-button"
                );


            cursorTargets.forEach(
                function (element) {

                    element.addEventListener(
                        "mouseenter",
                        function () {

                            if (
                                element.classList.contains(
                                    "project"
                                )
                            ) {

                                customCursor.classList.add(
                                    "cursor-project"
                                );

                            }

                            else {

                                customCursor.classList.add(
                                    "cursor-hover"
                                );

                            }

                        }
                    );


                    element.addEventListener(
                        "mouseleave",
                        function () {

                            customCursor.classList.remove(
                                "cursor-hover",
                                "cursor-project"
                            );

                        }
                    );


                    element.addEventListener(
                        "mousedown",
                        function () {

                            customCursor.classList.add(
                                "cursor-click"
                            );

                        }
                    );


                    element.addEventListener(
                        "mouseup",
                        function () {

                            customCursor.classList.remove(
                                "cursor-click"
                            );

                        }
                    );

                }
            );


            document.addEventListener(
                "mouseleave",
                function () {

                    customCursor.classList.remove(
                        "visible"
                    );

                }
            );


            document.addEventListener(
                "mouseenter",
                function () {

                    customCursor.classList.add(
                        "visible"
                    );

                }
            );

        }



        /* =================================================
           PROJECT 3D TILT
        ================================================= */

        if (!isTouchDevice) {

            projectCards.forEach(
                function (card) {

                    card.addEventListener(
                        "mousemove",
                        function (event) {

                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const centerX =
                                rect.width / 2;


                            const centerY =
                                rect.height / 2;


                            const rotateX =
                                (
                                    (y - centerY) /
                                    centerY
                                ) * -2;


                            const rotateY =
                                (
                                    (x - centerX) /
                                    centerX
                                ) * 2;


                            card.style.transform =
                                `
                                perspective(1000px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                translateY(-5px)
                                scale(1.002)
                                `;

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        function () {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

        }



        /* =================================================
           PROJECT DATA
        ================================================= */

        const projectData = {


            /* =================================================
               PROJECT 01
            ================================================= */

            attendance: {

                number:
                    "01",


                category:
                    "WEB APPLICATION",


                title:
                    "Student Attendance System",


                description:
                    "Sistem presensi siswa berbasis web dengan teknologi face recognition untuk membantu proses pencatatan kehadiran secara lebih efektif.",


                overview:
                    "Sistem presensi siswa berbasis web yang mengintegrasikan pengenalan wajah untuk membantu proses identifikasi dan pencatatan kehadiran siswa.",


                problem:
                    "Proses pencatatan kehadiran secara manual dapat membutuhkan waktu dan berpotensi menimbulkan kesalahan pencatatan.",


                solution:
                    "Mengembangkan sistem presensi berbasis web dengan fitur pengenalan wajah serta opsi presensi manual sebagai alternatif.",


                features: [

                    "Face Recognition",

                    "Manual Attendance",

                    "Student Management",

                    "Attendance Recap"

                ],


                tech: [

                    "ASP.NET",

                    "C#",

                    "SQL SERVER"

                ]

            },


            /* =================================================
               PROJECT 02
            ================================================= */

            meeting: {

                number:
                    "02",


                category:
                    "WEB SYSTEM",


                title:
                    "Meeting Management",


                description:
                    "Web application untuk pengelolaan meeting, dokumen, dan informasi rapat berbasis web dengan tampilan dashboard yang terstruktur.",


                overview:
                    "Sistem berbasis web yang digunakan untuk membantu pengelolaan meeting, dokumen, serta informasi rapat secara terstruktur.",


                problem:
                    "Informasi meeting dan dokumen yang tidak terorganisir dapat membuat proses pencarian dan pengelolaan informasi menjadi kurang efisien.",


                solution:
                    "Membangun dashboard web yang mengelompokkan informasi meeting dan dokumen sehingga lebih mudah dikelola dan diakses.",


                features: [

                    "Meeting Management",

                    "Document Management",

                    "Dashboard",

                    "Information Management"

                ],


                tech: [

                    "ASP.NET CORE",

                    "SQL SERVER",

                    "UI / UX"

                ]

            },


            /* =================================================
               PROJECT 03
            ================================================= */

            portfolio: {

                number:
                    "03",


                category:
                    "PERSONAL WEBSITE",


                title:
                    "Personal Portfolio",


                description:
                    "Personal portfolio website dengan pendekatan visual premium untuk menampilkan profile, skill, experience, dan selected projects.",


                overview:
                    "Website portfolio personal yang dirancang untuk menampilkan identitas profesional, kemampuan teknis, pengalaman, pendidikan, dan project.",


                problem:
                    "Diperlukan sebuah media digital yang dapat menampilkan kemampuan dan project secara lebih menarik dibandingkan sekadar daftar CV.",


                solution:
                    "Membangun personal portfolio dengan visual premium, animasi interaktif, project showcase, dan struktur informasi yang jelas.",


                features: [

                    "Personal Profile",

                    "Skills Showcase",

                    "Experience",

                    "Project Showcase"

                ],


                tech: [

                    "ASP.NET MVC",

                    "CSS",

                    "JAVASCRIPT"

                ]

            }

        };



        /* =================================================
           MODAL HELPER
        ================================================= */

        function clearModalFeatures() {

            if (!modalFeatures) {
                return;
            }


            modalFeatures.innerHTML =
                "";

        }



        function renderModalFeatures(
            features
        ) {

            if (!modalFeatures) {
                return;
            }


            clearModalFeatures();


            if (
                !Array.isArray(features) ||
                features.length === 0
            ) {

                return;

            }


            features.forEach(
                function (feature) {

                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        feature;


                    modalFeatures.appendChild(
                        span
                    );

                }
            );

        }



        /* =================================================
           OPEN PROJECT MODAL
        ================================================= */

        function openProjectModal(
            projectId
        ) {

            if (!modal) {
                return;
            }


            const data =
                projectData[
                projectId
                ];


            if (!data) {
                return;
            }



            /* NUMBER */

            if (modalNumber) {

                modalNumber.textContent =
                    data.number;

            }



            /* CATEGORY */

            if (modalCategory) {

                modalCategory.textContent =
                    data.category;

            }



            /* TITLE */

            if (modalTitle) {

                modalTitle.textContent =
                    data.title;

            }



            /* DESCRIPTION */

            if (modalDescription) {

                modalDescription.textContent =
                    data.description;

            }



            /* OVERVIEW */

            if (modalOverview) {

                modalOverview.textContent =
                    data.overview || "";

            }



            /* PROBLEM */

            if (modalProblem) {

                modalProblem.textContent =
                    data.problem || "";

            }



            /* SOLUTION */

            if (modalSolution) {

                modalSolution.textContent =
                    data.solution || "";

            }



            /* FEATURES */

            renderModalFeatures(
                data.features
            );



            /* TECHNOLOGY */

            const technologies =
                data.tech || [];


            if (tech1) {

                tech1.textContent =
                    technologies[0] || "";

            }


            if (tech2) {

                tech2.textContent =
                    technologies[1] || "";

            }


            if (tech3) {

                tech3.textContent =
                    technologies[2] || "";

            }



            /* CLOSE MOBILE MENU */

            closeMobileMenu();



            /* OPEN MODAL */

            modal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );


            /* Reset modal scroll */

            window.setTimeout(
                function () {

                    const modalBox =
                        modal.querySelector(
                            ".modal-box"
                        );


                    if (modalBox) {

                        modalBox.scrollTop =
                            0;

                    }

                },
                50
            );

        }



        /* =================================================
           CLOSE PROJECT MODAL
        ================================================= */

        function closeProjectModal() {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }



        /* =================================================
           PROJECT CLICK
        ================================================= */

        projectCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const projectId =
                            card.dataset.project;


                        if (!projectId) {
                            return;
                        }


                        openProjectModal(
                            projectId
                        );

                    }
                );

            }
        );



        /* =================================================
           MODAL CLOSE BUTTON
        ================================================= */

        if (modalClose) {

            modalClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    closeProjectModal();

                }
            );

        }



        /* =================================================
           MODAL OVERLAY CLOSE
        ================================================= */

        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                function () {

                    closeProjectModal();

                }
            );

        }



        /* =================================================
           PREVENT MODAL BOX CLICK FROM CLOSING
        ================================================= */

        const modalBox =
            modal
                ?
                modal.querySelector(
                    ".modal-box"
                )
                :
                null;


        if (modalBox) {

            modalBox.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }



        /* =================================================
           SCROLL PROGRESS
        ================================================= */

        function updateScrollProgress() {

            if (!scrollProgress) {
                return;
            }


            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement
                    .scrollHeight;


            const windowHeight =
                window.innerHeight;


            const scrollable =
                documentHeight -
                windowHeight;


            if (scrollable <= 0) {

                scrollProgress.style.width =
                    "0%";

                return;

            }


            const percentage =
                (
                    scrollTop /
                    scrollable
                ) * 100;


            scrollProgress.style.width =
                Math.min(
                    percentage,
                    100
                ) + "%";

        }


        window.addEventListener(
            "scroll",
            updateScrollProgress,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateScrollProgress
        );


        updateScrollProgress();



        /* =================================================
           BACK TO TOP
           
           FIX:
           CSS / Index menggunakan .back-top
        ================================================= */

        const backToTop =
            document.querySelector(
                ".back-top"
            );


        if (backToTop) {

            /* Tampilkan tombol setelah scroll */

            window.addEventListener(
                "scroll",
                function () {

                    if (
                        window.scrollY > 500
                    ) {

                        backToTop.classList.add(
                            "visible"
                        );

                    }

                    else {

                        backToTop.classList.remove(
                            "visible"
                        );

                    }

                },
                {
                    passive: true
                }
            );


            backToTop.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    window.scrollTo(
                        {
                            top: 0,

                            behavior:
                                "smooth"
                        }
                    );

                }
            );

        }



        /* =================================================
           TECH MARQUEE
        ================================================= */

        const marquee =
            document.querySelector(
                ".tech-marquee"
            );


        if (marquee) {

            marquee.addEventListener(
                "mouseenter",
                function () {

                    marquee.classList.add(
                        "marquee-paused"
                    );

                }
            );


            marquee.addEventListener(
                "mouseleave",
                function () {

                    marquee.classList.remove(
                        "marquee-paused"
                    );

                }
            );

        }



        /* =================================================
           INTERACTIVE BACKGROUND
        ================================================= */

        const interactiveBg =
            document.getElementById(
                "interactiveBg"
            );


        if (
            interactiveBg &&
            !isTouchDevice
        ) {

            let bgMouseX = 0;

            let bgMouseY = 0;

            let bgCurrentX = 0;

            let bgCurrentY = 0;


            document.addEventListener(
                "mousemove",
                function (event) {

                    bgMouseX =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    bgMouseY =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;

                }
            );


            function animateBackground() {

                bgCurrentX +=
                    (
                        bgMouseX -
                        bgCurrentX
                    ) * 0.035;


                bgCurrentY +=
                    (
                        bgMouseY -
                        bgCurrentY
                    ) * 0.035;


                interactiveBg.style.transform =
                    `
                    translate3d(
                        ${bgCurrentX * 20}px,
                        ${bgCurrentY * 20}px,
                        0
                    )
                    `;


                requestAnimationFrame(
                    animateBackground
                );

            }


            animateBackground();

        }



        /* =================================================
           HERO PARALLAX
        ================================================= */

        const heroArt =
            document.querySelector(
                ".hero-art"
            );


        if (
            heroArt &&
            !isTouchDevice
        ) {

            let heroX = 0;

            let heroY = 0;


            document.addEventListener(
                "mousemove",
                function (event) {

                    const x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;


                    heroX =
                        x * 12;


                    heroY =
                        y * 12;

                }
            );


            function animateHeroArt() {

                heroArt.style.transform =
                    `
                    translate3d(
                        ${heroX}px,
                        ${heroY}px,
                        0
                    )
                    `;


                requestAnimationFrame(
                    animateHeroArt
                );

            }


            animateHeroArt();

        }



        /* =================================================
           PROJECT IMAGE / VISUAL ERROR
        ================================================= */

        const projectImages =
            document.querySelectorAll(
                ".project img"
            );


        projectImages.forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.style.display =
                            "none";

                    }
                );

            }
        );



        /* =================================================
           PREVENT BODY SCROLL WHEN MODAL OPEN
        ================================================= */

        function syncModalBodyState() {

            if (!modal) {
                return;
            }


            if (
                modal.classList.contains(
                    "active"
                )
            ) {

                document.body.classList.add(
                    "modal-open"
                );

            }

            else {

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }


        syncModalBodyState();



        /* =================================================
           VISIBILITY CHANGE
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden
                ) {

                    document.body.classList.add(
                        "page-hidden"
                    );

                }

                else {

                    document.body.classList.remove(
                        "page-hidden"
                    );

                }

            }
        );



        /* =================================================
           INITIAL STATE
        ================================================= */

        document.body.classList.add(
            "js-ready"
        );


        updateNavbar();

        updateScrollProgress();


        console.log(
            "RAMA ELDI — Portfolio initialized."
        );


        console.log(
            "✓ Page Loader"
        );


        console.log(
            "✓ Mobile Navigation"
        );


        console.log(
            "✓ Active Navigation"
        );


        console.log(
            "✓ Smooth Scroll"
        );


        console.log(
            "✓ Scroll Reveal"
        );


        console.log(
            "✓ Cinematic Cursor"
        );


        console.log(
            "✓ Project 3D Tilt"
        );


        console.log(
            "✓ Project Modal"
        );


        console.log(
            "✓ Case Study"
        );


        console.log(
            "✓ Scroll Progress"
        );


        console.log(
            "✓ Back To Top"
        );


        console.log(
            "✓ Interactive Background"
        );


        console.log(
            "✓ Hero Parallax"
        );

    }

);