// project.js

/* =========================
   1) EDIT ONLY THIS OBJECT
   (EVERY PROJECT WILL ONLY SUPPLY THESE)
========================= */
const PROJECT = {
    title: "UGANDA MATH CONTEST PREP APP",

    overview:
        "This app helps Ugandan students in High School get access to past papers of the Mathematics contest and prepares them with quizzes to qualify for international math olympiads.",

    status: "Version 3 (Nov 2025) Completed",
    role: "Solo Developer",

    coreTech: [
        "Java",
        "XML",
        "Android Studio",
        "Kotlin"
    ],

    heroImage: "mathapp.png",

    problemChallenge:
        "Many students around Uganda do not have access to training material for the national math contest. This has led to a disproportionate rate of passing for students away from big schools and central Uganda. I faced the same challenge the first time I did the math contest, though I managed to qualify for the International Mathematics Olympiad in Japan.",

    problemGoal:
        'To make math contest training material accessible and offline.',

    architectureAndDesign:
        "The app is made of 3 main study sections. The first is the problems section, which has all past papers for both A and O level. The next is the math ladder section, which has questions of varying difficulty that you do personally to test your math and check your answers in real time. The last is the randQu section. This section has thousands of random questions whose difficulty varies heavily and tests students' Math rigor; answers are not provided. I processed papers from over a decade ago, split them into PDFs for each year with their answers, and shipped the past paper section with a PDF viewer custom-made with Java.",

    buildProcess:
        "I built the first version of the app in 2023 with only the past papers and math ladder. The hardest thing to implement was the PDF viewer because all PDF viewing libraries I tried to use were not pulling dependencies, meaning their support and serving had stopped. To get over that, I had to build the PDF viewer from scratch, including its zoom capabilities. Once that was complete, I knew 80% of what needed to be done was finished. I worked on the math ladder, which is a bunch of pictures that show the questions to be done with a text box below each where the student can enter his answer. Because of the many images, I struggled with loading all of them at once, then I decided to recycle the ImageView elements as the user scrolls down. One fancy thing I added was that each question had a different background color and the top bar adopted the background color as the user scrolls down. In the first 2 months, I registered a Play Store developer account and completed the many steps required to get your app to Play Store. Once there, the app survived for like 3 months before one day I woke up and the account was banned. This was because I made a silly mistake of using the developer email as the support email for the app, and that allowed Nigerian scammers to send me so many images to help them publish their scam apps for a very high fee. I hadn't replied, but it cost me my account regardless. After that, I didn't know what to do next because the main place for distributing the app was gone. I decided to then host it on APKPure and start a YouTube channel for promoting it, which worked well. It's the same setup I'm using now. I still have access to Firebase statistics though, that I wired on the app to be able to know how many users are using it.",

    performanceAndResults:
        "The app has grown mainly outside Play Store to an average monthly usage of about 600 users throughout the year. Though peak usage occurs during holidays when students are back home. The YouTube channel has grown to 179 subscribers. I managed to maintain the app outside Play Store. I have done 3 upgrades since I first started making the app. I fully changed the app from its package name to how files are served to prepare for the next time I will be putting it back on Play Store.",

    futurePlans:
        "I'm looking at publishing a gamified version of the app before May 2026. This will be the fourth major studying section in the app. In addition, I'll implement user login and collaboration in the math games they will be playing on the app. I'm planning to have the app back on Play Store before the year ends.",

    assets: {
        github: "",
        demo: "",

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