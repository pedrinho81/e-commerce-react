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
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <Card className="max-w-full flex flex-col hover:scale-105 hover:transition-transform">
        <Link
          to={`/products/${product.id}`}
          className="text-zinc-800 hover:text-blue-800 "
        >
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={product.image}
              alt={product.title}
              className="block w-full h-[280px] p-7 object-contain lg:object-fill"
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
        </Link>
      </Card>
    </>
  );
}
