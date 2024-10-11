import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

class WeatherCache extends Model {}

WeatherCache.init({
  city_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Prevent duplicate entries for the same city
  },
  raw_data: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'WeatherCache',
});

export { WeatherCache };
