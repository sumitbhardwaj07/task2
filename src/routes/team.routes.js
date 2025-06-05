const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacmiddleware = require('../middlewares/rbac.middleware');

// console.log('authMiddleware.auth:', typeof authMiddleware.auth);
// console.log('rbacMiddleware.checkRole:', typeof rbacmiddleware.checkRole);
// console.log('rbacMiddleware.checkRole(["Owner"]):', typeof rbacmiddleware.checkRole(['Owner']));
// console.log('teamsController.createCompany:', typeof teamsController.getCompanyTeams);


router.post('/', authMiddleware.auth, rbacmiddleware.checkRole(['Owner', 'Manager']), teamsController.createTeam);
router.get('/:companyId', authMiddleware.auth, teamsController.getCompanyTeams);

module.exports = router;
