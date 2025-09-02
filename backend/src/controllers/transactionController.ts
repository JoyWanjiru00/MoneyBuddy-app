import { Request, Response } from 'express';
import pool from '../database/connection';
import { AuthRequest } from '../middleware/auth';

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const [transactions] = await pool.execute(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC, created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { type, amount, category, description, date } = req.body;

    // Validate input
    if (!type || !amount || !category || !date) {
      return res.status(400).json({ error: 'Type, amount, category, and date are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' });
    }

    const [result] = await pool.execute(
      'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, type, amount, category, description, date]
    );

    const transactionId = (result as any).insertId;

    // Get created transaction
    const [transactions] = await pool.execute(
      'SELECT * FROM transactions WHERE id = ?',
      [transactionId]
    );

    res.status(201).json({ transaction: (transactions as any[])[0] });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { type, amount, category, description, date } = req.body;

    // Check if transaction belongs to user
    const [existingTransactions] = await pool.execute(
      'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if ((existingTransactions as any[]).length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await pool.execute(
      'UPDATE transactions SET type = ?, amount = ?, category = ?, description = ?, date = ? WHERE id = ? AND user_id = ?',
      [type, amount, category, description, date, id, userId]
    );

    // Get updated transaction
    const [transactions] = await pool.execute(
      'SELECT * FROM transactions WHERE id = ?',
      [id]
    );

    res.json({ transaction: (transactions as any[])[0] });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactionStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Get total income and expenses
    const [totalsResult] = await pool.execute(
      `SELECT 
        type,
        SUM(amount) as total
       FROM transactions 
       WHERE user_id = ? 
       GROUP BY type`,
      [userId]
    );

    // Get spending by category
    const [categoryResult] = await pool.execute(
      `SELECT 
        category,
        SUM(amount) as total
       FROM transactions 
       WHERE user_id = ? AND type = 'expense'
       GROUP BY category
       ORDER BY total DESC`,
      [userId]
    );

    const totals = (totalsResult as any[]).reduce((acc, row) => {
      acc[row.type] = parseFloat(row.total);
      return acc;
    }, { income: 0, expense: 0 });

    res.json({
      totals,
      categoryBreakdown: categoryResult
    });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};