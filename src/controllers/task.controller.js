const {
  Task, Tag, ActivityLog, Attachment,
  User
} = require('../models');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, ProjectId, assigneeId, tags = [] } = req.body;
    const task = await Task.create({ title, description, status, ProjectId, assigneeId });

    // Handle tags
    for (const tagName of tags) {
      const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
      await task.addTag(tag); // Sequelize magic method
    }

    await ActivityLog.create({
      TaskId: task.id,
      UserId: req.user.userId,
      action: 'created',
      comment: `Task "${task.title}" created`
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// Get all tasks for a project
exports.getProjectTasks = async (req, res) => {
  try {
    const whereClause = { ProjectId: req.params.projectId };

    if (req.user.role === 'Member') {
      whereClause.assigneeId = req.user.userId;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: [
        { model: Tag, through: { attributes: [] } },
        { model: Task, as: 'subtasks' },
        { model: ActivityLog },
        { model: User, as: 'assignee' },
        { model: Attachment }
      ]
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role === 'Member' && task.assigneeId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this task' });
    }

    task.status = status;
    await task.save();

    await ActivityLog.create({
      TaskId: task.id,
      UserId: req.user.userId,
      action: 'status_update',
      comment: `Status changed to ${status}`
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};

// Add a subtask
exports.addSubtask = async (req, res) => {
  try {
    const { title } = req.body;

    const parentTask = await Task.findByPk(req.params.id);
    if (!parentTask) return res.status(404).json({ message: 'Parent task not found' });

    const subtask = await Task.create({
      title,
      parentId: req.params.id,
      ProjectId: parentTask.ProjectId
    });

    await ActivityLog.create({
      TaskId: req.params.id,
      UserId: req.user.userId,
      action: 'subtask_created',
      comment: `Subtask "${title}" added`
    });

    res.status(201).json(subtask);
  } catch (err) {
    res.status(500).json({ message: 'Error adding subtask', error: err.message });
  }
};

// Add an attachment
exports.addAttachment = async (req, res) => {
  try {
    const { filename, url } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role === 'Member' && task.assigneeId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this task' });
    }

    const attachment = await Attachment.create({
      filename,
      url,
      TaskId: task.id
    });

    await ActivityLog.create({
      TaskId: task.id,
      UserId: req.user.userId,
      action: 'attachment_added',
      comment: `Attachment "${filename}" added`
    });

    res.status(201).json(attachment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding attachment', error: err.message });
  }
};
