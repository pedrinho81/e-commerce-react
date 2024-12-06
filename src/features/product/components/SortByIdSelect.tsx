import { Select } from "@radix-ui/themes";

import { ProductsSortEnum } from "../hooks/useProducts";
import useLanguage from "../../../hooks/useLanguage";

interface ProductSelectProps {
  handleSelectSort: (sort: ProductsSortEnum) => void;
}

export function SortByIdSelect({
  handleSelectSort,
}: ProductSelectProps) {
  const { getLabel } = useLanguage();

  return (
    <Select.Root onValueChange={(sort) => handleSelectSort(sort as ProductsSortEnum)}>
      <Select.Trigger placeholder={getLabel("order-by")} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{getLabel("order-by")}</Select.Label>
          <Select.Item value={ProductsSortEnum.ASC}>
            {getLabel("ascending")}
          </Select.Item>
          <Select.Item value={ProductsSortEnum.DESC}>
            {getLabel("descending")}
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
