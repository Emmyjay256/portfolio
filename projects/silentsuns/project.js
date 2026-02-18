// project.js

/* =========================
   1) EDIT ONLY THIS OBJECT
   (EVERY PROJECT WILL ONLY SUPPLY THESE)
========================= */
const PROJECT = {
    title: "SILENT SUNS - NASA SPACE APPS CHALLENGE",

    overview:
        "This project was built for the NASA Space Apps Challenge to identify planetary transits and visualize them through a 3D interface. It bridges the gap between deep-learning predictions and interactive web storytelling.",

    status: "Completed (Oct 2024)",
    role: "Team Lead / Developer",

    coreTech: [
        "Kotlin",
        "Three.js",
        "Python (Colab)",
        "OpenAI API",
        "HTML/CSS",
        "GCS",
        "GitHub Pages"
    ],

    heroImage: "silentsuns.png",

    problemChallenge:
        "Processing NASA's astronomical data is one thing, but making it understandable to the public is another. We needed a way to not only predict where these transits were happening using AI but also show them in a way that felt real and accessible.",

    problemGoal:
        'To create an end-to-end platform that combines AI-driven transit discovery with a 3D interactive orrery and real-time facts about the cosmos.',

    architectureAndDesign:
        "The tech stack was quite broad to handle the different needs of the project: AI Training: We used Google Colab for training the model and performed inference on Google Cloud Storage (GCS) to manage the datasets efficiently. This took most of the time since we had to process raw FITs files from NASA telescopes into CSV files that we could use for training. The Web Front-end: Built using HTML and CSS, hosted on GitHub Pages. We integrated the OpenAI API to power a specific section of the site that generates and serves random, interesting facts about exoplanets to keep users engaged. 3D Visualization: We used Three.js to build two major components: a 3D Earth for transit locations and a separate 3D module showing the orbit of the discovered planet around its respective sun.",

    buildProcess:
        "The main hurdle was the math involved in Three.js. Making the globe was okay, but the real difficulty was making pins that could drop in the exact locations on Earth where the transits would be visible. We had to ensure the coordinate mapping was perfect so the pins stayed locked to their geographic points. This meant carefully UV unwrapping the globe in Blender, adding the earth texture then using known geographical features to map coordinates on the 3D globe to those on earth. Another interesting part was the 3D orbit simulation. We had to model the planet's path around its star accurately while keeping the performance smooth in the browser. Wiring up the OpenAI API was also key—it turned the site from a static viewer into an educational tool that could answer or give facts about the very exoplanets the AI was identifying.",

    performanceAndResults:
        "We successfully integrated AI inference with a live web interface. The site served as a 'one-stop shop' where you could see the AI's results, watch the 3D orbital mechanics of the discovery, and learn random exoplanet facts via the AI connection. Users could easily upload their own FITs files for inference and analysis. By hosting on GitHub Pages, we ensured the site was lightweight and accessible to anyone without needing heavy hardware to run the 3D simulations.",

    futurePlans:
        "We plan to improve this and use in any related competitions in the near future. Apart from that, this was just a competition project.",

    assets: {
        github: "https://github.com/Emmyjay256/silentsuns",
        demo: "https://emmyjay256.github.io/silentsuns/",

        gallery: [
            { src: "silentsuns1.jpg", caption: "FITS upload platgorm" },
            { src: "silentsuns2.jpg", caption: "Planet orbit simulation" },
            { src: "silentsuns3.jpg", caption: "Earth pin dropper" },
            { src: "silentsuns4.jpg", caption: "Upload platform with results" }
        ]
    },

    contact: {
        whatsappNumber: "+256786877451",
        email: "adonguemmaodaka@gmail.com"
    }
};

/* =========================
   2) PAGE RENDERING LOGIC
========================= */
function qs(id) {
    return document.getElementById(id);
}

function renderProject() {
    document.title = `${PROJECT.title} • Project`;

    qs("projectTitle").textContent = PROJECT.title;
    qs("projectOverview").textContent = PROJECT.overview;

    qs("projectStatus").textContent = PROJECT.status;
    qs("projectRole").textContent = PROJECT.role;
    qs("projectTech").textContent = (PROJECT.coreTech || []).join(" | ");

    // kicker line
    qs("projectStatusKicker").textContent = `${PROJECT.status} • Built for real field conditions`;

    // hero image
    qs("heroImage").src = PROJECT.heroImage;
    qs("heroImage").alt = `${PROJECT.title} hero image`;

    // top buttons
    setupLink(qs("githubBtn"), PROJECT.assets?.github);
    setupLink(qs("demoBtn"), PROJECT.assets?.demo);

    // problem statement
    qs("challengeText").textContent = PROJECT.problemChallenge;
    qs("goalText").textContent = PROJECT.problemGoal;

    // architecture
    qs("architectureText").textContent = PROJECT.architectureAndDesign;

    // build process
    qs("buildProcessText").textContent = PROJECT.buildProcess;

    // performance
    qs("performanceText").textContent = PROJECT.performanceAndResults;

    // future plans
    qs("futureText").textContent = PROJECT.futurePlans;

    // asset links (simple)
    setupLink(qs("githubLink"), PROJECT.assets?.github);
    setupLink(qs("demoLink"), PROJECT.assets?.demo);

    // gallery
    renderGallery(PROJECT.assets?.gallery || []);

    // contact hub wiring
    wireContact(PROJECT.contact || {});
}

