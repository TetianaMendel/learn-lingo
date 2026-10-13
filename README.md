# LearnLingo

LearnLingo is a web application that helps users find language tutors based on their preferences. Users can browse teacher profiles, filter tutors, save favorites, and book trial lessons.

The project is built with Next.js, React, TypeScript, and Firebase.

## Features

- **Teacher Catalog:** Browse available language tutors with detailed profiles.
- **Filtering:** Filter teachers by language, knowledge level, and hourly price.
- **Pagination:** Load additional teachers using the "Load more" button.
- **Teacher Details:** Expand teacher cards to view additional information and student reviews.
- **Authentication:** Register, log in, and log out using Firebase Authentication.
- **Favorites:** Add or remove teachers from a personal favorites list. Favorites are saved for each authenticated user.
- **Trial Lessons:** Open a booking form to request a trial lesson.
- **Form Validation:** Validate authentication and booking forms using React Hook Form and Yup.
- **Responsive Design:** Adapt the interface to mobile, tablet, and desktop screens.
- **Loading and Error States:** Display loading indicators and error messages during asynchronous operations.

## Technologies

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- Firebase Authentication
- Firebase Realtime Database
- TanStack Query
- Zustand
- React Hook Form
- Yup
- React Icons
- React Hot Toast

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TetianaMendel/learn-lingo.git
cd learn-lingo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env.local` file in the project root and configure the Firebase environment variables required by `lib/firebase.ts`.

You will need a Firebase project with Authentication and Realtime Database enabled, as well as appropriate database security rules.

Do not commit `.env.local` or private credentials to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/             # Pages, layouts, and route-level error handling
components/      # Reusable UI components
lib/             # Firebase configuration and data access
types/           # TypeScript types
public/images/   # Static images and assets
```

## Data Management

Teacher information is stored in Firebase Realtime Database.

TanStack Query manages teacher data fetching, caching, and pagination through `useInfiniteQuery`.

Firebase Authentication manages user sessions, while Zustand is used for client-side application state.

## Deployment

The application is intended to be deployed on Vercel.

Firebase environment variables must be configured in the deployment settings before publishing the application.

## Repository

[GitHub — LearnLingo](https://github.com/TetianaMendel/learn-lingo)

## Author

[Tetiana Mendel](https://github.com/TetianaMendel)
