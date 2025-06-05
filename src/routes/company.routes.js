const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/comapany.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacmiddleware = require('../middlewares/rbac.middleware');






router.post('/', authMiddleware.auth, rbacmiddleware.checkRole(['Owner']), companiesController.createCompany);
router.get('/', authMiddleware.auth,companiesController.getMyCompanies);

module.exports = router;
