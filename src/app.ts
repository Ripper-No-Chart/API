import express from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

// Routes
import Contacts from './api/contacts/routes/contacts.routes';
import Users from './api/internal/users/routes/users.routes';
import Sessions from './api/internal/sessions/routes/sessions.routes';
import Roles from './api/internal/roles/routes/roles.routes';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  routes(): void {
    // Routes usage
    this.app.use('/api/contacts', Contacts);

    // Internal Routes
    this.app.use('/api/internal/users', Users);
    this.app.use('/api/internal/sessions', Sessions);
    this.app.use('/api/internal/roles', Roles);
  }

  config(): void {
    this.app.use(morgan('dev'));
    this.app.set('port', process.env.PORT || 3006);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`server: ${chalk.greenBright(this.app.get('port'))} ✔`);
    });
  }
}

export default new Server();
