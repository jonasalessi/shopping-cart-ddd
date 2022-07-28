import SequenceGeneratorDao from 'domain/dao/SequenceGeneratorDao';
import { DaoFactory } from 'domain/factory/DaoFactory';
import Connection from 'infra/database/Connection';
import SequenceGeneratorPostgres from './SequenceGeneratorDao';


export default class DaoFactoryDatabase implements DaoFactory {

  private sequenceGenerator: SequenceGeneratorDao;

  constructor(connection: Connection) {
    this.sequenceGenerator = new SequenceGeneratorPostgres(connection);
  }

  createSequenceGeneratorDao(): SequenceGeneratorDao {
    return this.sequenceGenerator;
  }

}