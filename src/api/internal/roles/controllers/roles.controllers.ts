import { Request, Response } from 'express';
import HttpHandler from '../../../../helpers/handler.helper';
import RolesModel from '../models/roles.models';
import UsersModel from '../../users/models/users.models';
import { SUCCESS, INTERNAL_ERROR } from '../../../../constants/codes.constanst';

class Roles {
  /**
   * Get Roles
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const results = await RolesModel.find();
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
   * Assign Roles to a single user
   * @param req
   * @param res
   * @returns
   */
  public async assign(req: Request, res: Response): Promise<Response> {
    try {
      const { _id, role } = req.body;
      const results = await UsersModel.updateOne({ _id }, { $set: {role} });
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

export default new Roles();
