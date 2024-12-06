import express from 'express'
import { getAllCoursesUser, getPurchasedCourses, getSpecificCourse, signUpUser, userSignIn,getMe } from '../controller/user.js'
import { jwtAuthentication } from '../auth/jwtAuth.js'


export const userRouter = express.Router()

userRouter.route('/user/signup').post(signUpUser)
userRouter.route('/user/login').post(userSignIn)
userRouter.route('/user/courses').get(jwtAuthentication,getAllCoursesUser)
userRouter.route('/user/courses/:courseId').post(jwtAuthentication,getSpecificCourse)
userRouter.route('/user/purchasedCourse').get(jwtAuthentication,getPurchasedCourses)
userRouter.route('/user/me').get(jwtAuthentication,getMe)