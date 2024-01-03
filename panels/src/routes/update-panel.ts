import { BadRequestError, NotAuthorizeError, NotFoundError, ValidateRequest, requireAuth } from '@rsswitchgear/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Panel } from '../models/panel';
import { PanelUpdatedPublisher } from '../events/panel-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put("/api/panels/:id", 
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
        const panel = await Panel.findById(req.params.id);

        if(!panel){
            throw new NotFoundError();
        };

        if(panel.orderId){
            throw new BadRequestError('Cannot Edit a reserved Panel');
        };

        if(panel.userId !== req.currentUser!.id){
            throw new NotAuthorizeError();
        }

        const { title, description, category, price, img } = req.body;

        panel.set({
            title,
            description,
            category,
            price,
            img
        });

        await panel.save();

        new PanelUpdatedPublisher(natsWrapper.client).publish({
            id: panel.id,
            title: panel.title,
            description: panel.description,
            category: panel.category,
            price: panel.price,
            userId: panel.userId,
            img: panel.img,
            version: panel.version
        });

        res.status(200).send(panel);
});

export { router as updatePanelRouter };