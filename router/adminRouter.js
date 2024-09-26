import express from 'express'
import { jwtAuthentication } from "../auth/jwtAuth.js";
import { signUpAdmin,signInAdmin, addCourse, updateCourse, getCoursesCreatedByAdmin, deleteCourse, getMe } from '../controller/admin.js';
import { upload } from '../middleware/multer.js';


export const adminRouter = express.Router()
adminRouter.route('/admin/signup').post(signUpAdmin)
adminRouter.route('/admin/login').post(signInAdmin)
adminRouter.route('/admin/courses').post(jwtAuthentication,upload.single('courseImage'),addCourse)
adminRouter.route('/admin/courses/:courseId').put(jwtAuthentication,upload.single('courseImage'),updateCourse).delete(deleteCourse)
adminRouter.route('/admin/courses').get(jwtAuthentication,getCoursesCreatedByAdmin)
adminRouter.route('/admin/me').get(jwtAuthentication,getMe)
