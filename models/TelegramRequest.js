import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

class TelegramRequest extends Model {}

TelegramRequest.init({
  telegram_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegram_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  our_response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  city_name: { // Adding city_name field
    type: DataTypes.STRING,
    allowNull: true, // Allowing null values
  },
}, {
  sequelize,
  modelName: 'TelegramRequest',
});

export { TelegramRequest };
