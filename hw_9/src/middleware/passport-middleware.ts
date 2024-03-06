import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { PassportStatic } from 'passport';
import { jwtAccessConfig } from '../config/jwt-config'
import UserModel from '../models/user.model';

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtAccessConfig,
}

export const strategy = (passport: PassportStatic) => {
  passport.use(
    'jwt',
    new Strategy(option, async (payload, done) => {
      const { id } = payload.data;

      try {
        const user = await UserModel.findById(id).select('-password');

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        done(error, false);
      }
    }),
  )
}