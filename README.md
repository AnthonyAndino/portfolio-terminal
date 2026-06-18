# 💻 Terminal Portfolio

An interactive, terminal-themed portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. It simulates a fully functional desktop terminal environment in the browser.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)

---

## ✨ Features

- **Fully interactive terminal** — run commands like `help`, `whoami`, `ls`, `projects`, `contact`, and more
- **Boot animation** — realistic boot sequence with loading progress bars
- **Built-in Dino Game** — play the Chrome dinosaur game directly in the terminal (`dino`)
- **System Fetch** — displays system info with `neofetch` or `screenfetch`
- **Equalizer visualizer** — animated audio bars in the status bar
- **File tree** — browse projects with a tree-like structure (`tree`)
- **Clock widgets** — analog (`BigClock`) and digital clock displays
- **Draggable, resizable panels** — powered by `react-resizable-panels`
- **Background effects** — animated gradient background
- **Contact form** — send emails via EmailJS (`email` / `contact`)
- **Status bar** — shows date, time, system info, and equalizer
- **Responsive design** — works on desktop and mobile

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/AnthonyAndino/portfolio-terminal.git

# Navigate to the project directory
cd portfolio-terminal

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `whoami` | Display my info |
| `ls` | List projects |
| `tree` | Show project file tree |
| `neofetch` / `screenfetch` | Display system info |
| `projects` | List projects |
| `contact` / `email` | Open contact form |
| `dino` | Play the Chrome Dino Game |
| `clear` | Clear terminal |
| `about` | About this project |
| `date` | Show current date |
| `uptime` | Show session uptime |
| `echo` | Repeat a message |
| `banner` | Show the ASCII banner |

---

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[React 19](https://react.dev/)** — UI library
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Lucide React](https://lucide.dev/)** — Icons
- **[React Icons](https://react-icons.github.io/react-icons/)** — Icon library
- **[EmailJS](https://www.emailjs.com/)** — Email service
- **[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)** — Resizable panel layout

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── Background.tsx    # Animated gradient background
│   ├── BigClock.tsx      # Analog clock widget
│   ├── BootAnimation.tsx # Boot sequence animation
│   ├── DigitalClock.tsx  # Digital clock widget
│   ├── dino-sprites.ts   # Dino game sprites & assets
│   ├── DinoGame.tsx      # Chrome Dino Game clone
│   ├── Equalizer.tsx     # Audio equalizer bars
│   ├── FileTree.tsx      # File tree explorer
│   ├── panel-views.tsx   # Resizable panel views
│   ├── RightPanel.tsx    # Right panel container
│   ├── StatusBar.tsx     # Bottom status bar
│   ├── SystemFetch.tsx   # Neofetch/screenfetch display
│   ├── tech-icons.tsx    # Technology icons
│   └── Terminal.tsx      # Main terminal emulator
├── data/                 # Data files
├── lib/                  # Utility functions
└── public/               # Static assets
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Anthony Andino** — [GitHub](https://github.com/AnthonyAndino)
