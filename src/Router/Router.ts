import express from 'express';
import Controller from '../controller/Controller';
const router = express.Router();


router.post('/parent',Controller.createParent);
router.post('/child',Controller.createChild);

router.post('/update',Controller.update)


export default router;