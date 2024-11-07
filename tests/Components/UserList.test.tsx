import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should renders no users when the users array is empty", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
  it("should render list of users when users array is filled", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Pedro",
      },
      {
        id: 2,
        name: "Henrique",
      },
    ];
    render(<UserList users={users} />);
    expect(screen.queryByText(/no users/i)).not.toBeInTheDocument();
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
