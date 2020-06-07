import { Request, Response, Router } from 'express';
import * as RollService from '../services/roll-service'

const router = Router();

interface RollRequest extends Request {
    query: {
        dice: string;
    }
}

router.get('*', async(req: RollRequest, res: Response) => {
    console.log(req.query.dice);
    const rollDef = RollService.parse(req.query.dice);
    const rollResult = RollService.roll(rollDef);
    return res.json(rollResult);
});

export default router;
