# CodeLeap Network

A social network application built as part of the [CodeLeap](https://codeleap.co.uk/) frontend coding test. Users can create, read, update and delete posts in a shared feed — powered by the CodeLeap public API.

## Live Demo

> _Deploy link here_

---

## Features

### Core
- **Sign up** — username stored in `localStorage`, no backend required
- **Create posts** — form with title and content, submit button disabled when fields are empty
- **Read posts** — fetches the shared public feed sorted by most recent
- **Edit posts** — edit modal pre-filled with existing content (own posts only)
- **Delete posts** — confirmation modal before deleting (own posts only)

### Bonus
- **Infinite scroll** — loads 10 posts at a time using IntersectionObserver
- **Search** — real-time filter by title, author or content
- **Likes** — heart toggle persisted in `localStorage`
- **Logout** — clears session and returns to sign up screen
- **Animations** — cards fade in on load, modals open with scale transition
- **Responsive** — mobile-friendly layout

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vite.dev/) | Build tool |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [TanStack Query v5](https://tanstack.com/query) | Server state (useInfiniteQuery, useMutation) |

---

## Architecture

The project follows **SOLID** principles and **Clean Code** practices:

```
src/
├── constants/        # Magic-free: API URL, page size, storage keys, query keys
├── types/            # Post and PostsPage interfaces (separated from logic)
├── services/
│   ├── http.ts       # Generic HTTP client (DIP — depend on abstraction)
│   └── posts.service.ts  # Posts API operations (SRP)
├── hooks/
│   ├── usePosts.ts           # Infinite query + mutations
│   ├── useLikes.ts           # localStorage like state
│   └── useIntersectionObserver.ts  # Infinite scroll trigger
└── components/
    ├── icons/        # SVG icons as isolated components (DRY)
    ├── FormField.tsx # Reusable label+input wrapper (DRY)
    ├── Modal.tsx     # Shared modal wrapper
    ├── Header.tsx
    ├── SignupModal.tsx
    ├── CreatePost.tsx
    ├── PostCard.tsx
    ├── DeleteModal.tsx
    └── EditModal.tsx
```

**Key design decisions:**
- `http.ts` is a generic fetch abstraction — the service layer never calls `fetch` directly, making it easy to extend (add auth headers, retry logic) or mock in tests
- All string/number constants live in `constants/index.ts` — zero magic values in component code
- Icons are components, not inline SVGs — single source of truth, consistent sizing

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## API

Integrates with the CodeLeap public test API:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/careers/?limit=10&offset=0` | Paginated list of posts |
| `POST` | `/careers/` | Create a new post |
| `PATCH` | `/careers/{id}/` | Update title and content |
| `DELETE` | `/careers/{id}/` | Delete a post |

Base URL: `https://dev.codeleap.co.uk/careers/`

> Note: all posts are shared publicly with other applicants.
