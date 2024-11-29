// יצירת המפה וקביעת מרכז בבת ים
const map = L.map('map').setView([32.0167, 34.7500], 14);

// הוספת שכבת מפת רקע
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// פונקציה ליצירת תוכן חלון קופץ
function createPopupContent(location) {
    return `
        <div>
            <h3>${location.name}</h3>
            <p><strong>כתובת:</strong> ${location.address}</p>
            <p><strong>סוג פעילות:</strong> ${location.type}</p>
            <p><strong>קהל יעד:</strong> ${location.targetAudience}</p>
            ${location.website ? `<p><a href="${location.website}" target="_blank">לאתר האינטרנט</a></p>` : ''}
        </div>
    `;
}

// הוספת סמנים למפה
culturalData.forEach(location => {
    const marker = L.marker([location.lat, location.lon])
        .bindPopup(createPopupContent(location))
        .addTo(map);
}); 