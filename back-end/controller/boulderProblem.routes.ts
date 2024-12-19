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
 *            gymName:
 *              type: string
 *              description: Name of the climbing gym.
 *            location:
 *              type: string
 *              description: Location of the climbing gym.
 *      BoulderProblem:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            grade:
 *              type: string
 *              description: Boulder grade.
 *            gym:
 *              $ref: '#/components/schemas/ClimbingGym'
 *              description: Location gym.
 */
import express, { NextFunction, Request, Response } from 'express';
import ClimbingGymService from '../service/climbingGymService';
import { BoulderProblemInput, ClimbingGymInput } from '../types';
import climbingGymService from '../service/climbingGymService';
import boulderProblemService from '../service/boulderProblemService';

const boulderProblemRouter = express.Router();

/**
 * @swagger
 * /boulders:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all boulders.
 *     responses:
 *       200:
 *         description: A list of boulders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BoulderProblem'
 */
boulderProblemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boulders = await boulderProblemService.getAllBoulderProblems();
        res.status(200).json(boulders);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /boulders:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new boulder.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoulderProblem'
 *     responses:
 *       201:
 *         description: BoulderProblem created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoulderProblem'
 *       400:
 *         description: Invalid input data.
 */
boulderProblemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boulderData: BoulderProblemInput = req.body;
        const newBoulderProblem = await boulderProblemService.createBoulderProblem(boulderData);
        res.status(201).json(newBoulderProblem);
    } catch (error) {
        next(error);
    }
});

boulderProblemRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boulderProblemData: BoulderProblemInput = req.body;
        const newBoulderProblem = await boulderProblemService.editBoulderProblem(
            boulderProblemData,
            Number(req.params.id)
        );
        res.status(200).json(newBoulderProblem);
    } catch (error) {
        next(error);
    }
});

export { boulderProblemRouter };
