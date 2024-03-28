import { Router } from "express";
const router = Router();

import * as controller from '../Controllers/Controllers.js';
import Auth, { localVariables} from '../middleware/auth.js';

router.route('/register').post(controller.register);
router.route('/registerMail').post();
router.route('/authentication').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

router.route('/updateuser').put(Auth, controller.updateuser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;

