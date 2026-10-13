// Every project on the site. "featured: true" puts it on the home page.
// To show a screenshot, put it in public/photos/ and add  "image": "/photos/your-shot.jpg"  to the project.
export const projects = [
    {
        "slug": "smarttoll-route-planner",
        "title": "SmartToll Route Planner",
        "placeholder": "Toll Route Planner",
        "category": "Full Stack Development",
        "description": "A toll route planner with RFID balance tracking for motorists in Luzon, built as a capstone project at Holy Angel University with a Laravel REST API, a React web app and a React Native (Expo) mobile app. Drivers pick any landmark or pin a spot on the map, compare up to four routes labeled fastest, shortest and cheapest, and see every toll plaza, the estimated fee for their vehicle class, and whether their Easytrip or Autosweep balance covers the trip before they reach the gate. It covers nine expressway systems, including NLEX/SCTEX, TPLEX, Skyway/SLEX, NAIAX, STAR, CALAX and CAVITEX, with 95 toll plazas and 2,311 rates taken from the Toll Regulatory Board. On the phone it adds GPS turn-by-turn directions with toll plaza alerts, and an admin module keeps the toll data current through TRB or CSV imports with a full change log.",
        "features": [
            "Multi-Route Comparison (Fastest / Shortest / Cheapest)",
            "Per-Expressway Toll Fee Breakdown",
            "RFID Balance Check & Auto-Deduction",
            "Landmark Search & Map Pinning Across Luzon",
            "GPS Turn-by-Turn Navigation with Toll Plaza Alerts",
            "Saved Routes & Trip History with Plan Again",
            "Google Sign-In & Token Authentication (Sanctum)",
            "Admin Toll Matrix with TRB/CSV Import & Change Log"
        ],
        "tech": [
            "React",
            "React Native",
            "Expo",
            "Laravel",
            "PHP",
            "MySQL",
            "Leaflet",
            "OpenStreetMap"
        ],
        "demo": "https://smart-toll-production.up.railway.app/login",
        "github": "https://github.com/JonasBondoc26/Smart-Toll",
        "featured": true
    },
    {
        "slug": "koma-ph-e-commerce-site",
        "title": "Koma PH E-Commerce Site",
        "placeholder": "E-Commerce Site",
        "category": "Full Stack Development",
        "description": "An online store and order management system for KOMA PH, a Filipino streetwear brand from Pampanga, built with the MEVN stack (MongoDB, Express, Vue and Node.js). Shoppers can browse the V1 and Drift collections, save favorites to a wishlist, and check out with Cash on Delivery, GCash, or Bank Transfer. Signed-in customers get a profile dashboard with their order history and total spent, and passwords are hashed with bcrypt. The system moves KOMA PH away from manual order tracking toward one coordinated workflow, cutting down on human error and giving the business a stable base to grow on.",
        "features": [
            "Authentication-Aware Logic",
            "Smart Cart System",
            "Advanced Wishlist System",
            "Buy Now Feature",
            "Cart Sidebar Logic (Composable)",
            "Product Data Export",
            "Error Handling & Fallback Safety",
            "Multi-Tab Synchronization"
        ],
        "tech": [
            "Vue",
            "CSS",
            "JavaScript",
            "MongoDB",
            "Express.js",
            "Node.js"
        ],
        "demo": "https://koma-ph-store.netlify.app",
        "github": "https://github.com/JonasBondoc26/6WCSERVER-WD-303-KOMA-PH-Inventory-and-Order-Management-System",
        "featured": true
    },
    {
        "slug": "galang-dental-center-business-site",
        "title": "Galang Dental Center | Business Site",
        "placeholder": "Business Website SEO Ready",
        "category": "WordPress Project",
        "description": "The website was created to make it easier for people in San Fernando, Pampanga to learn about and access dental services. The clinic realized that relying only on phone calls and walk-in visits made it difficult for many patients to get the information they needed about dental care.",
        "features": [],
        "tech": [
            "WordPress",
            "Google Search Console",
            "Rank Math SEO"
        ],
        "demo": "https://galangdentalcenter.com/",
        "github": null,
        "featured": true
    },
    {
        "slug": "diaweb",
        "title": "DiaWeb",
        "placeholder": "Diabetes Management System",
        "category": "Full Stack Development",
        "description": "A comprehensive web application for diabetic patients to manage their health, track blood sugar levels, schedule medications, and set reminders. Built for my very first client as my capstone project.",
        "features": [
            "User Authentication",
            "Blood Sugar Tracking",
            "Medication Management",
            "Reminders & Alerts",
            "Statistics Dashboard"
        ],
        "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "Firebase",
            "Arduino"
        ],
        "demo": "https://jonasbondoc26.github.io/DiaWeb/",
        "github": "https://github.com/JonasBondoc26/DiaWeb",
        "featured": false
    },
    {
        "slug": "lockhub",
        "title": "LockHub",
        "placeholder": "Secure Password Vault",
        "category": "Full Stack Development",
        "description": "LockHub is a secure password management system designed to help users securely generate, store, and manage their passwords. By incorporating encrypted storage and authentication mechanisms, it ensures that sensitive data is protected and easily accessible. The platform offers various features including user authentication, a password generator, and secure data storage, making it an essential tool for maintaining password security.",
        "features": [
            "Secure User Authentication",
            "Encrypted Storage for Passwords",
            "Password Generator",
            "User Profile Management",
            "Session Management",
            "Frontend Navigation & UI Components",
            "Database Interaction & Security",
            "Admin Panel"
        ],
        "tech": [
            "PHP",
            "MySQL",
            "CSS",
            "JavaScript"
        ],
        "demo": "https://lockhub.infinityfreeapp.com",
        "github": "https://github.com/JonasBondoc26/LockHub",
        "featured": false
    },
    {
        "slug": "student-budget-tracker",
        "title": "Student Budget Tracker",
        "placeholder": "Student Budget Tracker",
        "category": "Full Stack Development",
        "description": "A comprehensive web application for managing student budgets and allowances. Track expenses, set financial goals, and stay organized with this intuitive tool.",
        "features": [
            "User Authentication",
            "Budget Tracking",
            "Expense Management",
            "Financial Goals",
            "Statistics Dashboard"
        ],
        "tech": [
            "Angular",
            "CSS",
            "TypeScript",
            "Firebase"
        ],
        "demo": "https://student-budget-tracker-2a2bd.web.app",
        "github": "https://github.com/JonasBondoc26/Student-Budget-and-Allowance-Tracker",
        "featured": false
    },
    {
        "slug": "taho-soy-avenue",
        "title": "Taho Soy Avenue",
        "placeholder": "E-Commerce Site",
        "category": "Front-End Development",
        "description": "Taho Soy Avenue is an e-commerce website for a local taho and soy-based food business. The site features a responsive design, product listings, shopping cart functionality, and user-friendly navigation. It showcases the business's products and provides an easy-to-use platform for customers to browse and purchase items online.",
        "features": [
            "Category + Subcategory Filtering",
            "Fully Functional Cart System",
            "Cart Sidebar UI",
            "Add-to-Cart Visual Feedback",
            "Authentication UI System",
            "Smart UI Behavior"
        ],
        "tech": [
            "HTML",
            "JavaScript",
            "CSS"
        ],
        "demo": "https://jonasbondoc26.github.io/Taho-Soy-Avenue---Website/index.htm",
        "github": "https://github.com/JonasBondoc26/Taho-Soy-Avenue---Website",
        "featured": false
    },
    {
        "slug": "game-booster",
        "title": "Game Booster",
        "placeholder": "Showcase Site",
        "category": "Front-End Development",
        "description": "GameBooster is a website created to highlight popular competitive and online multiplayer games, while also sharing helpful tips to improve gameplay. It emphasizes strong branding, a modern user interface, and a well-structured layout to give the feel of a professional gaming platform. (My very first project)",
        "features": [],
        "tech": [
            "HTML",
            "JavaScript",
            "CSS"
        ],
        "demo": "https://jonasbondoc26.github.io/GameBooster.github.io/index.html",
        "github": "https://github.com/JonasBondoc26/GameBooster.github.io",
        "featured": false
    }
];
