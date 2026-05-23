# InternSearch – Internship Search Dashboard

A responsive frontend dashboard for searching internships, built with React, Vite, and Tailwind CSS. The app fetches listings from a live Internshala endpoint and handles keyword search, multi-select filtering, and pagination on the client side. It also includes a local fallback to keep the app working offline if the API request fails.

---

## Features

* **Live Data**: Fetches active internship postings directly from a public endpoint.
* **Offline Fallback**: Automatically switches to a local mock database if the network fails or the API is blocked.
* **Keyword Search**: Quick search by job title, company, skills, or location.
* **Profile Filters**: Select multiple internship categories (e.g., Frontend, Python) using a search dropdown.
* **Criteria Filters**: Filter listings by location (including Remote), duration, and minimum stipend.
* **Dynamic Stats**: Calculates active roles, remote openings, and average stipends dynamically from the active list.
* **Details Modal**: Detailed view for job descriptions, company summaries, and a simulated resume upload form.
* **Dark Mode Toggle Persistence**: Remembers theme preferences across browser sessions using localStorage.
* **Pagination**: Simple client-side pagination for standard listing browsing.

---

## Tech Stack

* **Core**: React 18, Vite, JavaScript (ES6+)
* **Styling**: Tailwind CSS, Lucide React (Icons)
* **Networking**: Axios (HTTP request handler)

---

## Folder Structure

```text
src/
├── components/
│   ├── common/
│   │   ├── ApplicationModal.jsx    # Application form & recommendations
│   │   ├── EmptyState.jsx          # No results view
│   │   ├── Loader.jsx              # Spinner component
│   │   └── ThemeToggle.jsx         # Theme toggle switch
│   ├── filters/
│   │   └── FilterSidebar.jsx       # Sidebar for filters
│   └── internships/
│       ├── InternshipCard.jsx      # Single card view
│       ├── InternshipList.jsx      # List container & pagination
│       ├── SearchBar.jsx           # Search bar component
│       └── StatsGrid.jsx           # Dashboard stats counters
├── context/
│   └── ThemeContext.jsx            # Theme state provider
├── data/
│   └── mockInternships.js          # Fallback mock data
├── pages/
│   └── LandingPage.jsx             # Landing page
├── services/
│   └── internshipService.js        # API service client
├── styles/
│   └── globals.css                 # Styles & custom animations
├── utils/
│   └── filterUtils.js              # Filtering logic helpers
├── App.jsx                         # Main dashboard coordinator
└── main.jsx                        # Mounting entry point
```

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/InternShalaSearch.git
cd InternShalaSearch
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## Production Build

To generate the production build:
```bash
npm run build
```
Vite will compile the code and assets into the `dist/` directory, ready for hosting.

---

## API & Data Handling

The app connects to the live Internshala endpoint:
`https://internshala.com/hiring/search`

To make the data easy to work with on the frontend, `internshipService.js` formats the API response to:
* Standardize stipend ranges, durations, and skills.
* Clean company name annotations (e.g. `Google (Gurgaon, India)` becomes `Google`).
* Normalize location flags (like flagging Work From Home roles).

If the API request fails (offline, rate-limited, or CORS issues), a `try/catch` block loads the local fallback file `src/data/mockInternships.js` instead.

---

## Design Notes

* **Responsive Layout**: Responsive for mobile, tablet, and desktop viewports using standard CSS grids and a sliding mobile filter drawer.
* **Filtering Logic**: Multi-criteria filters are processed client-side using `useMemo` so listings update cleanly when typing or selecting tags.
* **Theme Switch**: Theme switching is handled at the document element level with a CSS transition base to keep colors shifting smoothly.

---

## Future Improvements

* **Bookmarks**: Add localized internship bookmark saving via LocalStorage.
* **Sort Controls**: Toggle sorting by stipend value, posted date, or duration.
* **Saved Preferences**: Allow users to save their ideal profile categories to load matching listings automatically on login.

---

## License

This project is licensed under the MIT License.
