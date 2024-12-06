import { TextField } from "@radix-ui/themes";
import { SearchIcon } from "../../../components/icons/SearchIcon";
import useLanguage from "../../../hooks/useLanguage";

interface SearchInputProps {
  setSearch: (search: string) => void;
}

export function SearchInput({ setSearch }: SearchInputProps) {
  const { getLabel } = useLanguage();
  return (
    <>
      <TextField.Root radius="large" size={"3"}>
        <TextField.Slot className="bg-inherit">
          <SearchIcon />
          <TextField.Input
            onChange={({ target }) => setSearch(target.value)}
            autoFocus
            placeholder={getLabel("search")}
            size="3"
          />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
}
