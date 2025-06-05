const { Company, User } = require('../models/index');


exports.createCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const company = await Company.create({ name });

    // find the user by id
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // associate user with the company (creates join table row)
    await user.addCompany(company);

    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: 'Error creating company', error: err.message });
  }
};

exports.getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: {
        model: User,
        // where: { id: req.user.userId },
        attributes: [],
        through: { attributes: [] }
      }
    });

    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching companies', error: err.message });
  }
};
