const culturalData = [
    {
        name: "תרבוטק וספריית אביטל",
        address: "יוספטל 98 בת ים",
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
        lat: 32.012900,
        lon: 34.760645,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["נוער 12-18"],
        websites: ["https://www.tarbut-batyam.co.il/?CategoryID=405"],
        activities: ["חוגים", "מופעים"],
        artFields: ["מוסיקה", "בין/רב תחומי"]
    },
    {
        name: "היכל התרבות",
        address: "סמטת אופיר 3",
        lat: 32.020639,
        lon: 34.757244,
        types: ["אולם מופעים"],
        targetAudiences: ["גיל שלישי 60+", "קהל רחב"],
        websites: ["https://www.tarbut-batyam.co.il/"],
        activities: ["מופעים"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "אודיטוריום בת ים",
        address: "שאול הדדי 6",
        lat: 32.019119,
        lon: 34.755660,
        types: ["אולם מופעים"],
        targetAudiences: ["קהל רחב"],
        activities: ["מופעים"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "המכון לאמנות",
        address: "הגבול שמחה הולצברג 18",
        lat: 32.020700,
        lon: 34.756100,
        types: ["מוסד תרבות (כללי)"],
        targetAudiences: ["נוער 12-18", "young adults 18-30", "קהל רחב"],
        websites: ["https://www.facebook.com/batyamgallery/?locale=he_IL"],
        activities: ["סדנאות", "חוגים", "תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "מוזיאון בן ארי - MOBY - מוזיאון בת ים",
        address: "סטרומה 6 בת ים",
        lat: 32.020700,
        lon: 34.756100,
        types: ["מוזיאון"],
        targetAudiences: ["קהל רחב"],
        websites: ["https://www.facebook.com/moby.batyam/?locale=he_IL"],
        activities: ["תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "בית שלום אש - מוזיאוני בת ים",
        address: "ארלוזרוב 50 בת ים",
        lat: 32.020732,
        lon: 34.744499,
        types: ["אתר מורשת תרבותית"],
        targetAudiences: ["קהל רחב"],
        activities: ["תערוכות"],
        artFields: ["אמנות פלסטית"]
    },
    {
        name: "בית ריבק - מוזיאוני בת ים",
        address: "שאול הדדי 6",
        lat: 32.019113,
        lon: 34.755690,
        types: ["מוזיאון"],
        targetAudiences: ["קהל רחב"],
        activities: ["סדנאות"],
        artFields: ["בין/רב תחומי"]
    },
    {
        name: "בית-צדיק",
        address: "שאול המלך 4 בת-ים",
        lat: 32.014071,
        lon: 34.740821,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "ילדים 5-12", "משפחות צעירות 30+"],
        websites: ["https://www.tarbut-batyam.co.il/?CategoryID=1000"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "גאולים",
        address: "ניצנה 19 בת-ים",
        lat: 32.025288,
        lon: 34.759747,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "young adults 18-30", "משפחות צעירות 30+"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "גורדון",
        address: "ביל\"ו 1 פינת הגבול בת-ים",
        lat: 32.031520,
        lon: 34.745573,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "ילדים 5-12", "משפחות צעירות 30+"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "הבונים",
        address: "אורט ישראל 9 בת-ים",
        lat: 32.013050,
        lon: 34.749762,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "ילדים 5-12", "משפחות צעירות 30+"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "יגלום",
        address: "ליבורנו 17 בת-ים",
        lat: 32.014717,
        lon: 34.760220,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "ילדים 5-12"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "כותר-פיס",
        address: "ז'בוטינסקי 3 בת-ים",
        lat: 32.021517,
        lon: 34.740195,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["young adults 18-30", "ילדים 5-12"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "כנרת",
        address: "כנרת 6 בת-ים",
        lat: 32.023990,
        lon: 34.753547,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["נוער 12-18", "ילדים 5-12", "משפחות צעירות 30+"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "עופר",
        address: "הבנים 5 בת-ים",
        lat: 32.007074,
        lon: 34.752176,
        types: ["מרכזים קהילתיים (מתנ\"ס)"],
        targetAudiences: ["גיל שלישי 60+", "ילדים 5-12", "קהל רחב"],
        activities: ["חוגים"],
        artFields: ["קהילה"]
    },
    {
        name: "מרכז כלים לכוריאוגרפיה",
        address: "יצחק נפחא 2 בת-ים",
        lat: 32.004631,
        lon: 34.744090,
        types: ["מוסד תרבות (כללי)", "אולם מופעים"],
        targetAudiences: ["קהל רחב"],
        websites: ["https://kelim.org.il"],
        activities: ["מופעים", "ליווי אמנים ויוצרים מקצועיים", "מחול"],
        artFields: ["בין/רב תחומי", "מחול"]
    },
    {
        name: "טרמינל לעיצוב",
        address: "אהוד קינמון 32",
        lat: 32.007287,
        lon: 34.747812,
        types: ["מוסד תרבות (כללי)", "גלריה", "אומנות וקהילה"],
        targetAudiences: ["אומנות וקהילה"],
        websites: ["https://designterminal.org.il/he/home"],
        activities: ["תערוכות", "ליווי אמנים ויוצרים מקצועיים", "בין/רב תחומי"],
        artFields: ["בין/רב תחומי", "אמנות פלסטית"]
    }
];
