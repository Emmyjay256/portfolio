fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const projectList = document.getElementById('project-list');
    data.slice(0, 3).forEach(project => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectList.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading projects:', error));





let contactVisible = false;
let animFrame;
let scale = 1;
let growing = true;
const button = document.querySelector('.contact-btn');

function animateButton() {
  // simple pulse logic
  if (growing) {
    scale += 0.02;
    if (scale >= 1.2) growing = false;
  } else {
    scale -= 0.02;
    if (scale <= 0.8) growing = true;
  }

  // apply transform
  button.style.transform = `scale(${scale})`;

  // vibration effect at peak
  if (scale >= 1.2) {
    button.style.transform += ` translateX(${Math.sin(Date.now()/50)*3}px)`;
  }

  animFrame = requestAnimationFrame(animateButton);
}

function startAnimation() {
  if (!animFrame) animateButton();
}

function stopAnimation() {
  cancelAnimationFrame(animFrame);
  animFrame = null;
  button.style.transform = 'scale(1)'; // reset
}

function toggleContactOptions() {
  const options = document.querySelector('.contact-options');
  contactVisible = !contactVisible;

  if (contactVisible) {
    options.style.display = 'flex';
    stopAnimation(); // stop pulse when expanded
  } else {
    options.style.display = 'none';
    startAnimation(); // restart pulse when collapsed
  }
}

// Hide on any scroll
window.addEventListener('scroll', () => {
  if (contactVisible) {
    document.querySelector('.contact-options').style.display = 'none';
    contactVisible = false;
    startAnimation();
  }
});

// kick off animation initially
startAnimation();




