module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fileName: { type: DataTypes.STRING },
    fileType: { type: DataTypes.STRING },
    simulatedUrl: { type: DataTypes.STRING }, // Just simulate, no S3
  });
  return Attachment;
};
