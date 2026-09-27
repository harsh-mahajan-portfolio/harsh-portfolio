# Harsh's Import & Export — Official Corporate Website

Welcome to the official source code for **Harsh's Import & Export** website. 
This project was developed by **Harsh Mahajan** (B.Tech CSE - AI & Data Science) as a modern, premium, and fully responsive web platform to represent an international import and export enterprise connecting Indian businesses with global trading corridors.

---

## 📁 1. Project Folder Structure

The project is structured with pure, standard web technologies (**HTML5, CSS3, Vanilla JavaScript**)—no complex frameworks, no npm builds, and no dependencies needed.

```text
website/
│
├── index.html           # Main Homepage (Hero, Trust bar, Services, World Map & Trade Routes, Process Timeline, Why Us, FAQ, CTA)
├── about.html           # Dedicated About Us Page (Company story, Mission, Vision, Core Values)
├── services.html        # Comprehensive Services Page (6 Core Services, Sourcing Workflow, Quote Request)
├── contact.html         # Contact & Enquiry Page (Validated Form, Contact Info, Working Hours, FAQs)
│
├── css/
│   └── style.css        # Unified Design System (Navy/Gold palette, CSS variables, Flexbox/Grid, Responsive breakpoints)
│
├── js/
│   └── script.js        # Clean Vanilla JS (Mobile menu, Scroll reveal, FAQ accordion, Form validation, Back-to-top)
│
├── images/              # Folder for photos, logos, product images, and icons
│
└── README.md            # You are reading this! Beginner guide to customize & deploy
```

---

## 🚀 2. How to Run the Website Locally

Since this website is built with pure HTML, CSS, and JavaScript, you don't need to install Node.js, Python, or any packages to run it:

1. **Direct Double-Click**:
   - Open File Explorer on Windows.
   - Navigate to `c:\Users\dell\OneDrive\Desktop\website\`.
   - Double-click `index.html`. It will instantly open in your default browser (Google Chrome, Microsoft Edge, or Firefox).

2. **Using VS Code Live Server (Recommended)**:
   - If you use VS Code, install the extension named **"Live Server"** by *Ritwick Dey*.
   - Right-click on `index.html` and click **"Open with Live Server"**.
   - Any time you save changes to your code, your browser will refresh automatically!

---

## ✏️ 3. Where to Change Company Information

All business details are enclosed in clearly identifiable brackets like `[Company Description]` or `[Placeholder]`.

### Homepage Content (`index.html`)
- **Headline & Tagline**: Look around **lines 60–80** to change the main title and sub-headline.
- **Statistics**: Look around **lines 340–375** inside the `<div class="stats-grid">` to customize your numbers (`17+ Locations`, `24/7 Connectivity`, etc.).

### About Page Content (`about.html`)
- **Company Narrative**: Look around **lines 55–80** to insert your registration details, background story, and milestones.
- **Mission & Vision**: Look around **lines 115–140** to adjust the mission and vision statements.

### Services Details (`services.html`)
- **Service Offerings**: Open `services.html` and look inside `<div class="cards-grid">` (lines 55–160) to modify service descriptions or add specific product categories you deal in.

---

## 🎨 4. Where to Change Colors & Fonts

All colors and visual styles are controlled by **CSS Variables** at the top of `css/style.css` (lines 10–35):

```css
:root {
  /* Brand Colors */
  --primary-navy: #0a192f;        /* Main dark navy background */
  --primary-navy-light: #112240;  /* Card background */
  --accent-gold: #f59e0b;         /* Accent gold highlight */
  --accent-gold-hover: #d97706;   /* Button hover gold */
  
  /* Backgrounds */
  --bg-dark: #070e1c;
  --bg-light: #f8fafc;
  --bg-white: #ffffff;
}
```
> **Tip for beginners**: If you ever want to change the gold accent to emerald green or royal blue, just change `#f59e0b` in `:root` and every button, border, and badge across the entire website will update automatically!

---

## 🖼️ 5. Where to Add Real Images

1. Save your photos (e.g. `shipping-port.jpg`, `harsh-logo.png`) inside the `images/` folder.
2. In your HTML files, reference your images using standard image tags:
   ```html
   <img src="images/shipping-port.jpg" alt="Harsh's Import and Export Sea Cargo" />
   ```

---

## 📞 6. Where to Change Contact Details

Contact information appears on both `contact.html` and in the footer of all pages (`index.html`, `about.html`, `services.html`, `contact.html`):

1. **Email, Phone & Address in `contact.html`**:
   - Look around **lines 55–110** inside `<div class="contact-info-card">`.
   - Replace `[contact@harshimportexport.com]` with your real email.
   - Replace `[+91 98765 43210]` with your real phone number.
   - Replace `[Commercial Complex, City, State, India]` with your office address.

2. **Footer Links**:
   - Check the `<footer>` section at the bottom of each page to update your LinkedIn, Instagram, Facebook, and WhatsApp links.

---

## 🌐 7. How to Deploy to GitHub Pages (Free Hosting)

You can host this website completely free using **GitHub Pages** with your own URL (e.g., `harshmahajan.github.io/website`):

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name it `harsh-import-export` (or `website`).
   - Set it to **Public**.

2. **Upload Your Files**:
   - Upload all files (`index.html`, `about.html`, `services.html`, `contact.html`, `css/`, `js/`, `images/`, `README.md`) to the repository.
   - Commit and push your files to the `main` branch.

3. **Enable GitHub Pages**:
   - In your repository, click **Settings** (gear icon on the top tab).
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
   - Wait 1–2 minutes. GitHub will give you a live link to your website!

---

## 💡 8. Key Technologies Used
- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`) for high SEO rankings and accessibility.
- **CSS3**: Modern Flexbox, CSS Grid, custom properties (CSS variables), and smooth cubic-bezier transitions.
- **Vanilla JavaScript**: Mobile hamburger drawer, IntersectionObserver scroll reveal, interactive FAQ accordion, frontend form validation, and animated SVG trade paths.
- **Google Fonts**: *Outfit* & *Plus Jakarta Sans*.

---
© 2026 Harsh's Import & Export. Developed by Harsh Mahajan.
