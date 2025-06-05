const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const CompanyModel = require('./company');
const TeamModel = require('./team');
const ProjectModel = require('./project');
const TaskModel = require('./task');
const TagModel = require('./tag');
const ActivityLogModel = require('./ActivityLog');
const AttachmentModel = require('./Attachment');
const StatusTransitionModel = require('./StatusTransition');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});
// console.log('Connecting with:', {
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASSWORD ? '***' : '(empty)',
//   host: process.env.DB_HOST,
//   db: process.env.DB_NAME,
// });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Company = CompanyModel(sequelize, Sequelize.DataTypes);
db.Team = TeamModel(sequelize, Sequelize.DataTypes);
db.Project = ProjectModel(sequelize, Sequelize.DataTypes);
db.Task = TaskModel(sequelize, Sequelize.DataTypes);
db.Tag = TagModel(sequelize, Sequelize.DataTypes);
db.ActivityLog = ActivityLogModel(sequelize, Sequelize.DataTypes);
db.Attachment = AttachmentModel(sequelize, Sequelize.DataTypes);
db.StatusTransition = StatusTransitionModel(sequelize, Sequelize.DataTypes);


// Associations
// User-Company many-to-many
db.User.belongsToMany(db.Company, { through: 'UserCompany' });
db.Company.belongsToMany(db.User, { through: 'UserCompany' });

// Company has many Teams
db.Company.hasMany(db.Team);
db.Team.belongsTo(db.Company);

// Team has many Users
db.Team.belongsToMany(db.User, { through: 'TeamUser' });
db.User.belongsToMany(db.Team, { through: 'TeamUser' });

// Team has many Projects
db.Team.hasMany(db.Project);
db.Project.belongsTo(db.Team);

// Project has many Tasks
db.Project.hasMany(db.Task);
db.Task.belongsTo(db.Project);

// Task has subtasks (recursive)
db.Task.hasMany(db.Task, { as: 'subtasks', foreignKey: 'parentId' });
db.Task.belongsTo(db.Task, { as: 'parent', foreignKey: 'parentId' });

// Task-Tags many-to-many
db.Task.belongsToMany(db.Tag, { through: 'TaskTags' });
db.Tag.belongsToMany(db.Task, { through: 'TaskTags' });

// Task has many Attachments and Activity Logs
db.Task.hasMany(db.Attachment);
db.Attachment.belongsTo(db.Task);

db.Task.hasMany(db.ActivityLog);
db.ActivityLog.belongsTo(db.Task);

// Task has assignee
db.Task.belongsTo(db.User, { as: 'assignee' });

// Team has many status transitions
db.Team.hasMany(db.StatusTransition);
db.StatusTransition.belongsTo(db.Team);

module.exports = db;
