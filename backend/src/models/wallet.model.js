module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    agentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'agents',
        key: 'id'
      }
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalWithdrawals: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    pendingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      comment: 'Amount pending clearance'
    }
  }, {
    tableName: 'wallets',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['agentId'] }
    ],
    validate: {
      hasOwner() {
        if (!this.userId && !this.agentId) {
          throw new Error('Wallet must belong to either a user or an agent');
        }
        if (this.userId && this.agentId) {
          throw new Error('Wallet cannot belong to both user and agent');
        }
      }
    }
  });

  return Wallet;
};
