import { load } from 'ts-dotenv';
import { Request, Response } from 'express';
import HttpHandler from '../../../helpers/handler.helper';
import { SUCCESS, INTERNAL_ERROR } from '../../../constants/codes.constanst';
import { Client } from '@hubspot/api-client';

const { TOKEN } = load({
  TOKEN: String,
});

class Contacts {
  /**
   * Get contact data
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const hubspotClient = new Client({ accessToken: TOKEN });
      const results = await hubspotClient.crm.contacts.getAll();
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
   * Update single contact data
   * @param req
   * @param res
   * @returns
   */
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const hubspotClient = new Client({ accessToken: TOKEN });
      const { contactId, company, email, phone, firstname, lastname, website } = req.body;
      const results = await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties: { company, email, phone, firstname, lastname, website },
      });
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

export default new Contacts();
