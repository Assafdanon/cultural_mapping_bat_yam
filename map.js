// Calculate the center point of all institutions
function calculateOptimalCenter() {
    if (culturalData.length === 0) return [32.016789, 34.753456]; // Default center if no data

    // Calculate bounds of all points
    const bounds = L.latLngBounds(
        culturalData.map(location => [location.lat, location.lon])
    );
    
    return bounds.getCenter();
}

// Initialize the map with calculated center
const center = calculateOptimalCenter();
const map = L.map('map', {
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    zoomControl: true
}).fitBounds(L.latLngBounds(
    culturalData.map(location => [location.lat, location.lon])
), {
    padding: [50, 50], // Add some padding around the bounds
    maxZoom: 15        // Limit the zoom level
});

// Add CartoDB tiles instead of OpenStreetMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// הגדרת צבעי הקטגוריות
const categoryColors = {
    "ספריה": "#1E88E5",
    "אתר מורשת תרבותית": "#43A047",
    "מוסד תרבות (כללי)": "#8E24AA",
    "אולם מופעים": "#FB8C00",
    "מוזיאון": "#E53935",
    "מרכזים קהילתיים (מתנ\"ס)": "#6D4C41",
    "גלריה": "#00897B",
    "אומנות וקהילה": "#546E7A"
};

const activityColors = {
    "מופעים": "#D81B60",
    "נותן שירותים": "#039BE5",
    "ערבי תרבות": "#FDD835",
    "סדנאות": "#8D6E63",
    "חוגים": "#546E7A",
    "תערוכות": "#7CB342",
    "ליווי אמנים ויוצרים מקצועיים": "#F4511E",
    "תוכניות הכשרה ולימודים": "#3949AB",
    "מחול": "#8E24AA"
};

const audienceColors = {
    "ילדים 5-12": "#3949AB",
    "נוער 12-18": "#00897B",
    "young adults 18-30": "#F4511E",
    "משפחות צעירות 30+": "#9E9E9E",
    "גיל שלישי 60+": "#FF4081",
    "קהל רחב": "#5E35B1"
};

// Object to store markers and circles for each location
const mapElements = {};

