// project.js

/* =========================
   1) EDIT ONLY THIS OBJECT
   (EVERY PROJECT WILL ONLY SUPPLY THESE)
========================= */
const PROJECT = {
    title: "HAJAMBO: UGANDA’S OFFLINE + MULTILINGUAL SOCIAL CLOUD",

    overview:
        "Hajambo is a next-generation social platform built entirely for Uganda. It connects citizens online, offline, and in every local language (Luganda, Runyankole, Acholi, etc.) while ensuring national data sovereignty by running on local infrastructure.",

    status: "Built for STI Industry 4.0+ Hackathon (2025)",
    role: "Team Leader, System Architect, and Designer",

    coreTech: [
        "Kotlin",
        "XML",
        "Node.js",
        "USSD (Africa's Talking)",
        "Docker",
        "Cloudflare Quick Tunnels",
        "Mesh Networking"
    ],

    heroImage: "assets/projects/hajambo/hero.jpg",

    problemChallenge:
        "Most social apps require constant internet and English proficiency, which excludes millions of Ugandans. Data is expensive, and coverage is patchy. I saw the need for a platform that works on a feature phone via USSD just as well as it works on a smartphone.",

    problemGoal:
        'To bridge the digital divide by creating a "Social Cloud" that supports local languages and works without an active internet connection through mesh networking.',

    architectureAndDesign:
        "The architecture is a multi-layered circuit designed for resilience: The Sovereign Cloud: We were the first team to use Uganda’s ABQ Sovereign Cloud. I had to set up the VM on a VPN to serve the backend. Connectivity Layers: The system uses USSD (*384*43893#) for feature phones via Africa’s Talking, and a Kotlin/XML mobile app for smartphones. Offline Mesh: For users without internet, I implemented Nearby Mode using Bluetooth and mesh networking to allow chat and file sharing. AI Translation: A real-time engine that bridges the gap between Uganda's diverse local languages.",

    buildProcess:
        "The main technical hurdle was the backend deployment on the Sovereign Cloud VM. At first, I was using Docker and Coolify, but that didn't play well with the Cloudflare Quick Tunnels. Every time I would commit from Coolify, the internal IP the tunnel was pointing to would change, breaking the connection. I had to engineer a solution to run an endless quick tunnel so the backend could consistently communicate with the Africa's Talking API and the mobile app. Another big task was the Smart Sync logic. I had to ensure that if a user posted or messaged while in \"Nearby Mode\" (offline), the data would automatically upload and sync with the Sovereign Cloud the moment they stepped back into a data zone. Managing the Node.js backend to handle these short-lived connections and large media uploads while maintaining high performance was a heavy lift.",

    performanceAndResults:
        "We successfully demonstrated the first-ever social integration on the Ugandan Sovereign Cloud. The platform proved it could handle real-time AI translation and USSD account creation simultaneously. By using social camouflage—appearing as a simple social app—we actually built a robust research infrastructure that promotes national tech independence and aligns with the STI 4.0+ vision.",

    futurePlans:
        "I am looking at scaling the Mesh Networking capabilities to support larger file transfers over longer distances without data. I also plan to refine the AI translation models to include even more dialects from across East Africa, eventually licensing the USSD/AI tech to other local startups.",

    assets: {
        github: "https://github.com/Emmyjay256/hajambo-backend",
        demo: "",

        gallery: [
            { src: "hajambo1.jpeg", caption: "Hajambo — App UI / Screenshots" },
            { src: "hajambo2.jpeg", caption: "USSD flow — Feature phone onboarding" },
            { src: "hajambo3.jpeg", caption: "Offline Nearby Mode — Mesh networking concept" }
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