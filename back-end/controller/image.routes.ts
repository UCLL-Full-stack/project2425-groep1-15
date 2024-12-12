import { Router } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import imageService from '../service/imageService';

const prisma = new PrismaClient();
const imageRouter = Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
            file.originalname
        }`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

imageRouter.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const image = await prisma.image.create({
            data: {
                fileName: file.originalname,
                path: file.path,
            },
        });
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Error saving image to the database' });
    }
});

imageRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const imageId = Number(id);
    if (isNaN(imageId)) {
        return res.status(400).json({ error: 'Invalid image ID' });
    }
    try {
        const image = await imageService.getImageById(imageId);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching image' });
    }
});

export { imageRouter, upload };
