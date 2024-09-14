import express from 'express'
import { signUpUser, userSignIn } from '../controller/user.js'


export const userRouter = express.Router()

userRouter.route('/user/signup').post(signUpUser)
userRouter.route('/user/login').post(userSignIn)
userRouter.route('/user/courses').get()
userRouter.route('/user/courses/:courseId').post()
userRouter.route('/user/purchasedCourse').get()