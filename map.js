// הגדרת צבעים לקטגוריות
const categoryColors = {
    // סוגי גופים אומנותיים
    "ספריה": "#2196F3",
    "אתר מורשת תרבותית": "#4CAF50",
    "מוסד תרבות (כללי)": "#9C27B0",
    "אולם מופעים": "#FF9800",
    "מוזיאון": "#F44336",
    
    // סוגי פעילויות
    "מופעים": "#E91E63",
    "נותן שירותים": "#00BCD4",
    "ערבי תרבות": "#FFC107",
    "סדנאות": "#795548",
    "חוגים": "#607D8B",
    "תערוכות": "#8BC34A",
    
    // קהלי יעד
    "ילדים 5-12": "#3F51B5",
    "נוער 12-18": "#009688",
    "young adults 18-30": "#FF5722",
    "משפחות צעירות 30+": "#9E9E9E",
    "גיל שלישי 60+": "#FF4081",
    "קהל רחב": "#673AB7"
};

// יצירת המפה
const map = L.map('map').setView([32.0167, 34.7500], 14);

// הוספת שכבת מפת רקע
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// יונקציה לאיסוף כל סוגי הפעילויות הייחודיים מהנתונים
function collectUniqueActivities() {
    const activities = new Set();
    culturalData.forEach(location => {
        if (location.activity && Array.isArray(location.activity)) {
            location.activity.forEach(activity => {
                activities.add(activity);
            });
        }
    });
    return Array.from(activities);
}

// יצירת קבוצות שכבות
const layersByType = {
    "ספריה": L.layerGroup(),
    "אתר מורשת תרבותית": L.layerGroup(),
    "מוסד תרבות (כללי)": L.layerGroup(),
    "אולם מופעים": L.layerGroup(),
    "מוזיאון": L.layerGroup()
};

// יצירת קבוצות שכבות לפי הפעילויות שנאספו
const uniqueActivities = collectUniqueActivities();
const layersByActivity = {};
uniqueActivities.forEach(activity => {
    layersByActivity[activity] = L.layerGroup();
});

// הוספת צבעים דינמית לפעילויות חדשות
const defaultColors = [
    "#E91E63", "#00BCD4", "#FFC107", "#795548", "#607D8B", "#8BC34A",
    "#FF5722", "#9C27B0", "#3F51B5", "#009688"
];

uniqueActivities.forEach((activity, index) => {
    if (!categoryColors[activity]) {
        categoryColors[activity] = defaultColors[index % defaultColors.length];
    }
});

const layersByAudience = {
    "ילדים 5-12": L.layerGroup(),
    "נוער 12-18": L.layerGroup(),
    "young adults 18-30": L.layerGroup(),
    "משפחות צעירות 30+": L.layerGroup(),
    "גיל שלישי 60+": L.layerGroup(),
    "קהל רחב": L.layerGroup()
};

// פונקציה ליצירת תוכן חלון קופץ
function createPopupContent(location) {
    return `
        <div class="popup-content">
            <h3>${location.name}</h3>
            ${location.address ? `<p><strong>כתובת:</strong> ${location.address}</p>` : ''}
            ${location.type ? `<p><strong>סוג:</strong> ${location.type}</p>` : ''}
            ${location.targetAudience ? `<p><strong>קהל יעד:</strong> ${location.targetAudience}</p>` : ''}
            ${location.activity && location.activity.length > 0 ? 
                `<p><strong>פעילויות:</strong> ${location.activity.join(', ')}</p>` : ''}
            ${location.website ? `<p><a href="${location.website}" target="_blank">לאתר האינטרנט</a></p>` : ''}
        </div>
    `;
}

// פונקציה ליצירת תיבות סימון בפאנל
function createFilterCheckboxes() {
    const typeDiv = document.getElementById('type-filters');
    const activityDiv = document.getElementById('activity-filters');
    const audienceDiv = document.getElementById('audience-filters');

    // יצירת תיבות סימון לסוג המקום
    for (let type in layersByType) {
        const div = document.createElement('div');
        div.className = 'category-item';
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.dataset.layer = 'type';
        checkbox.dataset.value = type;

        const colorDot = document.createElement('span');
        colorDot.className = 'color-dot';
        colorDot.style.backgroundColor = categoryColors[type];

        const text = document.createTextNode(type);

        label.appendChild(checkbox);
        label.appendChild(colorDot);
        label.appendChild(text);
        div.appendChild(label);
        typeDiv.appendChild(div);
    }

    // יצירת תיבות סימון לסוג פעילות
    for (let activity in layersByActivity) {
        const div = document.createElement('div');
        div.className = 'category-item';
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.dataset.layer = 'activity';
        checkbox.dataset.value = activity;

        const colorDot = document.createElement('span');
        colorDot.className = 'color-dot';
        colorDot.style.backgroundColor = categoryColors[activity];

        const text = document.createTextNode(activity);

        label.appendChild(checkbox);
        label.appendChild(colorDot);
        label.appendChild(text);
        div.appendChild(label);
        activityDiv.appendChild(div);
    }

    // יצירת תיבות סימון לקהל יעד
    for (let audience in layersByAudience) {
        const div = document.createElement('div');
        div.className = 'category-item';
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.dataset.layer = 'audience';
        checkbox.dataset.value = audience;

        const colorDot = document.createElement('span');
        colorDot.className = 'color-dot';
        colorDot.style.backgroundColor = categoryColors[audience];

        const text = document.createTextNode(audience);

        label.appendChild(checkbox);
        label.appendChild(colorDot);
        label.appendChild(text);
        div.appendChild(label);
        audienceDiv.appendChild(div);
    }

    // הוספת מאזיני אירועים
    document.querySelectorAll('.category-item input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const layerType = this.dataset.layer;
            const value = this.dataset.value;
            const layers = {
                'type': layersByType,
                'activity': layersByActivity,
                'audience': layersByAudience
            };
            const layer = layers[layerType][value];

            if (this.checked) {
                map.addLayer(layer);
            } else {
                map.removeLayer(layer);
            }
        });
    });
}

// יצירת סמנים והוספתם לשכבות
culturalData.forEach(location => {
    function createMarker() {
        return L.circleMarker([location.lat, location.lon], {
            radius: 8,
            fillColor: categoryColors[location.type] || categoryColors["מוסד תרבות (כללי)"],
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(createPopupContent(location));
    }

    // הוספה לשכבת סוג המקום
    if (location.type && layersByType[location.type]) {
        layersByType[location.type].addLayer(createMarker());
    }

    // הוספה לשכבות פעילות
    if (location.activity) {
        location.activity.forEach(activity => {
            if (layersByActivity[activity]) {
                layersByActivity[activity].addLayer(createMarker());
            }
        });
    }

    // הוספה לשכבות קהל יעד
    if (location.targetAudience) {
        location.targetAudience.split(",").forEach(audience => {
            audience = audience.trim();
            if (layersByAudience[audience]) {
                layersByAudience[audience].addLayer(createMarker());
            }
        });
    }
});

// הוספת כל השכבות למפה כברירת מחדל
Object.values(layersByType).forEach(layer => layer.addTo(map));
Object.values(layersByActivity).forEach(layer => layer.addTo(map));
Object.values(layersByAudience).forEach(layer => layer.addTo(map));

// יצירת הפאנל
createFilterCheckboxes();