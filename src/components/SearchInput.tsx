import { TextField } from "@radix-ui/themes";
import { SearchIcon } from "./icons/SearchIcon";
import useLanguage from "../hooks/useLanguage";

export function SearchInput() {
  const { getLabel } = useLanguage();
  return (
    <>
      <TextField.Root radius="large" size={"3"}>
        <TextField.Slot  className="bg-inherit">
          <SearchIcon />
          <TextField.Input
            autoFocus
            placeholder={getLabel("search")}
            size="3"
          />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
}
