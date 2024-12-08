import { Button, Flex, Table } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useProducts } from "../product/hooks/useProducts";
import { SearchInput } from "../product/components/SearchInput";

export const ProductListAdmin = () => {
  const { data: products, isLoading, error } = useProducts();

  const renderProducts = () => {
    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (products!.length === 0) return <p>No product was found!</p>;

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products!.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    );
  };

  return (
    <div>
      <h1 className="text-xl mb-2 ">Products</h1>
      <Flex gap="4" pb={"3"} >
        <SearchInput />
        <Link to="new">
          <Button>New Product</Button>
        </Link>
      </Flex>
      {renderProducts()}
    </div>
  );
};
