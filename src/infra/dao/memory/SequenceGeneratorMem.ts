import SequenceGeneratorDao from "domain/dao/SequenceGeneratorDao";

export default class SequenceGeneratorMem implements SequenceGeneratorDao {
  private sequence: number;

  constructor(initial: number) {
    this.sequence = initial;
  }

  nextSequence(): Promise<number> {
    return Promise.resolve(this.sequence++);
  }

} 