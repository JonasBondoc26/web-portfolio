# Jonas Bondoc - Web Portfolio

A sleek, high-performance portfolio website featuring modern web technologies and a professional design.

## Overview

This is a single-page portfolio website with anchor navigation, showcasing projects, skills, certifications, and contact information.

## Features

### Design Elements
- Bold red, black, and gold color scheme
- Large Logo Display: 80px in navigation, 100px in footer
- Speed Lines Background with animated motion blur effects
- Scroll progress bar
- Fully responsive design optimized for all devices

### Site Structure

**Single Page (index.html) with 5 Sections:**

1. **Home Section**
   - Dynamic hero section with professional branding
   - Animated statistics dashboard (Projects Completed, Client Satisfaction, Years Experience)
   - Call-to-action buttons
   - Scroll indicator

2. **About Section**
   - Personal bio and introduction
   - Tech Stack with 27+ technology icons (grayscale with colored hover effects)
   - Technologies: HTML, CSS, JavaScript, PHP, Python, Java, Dart, Node.js, React, Angular, Vue, Bootstrap, Tailwind, MySQL, MongoDB, Firebase, WordPress, Arduino, VS Code, Git, GitHub, Netlify, Figma, Canva, AWS, MS Office
   - 6 Certifications & Awards with clickable links
   - Full-width layout for better content presentation

3. **Projects Section**
   - 2 Featured projects on home page
   - "View All Projects" button linking to projects.html
   - Project cards with hover effects
   - Technology stack tags for each project

4. **Contact Section**
   - Fully functional contact form with validation
   - Contact details (Email, Phone, Location, Availability)
   - Social media links (GitHub, LinkedIn, Facebook Messenger)
   - Success/error message display

5. **Resume Section**
   - Resume preview card with document icon
   - "What's Included" checklist
   - Download Resume button
   - Quick overview with 4 stats
   - Professional presentation

### Navigation
- Anchor-based navigation for main page sections
- Smooth scrolling between sections
- Active section highlighting
- Mobile hamburger menu
- Resume page is a separate HTML file

### Technical Features
- SEO Optimized with proper meta tags
- Accessibility features (ARIA labels, keyboard navigation, semantic HTML)
- Performance optimized (lazy loading, efficient animations)
- Client-side form validation
- Smooth scrolling with easing
- Responsive hamburger navigation
- Back to top button
- Cursor trail effect with F1 racing theme
- Animated stat counters
- Comprehensive scroll-driven animations
- Scroll progress indicator
- Parallax effects
- Staggered element reveals
- Image scale animations
- Tech stack icon animations
- Certificate card animations

## Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Custom properties, Grid, Flexbox, keyframe animations
- **JavaScript (ES6+)**: Modern vanilla JS with no framework dependencies
- **Google Fonts**: Orbitron (display) and Rajdhani (body)
- **SVG Icons**: Inline scalable vector graphics

## Color Palette

```css
Primary Red:    #E10600
Dark Red:       #B30500
Secondary Red:  #FF4655
Gold Accent:    #FFD700
Black:          #0A0A0A
Dark Gray:      #1A1A1A
Medium Gray:    #2A2A2A
Light Gray:     #CCCCCC
Text:           #E8E8E8
```

## Customization Guide

### Update Personal Information

**Logo**
Replace `photos/jb logo.png` with your logo (recommended 500x500px or larger PNG with transparent background)

**Name and Branding**
Search for "Jonas Bondoc" across all HTML files and replace with your name

**Contact Information**
Update in `index.html` and `contact.html`:
```html
<a href="mailto:YOUR@email.com">YOUR@email.com</a>
<a href="tel:+639123456789">+63 912 345 6789</a>
<p>Your City, Your Province<br>Your Country</p>
```

**Social Media Links**
Update href attributes across all pages:
```html
<a href="https://github.com/YOURUSERNAME">
<a href="https://linkedin.com/in/YOURUSERNAME">
<a href="https://m.me/YOURUSERNAME">
```

### Modify Content

**Add/Edit Projects**
In `projects.html`, duplicate a `.project-card` div:
```html
<div class="project-card" data-aos="fade-up">
    <div class="project-category">Your Category</div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Your description</p>
    <div class="project-features">
        <h4>Key Features:</h4>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
    </div>
    <div class="project-tech">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
    </div>
</div>
```

**Update Statistics**
In `index.html`, change the `data-target` attribute:
```html
<div class="stat-value" data-target="15">0</div>
```

