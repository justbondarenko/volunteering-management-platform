# 🌟 Volunteering Management Platform 🌟

A comprehensive web application built with Nuxt 3 for managing volunteer activities and organizations. This platform provides dedicated interfaces for volunteers, organizations, and administrators to streamline coordination and management of volunteer work.

**[📖 User Guide (EN)](./USER_GUIDE.md) | [📖 Посібник користувача (UA)](./USER_GUIDE_UA.md)**

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [✨ Key Features](#-key-features)
- [📄 License](#-license)

---

## 🎯 About The Project

This project is a multi-tenant application designed to serve three distinct roles: Volunteers, Organizations, and Platform Managers. The core goal is to provide a scalable, maintainable, and user-friendly platform for the volunteering ecosystem. Built on Nuxt 3, it leverages server-side rendering for performance and SEO, with a modular architecture that supports future growth.

---

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **⚡️ Framework**: [Nuxt 3](https://nuxt.com/)
- **🎨 UI Framework**: [Vue 3](https://vuejs.org/)
- **🔵 Language**: [TypeScript](https://www.typescriptlang.org/)
- **🧩 UI Components**: [PrimeVue](https://primevue.org/)
- **💨 CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **🏪 State Management**: [Pinia](https://pinia.vuejs.org/)
- **💅 Styling**: [SCSS](https://sass-lang.com/)

---

## 📁 Project Structure

A high-level overview of the project's structure:

```
src/
├── assets/         # Static assets, SCSS files, and themes
├── components/     # Reusable Vue components for various features
├── layouts/        # Layouts for different user roles (e.g., default, manager)
├── pages/          # Application routes and views
├── plugins/        # Nuxt plugins for integrating libraries
├── stores/         # Pinia stores for centralized state management
└── ...             # Other Nuxt 3 directories (composables, middleware, etc.)
```

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have Node.js installed on your machine.
- **Node.js**: `v18.x` or higher

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/volunteering-management-platform.git
    cd volunteering-management-platform
    ```

2.  **Install dependencies:**
    ```bash
    # Recommended
    pnpm install

    # Or with npm
    npm install

    # Or with yarn
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production, run:
```bash
pnpm build
```

To preview the production build locally, run:
```bash
pnpm preview
```

---

## ✨ Key Features

- **🛡️ Role-Based Access Control (RBAC):** Separate, protected routes and layouts for Volunteers, Organizations, and Managers.
- **🔐 Secure Authentication:** A complete authentication system with registration, login, and password recovery flows.
- **🏪 Modular State Management:** Centralized and type-safe state management using Pinia, with dedicated stores for each feature domain.
- **📱 Mobile-First Responsive Design:** A clean and modern UI built with Tailwind CSS that looks great on all devices.
- **💪 Full Type-Safety:** End-to-end type safety with TypeScript, from the backend to the components.
- **🎛️ Centralized Admin Dashboard:** A powerful interface for platform managers to oversee organizations, users, and content.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.