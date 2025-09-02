import { Request, Response } from 'express';
import pool from '../database/connection';
import { AuthRequest } from '../middleware/auth';

export const getBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const [budgets] = await pool.execute(
      'SELECT * FROM budgets WHERE user_id = ? ORDER BY category',
      [userId]
    );

    res.json({ budgets });
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { category, amount, period = 'monthly' } = req.body;

    // Validate input
    if (!category || !amount) {
      return res.status(400).json({ error: 'Category and amount are required' });
    }

    // Use INSERT ... ON DUPLICATE KEY UPDATE for MySQL
    const [result] = await pool.execute(
      'INSERT INTO budgets (user_id, category, amount, period) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE amount = VALUES(amount)',
      [userId, category, amount, period]
    );

    // Get the budget (either newly created or updated)
    const [budgets] = await pool.execute(
      'SELECT * FROM budgets WHERE user_id = ? AND category = ? AND period = ?',
      [userId, category, period]
    );

    res.status(201).json({ budget: (budgets as any[])[0] });
  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { category, amount, period } = req.body;

    const [result] = await pool.execute(
      'UPDATE budgets SET category = ?, amount = ?, period = ? WHERE id = ? AND user_id = ?',
      [category, amount, period, id, userId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    // Get updated budget
    const [budgets] = await pool.execute(
      'SELECT * FROM budgets WHERE id = ?',
      [id]
    );

    res.json({ budget: (budgets as any[])[0] });
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM budgets WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};