// project-loader.js

// Function to create a project section
function createProject(projectData, category) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    numOfPhotos = projectData.images.length;

    projectElement.innerHTML = `
        <div class="project-title">${projectData.title}</div>
        <div class="project-subtitle">${projectData.subtitle}</div>
        <div class="project-date">${projectData.date}</div>
        <div class="image-carousel-${numOfPhotos}">
            ${projectData.images.map(image => `
                <img src="images/${category}/${image}" alt="${projectData.title} Image">
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
    // Example: category = "cs"
    const projectsContainer = document.getElementById(containerId);

    // Fetch the JSON data
    fetch('data/' + category + '-data.json')
        .then(response => response.json())
        .then(projectsData => {
            // Use Promise.all to ensure all project elements and separator bands are created before appending them
            const elementsToAdd = [];
            
            projectsData.forEach((projectData, index) => {
                const projectElement = createProject(projectData, category);
                elementsToAdd.push(projectElement);

                // Add vertical spacing between project elements
                if (index < projectsData.length - 1) {
                    const spacer = document.createElement('div');
                    spacer.classList.add("spacer");
                    elementsToAdd.push(spacer);
                }
            });

            // Append all elements at once
            projectsContainer.append(...elementsToAdd);
        })
        .catch(error => console.error('Error loading JSON:', error));
}



