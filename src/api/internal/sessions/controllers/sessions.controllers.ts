import { Request, Response } from 'express';
import HttpHandler from '../../../../helpers/handler.helper';
import SessionsModel from '../models/sessions.models';
import { SUCCESS, INTERNAL_ERROR } from '../../../../constants/codes.constanst';

class Sessions {
  /**
   * Login
   * @param req
   * @param res
   * @returns
   */
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, token } = req;
      const session = new SessionsModel({
        email,
      });
      await session.save();
      return HttpHandler.response(res, SUCCESS, {
        message: 'Response successfully',
        results: { session, token },
      });
    } catch (e) {
      return HttpHandler.response(res, INTERNAL_ERROR, {
        message: 'Internal Error',
        results: { error: (e as Error).message },
      });
    }
  }
  /**
   * Get sessions by user
   * @param req
   * @param res
   * @returns
   */
  public async user(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      const results = await SessionsModel.find({ email });
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
   * Get sessions
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const results = await SessionsModel.find();
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

export default new Sessions();
