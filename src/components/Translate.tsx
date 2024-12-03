import useLanguage from "../hooks/useLanguage";

export const Translate = ({ labelId }: { labelId: string }) => {
  const { getLabel } = useLanguage();

  return <>{getLabel(labelId)}</>;
};

