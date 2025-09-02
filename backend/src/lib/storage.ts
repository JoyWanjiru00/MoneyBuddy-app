// Local storage implementation as fallback when MySQL is not available
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  userId: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: number;
  userId: number;
  category: string;
  amount: number;
  period: string;
  createdAt: string;
}

// Storage keys
const USERS_KEY = 'moneybuddy-users';
const TRANSACTIONS_KEY = 'moneybuddy-transactions';
const BUDGETS_KEY = 'moneybuddy-budgets';
const CURRENT_USER_KEY = 'moneybuddy-current-user';

// Helper functions
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// User management
export const createUser = (userData: { email: string; password: string; firstName?: string; lastName?: string }): User => {
  const users = getFromStorage<User & { password: string }>(USERS_KEY);
  
  // Check if user exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('User already exists with this email');
  }

  const newUser = {
    id: Date.now(),
    email: userData.email,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    password: userData.password, // In real app, this would be hashed
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveToStorage(USERS_KEY, users);

  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const authenticateUser = (email: string, password: string): User => {
  const users = getFromStorage<User & { password: string }>(USERS_KEY);
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Transaction management
export const getTransactions = (userId: number): Transaction[] => {
  const transactions = getFromStorage<Transaction>(TRANSACTIONS_KEY);
  return transactions.filter(t => t.userId === userId);
};

export const createTransaction = (userId: number, transactionData: Omit<Transaction, 'id' | 'userId' | 'createdAt'>): Transaction => {
  const transactions = getFromStorage<Transaction>(TRANSACTIONS_KEY);
  
  const newTransaction: Transaction = {
    id: Date.now(),
    userId,
    ...transactionData,
    createdAt: new Date().toISOString()
  };

  transactions.push(newTransaction);
  saveToStorage(TRANSACTIONS_KEY, transactions);
  
  return newTransaction;
};

export const updateTransaction = (userId: number, id: number, updates: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt'>>): Transaction => {
  const transactions = getFromStorage<Transaction>(TRANSACTIONS_KEY);
  const index = transactions.findIndex(t => t.id === id && t.userId === userId);
  
  if (index === -1) {
    throw new Error('Transaction not found');
  }

  transactions[index] = { ...transactions[index], ...updates };
  saveToStorage(TRANSACTIONS_KEY, transactions);
  
  return transactions[index];
};

export const deleteTransaction = (userId: number, id: number): void => {
  const transactions = getFromStorage<Transaction>(TRANSACTIONS_KEY);
  const filteredTransactions = transactions.filter(t => !(t.id === id && t.userId === userId));
  
  if (filteredTransactions.length === transactions.length) {
    throw new Error('Transaction not found');
  }

  saveToStorage(TRANSACTIONS_KEY, filteredTransactions);
};

// Budget management
export const getBudgets = (userId: number): Budget[] => {
  const budgets = getFromStorage<Budget>(BUDGETS_KEY);
  return budgets.filter(b => b.userId === userId);
};

export const createBudget = (userId: number, budgetData: Omit<Budget, 'id' | 'userId' | 'createdAt'>): Budget => {
  const budgets = getFromStorage<Budget>(BUDGETS_KEY);
  
  // Remove existing budget for same category and period
  const filteredBudgets = budgets.filter(b => 
    !(b.userId === userId && b.category === budgetData.category && b.period === budgetData.period)
  );

  const newBudget: Budget = {
    id: Date.now(),
    userId,
    ...budgetData,
    createdAt: new Date().toISOString()
  };

  filteredBudgets.push(newBudget);
  saveToStorage(BUDGETS_KEY, filteredBudgets);
  
  return newBudget;
};

export const updateBudget = (userId: number, id: number, updates: Partial<Omit<Budget, 'id' | 'userId' | 'createdAt'>>): Budget => {
  const budgets = getFromStorage<Budget>(BUDGETS_KEY);
  const index = budgets.findIndex(b => b.id === id && b.userId === userId);
  
  if (index === -1) {
    throw new Error('Budget not found');
  }

  budgets[index] = { ...budgets[index], ...updates };
  saveToStorage(BUDGETS_KEY, budgets);
  
  return budgets[index];
};

export const deleteBudget = (userId: number, id: number): void => {
  const budgets = getFromStorage<Budget>(BUDGETS_KEY);
  const filteredBudgets = budgets.filter(b => !(b.id === id && b.userId === userId));
  
  if (filteredBudgets.length === budgets.length) {
    throw new Error('Budget not found');
  }

  saveToStorage(BUDGETS_KEY, filteredBudgets);
};