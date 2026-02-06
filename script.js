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





let lastScrollY = window.scrollY;
let contactVisible = false;

function toggleContactOptions(button) {
  const options = document.querySelector('.contact-options');
  contactVisible = !contactVisible;
  options.style.display = contactVisible ? 'flex' : 'none';
  button.style.animation = contactVisible ? 'none' : 'pulse-vibrate 3s infinite';
}

// Hide contact options on significant scroll
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (contactVisible && Math.abs(currentScrollY - lastScrollY) > 100) {
    document.querySelector('.contact-options').style.display = 'none';
    document.querySelector('.contact-btn').style.animation = 'pulse-vibrate 3s infinite';
    contactVisible = false;
  }
  lastScrollY = currentScrollY;
});



