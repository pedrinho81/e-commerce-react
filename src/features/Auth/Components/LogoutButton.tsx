import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@radix-ui/themes";
import { Translate } from "../../../components/Translate";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      color="red"
      variant="soft"
      className="hover:cursor-pointer"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <Translate labelId="logout" />
    </Button>
  );
};
