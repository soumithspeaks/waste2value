module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    totalWasteRecycled: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: 'Total weight in kg'
    },
    carbonFootprintSaved: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: 'Carbon saved in kg'
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    referralCode: {
      type: DataTypes.STRING,
      unique: true
    },
    referredBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    fcmToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Firebase Cloud Messaging token for push notifications'
    },
    preferences: {
      type: DataTypes.JSONB,
      defaultValue: {
        notifications: true,
        darkMode: false,
        language: 'en'
      }
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['phone'] },
      { fields: ['referralCode'] }
    ]
  });

  return User;
};
