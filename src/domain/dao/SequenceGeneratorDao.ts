export default interface SequenceGeneratorDao {

  nextSequence(): Promise<number>;
}