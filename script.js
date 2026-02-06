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
let button;

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  button = document.querySelector('.contact-btn');
  startAnimation();
});

function animateButton() {
  if (!button) return;

  // pulse logic
  if (growing) {
    scale += 0.02;
    if (scale >= 1.2) growing = false;
  } else {
    scale -= 0.02;
    if (scale <= 0.8) growing = true;
  }

  // vibration effect at peak
  let vibration = "";
  if (scale >= 1.2) {
    vibration = ` translateX(${Math.sin(Date.now()/50)*3}px)`;
  }

  // apply transform (overwrite, don’t append)
  button.style.transform = `scale(${scale})${vibration}`;

  animFrame = requestAnimationFrame(animateButton);
}

function startAnimation() {
  if (!animFrame) animFrame = requestAnimationFrame(animateButton);
}

function stopAnimation() {
  cancelAnimationFrame(animFrame);
  animFrame = null;
  if (button) button.style.transform = 'scale(1)';
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











function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied: " + text);
  });
}





