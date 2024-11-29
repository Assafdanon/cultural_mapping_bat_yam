// יצירת המפה וקביעת מרכז בבת ים
const map = L.map('map').setView([32.0167, 34.7500], 14);

// הוספת שכבת מפת רקע
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// הגדרת צבעים לקטגוריות
const categoryColors = {
    // קהלי יעד
    "ילדים 5-12": "#2196F3",         // כחול
    "נוער 12-18": "#4CAF50",         // ירוק
    "young adults 18-30": "#9C27B0",  // סגול
    "משפחות צעירות 30+": "#FF9800",  // כתום
    "גיל שלישי 60+": "#F44336",      // אדום
    "קהל רחב": "#607D8B",            // אפור
    // סוגי פעילות
    "מוזיאון": "#E91E63",            // ורוד
    "אולם מופעים": "#FFC107",        // צהוב
    "ספריה": "#00BCD4",              // טורקיז
    "אתר מורשת תרבותית": "#795548",  // חום
    "מוסד תרבות (כללי)": "#000000",  // שחור
    "להקה/קבוצה/אנסמבל/תזמורת (בכל תחום אמנות)": "#8BC34A" // ירוק בהיר
};

// יצירת קבוצות שכבות
const layersByAudience = {
    "ילדים 5-12": L.layerGroup(),
    "נוער 12-18": L.layerGroup(),
    "young adults 18-30": L.layerGroup(),
    "משפחות צעירות 30+": L.layerGroup(),
    "גיל שלישי 60+": L.layerGroup(),
    "קהל רחב": L.layerGroup()
};

const layersByType = {
    "מוזיאון": L.layerGroup(),
    "אולם מופעים": L.layerGroup(),
    "ספריה": L.layerGroup(),
    "אתר מורשת תרבותית": L.layerGroup(),
    "מוסד תרבות (כללי)": L.layerGroup(),
    "להקה/קבוצה/אנסמבל/תזמורת (בכל תחום אמנות)": L.layerGroup()
};

// פונקציה ליצירת תוכן חלון קופץ
function createPopupContent(location) {
    return `
        <div class="popup-content">
            <h3>${location.name}</h3>
            ${location.address ? `<p><strong>כתובת:</strong> ${location.address}</p>` : ''}
            ${location.type ? `<p><strong>סוג פעילות:</strong> ${location.type}</p>` : ''}
            ${location.targetAudience ? `<p><strong>קהל יעד:</strong> ${location.targetAudience}</p>` : ''}
            ${location.website ? `<p><a href="${location.website}" target="_blank">לאתר האינטרנט</a></p>` : ''}
        </div>
    `;
}

// יצירת סמנים והוספתם לשכבות המתאימות
culturalData.forEach(location => {
    // יצירת סמן עיגול עם צבע לפי הקטגוריה
    const marker = L.circleMarker([location.lat, location.lon], {
        radius: 8,
        fillColor: categoryColors[location.type] || categoryColors["מוסד תרבות (כללי)"],
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }).bindPopup(createPopupContent(location));

    // הוספה לשכבות קהל יעד
    if (location.targetAudience) {
        location.targetAudience.split(",").forEach(audience => {
            audience = audience.trim();
            if (layersByAudience[audience]) {
                layersByAudience[audience].addLayer(marker.clone());
            }
        });
    }

    // הוספה לשכבת סוג פעילות
    if (location.type && layersByType[location.type]) {
        layersByType[location.type].addLayer(marker);
    }
});

// יצירת תפריט שכבות מאורגן
const overlays = {
    "<strong>לפי קהל יעד</strong>": {
        "ילדים (5-12)": layersByAudience["ילדים 5-12"],
        "נוער (12-18)": layersByAudience["נוער 12-18"],
        "צעירים (18-30)": layersByAudience["young adults 18-30"],
        "משפחות צעירות (30+)": layersByAudience["משפחות צעירות 30+"],
        "גיל שלישי (60+)": layersByAudience["גיל שלישי 60+"],
        "קהל רחב": layersByAudience["קהל רחב"]
    },
    "<strong>לפי סוג פעילות</strong>": {
        "מוזיאון": layersByType["מוזיאון"],
        "אולם מופעים": layersByType["אולם מופעים"],
        "ספריה": layersByType["ספריה"],
        "אתר מורשת": layersByType["אתר מורשת תרבותית"],
        "מוסד תרבות": layersByType["מוסד תרבות (כללי)"],
        "להקה/אנסמבל": layersByType["להקה/קבוצה/אנסמבל/תזמורת (בכל תחום אמנות)"]
    }
};

// הוספת שכבות ברירת מחדל למפה
Object.values(layersByType).forEach(layer => layer.addTo(map));

// יצירת פקד שכבות מותאם
const layerControl = L.control.groupedLayers(null, overlays, {
    collapsed: false,
    exclusiveGroups: ["<strong>לפי קהל יעד</strong>", "<strong>לפי סוג פעילות</strong>"]
}).addTo(map);

// הוספת חיפוש
const searchControl = new L.Control.Search({
    layer: L.layerGroup(Object.values(layersByType)),
    propertyName: 'name',
    marker: false,
    moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 17);
    }
}).addTo(map);

// הוספת מקרא
const legend = L.control({position: 'bottomright'});
legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>מקרא</h4>';
    
    // הוספת צבעים וקטגוריות למקרא
    for (let category in categoryColors) {
        div.innerHTML += 
            `<div>
                <i style="background: ${categoryColors[category]}"></i>
                ${category}
            </div>`;
    }
    return div;
};
legend.addTo(map);