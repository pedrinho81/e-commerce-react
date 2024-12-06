import { Select } from "@radix-ui/themes";

import { CategoriesEnum, useCategories } from "../hooks/useCategories";
import Skeleton from "react-loading-skeleton";
import { capitalize } from "../../../utils/capitalize";

interface CategoriesSelectProps {
  handleSelectCategoryId: (category: string) => void;
}

export function CategoriesSelect({
  handleSelectCategoryId,
}: CategoriesSelectProps) {
  const { categories, isLoadingCategories, categoriesError } = useCategories();
  if (isLoadingCategories) return <Skeleton />;
  if (categoriesError) return <div>Error: {!categoriesError}</div>;
  return (
    <Select.Root onValueChange={(category) => handleSelectCategoryId(category)}>
      <Select.Trigger placeholder="Filter by Category" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Category</Select.Label>
          <Select.Item value={CategoriesEnum.ALL}>All</Select.Item>
          {categories?.map((category) => (
            <Select.Item key={category} value={category}>
              {capitalize({ str: category, eachWord: true })}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
