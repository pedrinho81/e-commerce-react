import { Button, Flex, Text } from "@radix-ui/themes";
import { useCart } from "../hooks/useCart";
import { Product } from "../../../entities";

export const QuantitySelector = ({ product }: { product: Product }) => {
  const { getItem, addToCart, removeFromCart } = useCart();

  const cartItem = getItem(product);
  if (!cartItem)
    return (
      <Button
        className="hover:cursor-pointer"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    );

  return (
    <Flex gap="3" align="center" role="spinbutton">
      <Button
        className="hover:cursor-pointer"
        onClick={() => removeFromCart(product)}
      >
        -
      </Button>
      <Text role="status">{cartItem.quantity}</Text>
      <Button
        className="hover:cursor-pointer"
        onClick={() => addToCart(product)}
      >
        +
      </Button>
    </Flex>
  );
};
