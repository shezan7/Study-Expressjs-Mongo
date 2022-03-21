const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const rolesController = require('../controllers/roles');


router.get("/", rolesController.roles_get_all);

router.post("/", checkAuth, rolesController.roles_create);

router.patch("/", checkAuth, rolesController.roles_update);

router.delete("/", checkAuth, rolesController.roles_delete);


module.exports = router;