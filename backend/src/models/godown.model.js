module.exports = (sequelize, DataTypes) => {
  const Godown = sequelize.define('Godown', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    capacity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Total capacity in kg'
    },
    currentLoad: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: 'Current load in kg'
    },
    operatingHours: {
      type: DataTypes.JSONB,
      defaultValue: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '08:00', close: '18:00' },
        sunday: { open: '09:00', close: '17:00' }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wasteTypesAccepted: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {
    tableName: 'godowns',
    timestamps: true,
    indexes: [
      { fields: ['location'], type: 'GIST' },
      { fields: ['isActive'] }
    ]
  });

  return Godown;
};
