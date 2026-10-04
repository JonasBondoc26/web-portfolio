// On GitHub Pages the site lives at /<repo-name>/, so the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH to that. Locally it is empty and the site lives at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',          // build to plain static files in /out
    trailingSlash: true,       // /projects/ -> /projects/index.html, which static hosts expect
    basePath,
    // Lets a production build run beside `npm run dev` without the two overwriting each other's files.
    distDir: process.env.NEXT_DIST_DIR || '.next',
    images: { unoptimized: true },
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
