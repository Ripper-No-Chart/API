import mongoose from 'mongoose';
import chalk from 'chalk';
import { environment } from '../environments/environments';

const { MONGO_DB_URI } = environment();

class Mongo {
  public async connect(): Promise<void> {
    return await mongoose
      .connect(MONGO_DB_URI.toString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((data) => {
        const { name, host, port } = data.connections[0];
        console.log(`database: ${chalk.green(name)} | ${chalk.green(host)} | ${chalk.cyan(port)}`);
      })
      .catch((err) => {
        console.log(chalk.red(err));
        throw new Error(err);
      });
  }
}

export default new Mongo();
