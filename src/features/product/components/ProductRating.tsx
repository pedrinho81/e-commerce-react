import { IoMdStarOutline, IoMdStar, IoMdStarHalf } from "react-icons/io";

import { Rating } from "../../../entities";
import { Text } from "@radix-ui/themes";
import { Translate } from "../../../components/Translate";

interface RatingProps {
  rating: Rating;
}

export function ProductRating({ rating }: RatingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFull = index < Math.floor(rating.rate);
          const isHalf =
            index === Math.floor(rating.rate) && rating.rate % 1 !== 0;

          return (
            <div key={index} className="flex justify-center">
              <RatingIcon full={isFull} half={isHalf} />
            </div>
          );
        })}
        <Text as="span" className="text-xs text-gray-400">
          {rating.count} <Translate labelId="reviews" />
        </Text>
      </div>
    </div>
  );
}

const RatingIcon = ({ full, half }: { full: boolean; half: boolean }) => {
  if (full) return <IoMdStar color="gold" />;
  if (half) return <IoMdStarHalf color="gold" />;
  return <IoMdStarOutline color="#E0E0E0" />;
};
