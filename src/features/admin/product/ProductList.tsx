import { Button, Flex, Table } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useProducts } from "../../product/hooks/useProducts";
import { SearchInput } from "../../product/components/SearchInput";
import { Translate } from "../../../components/Translate";

export const ProductListAdmin = () => {
  const { products, isProductsLoading, productsError, setSearch } =
    useProducts();

  const renderProducts = () => {
    if (isProductsLoading) return <div><Translate labelId="loading" /></div>;

    if (productsError) return <div>Error: {!String(productsError)}</div>;

    if (products!.length === 0) return <p><Translate labelId="no-products-found" /></p>;

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell><Translate labelId="name" /></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products!.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/products/${product.id}/edit`}><Translate labelId="edit" /></Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    );
  };

  return (
    <div>
      <h1 className="text-xl mb-2 "><Translate labelId="products" /></h1>
      <Flex gap="4" pb={"3"}>
        <SearchInput setSearch={setSearch} />
        <Link to="new">
          <Button><Translate labelId="new_product" /></Button>
        </Link>
      </Flex>
      {renderProducts()}
    </div>
  );
};
