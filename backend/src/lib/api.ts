import axios from 'axios';
import { 
  createUser, 
  authenticateUser, 
  getCurrentUser, 
  setCurrentUser, 
  clearCurrentUser,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  User,
  Transaction,
  Budget
} from './storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const USE_LOCAL_STORAGE = true; // Set to false when backend is available

// Create axios instance (for future backend use)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate mock JWT token
const generateMockToken = (user: User): string => {
  return `mock-jwt-${user.id}-${Date.now()}`;
};

// Auth API
export const authAPI = {
  register: async (userData: { email: string; password: string; firstName?: string; lastName?: string }) => {
    if (USE_LOCAL_STORAGE) {
      try {
        const user = createUser(userData);
        const token = generateMockToken(user);
        setCurrentUser(user);
        localStorage.setItem('moneybuddy-token', token);
        
        return {
          data: {
            message: 'User created successfully',
            token,
            user
          }
        };
      } catch (error: any) {
        throw {
          response: {
            data: {
              error: error.message
            }
          }
        };
      }
    }
    return api.post('/auth/register', userData);
  },
  
  login: async (credentials: { email: string; password: string }) => {
    if (USE_LOCAL_STORAGE) {
      try {
        const user = authenticateUser(credentials.email, credentials.password);
        const token = generateMockToken(user);
        setCurrentUser(user);
        localStorage.setItem('moneybuddy-token', token);
        
        return {
          data: {
            message: 'Login successful',
            token,
            user
          }
        };
      } catch (error: any) {
        throw {
          response: {
            data: {
              error: error.message
            }
          }
        };
      }
    }
    return api.post('/auth/login', credentials);
  },
  
  getProfile: async () => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) {
        throw {
          response: {
            status: 401,
            data: { error: 'User not found' }
          }
        };
      }
      return {
        data: { user }
      };
    }
    return api.get('/auth/profile');
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async (params?: { limit?: number; offset?: number }) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const transactions = getTransactions(user.id);
      return {
        data: { transactions }
      };
    }
    return api.get('/transactions', { params });
  },
  
  create: async (transaction: { type: 'income' | 'expense'; amount: number; category: string; description: string; date: string }) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const newTransaction = createTransaction(user.id, transaction);
      return {
        data: { transaction: newTransaction }
      };
    }
    return api.post('/transactions', transaction);
  },
  
  update: async (id: string, transaction: Partial<{ type: 'income' | 'expense'; amount: number; category: string; description: string; date: string }>) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const updatedTransaction = updateTransaction(user.id, parseInt(id), transaction);
      return {
        data: { transaction: updatedTransaction }
      };
    }
    return api.put(`/transactions/${id}`, transaction);
  },
  
  delete: async (id: string) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      deleteTransaction(user.id, parseInt(id));
      return {
        data: { message: 'Transaction deleted successfully' }
      };
    }
    return api.delete(`/transactions/${id}`);
  },
  
  getStats: async () => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const transactions = getTransactions(user.id);
      
      const totals = transactions.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + t.amount;
        return acc;
      }, { income: 0, expense: 0 });

      const categoryBreakdown = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
          const existing = acc.find(item => item.category === t.category);
          if (existing) {
            existing.total += t.amount;
          } else {
            acc.push({ category: t.category, total: t.amount });
          }
          return acc;
        }, [] as { category: string; total: number }[])
        .sort((a, b) => b.total - a.total);

      return {
        data: {
          totals,
          categoryBreakdown
        }
      };
    }
    return api.get('/transactions/stats');
  },
};

// Budgets API
export const budgetsAPI = {
  getAll: async () => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const budgets = getBudgets(user.id);
      return {
        data: { budgets }
      };
    }
    return api.get('/budgets');
  },
  
  create: async (budget: { category: string; amount: number; period?: string }) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const newBudget = createBudget(user.id, { ...budget, period: budget.period || 'monthly' });
      return {
        data: { budget: newBudget }
      };
    }
    return api.post('/budgets', budget);
  },
  
  update: async (id: string, budget: Partial<{ category: string; amount: number; period: string }>) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const updatedBudget = updateBudget(user.id, parseInt(id), budget);
      return {
        data: { budget: updatedBudget }
      };
    }
    return api.put(`/budgets/${id}`, budget);
  },
  
  delete: async (id: string) => {
    if (USE_LOCAL_STORAGE) {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      deleteBudget(user.id, parseInt(id));
      return {
        data: { message: 'Budget deleted successfully' }
      };
    }
    return api.delete(`/budgets/${id}`);
  },
};

// Helper functions
export const setAuthToken = (token: string) => {
  localStorage.setItem('moneybuddy-token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('moneybuddy-token');
  clearCurrentUser();
};

export const getAuthToken = () => {
  return localStorage.getItem('moneybuddy-token');
};

export const isAuthenticated = () => {
  return !!getAuthToken() && !!getCurrentUser();
};

export default api;