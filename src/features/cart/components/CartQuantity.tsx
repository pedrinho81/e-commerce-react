import { Badge, Flex } from "@radix-ui/themes";
import { useCart } from "../hooks/useCart"
import { AiOutlineShoppingCart } from "react-icons/ai";

export function CartQuantity() {
  const { getItemCount } = useCart();

  return (
    <Flex align={"center"} gap={"2"}>
      <AiOutlineShoppingCart />
      <Badge role="status">{getItemCount()}</Badge>
    </Flex>
  );
}
