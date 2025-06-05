const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacmiddleware = require('../middlewares/rbac.middleware');

// console.log('authMiddleware.auth:', typeof authMiddleware.auth);
// console.log('rbacMiddleware.checkRole:', typeof rbacmiddleware.checkRole);
// console.log('rbacMiddleware.checkRole(["Owner"]):', typeof rbacmiddleware.checkRole(['Owner']));
// console.log('projectsController.createCompany:', typeof projectsController.createProject);


router.post('/', authMiddleware.auth, rbacmiddleware.checkRole(['Manager']), projectsController.createProject);
router.get('/:teamId', authMiddleware.auth, projectsController.getTeamProjects);

module.exports = router;
