// Turns the raw screenshots in public/photos/ into small WebP files in public/shots/,
// and writes src/data/shots.json, which the project cards and pages read.
//
//   npm run shots
//
// For each project below: `cover` is the card image, `screens` is the gallery in order.
// Each screen gets a "view" (the top of the page, cropped to a screen) and a "full"
// (the whole page, for the click-through). Raw captures are often 2-4 MB and 10,000px tall;
// the site only ships these copies.

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/photos';
const OUT = 'public/shots';

const PROJECTS = {
    'smarttoll-route-planner': {
        folder: 'SmartToll',
        cover: 'desktop-planner.png',
        screens: [
            ['desktop-planner.png', 'Route planner'],
            ['desktop-trip.png', 'Trip with toll breakdown'],
            ['desktop-dashboard.png', 'Dashboard'],
            ['desktop-history.png', 'Trip history'],
            ['phone-light-plan.png', 'Mobile: plan a route'],
            ['phone-light-driving.png', 'Mobile: GPS navigation'],
            ['phone-dark-trip.png', 'Mobile: trip (dark)'],
            ['phone-dark-home.png', 'Mobile: home (dark)'],
        ],
    },
    'koma-ph-e-commerce-site': {
        folder: 'Koma PH',
        // These captures sit in a labelled presentation frame; cut back to the site itself.
        trim: { desktop: { left: 32, top: 98, right: 32, bottom: 32 }, phone: { left: 48, top: 162, right: 48, bottom: 48 } },
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

// A capture narrower than this is a phone screen.
const PHONE_MAX = 1000;
const WEBP = { quality: 72, effort: 5 };
const MAX_FULL_H = 16000;   // WebP's limit is 16383px

const slugify = (f) => f.replace(/\.(png|jpe?g)$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

async function shot(src, outDir, base, kind, trim) {
    let file = src;
    let meta = await sharp(src).metadata();
    let phone = meta.width < PHONE_MAX;
    const t = trim?.[phone ? 'phone' : 'desktop'];
    if (t) {
        file = await sharp(src).extract({ left: t.left, top: t.top, width: meta.width - t.left - t.right, height: meta.height - t.top - t.bottom }).png().toBuffer();
        meta = await sharp(file).metadata();
        phone = meta.width < PHONE_MAX;
    }
    // View: the top of the page at screen proportions (16:10 desktop, 9:19.5 phone).
    const viewW = phone ? 480 : kind === 'cover' ? 1280 : 1600;
    const ratio = phone ? 19.5 / 9 : 10 / 16;
    const cropH = Math.min(meta.height, Math.round(meta.width * ratio));
    const view = sharp(file).extract({ left: 0, top: 0, width: meta.width, height: cropH }).resize({ width: viewW, withoutEnlargement: true });
    const name = kind === 'cover' ? `${base}.webp` : `${base}-${kind}.webp`;
    const v = await view.webp(WEBP).toFile(path.join(outDir, name));
    if (kind === 'cover') return { src: name, w: v.width, h: v.height };

    // Full: the whole page, narrower, for the click-through.
    const fullW = Math.min(meta.width, phone ? 480 : 1400);
    const scaledH = Math.round(meta.height * (fullW / meta.width));
    const full = sharp(file).resize({ width: fullW, height: Math.min(scaledH, MAX_FULL_H), fit: 'cover', position: 'top' });
    await full.webp({ ...WEBP, quality: 68 }).toFile(path.join(outDir, `${base}-full.webp`));
    return { view: `${base}-view.webp`, full: `${base}-full.webp`, w: v.width, h: v.height, phone };
}

const manifest = {};
await rm(OUT, { recursive: true, force: true });
for (const [slug, { folder, cover, screens, trim }] of Object.entries(PROJECTS)) {
    const outDir = path.join(OUT, slug);
    await mkdir(outDir, { recursive: true });
    const c = await shot(path.join(SRC, folder, cover), outDir, 'cover', 'cover', trim);
    const list = [];
    for (const [file, label] of screens) {
        const s = await shot(path.join(SRC, folder, file), outDir, slugify(file), 'view', trim);
        list.push({ label, ...s, ...(file === cover && { isCover: true }) });
    }
    manifest[slug] = {
        cover: { ...c, src: `/shots/${slug}/${c.src}` },
        screens: list.map((s) => ({ ...s, view: `/shots/${slug}/${s.view}`, full: `/shots/${slug}/${s.full}` })),
    };
    console.log(`${slug}: cover + ${list.length} screens`);
}
await writeFile('src/data/shots.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Wrote src/data/shots.json');
