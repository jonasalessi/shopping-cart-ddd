import SequenceGeneratorDao from "domain/dao/SequenceGeneratorDao";
import Connection from "infra/database/Connection";


export default class SequenceGeneratorPostgres implements SequenceGeneratorDao {

  constructor(readonly connection: Connection) { }

  nextSequence(): Promise<number> {
    throw new Error("Method not implemented.");
  }

}