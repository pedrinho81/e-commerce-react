interface TruncateProps {
  text: string;
  limit: number;
}

export const truncate = ({ text, limit }: TruncateProps) => {
  const truncatedText =  text.length >= limit ? text.substring(0, limit) + "..." : text;
  return truncatedText;
};
