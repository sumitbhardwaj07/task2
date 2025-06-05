const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacmiddleware = require('../middlewares/rbac.middleware');

// console.log('authMiddleware.auth:', typeof authMiddleware.auth);
// console.log('rbacMiddleware.checkRole:', typeof rbacmiddleware.checkRole);
// console.log('rbacMiddleware.checkRole(["Owner"]):', typeof rbacmiddleware.checkRole(['Owner']));
// console.log('userController.createCompany:', typeof userController.getAllUsers);

// router.post('/invite', authMiddleware.auth, rbacmiddleware.checkRole(['Owner']), userController.inviteUser);
router.get('/', authMiddleware.auth, userController.getAllUsers);
router.get('/me', authMiddleware.auth, userController.getUser);

module.exports = router;
