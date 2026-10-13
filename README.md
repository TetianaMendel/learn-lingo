# LearnLingo

LearnLingo is a responsive web application for finding language tutors. Users can explore teacher profiles, filter tutors by their preferences, add teachers to favorites, and book trial lessons.

The application is built with Next.js, React, TypeScript, and Firebase.

## Live Demo

**Website:** [LearnLingo](https://learn-lingo-rho-cyan.vercel.app/)

**GitHub Repository:** [LearnLingo GitHub](https://github.com/TetianaMendel/learn-lingo)

**Figma Design:** [LearnLingo Mockup](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/Пет-проєкт-для-КЦ?type=design&node-id=0-1&mode=design)

## Features

- Browse language tutors and view their profiles.
- Filter teachers by language, knowledge level, and hourly price.
- Load additional teachers using the **Load more** button.
- Expand teacher cards to view detailed information and student reviews.
- Register, log in, and log out using Firebase Authentication.
- Add and remove teachers from Favorites.
- Preserve favorite teachers after page reloads.
- Access a private Favorites page.
- Open a trial lesson booking modal with form validation.
- Responsive design for mobile, tablet, and desktop devices.
- Loading indicators, error handling, and toast notifications.

## Technologies

- **Next.js 16** — React framework with App Router.
- **React 19** — building the user interface.
- **TypeScript** — static typing.
- **CSS Modules** — component-based styling.
- **Firebase Authentication** — user authentication.
- **Firebase Realtime Database** — teacher data storage.
- **TanStack Query** — asynchronous data fetching, caching, and pagination.
- **Zustand** — client-side state management.
- **React Hook Form** — form handling.
- **Yup** — form validation.
- **React Icons** — interface icons.
- **React Hot Toast** — user notifications.
- **Vercel** — deployment and hosting.

## Design

The application was developed based on the provided Figma mockup.

**Design Link:** [Figma — LearnLingo](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/Пет-проєкт-для-КЦ?type=design&node-id=0-1&mode=design)

The interface follows a mobile-first approach and is adapted for different screen sizes.

## Technical Requirements

### Home Page

- Display the company's advantages and statistics.
- Provide a **Get started** button that navigates to the Teachers page.

### Teachers Page

- Display a list of language tutors with essential information.
- Initially load four teachers from Firebase Realtime Database.
- Load additional teachers using the **Load more** button.
- Filter teachers by language, knowledge level, and hourly price.
- Expand teacher cards to display additional details and reviews.
- Allow users to add or remove teachers from Favorites.
- Open a modal for booking a trial lesson.

### Favorites Page

- Display teachers added to the user's favorites list.
- Restrict access to authenticated users.
- Preserve favorites after refreshing the page.
- Allow users to remove teachers from Favorites.

### Authentication

- Implement registration, login, and logout using Firebase Authentication.
- Validate authentication forms using React Hook Form and Yup.
- Display notifications for relevant user actions.
- Restrict private functionality to authenticated users.

### Modal Windows

- Implement authentication and trial lesson booking modals.
- Close modals using the close button, backdrop, or Escape key.
- Validate
