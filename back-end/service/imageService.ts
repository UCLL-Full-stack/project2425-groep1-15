import imageDb from '../repository/image.db'; // Import the repository
import { Image } from '../model/image';

const getImageById = async (id: number): Promise<Image> => {
    try {
        const image = await imageDb.getImageById(id);
        if (!image) {
            throw new Error('Image not found');
        }
        return image;
    } catch (error) {
        throw new Error('no image found');
    }
};

const getImageByPath = async (path: string): Promise<Image[]> => {
    try {
        const images = await imageDb.getImagesByPath(path);
        if (!images) {
            throw new Error('Image not found');
        }
        return images;
    } catch (error) {
        throw new Error('no image found');
    }
};

const createImage = async (data: { fileName: string; path: string }): Promise<Image> => {
    try {
        const newImage = new Image(data);
        return await imageDb.createImage(newImage);
    } catch (error) {
        throw new Error('Error creating image');
    }
};
export default { getImageById, getImageByPath, createImage };
