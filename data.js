const culturalData = [
    {
        name: "תרבוטק+ ספריית אביטל",
        address: "יוספטל 98, בת ים",
        lat: 32.015439,
        lon: 34.760644,
        types: ["ספריה", "אתר מורשת תרבותית"],
        targetAudiences: ["גיל שלישי 60+", "קהל רחב"],
        websites: [
            "https://www.bat-yam.muni.il/he/249/",
            "https://www.facebook.com/tarbutek.batyam",
            "https://www.coing.co/BatYam_Tarbutek"
        ],
        activities: ["מופעים", "נותן שירותים", "ערבי תרבות", "סדנאות"],
        artFields: ["בין/רב תחומי", "אומנות המילה"]
    },
    {
        name: "קונסרבטיון למוסיקה",
        address: "ליבורנו 24 בת ים",
        lat: 32.011559,
        lon: 34.759953,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["נוער 12-18"],
        websites: [],
        activities: ["חוגים", "מופעים"],
        artFields: ["מוסיקה"]
    },
    {
        name: "היכל התרבות",
        address: "סמטת אופיר 3",
        lat: 32.020639,
        lon: 34.757244,
        types: ["אולם מופעים"],
        targetAudiences: [],
        websites: [],
        activities: ["מופעים"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "אודיטוריום בת ים",
        address: "הדדי",
        lat: 32.018123,
        lon: 34.751234,
        types: ["אולם מופעים"],
        targetAudiences: ["קהל רחב"],
        websites: [],
        activities: ["מופעים"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "המכון לאמנות",
        address: "הגבול, שמחה הולצברג 18",
        lat: 32.016789,
        lon: 34.753456,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["נוער 12-18", "young adults 18-30", "קהל רחב"],
        websites: [],
        activities: ["סדנאות", "חוגים", "תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "מוזיאון בן ארי - MOBY - מוזיאון בת ים",
        address: "סטרומה 6, בת ים",
        lat: 32.016889,
        lon: 34.753456,
        types: ["מוזיאון"],
        targetAudiences: ["קהל רחב"],
        websites: [],
        activities: ["תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "בית שלום אש - מוזאוני בת ים",
        address: "ארלוזרוב 50 , בת ים",
        lat: 32.016789,
        lon: 34.753556,
        types: ["אתר מורשת תרבותית"],
        targetAudiences: ["קהל רחב"],
        websites: [],
        activities: ["תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "בית ריבק - מוזיאוני בת ים",
        address: "שאול הדדי, 6",
        lat: 32.016689,
        lon: 34.753456,
        types: ["מוזיאון"],
        targetAudiences: ["קהל רחב"],
        websites: [],
        activities: ["סדנאות"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "בית-צדיק",
        address: "שאול המלך 4 בת-ים",
        lat: 32.016789,
        lon: 34.753356,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "נוער 12-18", "משפחות צעירות 30+"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "גאולים",
        address: "ניצנה 19 בת-ים",
        lat: 32.016889,
        lon: 34.753556,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "young adults 18-30", "משפחות צעירות 30+"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "גורדון",
        address: "ביל\"ו 1 פינת הגבול בת-ים",
        lat: 32.016689,
        lon: 34.753556,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "young adults 18-30", "משפחות צעירות 30+"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "הבונים",
        address: "אורט ישראל 9 בת-ים",
        lat: 32.016889,
        lon: 34.753356,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "נוער 12-18", "משפחות צעירות 30+"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "יגלום",
        address: "ליבורנו 17 בת-ים",
        lat: 32.016789,
        lon: 34.753256,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "נוער 12-18"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "כותר-פיס",
        address: "ז'בוטינסקי 3 בת-ים",
        lat: 32.016689,
        lon: 34.753356,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "young adults 18-30"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "כנרת",
        address: "כנרת 6 בת-ים",
        lat: 32.016789,
        lon: 34.753156,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["ילדים 5-12", "נוער 12-18", "משפחות צעירות 30+"],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    },
    {
        name: "עופר",
        address: "הבנים 5 בת-ים",
        lat: 32.016889,
        lon: 34.753156,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: [],
        websites: [],
        activities: ["חוגים"],
        artFields: ["מרכזים קהילתיים (מתנ\"ס)"]
    }
];