**Modify Tech Stack**
Add or remove tech items in the About section. Each item follows this structure:
```html
<div class="tech-item" data-tech="Technology Name">
    <svg viewBox="0 0 128 128">
        <!-- SVG path data -->
    </svg>
    <span>Display Name</span>
</div>
```

**Update Certifications**
Modify certificate information in the About section:
```html
<div class="cert-item-about">
    <div class="cert-icon">EMOJI</div>
    <div class="cert-content">
        <h4>Certificate Name</h4>
        <p>Issuing Organization - Year</p>
        <a href="#" class="cert-link">View Certificate</a>
    </div>
</div>
```

### Styling Changes

**Color Scheme**
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #E10600;
    --color-secondary: #FF4655;
    --color-accent: #FFD700;
    /* Add more custom colors */
}
```

**Typography**
Change fonts by updating Google Fonts import and CSS variables:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');

:root {
    --font-display: 'YourDisplayFont', sans-serif;
    --font-body: 'YourBodyFont', sans-serif;
}
```

### Add Resume PDF

1. Create your resume PDF file
2. Name it `Jonas_Bondoc_Resume.pdf`
3. Place it in the root directory
4. Update the download link in `index.html` and `resume.html`:
```html
<a href="Jonas_Bondoc_Resume.pdf" class="btn btn-primary btn-download" download>
```

## Responsive Breakpoints

- Desktop: 1200px and above
- Laptop: 992px - 1199px
- Tablet: 768px - 991px
- Mobile: Below 768px

## Logo Specifications

- Navigation Bar: 80px height (auto width)
- Footer: 100px height (auto width)
- Mobile Navigation: 60px height
- Mobile Footer: 70px height
- Recommended Source: Minimum 500x500px PNG with transparent background

## Deployment Options

### GitHub Pages
1. Create a new repository on GitHub
2. Upload all files (HTML, CSS, JS, images)
3. Go to Settings, then Pages
4. Select main branch as source
5. Save and wait for deployment
6. Site will be live at: `https://yourusername.github.io/repo-name`

### Netlify
1. Visit netlify.com
2. Drag and drop your project folder
3. Site deploys instantly
4. Configure custom domain (optional)
5. Free HTTPS and CDN included

### Vercel
1. Push code to GitHub
2. Import repository to vercel.com
3. Zero configuration required
4. Automatic HTTPS and deployments
5. Preview deployments for branches

## Local Development

### Testing Locally

**Option 1: Direct File Opening**
Simply open `index.html` in your web browser

**Option 2: Local Server (Recommended)**

Using Python:
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

Using Node.js:
```bash
npx http-server
# Visit http://localhost:8080
```

Using PHP:
```bash
php -S localhost:8000
# Visit http://localhost:8000
```

## Scroll-Driven Animations

The portfolio features comprehensive scroll-driven animations:

- Scroll progress bar at the top
- Section elements fade and slide in
- Tech stack icons scale and reveal with stagger
- Certificate cards slide in from left
- Project cards with 3D rotation effect
- Parallax scrolling on section numbers
- Image scale animations
- Stat counter animations
- Social links bounce in
- Form elements stagger reveal
- Button ripple effects
- Performance optimized with Intersection Observer
- Respects user's motion preferences

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices Implemented

- Semantic HTML5 elements for better SEO
- Mobile-first responsive design approach
- Accessibility features (ARIA labels, keyboard navigation)
- SEO optimization with meta tags
- Performance optimization (lazy loading, efficient animations)
- Clean, maintainable code with comments
- Cross-browser compatibility
- Progressive enhancement
- Graceful degradation for older browsers

## Performance Features

- Optimized images and assets
- Minified CSS and JavaScript ready for production
- Efficient animation with requestAnimationFrame
- Lazy loading for images
- GPU-accelerated CSS transforms
- Debounced scroll events
- Intersection Observer for scroll animations
- Reduced motion support for accessibility

## Accessibility Features

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus states for interactive elements
- Sufficient color contrast ratios
- Alt text for images
- Skip to content links
- Reduced motion preferences respected

## License

Free to use for personal portfolios. Customize with your own information, projects, and branding.

## Support and Documentation

For questions about customization:
- Review HTML comments in each file
- Check CSS section comments for styling details
- JavaScript functions are well-documented
- All code follows standard conventions

## Credits

- Fonts: Google Fonts (Orbitron, Rajdhani)
- Icons: Custom SVG technology icons
- Animations: Custom CSS and JavaScript

---

Built with passion and precision. Designed for performance.
