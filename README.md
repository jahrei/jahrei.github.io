# Jahrei Labs Portfolio Website

![Jahrei Labs](https://img.shields.io/badge/Jahrei-Labs-blue)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A minimalist, responsive portfolio website for Jahrei Labs, showcasing engineering and creative projects across hardware, software, and embedded systems domains. This site is built using only vanilla HTML, CSS, and JavaScript, with no frameworks or build tools, making it lightweight and easy to maintain.

**Live Site**: [https://jahrei.github.io](https://jahrei.github.io)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Site Structure](#site-structure)
- [Design Philosophy](#design-philosophy)
- [Technical Implementation](#technical-implementation)
- [Performance Optimizations](#performance-optimizations)
- [Browser Compatibility](#browser-compatibility)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

Jahrei Labs is a personal studio focused on bridging the gap between hardware, software, and creative design. This portfolio website serves as a showcase for various projects across multiple technical domains, presented in a clean, minimalist design that emphasizes content and usability.

## Features

### Core Features

- **Fully Responsive Design**: Adapts seamlessly to all screen sizes from mobile to desktop
- **Minimalist Aesthetic**: Clean white theme with subtle shadows and rounded elements
- **Smooth Animations**: CSS transitions and JavaScript-powered animations for enhanced UX
- **Semantic HTML Structure**: Properly structured content for accessibility and SEO
- **No Dependencies**: Built with vanilla HTML, CSS, and JavaScript only
- **Fast Loading**: Optimized for performance with minimal resource usage
- **Cross-Browser Compatible**: Works on all modern browsers

### User Experience Features

- **Sticky Navigation**: Easy access to all sections from anywhere on the site
- **Smooth Scrolling**: Enhanced navigation experience with smooth scrolling
- **Project Filtering**: Interactive filtering system for software projects
- **Expandable Content**: Toggle-able project details to manage information density
- **Mobile-First Navigation**: Hamburger menu for smaller screens
- **Visual Feedback**: Hover states and transitions for interactive elements

## Site Structure

The website consists of four main pages:

### 1. Homepage (`index.html`)

- **Hero Section**: Site title, subtitle, and main call-to-action buttons
- **About Section**: Mission statement and information about Jahrei Labs
- **Current Work**: Highlights of ongoing projects (Liftgear V2, Certfid)
- **Projects Preview**: Overview of the three main project categories
- **Contact Section**: Email and social media links

### 2. Hardware Projects (`hardware.html`)

Showcases hardware-focused projects including:
- Custom IIDX Controllers
- Mechanical Keyboard Mods
- ThinkPad Restoration
- Vintage PC Builds
- Linux War Machine specs

Each project is presented in a card format with expandable details.

### 3. Software Projects (`software.html`)

Features software development projects with tag-based filtering:
- Kairos (life dashboard + automation tool)
- Delabity (task & productivity system)
- Liftgear V2 (Shopify development)
- Certfid UI Kit
- Custom Static Site Generator
- DevOps CI/CD Pipelines

Includes an interactive filtering system to sort projects by category.

### 4. Embedded Projects (`embedded.html`)

Displays embedded systems and electronics projects:
- Certfid (NFC verification system)
- Arduino Rhythm Game Controller
- FPGA Digital Logic Labs
- ESP32/STM32 Tinker Boards
- GPIO/Sensor Interfacing

Each project includes status indicators (planning, in-progress, completed).

## Design Philosophy

### Visual Design

- **Color Palette**: 
  - Primary: White (#FFFFFF)
  - Accent: Soft blue/gray (#E0E5F0)
  - Text: Dark gray (#333333)
  - Subtle grays for separation and emphasis

- **Typography**:
  - Body Text: Inter (sans-serif)
  - Headings: Space Grotesk (sans-serif)
  - Font sizes scale proportionally across devices

- **Visual Elements**:
  - Rounded corners (border-radius) for cards and buttons
  - Soft drop shadows for depth and hierarchy
  - Subtle section separators
  - Consistent spacing and alignment

### User Interface Principles

- **Clarity**: Clear visual hierarchy and content organization
- **Consistency**: Uniform design patterns across all pages
- **Feedback**: Visual responses to user interactions
- **Efficiency**: Minimal clicks to access information
- **Accessibility**: Readable text, sufficient contrast, semantic markup

## Technical Implementation

### HTML

- Semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy for document outline
- Descriptive alt text for images (placeholders currently)
- Logical tab order for keyboard navigation

### CSS

- Custom properties (CSS variables) for consistent styling
- Flexbox and CSS Grid for responsive layouts
- Media queries for responsive design breakpoints
- CSS animations and transitions for interactive elements
- BEM-inspired naming convention for maintainable CSS

### JavaScript

- Event listeners for interactive elements
- Mobile menu toggle functionality
- Project filtering system using data attributes
- Intersection Observer API for scroll animations
- Expandable project details with toggle functionality

## Performance Optimizations

- Minimal external resources (only Google Fonts)
- CSS animations instead of JavaScript where possible
- Efficient DOM manipulation
- No unnecessary libraries or frameworks
- Lazy-loading of off-screen content

## Browser Compatibility

Tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Local Development

To work on this site locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/jahrei/jahrei.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd jahrei.github.io
   ```

3. Open the project in your preferred code editor

4. To preview the site, you can use any local server. For example, with Python:
   ```bash
   # Python 3
   python -m http.server
   
   # Python 2
   python -m SimpleHTTPServer
   ```

5. Visit `http://localhost:8000` in your browser

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub's built-in Pages service.

To deploy your own version:

1. Fork this repository
2. Go to Settings > Pages
3. Select the main branch as the source
4. Click Save

Your site will be available at `https://[your-username].github.io`

## Future Enhancements

Planned improvements for future versions:

- Add actual project images to replace placeholders
- Implement dark mode toggle
- Add a blog section for technical articles
- Create a newsletter signup form
- Enhance project filtering with more categories
- Add a search functionality
- Implement project pagination for larger collections
- Add more detailed project case studies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2023 Jahrei Labs. All rights reserved.

*Note: This README is a living document and will be updated as the project evolves.*
