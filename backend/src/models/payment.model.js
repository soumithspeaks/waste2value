module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pickupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pickups',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'agents',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    agentCommission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    platformFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    userPayout: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.ENUM('wallet', 'upi', 'bank_transfer', 'card'),
      defaultValue: 'wallet'
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true
    },
    gatewayResponse: {
      type: DataTypes.JSONB,
      comment: 'Payment gateway response'
    },
    processedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    failureReason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'payments',
    timestamps: true,
    indexes: [
      { fields: ['pickupId'] },
      { fields: ['userId'] },
      { fields: ['agentId'] },
      { fields: ['status'] },
      { fields: ['transactionId'] }
    ]
  });

  return Payment;
};
