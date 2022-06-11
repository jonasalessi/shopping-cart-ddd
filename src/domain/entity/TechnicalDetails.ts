export class TechnicalDetails {

  constructor(
    readonly weightKg: number,
    readonly heightCm: number,
    readonly widthCm: number,
    readonly lengthCm: number
  ) {
    if (weightKg < 0) throw new TechnicalMeasureError("Weight should not be negative");
    if (heightCm <0) throw new TechnicalMeasureError('Height should not be negative');
    if (widthCm < 0) throw new TechnicalMeasureError('Width should not be negative');
    if (lengthCm < 0) throw new TechnicalMeasureError('Lenght should not be negative');

  }

  getVolume () {
		return this.widthCm / 100.0 * this.heightCm / 100.0 * this.lengthCm / 100.0;
	}

	getDensity () {
		return this.weightKg / this.getVolume();
	}
}

export class TechnicalMeasureError extends Error {} 