export class TechnicalDetails {

  constructor(
    readonly weightKg: number,
    readonly heightCm: number,
    readonly widthCm: number,
    readonly lengthCm: number
  ) { }

  getVolume () {
		return this.widthCm / 100.0 * this.heightCm / 100.0 * this.lengthCm / 100.0;
	}

	getDensity () {
		return this.weightKg / this.getVolume();
	}
}
