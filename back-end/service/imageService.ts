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
export default { getImageById };
