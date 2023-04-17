import express, {Request, Response} from 'express';
import { 
    createGuru, 
    deleteGuru,
    getGuru,
    getGuruById,
    updateGuru 
} from "../controllers/GuruController";

const router = express.Router();

router.get('/guru', getGuru );
router.get('/guru/:id', getGuruById);
router.post('/guru', createGuru);
router.patch('/guru/:id', updateGuru);
router.delete('/guru/:id', deleteGuru);

export default router;