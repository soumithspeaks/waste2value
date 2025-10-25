module.exports = (sequelize, DataTypes) => {
  const Pickup = sequelize.define('Pickup', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
      allowNull: true,
      references: {
        model: 'agents',
        key: 'id'
      }
    },
    wasteTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'waste_types',
        key: 'id'
      }
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'searching_agent',
        'agent_assigned',
        'agent_enroute',
        'agent_arrived',
        'in_progress',
        'completed',
        'cancelled'
      ),
      defaultValue: 'pending'
    },
    estimatedWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Weight in kg'
    },
    actualWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Weight in kg'
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    aiClassification: {
      type: DataTypes.JSONB,
      comment: 'AI classification results with confidence scores'
    },
    estimatedPayment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    actualPayment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    scheduledFor: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Null for immediate pickups'
    },
    pickupOTP: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    agentReachedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelledBy: {
      type: DataTypes.ENUM('user', 'agent', 'system'),
      allowNull: true
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'pickups',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['agentId'] },
      { fields: ['status'] },
      { fields: ['scheduledFor'] },
      { fields: ['createdAt'] }
    ]
  });

  return Pickup;
};
