# 💰 MoneyBuddy - AI-Powered Personal Finance App

A complete full-stack personal finance application with AI insights, user authentication, and data synchronization.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Transaction Tracking**: Income and expense management
- **Budget Management**: Set and track spending limits by category
- **AI Insights**: OpenAI-powered financial tips and categorization
- **Data Persistence**: localStorage with MySQL backend support
- **Responsive Design**: Beautiful UI with Shadcn/UI components
- **Real-time Sync**: Data synchronization across devices

## 📁 Project Structure

```
moneybuddy-complete/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # API and utilities
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication middleware
│   │   └── database/       # Database schema and connection
│   └── package.json        # Backend dependencies
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Shadcn/UI** for beautiful components
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **MySQL** database with connection pooling
- **JWT** authentication
- **bcrypt** password hashing
- **OpenAI API** integration

## 🚀 Quick Start

### Frontend Only (localStorage)
```bash
cd frontend
npm install
npm run dev
```
Visit http://localhost:5173

### Full Stack (with MySQL)
1. **Setup MySQL Database:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE moneybuddy;"
   mysql -u root -p moneybuddy < backend/src/database/schema.sql
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
npm install
   npm run dev
   ```

## 🌐 Deployment Options

### Frontend Deployment
- **Vercel** (Recommended) - Zero config, automatic deployments
- **Netlify** - Great for static sites with form handling
- **GitHub Pages** - Free hosting for public repositories
- **Surge.sh** - Simple command-line deployment

### Backend Deployment
- **Railway** - Easy Node.js deployment with database
- **Render** - Free tier with PostgreSQL/MySQL support
- **Heroku** - Classic platform with add-ons
- **DigitalOcean App Platform** - Managed deployment

### Database Options
- **PlanetScale** - Serverless MySQL platform
- **Railway MySQL** - Integrated with hosting
- **AWS RDS** - Managed database service
- **Google Cloud SQL** - Scalable database solution

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_OPENAI_API_KEY=your-openai-key
```

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=moneybuddy
JWT_SECRET=your-jwt-secret
PORT=3001
OPENAI_API_KEY=your-openai-key
FRONTEND_URL=http://localhost:5173
```

## 🔧 Build Commands

### Frontend
```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run build    # Compile TypeScript
npm start        # Run production server
npm run dev      # Development with auto-reload
```

## 📱 Features Overview

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- Persistent login sessions

### Transactions
- Add income and expenses
- Categorize transactions
- AI-powered category suggestions
- Transaction history and filtering

### Budgets
- Set spending limits by category
- Track budget progress
- Visual budget charts
- Budget alerts and notifications

### AI Features
- Smart transaction categorization
- Financial insights and tips
- Spending pattern analysis
- Personalized recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details
4. Contact support

---

**Built with ❤️ using modern web technologies**