function setupLink(el, url) {
    if (!el) return;

    if (!url || url === "#") {
        el.style.display = "none";
        return;
    }

    el.style.display = "inline";
    el.href = url;
}

/* =========================
   3) GALLERY + LIGHTBOX
========================= */
let GALLERY = [];
let currentIndex = 0;

function renderGallery(images) {
    GALLERY = images || [];
    const grid = qs("galleryGrid");
    grid.innerHTML = "";

    if (GALLERY.length === 0) {
        const p = document.createElement("p");
        p.className = "muted";
        p.textContent = "No gallery images yet. Add them in PROJECT.assets.gallery.";
        grid.appendChild(p);
        return;
    }

    GALLERY.forEach((item, idx) => {
        const box = document.createElement("div");
        box.className = "gallery-item";
        box.tabIndex = 0;

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.caption || `Gallery image ${idx + 1}`;

        const cap = document.createElement("div");
        cap.className = "gallery-cap";
        cap.textContent = item.caption || `Image ${idx + 1}`;

        box.appendChild(img);
        box.appendChild(cap);

        box.addEventListener("click", () => openLightbox(idx));
        box.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openLightbox(idx);
        });

        grid.appendChild(box);
    });

    // lightbox controls (safe to bind each render since page is static)
    qs("lightboxBackdrop").addEventListener("click", closeLightbox);
    qs("lightboxClose").addEventListener("click", closeLightbox);
    qs("prevBtn").addEventListener("click", () => navLightbox(-1));
    qs("nextBtn").addEventListener("click", () => navLightbox(1));

    document.addEventListener("keydown", (e) => {
        const lb = qs("lightbox");
        if (!lb.classList.contains("show")) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navLightbox(-1);
        if (e.key === "ArrowRight") navLightbox(1);
    });
}

function openLightbox(index) {
    currentIndex = index;
    const lb = qs("lightbox");
    lb.classList.add("show");
    lb.setAttribute("aria-hidden", "false");
    updateLightbox();
}

function closeLightbox() {
    const lb = qs("lightbox");
    lb.classList.remove("show");
    lb.setAttribute("aria-hidden", "true");
}

function navLightbox(direction) {
    if (GALLERY.length === 0) return;
    currentIndex = (currentIndex + direction + GALLERY.length) % GALLERY.length;
    updateLightbox();
}

function updateLightbox() {
    const item = GALLERY[currentIndex];
    qs("lightboxImg").src = item.src;
    qs("lightboxCaption").textContent = item.caption || `Image ${currentIndex + 1}`;
}

/* =========================
   4) CONTACT HUB (OOZING BUTTON)
========================= */
let contactVisible = false;
let animFrame = null;
let scale = 1;
let growing = true;
let button = null;

document.addEventListener("DOMContentLoaded", () => {
    renderProject();

    button = document.querySelector(".contact-btn");
    startAnimation();
});

function animateButton() {
    if (!button) return;

    // pulse
    if (growing) {
        scale += 0.02;
        if (scale >= 1.2) growing = false;
    } else {
        scale -= 0.02;
        if (scale <= 0.8) growing = true;
    }

    // vibration at peak
    let vibration = "";
    if (scale >= 1.2) {
        vibration = ` translateX(${Math.sin(Date.now() / 50) * 3}px)`;
    }

    button.style.transform = `scale(${scale})${vibration}`;
    animFrame = requestAnimationFrame(animateButton);
}

function startAnimation() {
    if (!animFrame) animFrame = requestAnimationFrame(animateButton);
}

function stopAnimation() {
    cancelAnimationFrame(animFrame);
    animFrame = null;
    if (button) button.style.transform = "scale(1)";
}

function toggleContactOptions() {
    const options = document.querySelector(".contact-options");
    contactVisible = !contactVisible;

    if (contactVisible) {
        options.style.display = "flex";
        stopAnimation();
    } else {
        options.style.display = "none";
        startAnimation();
    }
}

window.addEventListener("scroll", () => {
    if (contactVisible) {
        document.querySelector(".contact-options").style.display = "none";
        contactVisible = false;
        startAnimation();
    }
});

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied: " + text);
    });
}

function wireContact(contact) {
    const wNum = contact.whatsappNumber || "";
    const email = contact.email || "";

    // WhatsApp
    qs("whatsappText").textContent = wNum;
    qs("whatsappLink").href = `https://wa.me/${sanitizePhoneForWa(wNum)}`;

    // Call
    qs("callText").textContent = wNum;
    qs("callLink").href = `tel:${sanitizePhoneForTel(wNum)}`;

    // Email
    qs("emailText").textContent = email;
    qs("emailLink").href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

function sanitizePhoneForWa(phone) {
    // wa.me expects digits only, with country code
    return (phone || "").replace(/[^\d]/g, "");
}

function sanitizePhoneForTel(phone) {
    // tel: can include + but keep it clean
    return (phone || "").replace(/[^\d+]/g, "");
}