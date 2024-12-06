import { Grid, Text } from "@radix-ui/themes";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SearchInput } from "../features/product/components/SearchInput";
import { ProductCard } from "../features/product/components/ProductCard";

import { useProducts } from "../features/product/hooks/useProducts";
import { CategoriesSelect } from "../features/categories/components/CategoriesSelect";
import { PageTitle } from "../components/PageTitle";
import useLanguage from "../hooks/useLanguage";
import { CategoriesEnum } from "../features/categories/hooks/useCategories";
import { SortByIdSelect } from "../features/product/components/SortByIdSelect";

export function HomePage() {
  const { getLabel } = useLanguage();
  const { products, isProductsLoading, productsError, setSearch, setSortById } =
    useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    CategoriesEnum.ALL
  );
  if (productsError) return <div>Error: {!productsError}</div>;

  const renderProducts = () => {
    const skeletons = [1, 2, 3, 4, 5];

    if (productsError) return <div>Error: {!productsError}</div>;

    const visibleProducts =
      selectedCategory !== CategoriesEnum.ALL
        ? products?.filter((product) => product.category === selectedCategory)
        : products;

    return (
      <Grid
        columns="repeat(auto-fill, minmax(240px, 1fr))"
        gap={{ initial: "2", sm: "6" }}
        rows="repeat(2, 1fr)"
        width="auto"
        mt="4"
      >
        {isProductsLoading &&
          skeletons.map((_, index) => (
            <Skeleton key={index} width="256px" height="340px" />
          ))}
        {!products?.length && !isProductsLoading &&  <Text className="text-lg">No products</Text>}
        {visibleProducts?.map((product) => (
          <>
            <ProductCard key={product.id} product={product} />
          </>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <PageTitle title={getLabel("home-page")} />
      <div>
        <main>
          <section className="flex justify-between flex-wrap gap-4">
            <SearchInput setSearch={setSearch} />
            <div className="max-w-xs flex gap-4">
              <CategoriesSelect
                handleSelectCategoryId={(categoryId) =>
                  setSelectedCategory(categoryId)
                }
              />
              <SortByIdSelect handleSelectSort={setSortById} />
            </div>
          </section>
          {renderProducts()}
        </main>
      </div>
    </>
  );
}
