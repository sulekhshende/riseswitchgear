import { ValidateRequest, requireAuth } from '@rsswitchgear/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Panel } from '../models/panel';
<<<<<<< HEAD
import { PanelCreatedPublisher } from '../events/publishers/panel-created-publisher';
=======
import { PanelCreatedPublisher } from '../events/panel-created-publisher';
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post("/api/panels/", 
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('title cannot be empty'),
        body('price')
            .not()
            .isEmpty()
            .withMessage('price cannot be empty'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('price must be a number greater than 0')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { title, description, category, price, img } = req.body;

        const panel = Panel.build({
            title,
            description,
            category,
            price,
            userId: req.currentUser!.id,
            img
        });

        await panel.save();

        await new PanelCreatedPublisher(natsWrapper.client).publish({
            id: panel.id,
            title: panel.title,
            description: panel.description,
            category: panel.category,
            price: panel.price,
            userId: panel.userId,
            img: panel.img,
            version: panel.version
        })

        res.status(201).send(panel);
});

export { router as createPanelRouter };