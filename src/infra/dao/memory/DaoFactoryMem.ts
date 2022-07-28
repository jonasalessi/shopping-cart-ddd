import SequenceGeneratorDao from 'domain/dao/SequenceGeneratorDao';
import { DaoFactory } from 'domain/factory/DaoFactory';
import SequenceGeneratorMem from './SequenceGeneratorMem';


export default class DaoFactoryMem implements DaoFactory {
  private sequences: SequenceGeneratorDao;

  constructor(private readonly initialSequence: number) {
    this.sequences = new SequenceGeneratorMem(this.initialSequence);
  }

  createSequenceGeneratorDao(): SequenceGeneratorDao {
    return this.sequences;
  }

}