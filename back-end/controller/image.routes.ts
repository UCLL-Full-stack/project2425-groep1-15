import { Router } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import imageService from '../service/imageService';

const imageRouter = Router();

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
        const newImage = await imageService.createImage({
            fileName: file.originalname,
            path: file.path,
        });

        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error uploading image:', error);
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

imageRouter.get('/path/:path', async (req, res) => {
    const { path } = req.params;
    const imagePath = String(path);
    console.log(imagePath);
    if (!imagePath) {
        return res.status(400).json({ error: 'Invalid image path' });
    }
    try {
        const image = await imageService.getImageByPath(imagePath);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching image' });
    }
});

export { imageRouter, upload };
