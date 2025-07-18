# Microfrontend Architecture

A modern microfrontend application built with Webpack Module Federation, featuring independent deployable applications that work together seamlessly.

## 🏗️ Architecture Overview

This project demonstrates a microfrontend architecture with the following applications:

- **Container** (Port 8080) - Main host application and orchestrator
- **Marketing** (Port 8081) - Landing page and pricing (React)
- **Auth** (Port 8082) - Authentication system (React + Material-UI)
- **Dashboard** (Port 8083) - User dashboard (Vue.js + PrimeVue)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microfrontend-app
   ```

2. **Install dependencies for all packages**
   ```bash
   # Install dependencies for each microfrontend
   cd packages/container && npm install
   cd ../marketing && npm install
   cd ../auth && npm install
   cd ../dashboard && npm install
   ```

3. **Start all applications in development mode**
   
   Open 4 separate terminal windows/tabs:

   ```bash
   # Terminal 1 - Container (Main App)
   cd packages/container
   npm start
   # Runs on http://localhost:8080

   # Terminal 2 - Marketing
   cd packages/marketing
   npm start
   # Runs on http://localhost:8081

   # Terminal 3 - Auth
   cd packages/auth
   npm start
   # Runs on http://localhost:8082

   # Terminal 4 - Dashboard
   cd packages/dashboard
   npm start
   # Runs on http://localhost:8083
   ```

4. **Access the application**
   - Main Application: http://localhost:8080
   - Individual microfrontends can be accessed on their respective ports for development

## 📁 Project Structure

```
packages/
├── container/          # Main orchestrator application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthApp.js      # Auth microfrontend wrapper
│   │   │   ├── MarketingApp.js # Marketing microfrontend wrapper
│   │   │   ├── DashboardApp.js # Dashboard microfrontend wrapper
│   │   │   └── Header.js       # Shared navigation
│   │   └── App.js
│   └── config/
│       ├── webpack.common.js
│       ├── webpack.dev.js
│       └── webpack.prod.js
│
├── marketing/          # Landing page and pricing
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.js
│   │   │   └── Pricing.js
│   │   └── App.js
│   └── config/
│
├── auth/              # Authentication system
│   ├── src/
│   │   ├── components/
│   │   │   ├── Signin.js
│   │   │   └── Signup.js
│   │   └── App.js
│   └── config/
│
└── dashboard/         # User dashboard (Vue.js)
    ├── src/
    │   └── components/
    │       └── Dashboard.vue
    └── config/
```

## 🔧 Technology Stack

### Container Application
- **Framework**: React 19
- **Routing**: React Router v6
- **UI Library**: Material-UI v5
- **Bundler**: Webpack 5 with Module Federation

### Marketing Application
- **Framework**: React 19
- **UI Library**: Material-UI v4
- **Routing**: React Router v5
- **Styling**: CSS-in-JS with Material-UI

### Auth Application
- **Framework**: React 19
- **UI Library**: Material-UI v5
- **Routing**: React Router v6
- **Features**: Sign In/Sign Up forms

### Dashboard Application
- **Framework**: Vue.js 3
- **UI Library**: PrimeVue v3
- **Charts**: Chart.js
- **Styling**: PrimeFlex + Custom SCSS

## 🔄 Module Federation Configuration

Each microfrontend exposes specific modules:

- **Marketing**: `./MarketingApp` → Landing and Pricing pages
- **Auth**: `./AuthApp` → Authentication components
- **Dashboard**: `./DashboardApp` → Dashboard interface

### Shared Dependencies

All applications share these dependencies to avoid duplication:
- React & React DOM (singletons)
- React Router DOM
- Material-UI packages

## 🌐 Routing Strategy

- **Container**: Browser routing for main navigation
- **Marketing**: Memory routing for internal navigation
- **Auth**: Memory routing with signin/signup routes
- **Dashboard**: Single-page Vue application

### Route Structure
```
/                    → Marketing (Landing page)
/pricing            → Marketing (Pricing page)
/auth/signin        → Auth (Sign in form)
/auth/signup        → Auth (Sign up form)
/dashboard          → Dashboard (Protected route)
```

## 🔐 Authentication Flow

1. User accesses auth routes (`/auth/signin`, `/auth/signup`)
2. Auth microfrontend handles form submission
3. On successful authentication, `onSignIn` callback is triggered
4. Container app updates global auth state
5. User is redirected to `/dashboard`
6. Dashboard microfrontend is loaded for authenticated users

## 🚀 Production Deployment

### Build for Production

```bash
# Build all applications
cd packages/container && npm run build
cd ../marketing && npm run build
cd ../auth && npm run build
cd ../dashboard && npm run build
```

### AWS S3 & CloudFront Deployment

This application is deployed using AWS S3 for static hosting and CloudFront for global content delivery.

**Live Application**: https://d3birx35mjm2qc.cloudfront.net/

### Environment Variables

Set the `PRODUCTION_DOMAIN` environment variable for production builds:

```bash
export PRODUCTION_DOMAIN=https://d3birx35mjm2qc.cloudfront.net
```

### Production URLs

- Container: `/container/latest/`
- Marketing: `/marketing/latest/`
- Auth: `/auth/latest/`
- Dashboard: `/dashboard/latest/`

### Deployment Process

1. **Build all microfrontends** for production
2. **Upload to S3** buckets (separate bucket per microfrontend recommended)
3. **Configure CloudFront** distribution for global CDN
4. **Update DNS** to point to CloudFront distribution

## 🔧 Development Tips

### Running Individual Microfrontends

Each microfrontend can run independently for development:

```bash
# Run only marketing
cd packages/marketing && npm start

# Run only auth
cd packages/auth && npm start

# Run only dashboard
cd packages/dashboard && npm start
```

### Adding New Microfrontends

1. Create new package directory
2. Set up Webpack Module Federation configuration
3. Expose necessary modules
4. Add remote configuration to container
5. Create wrapper component in container

### Debugging

- Use browser dev tools to inspect Module Federation loading
- Check network tab for remote entry files
- Ensure all microfrontends are running when developing container

## 📋 Available Scripts

Each package supports:

- `npm start` - Start development server
- `npm run build` - Build for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes to specific microfrontend
4. Test integration with container
5. Submit pull request

## 📝 Notes

- Each microfrontend maintains its own dependencies and can be deployed independently
- Shared dependencies are managed through Module Federation to optimize bundle size
- The container app handles routing coordination and global state management
- Authentication state is managed at the container level and passed down to microfrontends

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all microfrontends are running
2. **CORS issues**: Check dev server configurations
3. **Version conflicts**: Verify shared dependency versions match
4. **Routing conflicts**: Check memory vs browser history configuration

### Getting Help

- Check webpack dev server logs for Module Federation errors
- Ensure all applications are running on correct ports
- Verify remote URLs in webpack configurations match running services