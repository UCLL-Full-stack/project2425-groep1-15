/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Post:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: post title.
 *            comment:
 *              type: string
 *              description: comment under post.
 *            date:
 *              type: date
 *              description: date of post.
 */
import express, { NextFunction, Request, Response } from 'express';
import PostService from '../service/postService';

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
        const postData = req.body; // Get post data from request body
        const newPost = await PostService.createPost(postData); // Call the service to create a new post
        res.status(201).json(newPost); // Respond with the newly created post
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

export { postRouter };
