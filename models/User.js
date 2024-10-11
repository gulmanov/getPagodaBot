import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

class User extends Model {
  // Method to set the default city for the user
  static async setCity(telegramUserId, city, firstName = null, lastName = null) {
    const [user, created] = await this.findOrCreate({
      where: { telegram_user_id: String(telegramUserId) },
      defaults: {
        first_name: firstName,
        last_name: lastName,
        default_city: null, // or set any initial default if needed
      },
    });

    // Now set the default city
    user.default_city = city;
    await user.save();

    return user; // Return the user object
  }

  // Method to get the default city for the user
  static async getCity(telegramUserId) {
    const user = await this.findOne({ where: { telegram_user_id: telegramUserId } });
    return user ? user.default_city : null;
  }
}

User.init({
  telegram_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures that the telegram user ID is unique
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true, // First name can be null
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true, // Last name can be null
  },
  default_city: {
    type: DataTypes.STRING,
    allowNull: true, // Default city can be null
  },
}, {
  sequelize,
  modelName: 'User',
});

export { User };