function addMarkersToMap() {
    culturalData.forEach((location, index) => {
        const marker = L.marker([location.lat, location.lon]).addTo(map);
        
        // Create popup content with modern styling
        let popupContent = `
            <div style="
                text-align: right; 
                direction: rtl;
                font-family: Arial, sans-serif;
                min-width: 280px;
                max-width: 320px;
                padding: 10px;
            ">
                <h3 style="
                    margin: 0 0 15px 0;
                    color: #2c3e50;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                ">${location.name}</h3>`;
        
        // Add address if available
        if (location.address) {
            popupContent += `
                <div style="
                    background: #f8f9fa;
                    padding: 8px 12px;
                    border-radius: 6px;
                    margin-bottom: 12px;
                    font-size: 14px;
                ">
                    <i style="color: #7f8c8d;">📍</i> ${location.address}
                </div>`;
        }

        // Add institution types
        if (location.types && location.types.length > 0) {
            popupContent += `
                <div style="margin-bottom: 10px;">
                    <div style="
                        font-weight: bold;
                        color: #34495e;
                        font-size: 14px;
                        margin-bottom: 5px;
                    ">סוג מוסד:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${location.types.map(type => `
                            <span style="
                                background-color: ${categoryColors[type]}22;
                                color: ${categoryColors[type]};
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 12px;
                                border: 1px solid ${categoryColors[type]}44;
                            ">${type}</span>
                        `).join('')}
                    </div>
                </div>`;
        }

        // Add activities
        if (location.activities && location.activities.length > 0) {
            popupContent += `
                <div style="margin-bottom: 10px;">
                    <div style="
                        font-weight: bold;
                        color: #34495e;
                        font-size: 14px;
                        margin-bottom: 5px;
                    ">פעילויות:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${location.activities.map(activity => `
                            <span style="
                                background-color: ${activityColors[activity]}22;
                                color: ${activityColors[activity]};
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 12px;
                                border: 1px solid ${activityColors[activity]}44;
                            ">${activity}</span>
                        `).join('')}
                    </div>
                </div>`;
        }

        // Add target audiences
        if (location.targetAudiences && location.targetAudiences.length > 0) {
            popupContent += `
                <div style="margin-bottom: 10px;">
                    <div style="
                        font-weight: bold;
                        color: #34495e;
                        font-size: 14px;
                        margin-bottom: 5px;
                    ">קהלי יעד:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${location.targetAudiences.map(audience => `
                            <span style="
                                background-color: ${audienceColors[audience]}22;
                                color: ${audienceColors[audience]};
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 12px;
                                border: 1px solid ${audienceColors[audience]}44;
                            ">${audience}</span>
                        `).join('')}
                    </div>
                </div>`;
        }

        // Add art fields
        if (location.artFields && location.artFields.length > 0) {
            popupContent += `
                <div style="margin-bottom: 10px;">
                    <div style="
                        font-weight: bold;
                        color: #34495e;
                        font-size: 14px;
                        margin-bottom: 5px;
                    ">תחומי אמנות:</div>
                    <div style="
                        color: #576574;
                        font-size: 13px;
                    ">${location.artFields.join(', ')}</div>
                </div>`;
        }

        // Add websites if available
        if (location.websites && location.websites.length > 0) {
            popupContent += `
                <div style="
                    margin-top: 15px;
                    padding-top: 12px;
                    border-top: 1px solid #ecf0f1;
                ">
                    ${location.websites.map(website => `
                        <a href="${website}" 
                           target="_blank"
                           style="
                               display: block;
                               color: #3498db;
                               text-decoration: none;
                               font-size: 13px;
                               margin-bottom: 5px;
                               overflow-wrap: break-word;
                           "
                        >
                            🔗 ${website}
                        </a>
                    `).join('')}
                </div>`;
        }

        popupContent += '</div>';
        
        // Add popup with enhanced content
        marker.bindPopup(popupContent, {
            maxWidth: 350,
            className: 'custom-popup'
        });
        
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

        // Store marker and circles for this location
        mapElements[location.name] = {
            marker: marker,
            circles: circles
        };
    });
}

// Update filters when checkboxes change
document.querySelectorAll('.legend-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        updateVisibility();
    });
});

// פונקציית matchesFilters מפושטת עם טיפול ב-null
function matchesFilters(institution) {
    // בדיקה שהמוסד קיים ושיש לו את כל המאפיינים הנדרשים
    if (!institution || !institution.types || !institution.activities || !institution.targetAudiences) {
        console.warn(`Missing required properties for institution: ${institution?.name || 'unknown'}`);
        return false;
    }

    // בדיקת סוגי מוסדות
    const typeMatch = institution.types.some(type => {
        const checkbox = document.getElementById(`types-${type}`);
        return checkbox ? checkbox.checked : false;
    });

    // בדיקת פעילויות
    const activityMatch = institution.activities.some(activity => {
        const checkbox = document.getElementById(`activities-${activity}`);
        return checkbox ? checkbox.checked : false;
    });

    // בדיקת קהלי יעד
    const audienceMatch = institution.targetAudiences.some(audience => {
        const checkbox = document.getElementById(`audiences-${audience}`);
        return checkbox ? checkbox.checked : false;
    });

    return typeMatch && activityMatch && audienceMatch;
}

// Update visibility of markers and list items
function updateVisibility() {
    culturalData.forEach(location => {
        const elements = mapElements[location.name];
        const isVisible = matchesFilters(location);
        
        // Update marker and circles visibility
        if (isVisible) {
            elements.marker.addTo(map);
            elements.circles.forEach(circle => circle.addTo(map));
        } else {
            elements.marker.remove();
            elements.circles.forEach(circle => circle.remove());
        }
    });
    
    // Update institution list
    updateInstitutionList();
}

