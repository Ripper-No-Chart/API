import { Response } from 'express';

class HttpHandler {
  /**
   * Custom response
   * @param res
   * @param status
   * @returns
   */
  public response(res: Response, status: number, response: { message: string; results: {} }): Response {
    return res.status(status).json({ response });
  }
}

export default new HttpHandler();
