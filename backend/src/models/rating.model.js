module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pickupId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      comment: 'e.g., punctual, polite, professional'
    }
  }, {
    tableName: 'ratings',
    timestamps: true,
    indexes: [
      { fields: ['pickupId'] },
      { fields: ['userId'] },
      { fields: ['agentId'] },
      { fields: ['rating'] }
    ]
  });

  return Rating;
};
