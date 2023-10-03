// profile-loader.js

// Function to create an experience section
function createExperience(experienceData) {
    const element = document.createElement("div");
    element.classList.add("experience");

    element.innerHTML = `
        <div class="experience-title">${experienceData.title}</div>
        <div class="experience-company">${experienceData.company}</div>
        <div class="experience-date">${experienceData.date}</div>
        <div class="experience-description">${experienceData.description}</div>
        <div class="experience-links">
            ${experienceData.linkDisplays.map((text, index) => `
                <a href="${experienceData.links[index]}" target="_blank" rel="noopener noreferrer">${text}</a><br>
            `).join('')}
        </div>
    `;

    return element;
}



//Container is the name of the HTML element to load the experiences into
function loadExperience(containerId) {
    const container = document.getElementById(containerId);

    // Fetch the JSON data
    fetch('data/profile-data.json')
        .then(response => response.json())
        .then(data => {
            const experienceData = data.Experience.jobs;
            // Use Promise.all to ensure all experience elements and separator bands are created before appending them
            const elementsToAdd = [];

            experienceData.forEach((data, index) => {
                console.log('Creating experience element for:', data.title);
                const experience = createExperience(data);
                elementsToAdd.push(experience);
            });

            // Append all elements at once
            container.append(...elementsToAdd);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

