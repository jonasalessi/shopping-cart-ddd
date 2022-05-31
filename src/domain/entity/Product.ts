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
      return this.technicalDetails?.getVolume() || 0;
    }
  
    getDensity () {
      return this.technicalDetails?.getDensity() ||  0;
    }
}