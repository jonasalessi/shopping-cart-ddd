import { Product } from "domain/entity/Product";
import { TechnicalDetails } from "domain/entity/TechnicalDetails";

type ProductParam = {
  name: string;
  description?: string;
  value?: number;
  technicalDetails?: TechnicalDetails;
}
export const createProduct = ({
  name,
  description = '',
  value = 0,
  technicalDetails = new TechnicalDetails(3, 100, 30, 10)
}: ProductParam): Product => new Product(name, description, value, technicalDetails)

export const loadProductsDummies = () => {
  const camera = createProduct({ name: 'Camera', technicalDetails: new TechnicalDetails(0.9, 10, 10, 10) });
  const guitar = createProduct({ name: 'Guitar', technicalDetails: new TechnicalDetails(3, 100, 30, 10) });
  const freezer = createProduct({ name: 'Freezer', technicalDetails: new TechnicalDetails(40, 200, 100, 50) });
  return ([camera, guitar, freezer]);
}