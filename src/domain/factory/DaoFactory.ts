import SequenceGeneratorDao from 'domain/dao/SequenceGeneratorDao';

export interface DaoFactory {
  createSequenceGeneratorDao(): SequenceGeneratorDao
}