import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "@radix-ui/themes";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const AuthStatus = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
 console.log(user)
  if (isLoading) return <div>Loading...</div>;
  //TODO:: Show 
  if (isAuthenticated)
    return (
      <div className="flex space-x-2 items-center">
        <img className="w-8 h-8 rounded-full" src={user?.picture} />
        <LogoutButton />
      </div>
    );

  return <LoginButton />;
};
