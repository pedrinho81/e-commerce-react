import { Text } from "@radix-ui/themes";
import { Translate } from "../components/Translate";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Text>
        <Translate labelId="welcome" />
      </Text>
    </div>
  );
};

export default HomePage;
