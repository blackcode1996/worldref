import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const cardsDataRoute = express.Router();

cardsDataRoute.get('/', async (req: Request, res: Response) => {
    try {
        const dataFilePath = path.join(__dirname, '../data', 'data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default cardsDataRoute;
