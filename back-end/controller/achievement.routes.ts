/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Achievement:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: achievement title.
 *            description:
 *              type: string
 *              description: description of achievement.
 *            difficulty:
 *              type: string
 *              description: how hard the achievement is to complete.
 */
import express, { NextFunction, Request, Response } from 'express';
import AchievementService from '../service/achievementService';
import achievementService from '../service/achievementService';
import { AchievementInput } from '../types';
import userDb from '../repository/user.db';

const achievementRouter = express.Router();

/**
 * @swagger
 * /achievements:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all achievements.
 *     responses:
 *       200:
 *         description: A list of achievements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Achievement'
 */
achievementRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const achievements = await AchievementService.getAllAchievements();
        res.status(200).json(achievements);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /achievements:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new achievement.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Achievement'
 *     responses:
 *       201:
 *         description: Achievement created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Achievement'
 *       400:
 *         description: Invalid input data.
 */
achievementRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const achievementData: AchievementInput = req.body;
        const newAchievent = await achievementService.createAchievement(achievementData);
        res.status(201).json(newAchievent);
    } catch (error) {
        next(error);
    }
});

export { achievementRouter };
