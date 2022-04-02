import { TechnicalDetails } from "./TechnicalDetails";

export class Product {

  constructor(
    readonly name: string, 
    readonly description: string, 
    readonly value: number,
    readonly technicalDetails?: TechnicalDetails,
    readonly id: number = 0
    ) { }

    getVolume () {
      if (this.technicalDetails) return this.technicalDetails.getVolume();
      return 0;
    }
  
    getDensity () {
      if (this.technicalDetails) return this.technicalDetails.getDensity();
      return 0;
    }
}