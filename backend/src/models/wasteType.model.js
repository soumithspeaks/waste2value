module.exports = (sequelize, DataTypes) => {
  const WasteType = sequelize.define('WasteType', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.ENUM(
        'organic',
        'plastic',
        'paper',
        'metal',
        'glass',
        'ewaste',
        'hazardous'
      ),
      allowNull: false
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'e.g., PET, HDPE for plastic'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pricePerKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    recyclingInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    environmentalImpact: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Carbon saved per kg, water saved, etc.'
    }
  }, {
    tableName: 'waste_types',
    timestamps: true,
    indexes: [
      { fields: ['category'] },
      { fields: ['name'] }
    ]
  });

  return WasteType;
};
