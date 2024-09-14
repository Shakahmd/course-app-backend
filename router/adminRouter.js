import express from 'express'
import { jwtAuthentication } from "../auth/jwtAuth.js";
import { signUpAdmin,signInAdmin } from '../controller/admin.js';

export const adminRouter = express.Router()
adminRouter.route('/admin/signup').post(signUpAdmin)
adminRouter.route('/admin/login').post(signInAdmin)
adminRouter.route('/admin/courses').post()
adminRouter.route('/admin/courses/:courseId').put().delete()
adminRouter.route('/admin/courses').get()
