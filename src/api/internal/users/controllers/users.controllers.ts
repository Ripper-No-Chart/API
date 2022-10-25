import { Request, Response } from 'express';
import HttpHandler from '../../../../helpers/handler.helper';
import UsersModel from '../models/users.models';
import { getUser } from '../aggregations/users.aggregations';
import { SUCCESS, INTERNAL_ERROR } from '../../../../constants/codes.constanst';

class Users {
  /**
   * Get users data
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const results = await UsersModel.aggregate(getUser());
      return HttpHandler.response(res, SUCCESS, {
        message: 'Response successfully',
        results,
      });
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  }

  /**
   * Activate or deactivate a user
   * @param req
   * @param res
   * @returns
   */
  public async active(req: Request, res: Response): Promise<Response> {
    try {
      const { _id, active } = req.body;
      const results = await UsersModel.updateOne({ _id }, { $set: { active } });
      return HttpHandler.response(res, SUCCESS, {
        message: 'Response successfully',
        results,
      });
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  }
  
  /**
   * Create an internal user
   * @param req
   * @param res
   * @returns
   */
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, nickname, role } = req.body;
      const results = new UsersModel({
        email,
        nickname,
        role,
        active: true,
      });

      await results.save();
      return HttpHandler.response(res, SUCCESS, {
        message: 'Response successfully',
        results,
      });
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  }
}

export default new Users();
