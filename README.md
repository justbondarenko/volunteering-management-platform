# Volunteering Management Platform

A comprehensive web application built with Nuxt 3 for managing volunteer activities and organizations. The platform provides separate interfaces for volunteers, organizations, and administrators to coordinate volunteer work effectively.

## 🚀 Features

- **Multi-role System**: Separate interfaces for volunteers, organizations, and administrators
- **User Authentication**: Secure login, registration, and password management
- **Profile Management**: Comprehensive user and organization profiles
- **Admin Dashboard**: Centralized management of users and organizations
- **Responsive Design**: Mobile-first approach with modern UI components
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **UI Components**: PrimeVue, Tailwind CSS
- **State Management**: Pinia
- **Icons**: FontAwesome
- **Styling**: SCSS with Tailwind CSS utilities

## 📁 Project Structure

```
src/
├── components/         # Reusable Vue components
├── layouts/            # Page layouts for different user roles
├── pages/              # Application routes and pages
├── stores/             # Pinia state management
├── plugins/            # Nuxt plugins
└── assets/             # Static assets and styles
```

## 🌐 Pages Structure & Functionality

### Public Pages

#### `/` - Homepage
- **Layout**: `default`
- **Components**: HomepageCarousel, EventsFeed, HowItWorks, ContactUs
- **Functionality**: Landing page with carousel, events feed, how-it-works section, and contact form

#### `/for-organizations` - Organization Information
- **Layout**: `default`
- **Functionality**: Information page for organizations about the platform (currently minimal content)

### Manager Pages (`/manager/*`)
*Administrative interface for platform management*

#### `/manager/login` - Manager Login
- **Layout**: `manager`
- **Functionality**: Secure authentication for platform administrators
- **Features**: Email/password login with validation

#### `/manager/dashboard` - Admin Dashboard
- **Layout**: `manager`
- **Functionality**: Centralized overview of platform statistics
- **Features**:
  - Organization statistics (total, active, pending, suspended)
  - Volunteer statistics (total, active, inactive)
  - Quick navigation to detailed management pages
  - Status cards with visual indicators

#### `/manager/organizations` - Organizations Management
- **Layout**: `manager`
- **Functionality**: Comprehensive management of all registered organizations
- **Features**:
  - View all organizations in a table format
  - Filter and search organizations
  - View organization details
  - Manage organization status (approve, suspend, etc.)

#### `/manager/volunteers` - Volunteers Management
- **Layout**: `manager`
- **Functionality**: Management of all registered volunteers
- **Features**:
  - View all volunteers in a table format
  - Filter and search volunteers
  - View volunteer details
  - Manage volunteer accounts

### Organization Pages (`/organizations/*`)
*Interface for nonprofit organizations and companies*

#### `/organizations/signup` - Organization Registration
- **Layout**: `default`
- **Functionality**: Complete organization registration process
- **Features**:
  - Organization name and legal entity information
  - Address details (country, city, address line, zip code)
  - Contact information (email, phone)
  - Password creation with confirmation
  - Terms and conditions acceptance
  - Form validation and error handling

#### `/organizations/login` - Organization Login
- **Layout**: `default`
- **Functionality**: Secure authentication for organizations
- **Features**: Email/password login with validation

#### `/organizations/profile` - Organization Profile
- **Layout**: `organization`
- **Functionality**: Comprehensive organization profile management
- **Features**:
  - View and edit organization information
  - Manage contact details
  - Update address information
  - Profile picture management

#### `/organizations/events` - Organization Events
- **Layout**: `organization`
- **Functionality**: List organization's events and create new ones
- **Features**:
  - Paginated table of events with date, location, status
  - Quick stats per event: assigned vs needed volunteers
  - Create-event dialog with validation (title, date/time, location, description, volunteers needed, status)
  - Server-ready structure (mocked for now) for future API integration

#### `/organizations/forgot` - Password Recovery
- **Layout**: `default`
- **Functionality**: Password reset request process
- **Features**: Email-based password recovery

#### `/organizations/reset-password` - Password Reset
- **Layout**: `default`
- **Functionality**: Set new password after recovery
- **Features**: Secure password reset with validation

### Volunteer Pages (`/volunteers/*`)
*Interface for individual volunteers*

#### `/volunteers/signup` - Volunteer Registration
- **Layout**: `default`
- **Functionality**: Individual volunteer registration
- **Features**:
  - Email and password creation
  - Password confirmation
  - Terms and conditions acceptance
  - Form validation and error handling

#### `/volunteers/login` - Volunteer Login
- **Layout**: `default`
- **Functionality**: Secure authentication for volunteers
- **Features**: Email/password login with validation

#### `/volunteers/profile` - Volunteer Profile
- **Layout**: `volunteer`
- **Functionality**: Personal volunteer profile management
- **Features**:
  - View and edit personal information
  - Manage contact details
  - Profile picture management
  - Volunteer preferences and skills

#### `/volunteers/events` - Browse and Apply to Events
- **Layout**: `volunteer`
- **Functionality**: Discover events and submit applications
- **Features**:
  - Filters: search, city, status, date range
  - Grid view with status tags and short descriptions
  - Apply action with validation and feedback
  - Shows capacity: assigned vs needed volunteers

#### `/volunteers/forgot` - Password Recovery
- **Layout**: `default`
- **Functionality**: Password reset request process
- **Features**: Email-based password recovery

#### `/volunteers/reset-password` - Password Reset
- **Layout**: `default`
- **Functionality**: Set new password after recovery
- **Features**: Secure password reset with validation

## 🎨 Layouts

- **`default`**: Standard layout for public pages
- **`manager`**: Administrative interface layout
- **`organization`**: Organization-specific layout
- **`volunteer`**: Volunteer-specific layout

## 🔐 Authentication Flow

1. **Registration**: Users can register as either volunteers or organizations
2. **Login**: Secure authentication with email/password
3. **Password Recovery**: Email-based password reset system
4. **Role-based Access**: Different layouts and permissions based on user type

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd volunteering-management-platform
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 Responsive Design

The platform is built with a mobile-first approach using Tailwind CSS, ensuring optimal user experience across all device sizes.

## 🔧 Development

- **TypeScript**: Full type safety throughout the application
- **Vue 3 Composition API**: Modern Vue.js development patterns
- **Nuxt 3**: Server-side rendering and auto-imports
- **PrimeVue**: Rich UI component library
- **Pinia**: State management with TypeScript support

## 📄 License

This project is licensed under the terms specified in the LICENSE file.
