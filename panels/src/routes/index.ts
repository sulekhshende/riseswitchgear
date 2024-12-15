import express, { Request, Response } from 'express';
import { Panel } from '../models/panel';
import { NotFoundError } from '@rsswitchgear/common';

const router = express.Router();

router.get("/api/panels/", 
    async (req: Request, res: Response) => {
        const panels = await Panel.find({});

        res.status(200).send(panels);
});

export { router as showAllPanelsRouter };