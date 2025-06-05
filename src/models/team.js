module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    companyId: {
      type: DataTypes.UUID, 
      allowNull: false
    }
  });
  return Team;
};
