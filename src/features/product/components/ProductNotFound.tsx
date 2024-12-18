import { Box, Text } from "@radix-ui/themes";
import { Translate } from "../../../components/Translate";

interface ProductNotFoundProps {
  className?: string;
}

export function ProductNotFound({ className }: ProductNotFoundProps) {
  return (
    <>
      <Box
        className={`flex flex-col items-center col-span-full row-span-4 justify-center ${className} `}
      >
        <img
          src="/imgs/not-found.gif"
          className="w-72 h-72"
          alt="not-found-gif"
        />
        <Text className="text-lg">
          <Translate labelId="no-products-found" />
        </Text>
      </Box>
    </>
  );
}
