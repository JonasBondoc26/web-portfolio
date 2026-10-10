// The tech stack tiles in the About section, shown in groups (see TECH_GROUPS for their order).
// "mono": the icon is plain black, so it is flipped to white on hover in dark mode.
export const TECH_GROUPS = ["Languages", "Frameworks", "Platforms", "Tools"];

// Tyre compounds, F1 style, for how much each one gets used: soft is the go-to, hard the least run.
export const COMPOUNDS = {
    soft: { letter: 'S', label: 'Soft', note: 'daily driver' },
    medium: { letter: 'M', label: 'Medium', note: 'comfortable' },
    hard: { letter: 'H', label: 'Hard', note: 'familiar' },
};

export const tech = [
    {
        "name": "HTML",
        "compound": "soft",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
    },
    {
        "name": "CSS",
        "compound": "soft",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
    },
    {
        "name": "JavaScript",
        "compound": "soft",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
        "name": "TypeScript",
        "compound": "medium",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
        "name": "PHP",
        "compound": "medium",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
    },
    {
        "name": "Python",
        "compound": "hard",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
        "name": "Java",
        "compound": "hard",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
        "name": "Dart",
        "compound": "hard",
        "group": "Languages",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"
    },
    {
        "name": "Flutter",
        "compound": "hard",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
    },
    {
        "name": "Node.js",
        "compound": "medium",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
        "name": "Express.js",
        "compound": "medium",
        "group": "Frameworks",
        "mono": true,
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
    },
    {
        "name": "React",
        "compound": "medium",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
        "name": "Angular",
        "compound": "medium",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg"
    },
    {
        "name": "Vue",
        "compound": "soft",
        "group": "Frameworks",
        "icon": "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
    },
    {
        "name": "Laravel",
        "compound": "hard",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
    },
    {
        "name": "Bootstrap",
        "compound": "medium",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
    },
    {
        "name": "Tailwind",
        "compound": "medium",
        "group": "Frameworks",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
        "name": "MySQL",
        "compound": "medium",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    },
    {
        "name": "MongoDB",
        "compound": "medium",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
        "name": "Firebase",
        "compound": "soft",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
    },
    {
        "name": "WordPress",
        "compound": "soft",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg"
    },
    {
        "name": "Arduino",
        "compound": "hard",
        "group": "Tools",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-plain.svg"
    },
    {
        "name": "VS Code",
        "compound": "soft",
        "group": "Tools",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
    },
    {
        "name": "Git",
        "compound": "soft",
        "group": "Tools",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
        "name": "GitHub",
        "compound": "soft",
        "group": "Tools",
        "mono": true,
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    },
    {
        "name": "Netlify",
        "compound": "medium",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-plain.svg"
    },
    {
        "name": "Figma",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    },
    {
        "name": "Canva",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"
    },
    {
        "name": "AWS",
        "compound": "hard",
        "group": "Platforms",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    },
    {
        "name": "MS Office",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://img.icons8.com/color/48/microsoft-office-2019.png"
    },
    {
        "name": "Google Search Console",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://cdn.simpleicons.org/googlesearchconsole"
    },
    {
        "name": "Rank Math SEO",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://ps.w.org/seo-by-rank-math/assets/icon.svg"
    },
    {
        "name": "Claude Code",
        "compound": "medium",
        "group": "Tools",
        "icon": "https://cdn.simpleicons.org/claude"
    }
];
