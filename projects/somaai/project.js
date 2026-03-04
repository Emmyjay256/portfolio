// project.js

/* =========================
   1) EDIT ONLY THIS OBJECT
   (EVERY PROJECT WILL ONLY SUPPLY THESE)
========================= */
const PROJECT = {
    title: "SOMA AI: AN AI-POWERED SELF-STUDY APP",

    overview:
        "Soma AI is a self-study platform designed for Uganda’s new Competency-Based Curriculum (CBC). It provides students with syllabus-aligned notes, quizzes, and an AI tutor to ensure a 1:1 student-to-teacher ratio, even in schools with limited resources.",

    status: "Prototype (Physics S1–S4) - Completed Sept 2025",
    role: "App UI and Logic / Team Leader",

    coreTech: [
        "Android (Java/Kotlin)", "JSON", "RAG (Retrieval-Augmented Generation)", "Prompt Engineering", "OpenAI API"
    ],

    heroImage: "soma.png",

    problemChallenge:
        "In Uganda, over 60% of learners struggle with sciences. Many students, like 'Aisha' from Lira, face a 1:80 teacher-to-student ratio and lack basic textbooks. The new CBC curriculum requires critical thinking, but the available resources are often outdated or irrelevant to the local context.",

    problemGoal:
        'To build an affordable, accessible AI study companion that makes learning interactive and follows the Ugandan syllabus exactly, starting with Physics as our foundation.',

    architectureAndDesign:
        "The app is built to be highly scalable. We used a standardized JSON structure to organize notes by class and topic. This means the same infrastructure used for Physics can be re-used for every other subject simply by populating new data, keeping infrastructure costs at zero as we expand. For the AI tutor, we implemented Retrieval-Augmented Generation (RAG). This ensures that the AI doesn't just give general answers but stays grounded in the Ugandan curriculum and NCDC/UNEB standards.",

    buildProcess:
        "My main responsibility was the App UI and Logic. I had to design an interface that was simple enough for low-tech environments and basic Android phones while still feeling modern and interactive.A major technical focus was the Methodology of Grounding. Our team wrote and tested specific prompts for Physics to ensure the AI's explanations made sense in a local context. We chunked study materials and connected them to the AI system so it could 'read' the syllabus before answering the student. We tested it with peers at Kyambogo and used their feedback to make the explanations clearer and more helpful for exam preparation.",

    performanceAndResults:
        "Soma AI successfully provides a 1:1 learning experience. Our early testing showed that the AI gives clear, syllabus-aligned answers that help students think critically rather than just memorizing facts.With the rise of affordable smartphones in Uganda (reaching 13.6 million users in 2024), Soma AI is positioned to support a huge portion of the 1.2 million secondary students who are currently underserved by traditional textbooks.",

    futurePlans:
        "This was a competition project whose architecture and development pipeline is transferable to other apps and projects.",

    assets: {
        github: "#",
        demo: "",

        gallery: [
            { src: "soma1.jpg", caption: "pdf-page1" },
            { src: "soma2.jpg", caption: "pdf-page2" },
            { src: "soma3.jpg", caption: "pdf-page3" },
            { src: "soma4.jpg", caption: "pdf-page4" },
            { src: "soma5.jpg", caption: "pdf-page5" },
            { src: "soma6.jpg", caption: "pdf-page6" },
            { src: "soma7.jpg", caption: "pdf-page7" },
            { src: "soma8.jpg", caption: "pdf-page8" }
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