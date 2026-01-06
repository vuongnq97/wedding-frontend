# Trăm Năm - Wedding Invitation Platform

**Trăm Năm** ("Hundred Years") is a modern, elegant web platform that allows couples to create, customize, and share their digital wedding invitations. Built with performance and user experience in mind, it features a responsive design, real-time preview editing, and multilingual support.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router
│   ├── [locale]/         # Internationalized routes
│   │   ├── (main)/       # Main layout (Landing, Login, Dashboard)
│   │   └── (standalone)/ # Standalone layout (Editor, Public Invitation)
├── components/           # Reusable UI components
│   ├── ui/               # Base UI elements (Button, Input, etc.)
│   ├── invitation/       # Invitation-specific components
│   └── ...
├── hooks/                # Custom React hooks
├── i18n/                 # Localization files (en, vi)
├── lib/                  # Utility libraries
├── services/             # API service layer
├── stores/               # Zustand state stores (Auth, Invitation)
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Yarn or NPM

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd wedding-frontend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory (refer to `.env.example` if available) and configure your API endpoints.
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com/api
   ```

4. **Run the development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Key Features

- **Multilingual Support**: Seamless switching between English and Vietnamese.
- **Authentication**: Secure OTP-based login and registration.
- **Interactive Editor**: Real-time previews while customizing invitation details.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.
- **Asset Management**: Image and music uploads for personalization.
- **Guest Management**: RSVP tracking and guestbook functionality.
- **Template System**: Choose from various beautiful templates.
- **And more...**

## 📦 Scripts

- `yarn dev`: Start the development server.
- `yarn build`: Build the application for production.
- `yarn start`: Start the production server.
- `yarn lint`: Run ESLint checks.
- `yarn format`: Format code with Prettier.

## 📄 License

This project is licensed under the MIT License.