// Update the institution list function with null checking
function updateInstitutionList() {
    const institutionList = document.getElementById('institution-list');
    if (!institutionList) {
        console.error('Institution list element not found');
        return;
    }
    
    institutionList.innerHTML = '';
    
    const validInstitutions = culturalData.filter(location => {
        // Check if location has all required properties
        if (!location || !location.name || !location.lat || !location.lon) {
            console.warn(`Invalid institution data:`, location);
            return false;
        }
        return matchesFilters(location);
    });

    validInstitutions
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(location => {
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
                    typesContainer.appendChild(tag);
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
                    activitiesContainer.appendChild(tag);
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
                    audiencesContainer.appendChild(tag);
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

// Add toggle functionality for legend sections
document.querySelectorAll('.legend-section h4').forEach(header => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('collapsed');
    });
});

// Initialize sections as expanded (remove any collapsed state)
document.querySelectorAll('.legend-section').forEach(section => {
    section.classList.remove('collapsed');
});

// Add legend modal functionality
const legendModal = document.getElementById('legendModal');
const modalOverlay = document.querySelector('.modal-overlay');
const toggleLegendBtn = document.getElementById('toggleLegend');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const closeBtn = document.querySelector('.close-button');

// Toggle modal
toggleLegendBtn.addEventListener('click', () => {
    legendModal.classList.toggle('show');
    modalOverlay.classList.toggle('show');
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', () => {
    legendModal.classList.remove('show');
    modalOverlay.classList.remove('show');
});

// Close button functionality
closeBtn.addEventListener('click', () => {
    legendModal.classList.remove('show');
    modalOverlay.classList.remove('show');
});

// Apply filters
applyFiltersBtn.addEventListener('click', () => {
    updateVisibility();
    legendModal.classList.remove('show');
    modalOverlay.classList.remove('show');
});

// Reset filters
resetFiltersBtn.addEventListener('click', () => {
    // Reset all checkboxes to checked
    document.querySelectorAll('.legend-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;    });
    
    // Clear filters
    filters.types.clear();
    filters.activities.clear();
    filters.audiences.clear();
    
    // Update visibility to show all markers
    updateVisibility();
    
    // Close modal
    legendModal.classList.remove('show');
    modalOverlay.classList.remove('show');
});

// Add side panel toggle functionality
const sidePanel = document.querySelector('.side-panel');
const toggleSidePanelBtn = document.createElement('button');
toggleSidePanelBtn.id = 'toggleSidePanel';
toggleSidePanelBtn.className = 'toggle-side-panel';
toggleSidePanelBtn.innerHTML = '&#x2039;'; // Left arrow character
document.body.appendChild(toggleSidePanelBtn);

toggleSidePanelBtn.addEventListener('click', () => {
    sidePanel.classList.toggle('collapsed');
    toggleSidePanelBtn.classList.toggle('collapsed');
    // Update the arrow direction
    toggleSidePanelBtn.innerHTML = sidePanel.classList.contains('collapsed') ? '&#x203A;' : '&#x2039;';
    // Trigger map resize to adjust the view
    map.invalidateSize();
});

// Add media query check for mobile
function checkMobileView() {
    if (window.innerWidth <= 768) {
        sidePanel.classList.add('collapsed');
        toggleSidePanelBtn.classList.add('collapsed');
        toggleSidePanelBtn.innerHTML = '&#x203A;';
    } else {
        sidePanel.classList.remove('collapsed');
        toggleSidePanelBtn.classList.remove('collapsed');
        toggleSidePanelBtn.innerHTML = '&#x2039;';
    }
}

// Check on load and window resize
window.addEventListener('load', checkMobileView);
window.addEventListener('resize', checkMobileView);


