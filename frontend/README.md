# MoneyBuddy Frontend

React + TypeScript frontend for the MoneyBuddy personal finance application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
VITE_OPENAI_API_KEY=your-openai-key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── AuthForm.tsx    # Login/register form
│   ├── TransactionForm.tsx
│   └── BudgetChart.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Dashboard
│   ├── Transactions.tsx
│   ├── Budget.tsx
│   └── Profile.tsx
├── lib/                # Utilities and API
│   ├── api.ts          # API client
│   ├── storage.ts      # localStorage utilities
│   └── utils.ts        # Helper functions
└── hooks/              # Custom React hooks
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** for consistent components
- **CSS Variables** for theming
- **Responsive Design** for all screen sizes

## 📱 Features

- User authentication
- Transaction management
- Budget tracking
- AI-powered insights
- Data visualization
- Responsive design