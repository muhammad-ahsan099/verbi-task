# News Frontend Project

## Overview

This is a React frontend application with Typescript that displays news articles with search and modal detail features.

---

## Features

- Shows a list of news articles on the home page
- Search bar to filter news by title
- Click on a news article to open a modal with full details and related news
- Responsive design for desktop and mobile

---

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:
   
```bash
npm run dev
```
Open the app in your browser at http://localhost:5173

## Testing

The application tests are written using modern testing tools and follow best practices:

### Testing Stack
- **Vitest** - Blazing fast test runner
- **React Testing Library** - DOM testing utilities
- **user-event** - Realistic user interaction simulation
- **MSW** (optional) - API mocking

### Test Coverage
Tests verify:
- ✅ Component rendering
- ✅ Search functionality
- ✅ Modal interactions
- ✅ Empty states
- ✅ User flows

### Running Tests
```bash
npx vitest
```
