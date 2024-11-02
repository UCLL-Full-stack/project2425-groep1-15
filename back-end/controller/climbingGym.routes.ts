/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      ClimbingGym:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            location:
 *              type: string
 *              description: gym location.
 *            gymName:
 *              type: string
 *              description: name of gym.
 */
import express, { NextFunction, Request, Response } from 'express';
import ClimbingGymService from '../service/climbingGymService';
import { ClimbingGymInput } from '../types';
import climbingGymService from '../service/climbingGymService';

const climbingGymRouter = express.Router();

/**
 * @swagger
 * /gyms:
 *   get:
 *     summary: Get a list of all gyms.
 *     responses:
 *       200:
 *         description: A list of gyms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/ClimbingGym'
 */
climbingGymRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gyms = await ClimbingGymService.getAllClimbingGyms();
        res.status(200).json(gyms);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Create a new gym.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClimbingGym'
 *     responses:
 *       201:
 *         description: ClimbingGym created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClimbingGym'
 *       400:
 *         description: Invalid input data.
 */
climbingGymRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gymData: ClimbingGymInput = req.body;
        const newPost = await climbingGymService.createClimbingGym(gymData);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

export { climbingGymRouter };
