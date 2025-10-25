module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
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
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    currentLocation: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    locationUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicleType: {
      type: DataTypes.ENUM('bike', 'auto', 'van', 'truck'),
      allowNull: false
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicleCapacity: {
      type: DataTypes.FLOAT,
      comment: 'Capacity in kg'
    },
    assignedGodownId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'godowns',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    totalRatings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalPickups: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    acceptanceRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Percentage'
    },
    completionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Percentage'
    },
    documents: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Store document URLs: license, aadhar, etc.'
    },
    bankDetails: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Bank account, IFSC, UPI'
    },
    fcmToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastActiveAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'agents',
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['phone'] },
      { fields: ['isOnline'] },
      { fields: ['currentLocation'], type: 'GIST' }
    ]
  });

  return Agent;
};
