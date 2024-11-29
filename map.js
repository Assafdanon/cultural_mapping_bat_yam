// Initialize the map with a suitable zoom level
const map = L.map('map', {
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    zoomControl: true
}).setView([32.016789, 34.753456], 13); // Adjust the coordinates and zoom level as needed

// Add CartoDB tiles instead of OpenStreetMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// הגדרת צבעי הקטגוריות
const categoryColors = {
    "ספריה": "#2196F3",
    "אתר מורשת תרבותית": "#4CAF50",
    "מוסד תרבות (כללי)": "#9C27B0",
    "אולם מופעים": "#FF9800",
    "מוזיאון": "#F44336"
};

const activityColors = {
    "מופעים": "#E91E63",
    "נותן שירותים": "#00BCD4",
    "ערבי תרבות": "#FFC107",
    "סדנאות": "#795548",
    "חוגים": "#607D8B",
    "תערוכות": "#8BC34A"
};

const audienceColors = {
    "ילדים 5-12": "#3F51B5",
    "נוער 12-18": "#009688",
    "young adults 18-30": "#FF5722",
    "משפחות צעירות 30+": "#9E9E9E",
    "גיל שלישי 60+": "#FF4081",
    "קהל רחב": "#673AB7"
};

// Object to store markers and circles for each location
const mapElements = {};

function addMarkersToMap() {
    culturalData.forEach((location, index) => {
        const marker = L.marker([location.lat, location.lon]).addTo(map);
        
        // Add circles for each category
        const circles = [];
        
        // Institution type circles (innermost)
        if (location.types) {
            location.types.forEach((type, i) => {
                const circle = L.circle([location.lat, location.lon], {
                    color: categoryColors[type],
                    fillColor: categoryColors[type],
                    fillOpacity: 0.7,
                    radius: 30
                }).addTo(map);
                circles.push(circle);
            });
        }
        
        // Activities circles (middle)
        if (location.activities) {
            location.activities.forEach((activity, i) => {
                const circle = L.circle([location.lat, location.lon], {
                    color: activityColors[activity],
                    fillColor: activityColors[activity],
                    fillOpacity: 0.5,
                    radius: 50
                }).addTo(map);
                circles.push(circle);
            });
        }
        
        // Target audience circles (outermost)
        if (location.targetAudiences) {
            location.targetAudiences.forEach((audience, i) => {
                const circle = L.circle([location.lat, location.lon], {
                    color: audienceColors[audience],
                    fillColor: audienceColors[audience],
                    fillOpacity: 0.3,
                    radius: 70
                }).addTo(map);
                circles.push(circle);
            });
        }

        // Add popup with institution name
        marker.bindPopup(location.name);
        
        // Store marker and circles for this location
        mapElements[location.name] = {
            marker: marker,
            circles: circles
        };
    });
}

function updateInstitutionList() {
    const institutionList = document.getElementById('institution-list');
    institutionList.innerHTML = '';
    
    culturalData.sort((a, b) => a.name.localeCompare(b.name)).forEach(location => {
        const item = document.createElement('div');
        item.className = 'institution-item';
        
        // Add click handler to focus on the institution
        item.addEventListener('click', () => {
            // Center map on location
            map.setView([location.lat, location.lon], 15);
            
            // Open the popup
            mapElements[location.name].marker.openPopup();
            
            // Highlight the circles
            mapElements[location.name].circles.forEach(circle => {
                circle.setStyle({
                    weight: 3,
                    opacity: 1
                });
                
                // Reset style after 2 seconds
                setTimeout(() => {
                    circle.setStyle({
                        weight: 1,
                        opacity: 0.8
                    });
                }, 2000);
            });
        });
        
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

// קריאה לפונקציות להצגת המידע
addMarkersToMap();
updateInstitutionList();

