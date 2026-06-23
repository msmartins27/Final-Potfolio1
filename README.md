Alina Martin – Interactive Portfolio

A fully interactive personal portfolio website built with HTML, CSS, and JavaScript

Project Structure

portfolio/ ├── index.html # Home page ├── about.html # About Me ├── skills.html # Skills with animated progress bars ├── projects.html # Projects showcase ├── education.html # Education & Experience timeline ├── contact.html # Contact form (Formspree) ├── portfolio.css # Shared stylesheet with CSS variables + dark mode ├── portfolio.js # All JavaScript interactivity └── README.md

JavaScript Features Implemented

DOM Manipulation & localStorage – Dark Mode Toggle A dark/light mode button in the navbar toggles a .dark class on . The preference is saved in localStorage so it persists across page visits.

Timers & String Methods – Typing Effect The homepage headline uses setTimeout to cycle through an array of role strings, typing and erasing each one character by character.

IntersectionObserver API – Scroll-Reveal Animations Elements with the class reveal start invisible and slide up into view as the user scrolls them into the viewport, powered by the IntersectionObserver API.

IntersectionObserver API – Animated Skill Bars Skill progress bars start at width 0. When the skills section enters the viewport, JavaScript sets each bar's width from its data-width attribute, triggering a smooth CSS transition.

Async/Await & Fetch API – Contact Form The contact form submits to Formspree using fetch() with async/await. Real-time validation with inline error messages runs on blur and input events.

Event Listeners – Hamburger Menu (Mobile) A hamburger button toggles the nav menu open/closed on small screens using classList.toggle.

Scroll Events – Navbar Shrink + Back-to-Top Button The navbar gains a .scrolled class (shrinks) after 50px scroll. A back-to-top button fades in after 300px and smoothly scrolls back using window.scrollTo.

Tech Stack

-HTML5 – Semantic structure -CSS3– Custom properties (variables), Flexbox, Grid, animations -JavaScript (ES6+) – Vanilla JS, no frameworks

Deployment

Deployed via Netlify / GitHub Pages.

Steps to deploy on Netlify:

Push this repository to GitHub
Log in to netlify.com
Click "Add new site" → "Import an existing project"
Select your GitHub repository
Leave build settings blank (static site)
Click Deploy
About the Developer

Alina Ndasilwohenda Martin
3rd-year Computer Science student | IT Technician | Entrepreneur
📧 ndasilwohendaalina@gmail.com
💼 LinkedIn
💻 GitHub

# Final-Potfolio1
