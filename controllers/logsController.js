import { TelegramRequest } from '../models/TelegramRequest.js';

export const getLogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const logs = await TelegramRequest.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
    res.json({
      totalLogs: logs.count,
      totalPages: Math.ceil(logs.count / limit),
      currentPage: page,
      logs: logs.rows,
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

export const getLogsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const logs = await TelegramRequest.findAll({ where: { telegram_user_id: user_id } });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs for user:', error);
    res.status(500).json({ message: 'Error fetching logs for user' });
  }
};
