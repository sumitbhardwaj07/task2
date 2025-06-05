const { UserTeam } = require('../models');

module.exports = (requiredRole) => async (req, res, next) => {
  const userId = req.user.id;
  const teamId = req.body.teamId || req.params.teamId;

  const userTeam = await UserTeam.findOne({ where: { UserId: userId, TeamId: teamId } });
  if (!userTeam || (requiredRole && userTeam.role !== requiredRole)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }

  next();
};

