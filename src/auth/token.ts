import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { load } from 'ts-dotenv';
import UsersModel from '../api/internal/users/models/users.models';
import RolesModel from '../api/internal/roles/models/roles.models';
import HttpHandler from '../helpers/handler.helper';
import { UNAUTHORIZED, FORBIDDEN, INTERNAL_ERROR } from '../constants/codes.constanst';

const { JWT_KEY } = load({
  JWT_KEY: String,
});

class Token {
  /**
   * Generate token
   * @param req
   * @param res
   */
  generate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { email } = req.body;
    const user = await UsersModel.findOne({ email });
    const token = jwt.sign({ _id: user?.id, email: user?.email, role: user?.role }, JWT_KEY, { expiresIn: '30d' });
    return !user?.active
      ? HttpHandler.response(res, UNAUTHORIZED, {
          message: 'User not found',
          results: { error: 'User not found' },
        })
      : ((req.token = token), (req.email = email), next());
  };

  /**
   * Validate token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  validate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const bearerHeader = req.headers['authorization'];

      if (bearerHeader === undefined) {
        return HttpHandler.response(res, FORBIDDEN, { message: 'Forbidden', results: 'Access forbidden' }); // If token is incorrect return Forbidden;
      }
      const bearerToken = bearerHeader.split(' ')[1]; // Return header authorization
      const { role, email } = <jwt.JwtPayload>jwt.verify(bearerToken, JWT_KEY); // Extract role and email
      const user = await UsersModel.findOne({ email });
      return !user?.active
        ? HttpHandler.response(res, UNAUTHORIZED, {
            message: 'User not found',
            results: { error: 'User not found' },
          })
        : ((req.role = role), (req.email = email), next());
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  };
  /**
   * Check admin token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { role } = req;
      const isAdmin = await RolesModel.findOne({ _id: role });
      return isAdmin?.role !== 'admin'
        ? HttpHandler.response(res, UNAUTHORIZED, {
            message: 'Unauthorized',
            results: { error: 'User not authorized' },
          })
        : next();
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  };
}

export default Token;
