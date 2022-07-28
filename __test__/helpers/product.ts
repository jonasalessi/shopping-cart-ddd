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