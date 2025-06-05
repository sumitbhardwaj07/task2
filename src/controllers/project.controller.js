const { Project } = require('../models');

exports.createProject = async (req, res) => {
  try {
    const { name, description, teamId } = req.body;
    const project = await Project.create({ name, description, teamId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

exports.getTeamProjects = async (req, res) => {
  try {
    const { teamId } = req.params;
    const projects = await Project.findAll({ where: { teamId } });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};
