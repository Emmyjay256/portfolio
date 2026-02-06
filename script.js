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

function toggleContactOptions(button) {
  const options = document.querySelector('.contact-options');
  contactVisible = !contactVisible;

  if (contactVisible) {
    options.style.display = 'flex';
    button.style.animation = 'none'; // stop animation
  } else {
    options.style.display = 'none';
    button.style.animation = 'pulse-vibrate 3s infinite'; // restart animation
  }
}

// Hide contact options on ANY scroll
window.addEventListener('scroll', () => {
  if (contactVisible) {
    document.querySelector('.contact-options').style.display = 'none';
    const button = document.querySelector('.contact-btn');
    button.style.animation = 'pulse-vibrate 3s infinite'; // restart animation
    contactVisible = false;
  }
});



