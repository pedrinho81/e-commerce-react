import {
  Box,
  Card,
  Flex,
  Inset,
  Strong,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { Product } from "../../../entities";
import { QuantitySelector } from "../../cart/components/QuantitySelector";
import { priceFormat } from "../../../utils/priceFormat";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="max-w-full flex flex-col">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={product.image}
          alt={product.title}
          style={{
            display: "block",
            objectFit: "fill",
            width: "100%",
            height: 280,
            padding: "25px",
            background: "transparent",
          }}
        />
      </Inset>
      <Flex direction="column" className="flex-1">
        <Box className="h-12 overflow-hidden flex items-start">
          <Tooltip content={product.title} className="flex-1">
            <Text as="p" className="line-clamp-2 text-ellipsis">
              {product.title}
            </Text>
          </Tooltip>
        </Box>
        <hr className="my-2" />
      </Flex>
      <Flex align="center" justify="between">
        <Strong>{priceFormat(product.price)}</Strong>
        <QuantitySelector product={product} />
      </Flex>
    </Card>
  );
}
