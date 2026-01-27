# Activity Project

A full-stack web application for user and activity management using simple Next.js, Tailwind CSS, and Supabase.

## Tech Stack

-   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
-   **Backend**: Supabase (PostgreSQL, Auth)

## Prerequisites

-   Node.js (v18+)
-   npm or yarn
-   Supabase Project

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in `.env.local`:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Database Schema

The database consists of two main tables:

-   `profiles`: Stores user information (synced with Supabase Auth).
-   `activities`: Stores activity details linked to users.

## Features

-   **Authentication**: Sign up and login with email/password.
-   **Dashboard**: View and manage your activities.
-   **Activities**:
    -   Create, read, update, and delete activities.
    -   Status tracking (pending, completed, cancelled).
-   **Admin**:
    -   Manage users (change roles, delete users).
    -   View all users.

## Security

-   RLS (Row Level Security) is enabled on all tables.
-   Users can only access their own data.
-   Admins can access all data.
