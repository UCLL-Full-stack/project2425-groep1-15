/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: User name.
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User Password.
 *            startDate:
 *              type: date
 *              description: startDate User.
 *            numPosts:
 *              type: number
 *              format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import UserService from '../service/userService';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
