# Employee Hierarchy Chart Application

A modern React-based Employee Hierarchy Visualization Application that displays the organizational structure of a company with authentication, search functionality, and theme management.

## 🚀 Features

### Core Functionality
- **Authentication System**: Custom `useAuth` hook with login/logout functionality
- **Employee Hierarchy**: Interactive tree view showing organizational structure
- **Search & Filter**: Search by name, role, and department with real-time filtering
- **Theme Management**: Dark/light mode toggle with cookie persistence
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)

### Technical Features
- **Redux Toolkit**: Global state management for auth, employees, and theme
- **TypeScript**: Full type safety throughout the application
- **Material-UI**: Professional UI components with custom theming
- **Tailwind CSS**: Utility-first styling with dark mode support
- **React Router**: Protected routes and navigation
- **Memoization**: Optimized performance with React.memo
- **Custom Hooks**: Reusable authentication logic

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Material-UI
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── common/          # Generic components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── employee/        # Employee-specific components
│   │   ├── EmployeeCard.tsx
│   │   ├── EmployeeTree.tsx
│   │   └── SearchBar.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       └── Dashboard.tsx
├── hooks/               # Custom hooks
│   └── useAuth.ts
├── store/               # Redux store and slices
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── employeeSlice.ts
│       └── themeSlice.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── index.ts
├── constants/           # App constants
│   └── index.ts
├── data/                # JSON data files
│   ├── employees.json
│   └── users.json
└── styles/              # Global styles
    └── globals.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm (v11.1.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee_hierarchy_chart_application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

The application includes a demo authentication system with the following credentials:

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | Administrator |
| johndoe  | password123 | Manager |
| janedoe  | password123 | Employee |

## 📊 Data Structure

### Employee Data (`src/data/employees.json`)
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "role": "CEO",
  "department": "Executive",
  "managerId": null
}
```

### User Data (`src/data/users.json`)
```json
{
  "id": 1,
  "username": "admin",
  "password": "admin123",
  "name": "System Admin",
  "role": "Administrator"
}
```

## 🎨 Features Implementation

### 1. Authentication System
- **Location**: `src/hooks/useAuth.ts`, `src/store/slices/authSlice.ts`
- **Features**: Login/logout, session persistence, error handling
- **Demo**: Custom hook with Redux integration

### 2. Employee Hierarchy
- **Location**: `src/components/employee/EmployeeTree.tsx`
- **Features**: Tree structure, expand/collapse, hierarchical display
- **Demo**: Dynamic tree building from flat employee data

### 3. Search & Filter
- **Location**: `src/components/employee/SearchBar.tsx`
- **Features**: Name search, role filter, department filter, debounced input
- **Demo**: Real-time filtering with multiple criteria

### 4. Theme Management
- **Location**: `src/store/slices/themeSlice.ts`, `src/components/layout/Header.tsx`
- **Features**: Dark/light mode, cookie persistence, system preference
- **Demo**: Global theme state with Redux

### 5. Responsive Design
- **Location**: `src/styles/globals.css`, Tailwind classes throughout
- **Features**: Mobile-first design, breakpoint optimization
- **Demo**: Responsive layout for all screen sizes

### 6. Performance Optimization
- **Location**: `src/components/employee/EmployeeCard.tsx`
- **Features**: React.memo, memoized components, optimized re-renders
- **Demo**: Pure components with memoization

## 🎯 Technical Requirements Demonstrated

### React Hooks
- ✅ `useState` - Component state management
- ✅ `useEffect` - Side effects and lifecycle
- ✅ `useContext` - Theme context (via Redux)
- ✅ `useRef` - DOM references for scrolling
- ✅ Custom hooks - `useAuth` hook

### State Management
- ✅ Redux Toolkit - Global state management
- ✅ Async operations - API simulation with thunks
- ✅ Immutable updates - Redux reducers

### Performance
- ✅ React.memo - Memoized employee cards
- ✅ Debounced search - Optimized user input
- ✅ Lazy loading - Component optimization

### Styling
- ✅ Tailwind CSS - Utility-first styling
- ✅ Material-UI - Professional components
- ✅ Dark mode - Theme switching
- ✅ Responsive design - Mobile-first approach

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Small**: 640px - 768px
- **Medium**: 768px - 1024px
- **Large**: 1024px - 1280px
- **Extra Large**: > 1280px

## 🎨 Theme Customization

The application supports both light and dark themes with:
- Automatic system preference detection
- Manual theme toggle
- Cookie-based persistence
- Smooth transitions between themes

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

### Recommended Hosting Services
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- Tailwind CSS for the utility-first styling
- Redux Toolkit for state management
- React team for the amazing framework

---

**Note**: This is a demo application for educational purposes. In a production environment, implement proper security measures, API integration, and data validation.