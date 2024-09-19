import express from 'express'
import { getAllCoursesUser, getPurchasedCourses, getSpecificCourse, signUpUser, userSignIn } from '../controller/user.js'
import { jwtAuthentication } from '../auth/jwtAuth.js'


export const userRouter = express.Router()

userRouter.route('/user/signup').post(signUpUser)
userRouter.route('/user/login').post(userSignIn)
userRouter.route('/user/courses').get(jwtAuthentication,getAllCoursesUser)
userRouter.route('/user/courses/:courseId').post(jwtAuthentication,getSpecificCourse)
userRouter.route('/user/purchasedCourse').get(jwtAuthentication,getPurchasedCourses)