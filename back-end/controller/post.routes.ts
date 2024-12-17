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
 *      Post:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Post title.
 *            comment:
 *              type: string
 *              description: Comment under post.
 *            date:
 *              type: string
 *              format: date
 *              description: Date of post.
 *            boulder:
 *              $ref: '#/components/schemas/BoulderProblem'
 *              description: Boulder associated with the post.
 */
import express, { NextFunction, Request, Response } from 'express';
import PostService from '../service/postService';
import { PostInput } from '../types';
import postService from '../service/postService';
import userDb from '../repository/user.db';

const postRouter = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of all posts.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Post'
 */
postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input data.
 */
postRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postData: PostInput = req.body;
        const newPost = await PostService.createPost(postData);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/{id}:
 *  get:
 *      summary: Get a post by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The post id.
 *      responses:
 *          200:
 *              description: A post object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.getPostById(Number(req.params.id));
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/user/{userEmail}:
 *  get:
 *      summary: Get posts by user.
 *      parameters:
 *          - in: body
 *            name: user
 *            schema:
 *              type: integer
 *              required: true
 *              description: The posts user.
 *      responses:
 *          200:
 *              description: A list of post objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.get('/user/:userEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userDb.getUserByEmail(String(req.params.userEmail));
        if (!user) {
            throw new Error(`User with email ${req.params.userEmail} does not exist.`);
        }
        const posts = await postService.getPostsByUser(user);

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

export { postRouter };
