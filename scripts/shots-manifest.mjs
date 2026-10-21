// Writes src/data/shots.json from the screenshots in public/photos/: which ones each project
// shows and their captions. The site uses your original files directly; nothing is copied.
//
//   npm run shots
//
// For each project below: `cover` is the card image, `screens` is the gallery in order.

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/photos';
const PHONE_MAX = 1000;   // a capture narrower than this is a phone screen

const PROJECTS = {
    'smarttoll-route-planner': {
        folder: 'SmartToll',
        cover: 'desktop-planner.png',
        screens: [
            ['desktop-planner.png', 'Route planner'],
            ['desktop-trip.png', 'Trip with toll breakdown'],
            ['desktop-dashboard.png', 'Dashboard'],
            ['desktop-history.png', 'Trip history'],
            ['app-light-plan.png', 'Mobile: plan a route'],
            ['app-light-driving.png', 'Mobile: GPS navigation'],
            ['app-dark-trip.png', 'Mobile: trip (dark)'],
            ['app-dark-home.png', 'Mobile: home (dark)'],
        ],
    },
    'koma-ph-e-commerce-site': {
        folder: 'Koma PH',
        cover: '01-home-desktop.png',
        screens: [
            ['01-home-desktop.png', 'Home'],
            ['03-shop-desktop.png', 'Shop'],
            ['04-product-desktop.png', 'Product page'],
            ['11-checkout-desktop.png', 'Checkout'],
            ['01-home-mobile.png', 'Mobile: home'],
            ['04-product-mobile.png', 'Mobile: product'],
            ['12-cart-drawer-mobile.png', 'Mobile: cart'],
            ['09-my-orders-mobile.png', 'Mobile: my orders'],
        ],
    },
    diaweb: {
        folder: 'Dia Web',
        cover: 'desktop-dashboard.png',
        screens: [
            ['desktop-dashboard.png', 'Dashboard'],
            ['desktop-create.png', 'Add a reading'],
            ['mobile-dashboard.png', 'Mobile: dashboard'],
            ['mobile-create.png', 'Mobile: add a reading'],
            ['mobile-login.png', 'Mobile: sign in'],
        ],
    },
    lockhub: {
        folder: 'LockHub',
        cover: '07-vault-desktop.png',
        screens: [
            ['07-vault-desktop.png', 'Password vault'],
            ['10-generator-desktop.png', 'Password generator'],
            ['01-landing-desktop.png', 'Landing page'],
            ['08-vault-add-password-desktop.png', 'Add a password'],
            ['07-vault-mobile.png', 'Mobile: vault'],
            ['10-generator-mobile.png', 'Mobile: generator'],
            ['05-login-mobile.png', 'Mobile: sign in'],
        ],
    },
    'taho-soy-avenue': {
        folder: 'Taho Soy',
        cover: 'index-desktop.png',
        screens: [
            ['index-desktop.png', 'Home'],
            ['menu-desktop.png', 'Menu'],
            ['feature-desktop.png', 'Featured products'],
            ['contact-desktop.png', 'Contact'],
            ['index-mobile.png', 'Mobile: home'],
            ['menu-mobile.png', 'Mobile: menu'],
            ['Sign-up-mobile.png', 'Mobile: sign up'],
        ],
    },
};

// The public URL of a photo (folder names have spaces, so they're encoded).
const url = (folder, file) => encodeURI(`/photos/${folder}/${file}`);

const manifest = {};
for (const [slug, { folder, cover, screens }] of Object.entries(PROJECTS)) {
    const info = async (file) => {
        const { width, height } = await sharp(path.join(SRC, folder, file)).metadata();
        return { src: url(folder, file), w: width, h: height, phone: width < PHONE_MAX };
    };
    const c = await info(cover);
    const list = [];
    for (const [file, label] of screens) {
        const s = await info(file);
        list.push({ label, view: s.src, full: s.src, w: s.w, h: s.h, phone: s.phone, ...(file === cover && { isCover: true }) });
    }
    manifest[slug] = { cover: { src: c.src, w: c.w, h: c.h }, screens: list };
    console.log(`${slug}: cover + ${list.length} screens`);
}
await writeFile('src/data/shots.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log('Wrote src/data/shots.json');
