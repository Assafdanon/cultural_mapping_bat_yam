// Initialize the map with a suitable zoom level
const map = L.map('map', {
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    zoomControl: true
}).setView([32.016789, 34.753456], 13); // Adjust the coordinates and zoom level as needed

function updateInstitutionList() {
    const institutionList = document.getElementById('institution-list');
    institutionList.innerHTML = '';
    
    culturalData.sort((a, b) => a.name.localeCompare(b.name)).forEach(location => {
        const item = document.createElement('div');
        item.className = 'institution-item';
        
        // הוספת שם המוסד
        const nameContainer = document.createElement('div');
        nameContainer.className = 'name';
        nameContainer.textContent = location.name;
        
        // יצירת מיכל לכל הקטגוריות
        const allCategoriesContainer = document.createElement('div');
        allCategoriesContainer.className = 'all-categories';
        
        // סוגי מוסד
        if (location.types && location.types.length > 0) {
            const typesContainer = document.createElement('div');
            typesContainer.className = 'category-row';
            
            const typesLabel = document.createElement('span');
            typesLabel.className = 'category-label';
            typesLabel.textContent = 'סוג מוסד:';
            typesContainer.appendChild(typesLabel);
            
            location.types.forEach(type => {
                const tag = document.createElement('span');
                tag.className = 'category-tag';
                tag.style.backgroundColor = categoryColors[type];
                tag.textContent = type;

                // Add the category name in smaller text
                const categoryName = document.createElement('span');
                categoryName.className = 'category-name';
                categoryName.textContent = ` (${type})`; // Display the name in parentheses
                categoryName.style.fontSize = '10px'; // Adjust font size as needed
                categoryName.style.color = '#666'; // Adjust color as needed

                typesContainer.appendChild(tag);
                typesContainer.appendChild(categoryName);
            });
            allCategoriesContainer.appendChild(typesContainer);
        }
        
        // פעילויות
        if (location.activities && location.activities.length > 0) {
            const activitiesContainer = document.createElement('div');
            activitiesContainer.className = 'category-row';
            
            const activitiesLabel = document.createElement('span');
            activitiesLabel.className = 'category-label';
            activitiesLabel.textContent = 'פעילויות:';
            activitiesContainer.appendChild(activitiesLabel);
            
            location.activities.forEach(activity => {
                const tag = document.createElement('span');
                tag.className = 'category-tag';
                tag.style.backgroundColor = activityColors[activity];
                tag.textContent = activity;

                // Add the activity name in smaller text
                const activityName = document.createElement('span');
                activityName.className = 'activity-name';
                activityName.textContent = ` (${activity})`; // Display the name in parentheses
                activityName.style.fontSize = '10px'; // Adjust font size as needed
                activityName.style.color = '#666'; // Adjust color as needed

                activitiesContainer.appendChild(tag);
                activitiesContainer.appendChild(activityName);
            });
            allCategoriesContainer.appendChild(activitiesContainer);
        }
        
        // קהלי יעד
        if (location.targetAudiences && location.targetAudiences.length > 0) {
            const audiencesContainer = document.createElement('div');
            audiencesContainer.className = 'category-row';
            
            const audiencesLabel = document.createElement('span');
            audiencesLabel.className = 'category-label';
            audiencesLabel.textContent = 'קהלי יעד:';
            audiencesContainer.appendChild(audiencesLabel);
            
            location.targetAudiences.forEach(audience => {
                const tag = document.createElement('span');
                tag.className = 'category-tag';
                tag.style.backgroundColor = audienceColors[audience];
                tag.textContent = audience;

                // Add the audience name in smaller text
                const audienceName = document.createElement('span');
                audienceName.className = 'audience-name';
                audienceName.textContent = ` (${audience})`; // Display the name in parentheses
                audienceName.style.fontSize = '10px'; // Adjust font size as needed
                audienceName.style.color = '#666'; // Adjust color as needed

                audiencesContainer.appendChild(tag);
                audiencesContainer.appendChild(audienceName);
            });
            allCategoriesContainer.appendChild(audiencesContainer);
        }
        
        // הרכבת הפריט
        item.appendChild(nameContainer);
        item.appendChild(allCategoriesContainer);
        
        institutionList.appendChild(item);
    });
}

function addMarkersToMap() {
    culturalData.forEach((location, index) => {
        const offset = index * 0.0001; // Small offset for each marker
        const marker = L.marker([location.lat + offset, location.lon]).addTo(map);
        
        // Add a popup with the institution name
        marker.bindPopup(location.name, { offset: L.point(0, -20) });
    });
}

// Call the function to add markers
addMarkersToMap();

