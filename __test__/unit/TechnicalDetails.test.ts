import {TechnicalDetails, TechnicalMeasureError} from '../../src/domain/entity/TechnicalDetails';

describe('TechnicalDetails.ts', () => { 
  test('Should not accept negative weight', () => {
    expect(() => new TechnicalDetails(-1, 1, 1, 1)).toThrow(TechnicalMeasureError) 
  })
  test('Should not accept negative height', () => {
    expect(() => new TechnicalDetails(1, -1, 1, 1)).toThrow(TechnicalMeasureError)
  })
  test('Should not accept negative width', () => {
    expect(() => new TechnicalDetails(1, 1, -1, 1)).toThrow(TechnicalMeasureError)    
  })
  test('Should not accept negative length', () => { 
    expect(() => new TechnicalDetails(1, 1, 1, -1)).toThrow(TechnicalMeasureError)
  })
})