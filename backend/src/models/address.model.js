module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
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
    label: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'e.g., Home, Work, Other'
    },
    fullAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: 'India'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'addresses',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['location'], type: 'GIST' }
    ]
  });

  return Address;
};
