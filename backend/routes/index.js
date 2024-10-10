import express from 'express';
import {registerController}  from '../controllers/registerController.js';
import { registerMiddleware } from '../middleware/register.js';
const router=express.Router();


router.post("/auth/register",registerMiddleware,registerController);
export default router;