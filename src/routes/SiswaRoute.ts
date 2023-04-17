import express, {Request, Response} from 'express';
import { createSiswa, deleteSiswa, getSiswa, getSiswaById, updateSiswa } from "../controllers/SiswaController";

const router = express.Router();

router.get('/siswa', getSiswa);
router.get('/siswa/:id', getSiswaById);
router.post('/siswa', createSiswa);
router.patch('/siswa/:id', updateSiswa);
router.delete('/siswa/:id', deleteSiswa);

export default router;