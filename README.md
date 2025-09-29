# 🚀 Portfolio Website

A modern and responsive personal portfolio website built with React and Tailwind CSS. This project showcases my skills, projects, and experiences in a visually appealing and interactive way.

## ✨ Key Features

- **Responsive Design:** Adapts seamlessly to different screen sizes, ensuring a consistent experience across devices.
- **Interactive UI:** Engaging user interface with smooth animations and transitions using `motion/react` and GSAP.
- **Project Showcase:** Highlights my projects with detailed descriptions, technologies used, and live demos.
- **Experience Timeline:** Presents my professional experience in a clear and chronological timeline.
- **Contact Form:** Allows visitors to easily send me messages via email using EmailJS.
- **Particle Background:** A visually appealing particle background effect using a custom `Particles` component.
- **Animated Image Preview:** A mouse-following image preview in the Projects section.
- **3D Globe Visualization:** An interactive 3D globe in the About Me section.

## 🛠️ Tech Stack

- **Frontend:**
    - React
    - Tailwind CSS
    - JavaScript (ES6+)
    - HTML
    - CSS
- **UI Libraries & Frameworks:**
    - `motion/react` (Framer Motion): For animations and transitions.
    - `@react-three/fiber`: A React renderer for Three.js.
    - `@react-three/drei`: Helpers and abstractions for React Three Fiber.
    - `react-responsive`: For media query handling.
    - `react-syntax-highlighter`: For syntax highlighting.
    - `react-type-animation`: For typing animations.
    - `tailwind-merge`: Utility for merging Tailwind CSS class names.
    - `@gsap/react`: For using GSAP (GreenSock Animation Platform) with React.
- **3D Libraries:**
    - `three`: The Three.js library.
    - `cobe`: A library for creating interactive 3D globes.
    - `maath`: Math utilities.
- **Email:**
    - `@emailjs/browser`: For sending emails from the browser.
- **Build Tools:**
    - Vite
- **Code Quality:**
    - ESLint
- **Other:**
    - `@tailwindcss/vite`: Vite plugin for Tailwind CSS.
    - `@types/three`: TypeScript definitions for Three.js.

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173`).

## 💻 Project Structure

```
📂 portfolio-website
├── 📂 src
│   ├── 📂 components
│   │   ├── Alert.jsx
│   │   ├── Card.jsx
│   │   ├── CopyEmailButton.jsx
│   │   ├── FrameWorks.jsx
│   │   ├── globe.jsx
│   │   ├── ParallaxBackground.jsx
│   │   ├── CustomBackground.jsx
│   │   ├── Project.jsx
│   │   └── Timeline.jsx
│   ├── 📂 constants
│   │   └── index.js
│   ├── 📂 sections
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experiences.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
├── package.json
├── README.md
└── index.html
```

## 📸 Screenshots



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [lunaworku@gmail.com]

## 💖 Thanks

Thank you for checking out my portfolio website! I hope you find it informative and visually appealing.
