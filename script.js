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





function toggleContactOptions(button) {
  const options = document.querySelector('.contact-options');
  options.style.display = options.style.display === 'flex' ? 'none' : 'flex';

  // Stop animation when expanded
  if (options.style.display === 'flex') {
    button.style.animation = 'none';
  } else {
    button.style.animation = 'pulse-vibrate 3s infinite';
  }
}


