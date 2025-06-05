const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacmiddleware = require('../middlewares/rbac.middleware');

// console.log('authMiddleware.auth:', typeof authMiddleware.auth);
// console.log('rbacMiddleware.checkRole:', typeof rbacmiddleware.checkRole);
// console.log('rbacMiddleware.checkRole(["Owner"]):', typeof rbacmiddleware.checkRole(['Owner']));
// console.log('tasksController.createCompany:', typeof tasksController.updateTaskStatus);

router.post('/', authMiddleware.auth, rbacmiddleware.checkRole(['Manager']), tasksController.createTask);
router.get('/project/:projectId', authMiddleware.auth, tasksController.getProjectTasks);

router.put('/:id/status', authMiddleware.auth, rbacmiddleware.checkRole(['Manager', 'Member']), tasksController.updateTaskStatus);
router.post('/:id/subtask', authMiddleware.auth, rbacmiddleware.checkRole(['Manager']), tasksController.addSubtask);
router.post('/:id/attachment', authMiddleware.auth, rbacmiddleware.checkRole(['Manager', 'Member']), tasksController.addAttachment);

module.exports = router;
