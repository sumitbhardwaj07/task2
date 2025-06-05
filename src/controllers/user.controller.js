const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'name', 'email'] // Only necessary fields
//     });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// };
