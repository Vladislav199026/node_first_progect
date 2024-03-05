import express from 'express';
import userRouter from './router/user.router';
import { errorHandler } from './middleware/errorHandler';
import { errorRouteNotFind } from './middleware/errorRouteNotFind';
import passport from 'passport';
import { strategy } from './middleware/passportMiddleware';
import mongoose from 'mongoose';
import { mongoURI } from './config/mongoConfig/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', userRouter);

app.use(passport.initialize())
strategy(passport);

app.use(errorHandler);
app.use(errorRouteNotFind);

mongoose.connect(mongoURI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Failed to connect to mongo'))

app.listen(PORT, () => console.log('server started on port ' + PORT));
