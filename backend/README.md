# MoneyBuddy Backend

Node.js + Express + MySQL backend API for the MoneyBuddy application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up MySQL database
mysql -u root -p -e "CREATE DATABASE moneybuddy;"
mysql -u root -p moneybuddy < src/database/schema.sql

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 Deployment

### Railway (Recommended)
1. Connect GitHub repository
2. Add MySQL database service
3. Set environment variables
4. Deploy automatically

### Render
1. Connect repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add PostgreSQL/MySQL database

## 🔧 Environment Variables

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

## 📁 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats` - Get statistics

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create/update budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

## 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Budgets table
CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    period ENUM('weekly', 'monthly', 'yearly') DEFAULT 'monthly',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔒 Security Features

- JWT authentication
- bcrypt password hashing
- Rate limiting
- CORS protection
- Helmet security headers
- SQL injection protection