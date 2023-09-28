// project-loader.js

// Function to create a project section
function createProject(projectData, category) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
        <div class="project-title">${projectData.title}</div>
        <div class="project-subtitle">${projectData.subtitle}</div>
        <div class="project-date">${projectData.date}</div>
        <div class="image-carousel">
            ${projectData.images.map(image => `
                <img src="images/${category}/${image}" alt="${projectData.title} Image" style="max-width: 30%; height: auto;">
            `).join('')}
        </div>
        <div class="project-description">${projectData.description}</div>
        <div class="project-skills">${projectData.skills.join(', ')}</div>
        <div class="project-links">
            ${projectData.links_text.map((text, index) => `
                <a href="${projectData.links[index]}" target="_blank" rel="noopener noreferrer">${text}</a><br>
            `).join('')}
        </div>
    `;

    return projectElement;
}

//data is the name of a JSON file, and container is the name of the HTML element to load the projects into
function loadProjects(category, containerId) {
    //example: category = "cs"
    const projectsContainer = document.getElementById(containerId);

    // Fetch the JSON data
    fetch('data/' + category + '-data.json')
        .then(response => response.json())
        .then(projectsData => {
            // Use Promise.all to ensure all project elements are created before appending them
            const projectPromises = projectsData.map(projectData => {
                return new Promise((resolve, reject) => {
                    const projectElement = createProject(projectData, category);
                    projectsContainer.appendChild(projectElement);
                    resolve();
                });
            });

            // Wait for all promises to resolve
            return Promise.all(projectPromises);
        })
        .catch(error => console.error('Error loading JSON:', error));
}


