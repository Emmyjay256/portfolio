fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    // take first 5 projects
    data.slice(0, 5).forEach((project, i) => {
      const index = i + 1; // project1, project2, etc.

      document.getElementById(`project${index}-title`).textContent = project.title;
      document.getElementById(`project${index}-desc`).textContent = project.description;
      document.getElementById(`project${index}-img`).src = `assets/homepage/projects/${project.image}`;
      document.getElementById(`project${index}-img`).alt = project.title;
      document.getElementById(`project${index}-link`).href = project.link;
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
    vibration = ` translateX(${Math.sin(Date.now() / 50) * 3}px)`;
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








/*awards images automatic shifter*/
document.querySelectorAll('.image-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 4000); // change every 4 seconds
});






