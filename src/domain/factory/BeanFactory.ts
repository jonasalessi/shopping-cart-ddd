import RepositoryFactory from 'domain/factory/RepositoryFactory';
import { DaoFactory } from './DaoFactory';
export interface BeanFactory {

  repositories(): RepositoryFactory;
  dao(): DaoFactory;
}