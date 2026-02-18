// project.js

/* =========================
   1) EDIT ONLY THIS OBJECT
   (EVERY PROJECT WILL ONLY SUPPLY THESE)
========================= */
const PROJECT = {
    title: "SPACECOPY (CANADA) - LUNAR 3D PRINTER RESEARCH AND DESIGN",

    overview:
        "SpaceCopy is a Canadian aerospace firm developing advanced 3D printing technology for the lunar surface. My work focuses on the technical feasibility, material dynamics, and electrical power systems required to sustain manufacturing in extreme lunar environments.",

    status: "Ongoing / Research & Development",
    role: "Electrical & Systems Junior Research Associate",

    coreTech: [
        "Python (Mathematical Modeling)",
        "SMPS Design",
        "Systems Engineering",
        "Lunar Regolith Feasibility"
    ],

    heroImage: "spacecopy.jpg",

    problemChallenge:
        "Manufacturing on the Moon is incredibly difficult due to extreme temperature fluctuations, vacuum conditions, and the unique properties of lunar regolith. To make long-term lunar habitation possible, we need 3D printers that are energy-efficient and capable of consistent material flow under low-gravity conditions.",

    problemGoal:
        'To model and design the electrical and fluid dynamics of a 3D printer that can survive and operate on the lunar surface.',

    architectureAndDesign:
        "My contributions sit at the intersection of software modeling and hardware architecture: Material Flow Dynamics: Developed Python models to simulate and size the rates of flow for materials within the printer. This ensures the extrusion process is predictable and stable. Electrical Architecture: I am currently designing the SMPS (Switched-Mode Power Supply) circuits. In space, power efficiency is everything; these circuits must provide stable, high-efficiency power to the printer's components while minimizing heat waste.",

    buildProcess:
        "Working on a lunar project requires a 'zero-failure' mindset. My methodology involves: Feasibility Research: Investigating the physical constraints of the lunar environment and how they impact 3D printing mechanics. Mathematical Modeling: Using Python to create digital twins of the printer's internal systems to test flow rates before any hardware is committed. Circuit Engineering: Focusing on the electrical architecture to ensure the printer can interface with lunar power grids (like solar or nuclear) while maintaining a compact, rugged form factor.",

    performanceAndResults:
        "While specific project outcomes are protected by NDA, my work provides the mathematical and electrical foundation necessary for the printer's success. The Python models have allowed for the optimization of material sizing, and the current electrical designs are focused on meeting the rigorous standards of space-grade hardware.",

    futurePlans:
        "I am continuing to refine the electrical power systems to handle the volatile thermal environment of the Moon. My goal is to bridge the gap between theoretical lunar manufacturing and a functional, space-ready unit.",

    assets: {
        github: "#",
        demo: "",

        gallery: [
            { src: "spacecopy1.jpg", caption: "Space Copy moon render" },
            { src: "spacecopy2.jpg", caption: "Space Copy FDM printer" },
            { src: "spacecopy3.jpg", caption: "Space Copy" },
            { src: "spacecopy4.jpg", caption: "Lunar printing base" },
            { src: "spacecopy5.jpg", caption: "Print head" }
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