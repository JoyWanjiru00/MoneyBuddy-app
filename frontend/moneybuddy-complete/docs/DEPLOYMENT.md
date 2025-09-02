# 🚀 Deployment Guide

Complete guide for deploying MoneyBuddy to various platforms.

## 🌟 Recommended Deployment Stack

### **Option 1: Vercel + Railway (Best for beginners)**
- **Frontend**: Vercel (Free tier available)
- **Backend**: Railway (Free tier available)
- **Database**: Railway MySQL (Included)

### **Option 2: Netlify + Render**
- **Frontend**: Netlify (Free tier available)
- **Backend**: Render (Free tier available)
- **Database**: Render PostgreSQL (Free tier available)

## 📱 Frontend Deployment

### Vercel (Recommended)
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/moneybuddy.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variables:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     VITE_OPENAI_API_KEY=your-openai-key
     ```
   - Deploy!

### Netlify
1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository
   - Add environment variables in site settings

### GitHub Pages
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/moneybuddy",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🖥️ Backend Deployment

### Railway (Recommended)
1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `backend` folder as root

2. **Add MySQL Database**
   - Click "New" → "Database" → "MySQL"
   - Note the connection details

3. **Set Environment Variables**
   ```
   DB_HOST=mysql-host-from-railway
   DB_USER=mysql-user-from-railway
   DB_PASSWORD=mysql-password-from-railway
   DB_NAME=railway
   JWT_SECRET=your-super-secret-key
   PORT=3001
   OPENAI_API_KEY=your-openai-key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Run database migrations manually if needed

### Render
1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Connect GitHub repository
   - Set root directory to `backend`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

2. **Add Database**
   - Create PostgreSQL database
   - Update connection settings

### Heroku
1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   heroku addons:create jawsdb:kitefin  # MySQL addon
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set OPENAI_API_KEY=your-key
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🗄️ Database Setup

### Railway MySQL
```bash
# Connect to Railway MySQL
mysql -h mysql-host -u mysql-user -p database-name

# Run schema
mysql -h mysql-host -u mysql-user -p database-name < src/database/schema.sql
```

### PlanetScale (Serverless MySQL)
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update environment variables

## 🔧 Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_OPENAI_API_KEY=your-openai-key
```

### Backend (.env)
```env
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
NODE_ENV=production
OPENAI_API_KEY=your-openai-key
FRONTEND_URL=https://your-frontend-domain.com
```

## ✅ Deployment Checklist

### Before Deployment
- [ ] Test locally with production build
- [ ] Set up environment variables
- [ ] Configure CORS for production domains
- [ ] Test API endpoints
- [ ] Verify database connection

### After Deployment
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test transaction creation
- [ ] Test budget management
- [ ] Verify data persistence
- [ ] Test on mobile devices

## 🚨 Troubleshooting

### Common Issues
1. **CORS errors**: Update FRONTEND_URL in backend
2. **API not found**: Check VITE_API_URL in frontend
3. **Database connection**: Verify database credentials
4. **Build failures**: Check Node.js version compatibility

### Debug Commands
```bash
# Check backend logs
heroku logs --tail  # Heroku
railway logs        # Railway

# Test API endpoints
curl https://your-api.com/health
curl https://your-api.com/api/auth/profile
```

## 💰 Cost Estimates

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: Free for personal projects  
- **Railway**: $5/month after free tier
- **Render**: Free tier available
- **PlanetScale**: Free tier with limitations

### Paid Options
- **Vercel Pro**: $20/month
- **Railway**: $5-20/month
- **AWS/GCP**: Variable based on usage
- **DigitalOcean**: $5-10/month

Choose the option that best fits your needs and budget!