import express, { Request, Response } from 'express';
import cors from 'cors';
import { userService } from './userService.js';
import { UserSearchQuery } from './types/types.js';


const app = express();
const port = 8080;


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next) => {
    console.log('Request received: ', req.url);
    next();
})

app.get('/users', (req: Request<{}, {}, {}, UserSearchQuery>, res: Response) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const result = userService.findUsers(page, pageSize);
    res.json(result)
});

app.get('/users/:id', (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});