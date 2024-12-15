import express, { Request, Response } from 'express';
import { Panel } from '../models/panel';
import { NotFoundError } from '@rsswitchgear/common';

const router = express.Router();

router.get("/api/panels/:id", 
    async (req: Request, res: Response) => {
        const panel = await Panel.findById(req.params.id);

        if(!panel){
            throw new NotFoundError();
        }

        res.status(200).send(panel);
});

export { router as showPanelRouter };