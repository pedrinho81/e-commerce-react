interface CapitalizeProps {
  str: string;
  eachWord?: boolean;
}

export const capitalize = ({ str, eachWord = false }: CapitalizeProps) => {
  if (!str) return "";

  if (eachWord) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
