import { Box, Flex, Strong, Text, Tooltip } from "@radix-ui/themes";
import { Product } from "../../../entities";
import { QuantitySelector } from "../../cart/components/QuantitySelector";
import { priceFormat } from "../../../utils/priceFormat";
import { ProductRating } from "./ProductRating";
import { ImageMagnifier } from "../../../components/ImageMagnifier";
import { Translate } from "../../../components/Translate";

interface ProductCardProps {
  product: Product;
}

export function ProductDetails({ product }: ProductCardProps) {
  return (
    <Box className="flex flex-col lg:grid lg:grid-cols-2">
      <ImageMagnifier
        alt={product.title}
        src={product.image}
        className="max-w-96 max-h-96 mx-auto"
      />
      <Flex direction="column" className="flex-1">
        <Box className="overflow-hidden flex flex-col gap-1 items-start">
          <Tooltip content={product.title} className="flex-1">
            <Text as="p">{product.title}</Text>
          </Tooltip>
          <Strong>{priceFormat(product.price)}</Strong>
        </Box>
        <hr className="my-2" />
        <small className="text-gray-800">
          <Translate labelId="description" />
        </small>
        <Text className="text-sm text-gray-800">{product.description} </Text>
        <hr className="my-2" />
        <ProductRating rating={product.rating} />
        <hr className="my-2" />
        <QuantitySelector product={product} />
      </Flex>
    </Box>
  );
}
