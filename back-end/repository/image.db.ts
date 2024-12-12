import database from './database'; // Import the Prisma client from db.ts
import { Image } from '../model/image';

const getImageById = async (id: number): Promise<Image | null> => {
    try {
        const imagePrisma = await database.image.findUnique({
            where: { id },
        });

        return imagePrisma ? Image.from(imagePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default { getImageById };
