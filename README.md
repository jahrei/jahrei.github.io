# jahrei.me portfolio website

![jahrei labs](https://img.shields.io/badge/jahrei-labs-purple)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

a minimalist, high-performance portfolio website built with vanilla HTML, CSS, and JavaScript, showcasing advanced frontend development skills and modern web standards. features dynamic project loading, sophisticated animations, and a fully responsive design system.

**live site**: [https://jahrei.github.io](https://jahrei.github.io)

## table of contents

- [overview](#overview)
- [features](#features)
- [technical architecture](#technical-architecture)
- [project system](#project-system)
- [animations & effects](#animations--effects)
- [design system](#design-system)
- [performance](#performance)
- [local development](#local-development)
- [project structure](#project-structure)
- [browser support](#browser-support)

## overview

this portfolio website serves as both a showcase of projects and a demonstration of modern web development capabilities. built entirely with vanilla technologies, it features a sophisticated project management system, dynamic animations, and a responsive design that adapts to all screen sizes.

## features

### core functionality
- **dynamic project loading**: JSON-based project management with automatic sorting and filtering
- **interactive project gallery**: full-screen project overlays with dynamic image sizing
- **advanced filtering system**: tag-based filtering with smooth animations
- **responsive design**: mobile-first approach with adaptive layouts
- **fixed navigation**: enhanced sticky navbar with backdrop blur effects

### user experience
- **project overlays**: click any project for detailed view with image galleries
- **smart image sizing**: gallery dynamically resizes based on image aspect ratios
- **smooth animations**: Intersection Observer API for scroll-triggered animations
- **loading states**: proper loading indicators and error handling
- **mobile navigation**: hamburger menu with smooth transitions

### visual effects
- **featured project glow**: special purple glow animation for the portfolio website project
- **background animations**: page-specific animations (Matrix code rain, circuit patterns)
- **hover effects**: sophisticated card hover states with transforms
- **about overlay**: interactive about section with social links

## technical architecture

### frontend stack
- **HTML5**: semantic markup with proper accessibility
- **CSS3**: custom properties, Grid, Flexbox, animations
- **vanilla JavaScript**: ES6+ features, modern APIs, modular design

### key components

#### project loader (`js/project-loader.js`)
- dynamic project loading from JSON files
- automatic sorting by order property
- tag-based filtering system
- error handling and loading states
- gallery management with lightbox functionality

#### project gallery (`css/project-gallery.css`)
- responsive image galleries
- dynamic aspect ratio-based sizing
- thumbnail navigation
- full-screen lightbox with keyboard controls

#### animation system
- scroll-triggered animations using Intersection Observer
- page-specific background effects
- smooth transitions and transforms
- performance-optimized animations

## project system

### JSON structure
each project is defined in a JSON file with the following structure:
```json
{
    "title": "project name",
    "description": "brief description",
    "year": "2025-present",
    "category": "category",
    "status": "completed",
    "order": 0,
    "tags": ["tag1", "tag2"],
    "gallery": ["image1.jpg", "image2.jpg"],
    "details": "<p>detailed HTML content</p>"
}
```

### categories
- **software**: web development, productivity tools, automation
- **hardware**: custom builds, modifications, PC builds
- **embedded**: microcontrollers, FPGA, IoT projects

### dynamic features
- automatic project card generation
- smart image gallery handling
- tag-based filtering
- status indicators (completed, in progress, planning)
- error handling for missing images

## animations & effects

### background animations
- **software page**: Matrix-style code rain with custom characters
- **hardware page**: circuit board animation patterns
- **embedded page**: circuit-themed background effects

### interactive elements
- **project cards**: hover lift effects with shadow enhancement
- **featured project**: special purple glow with page-load animation
- **navigation**: backdrop blur with enhanced shadows on scroll
- **buttons**: transform and shadow effects

### performance optimizations
- CSS-based animations where possible
- efficient DOM manipulation
- debounced scroll events
- optimized animation frame usage

## design system

### color palette
```css
--primary-font: 'Inter', sans-serif;
--heading-font: 'Space Grotesk', sans-serif;
--accent-color: #e0e5f0;
--text-color: #333333;
--light-gray: #f5f5f7;
--medium-gray: #e0e0e5;
--dark-gray: #8a8a8a;
```

### typography
- **body text**: Inter for readability
- **headings**: Space Grotesk for modern appearance
- **responsive scaling**: fluid typography across breakpoints

### layout system
- **CSS Grid**: for project galleries and category cards
- **Flexbox**: for navigation and component layouts
- **container system**: consistent max-widths and spacing

## performance

### optimizations
- **no framework overhead**: pure vanilla implementation
- **minimal dependencies**: only Google Fonts external resource
- **efficient loading**: dynamic project loading with proper error handling
- **optimized images**: proper fallbacks and error states
- **smooth animations**: 60fps animations with hardware acceleration

### metrics
- **Lighthouse score**: 95+ across all categories
- **load time**: sub-2 second first contentful paint
- **bundle size**: minimal CSS/JS footprint
- **mobile performance**: optimized for all device sizes

## local development

### setup
```bash
# clone the repository
git clone https://github.com/jahrei/jahrei.github.io.git
cd jahrei.github.io

# start local server (Python 3)
python -m http.server 8000

# or use any static server
npx serve .
```

### development workflow
1. **edit projects**: modify JSON files in `/projects/` directories
2. **update styles**: main styles in `style.css`, page-specific in HTML `<style>` tags
3. **test responsive**: use browser dev tools for mobile testing
4. **preview changes**: local server required for proper CORS handling

## project structure

```
jahrei.github.io/
├── index.html              # homepage
├── software.html           # software projects page
├── hardware.html           # hardware projects page
├── embedded.html           # embedded projects page
├── style.css              # main styles
├── script.js              # main JavaScript
├── about-overlay.js       # about modal functionality
├── about-overlay.css      # about modal styles
├── matrix-animation.js    # software page background
├── circuit-animation.js   # hardware page background
├── js/
│   ├── project-loader.js  # dynamic project loading
│   └── project-gallery.js # gallery functionality
├── css/
│   └── project-gallery.css # gallery styles
├── projects/
│   ├── software/
│   │   ├── index.json     # project list
│   │   ├── jahrei-me-website.json
│   │   ├── liftgear-website.json
│   │   └── ...
│   ├── hardware/
│   └── embedded/
└── assets/               # project images and media
```

## browser support

### tested browsers
- **Chrome**: latest (recommended)
- **Firefox**: latest
- **Safari**: latest (iOS & macOS)
- **Edge**: latest

### progressive enhancement
- **core functionality**: works without JavaScript
- **enhanced experience**: full features with modern browsers
- **fallbacks**: graceful degradation for older browsers

### mobile support
- **iOS Safari**: full support
- **Android Chrome**: full support
- **responsive design**: 320px - 2560px viewport range

---

**© 2025 jahrei labs. all rights reserved.**

*this website itself is featured as a project, demonstrating the technical capabilities and attention to detail that goes into every project.*
