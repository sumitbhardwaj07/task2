const { Team, User, TeamUser } = require('../models');

exports.createTeam = async (req, res) => {
  try {
    const { name, companyId } = req.body;
    const team = await Team.create({ name, companyId });

    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Use association method instead of TeamUser.create
    await team.addUser(user);

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error creating team', error: err.message });
  }
};

exports.getCompanyTeams = async (req, res) => {
  try {
    const { companyId } = req.params;
    const teams = await Team.findAll({ where: { companyId } });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teams', error: err.message });
  }
};
