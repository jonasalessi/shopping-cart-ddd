import { BeanFactory } from "domain/factory/BeanFactory";
import { DaoFactory } from "domain/factory/DaoFactory";
import RepositoryFactory from "domain/factory/RepositoryFactory";
import DaoFactoryMem from "infra/dao/memory/DaoFactoryMem";
import RepositoryFactoryMem from "infra/repository/memory/RepositoryFactoryMem";

export default class BeanFactoryMem implements BeanFactory {
  private repositoryFactory: RepositoryFactory;
  private daoFactory: DaoFactory;

  constructor(public initialSequence: number) {
    this.repositoryFactory = new RepositoryFactoryMem();
    this.daoFactory = new DaoFactoryMem(this.initialSequence);
  }

  repositories(): RepositoryFactory {
    return this.repositoryFactory;
  }
  dao(): DaoFactory {
    return this.daoFactory;
  }

}