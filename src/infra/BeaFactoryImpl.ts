import Connection from 'infra/database/Connection';
import { BeanFactory } from "domain/factory/BeanFactory";
import { DaoFactory } from "domain/factory/DaoFactory";
import RepositoryFactory from "domain/factory/RepositoryFactory";
import DaoFactoryDatabase from './dao/database/DaoFactoryDatabase';
import RepositoryFactoryDatabase from './repository/database/RepositoryFactoryDatabase';

export class BeanFactoryImpl implements BeanFactory {

  private repository: RepositoryFactory;
  private daoFactory: DaoFactory;

  constructor(connection: Connection) {
    this.repository = new RepositoryFactoryDatabase(connection);
    this.daoFactory = new DaoFactoryDatabase(connection);
  }

  repositories(): RepositoryFactory {
    return this.repository;
  }

  dao(): DaoFactory {
    return this.daoFactory;
  }

}