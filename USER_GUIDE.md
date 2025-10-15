# 📖 User Guide

---

## 🎯 Application Overview

The Volunteering Management Platform is a comprehensive web application designed to connect volunteers with organizations and their events. It provides dedicated portals for three distinct user roles: Volunteers, Organization Managers, and Platform Managers. This structure streamlines the process of discovering, managing, and participating in volunteering opportunities, ensuring a seamless experience for everyone involved.

---

## 🗺️ Pages Guide

### 🌐 General Pages

| Page | URL Path | Purpose | How to Access |
| :--- | :--- | :--- | :--- |
| 🏠 Homepage | `/` | Displays an overview of the platform, featured events, and general information. | Open the main website URL. |
| 🏢 For Organizations | `/for-organizations` | Provides information for organizations interested in joining the platform. | Click the "For Organizations" link on the homepage. |

### 🧑‍🤝‍🧑 Volunteer Pages

| Page | URL Path | Purpose | How to Access |
| :--- | :--- | :--- | :--- |
| 📝 Signup | `/volunteers/signup` | Allows new volunteers to create an account. | Click the "Sign Up" button in the volunteer section. |
| 🚪 Login | `/volunteers/login` | Allows existing volunteers to log in to their accounts. | Click the "Login" button in the volunteer section. |
| 🤔 Forgot Password | `/volunteers/forgot` | Allows volunteers to initiate the password reset process. | Click the "Forgot Password" link on the login page. |
| 🔑 Reset Password | `/volunteers/reset-password` | Allows volunteers to set a new password using a token. | Click the link received in the password reset email. |
| 👤 Profile | `/volunteers/profile` | Allows volunteers to view and manage their personal information and skills. | After logging in, click on your profile icon in the navigation bar. |
| ✨ Events | `/volunteers/events` | Displays a list of available volunteering events for volunteers to join. | After logging in, navigate to the "Events" section from the dashboard. |
| ⚙️ Settings | `/volunteers/settings` | Allows volunteers to manage their account settings. | Access it through the profile dropdown menu. |

### 🏢 Organization Pages

| Page | URL Path | Purpose | How to Access |
| :--- | :--- | :--- | :--- |
| 📝 Signup | `/organizations/signup` | Allows new organizations to register on the platform. | Click the "Sign Up" button in the organization section. |
| 🚪 Login | `/organizations/login` | Allows existing organizations to log in to their accounts. | Click the "Login" button in the organization section. |
| 🤔 Forgot Password | `/organizations/forgot` | Allows organization users to initiate the password reset process. | Click the "Forgot Password" link on the login page. |
| 🔑 Reset Password | `/organizations/reset-password` | Allows organization users to set a new password using a token. | Click the link received in the password reset email. |
| 👤 Profile | `/organizations/profile` | Allows organizations to manage their profile and contact information. | After logging in, click on the profile icon in the navigation bar. |
| 🏗️ Projects | `/organizations/projects` | Allows organizations to create and manage their volunteering projects. | After logging in, navigate to the "Projects" section. |
| 🧑‍🤝‍🧑 Volunteers | `/organizations/volunteers` | Allows organizations to view and manage volunteers for their projects. | After logging in, navigate to the "Volunteers" section. |
| ✨ Events | `/organizations/events` | Allows organizations to create and manage their events. | After logging in, navigate to the "Events" section. |
| ⚙️ Settings | `/organizations/settings` | Allows organizations to manage their account settings. | Access it through the profile dropdown menu. |

### ⚙️ Manager Pages

| Page | URL Path | Purpose | How to Access |
| :--- | :--- | :--- | :--- |
| 🚪 Login | `/manager/login` | Allows platform managers to log in to the admin dashboard. | Access the manager login page directly. |
| 📊 Dashboard | `/manager` | Provides an overview of platform activity for managers. | Log in through the manager login page. |
| 🏢 Organizations | `/manager/organizations` | Allows managers to view and manage registered organizations. | Navigate to "Organizations" from the manager dashboard. |
| 🏗️ Projects | `/manager/projects` | Allows managers to review and approve projects submitted by organizations. | Navigate to "Projects" from the manager dashboard. |
| 👥 Users | `/manager/users` | Allows managers to view and manage all user accounts. | Navigate to "Users" from the manager dashboard. |
| 🧑‍🤝‍🧑 Volunteers | `/manager/volunteers` | Allows managers to view and manage all volunteer accounts. | Navigate to "Volunteers" from the manager dashboard. |
| ⚙️ Settings | `/manager/settings` | Allows managers to configure platform-wide settings. | Navigate to "Settings" from the manager dashboard. |

---

## 🔑 Test Account Credentials

You can use the following credentials to explore the different roles within the platform:

*   **🧑‍🤝‍🧑 Volunteer Account:**
    *   **Email:** `volunteer@example.com`
    *   **Password:** `password123`

*   **🏢 Organization Account:**
    *   **Email:** `organization@example.com`
    *   **Password:** `password123`

*   **⚙️ Manager Account:**
    *   **Email:** `admin@example.com`
    *   **Password:** `admin123`

---

## 🛠️ Tools Used

This application was built using modern web technologies to ensure a high-quality user experience, maintainability, and cost-effectiveness.

*   **⚡️ Nuxt.js:**
    *   **Development Perspective:** Nuxt.js provides a powerful and structured framework for building Vue.js applications. Its convention-over-configuration approach, modular architecture, and features like server-side rendering (SSR) and automatic routing simplify development, making the codebase easier to maintain and scale. The large ecosystem of modules allows for easy integration of additional functionalities.
    *   **Business Perspective:** The rapid development capabilities of Nuxt.js lead to a faster time-to-market for new features. As an open-source framework with a large talent pool of Vue.js developers, it is a cost-effective choice. The performance benefits of SSR and static generation improve user experience and search engine optimization (SEO), which can lead to higher user engagement and organic traffic.

*   **💨 Tailwind CSS:**
    *   **Development Perspective:** Tailwind CSS is a utility-first CSS framework that allows for rapid UI development without writing custom CSS. This approach enhances maintainability by keeping styles co-located with the markup. Its design system enforces consistency, and its ability to purge unused styles in production leads to smaller, more performant CSS files.
    *   **Business Perspective:** By speeding up the design and development process, Tailwind CSS helps reduce labor costs. It enables rapid prototyping and iteration, allowing the business to respond quickly to market feedback. The framework's utility classes make it easy to enforce brand consistency across the application, ensuring a cohesive and professional look.

*   **🧩 PrimeVue:**
    *   **Development Perspective:** PrimeVue offers a rich library of pre-built, accessible, and customizable UI components. This saves significant development time that would otherwise be spent building complex components from scratch. Its powerful theming system and comprehensive documentation make it easy for developers to create a polished and consistent user interface that aligns with the application's design requirements.
    *   **Business Perspective:** Using a high-quality component library like PrimeVue accelerates the development timeline and reduces costs. It ensures a professional and intuitive user experience, which can lead to higher user satisfaction and retention. Furthermore, its focus on accessibility helps the application meet compliance standards and cater to a broader audience.