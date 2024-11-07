import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'
describe('UserAccount', () => {
  const user:User = {
    id: 1,
    name: 'Pedro'
  }
  it('should render editButton if user is Admin', () => {
    const adminUser:User = {...user, isAdmin: true}
    render(<UserAccount user={adminUser} />)
    const editButton = screen.getByRole('button')
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent(/edit/i)
  })
  it('should not render editButton if user is not Admin', () => {
    const adminUser:User = {...user, isAdmin: false}
    render(<UserAccount user={adminUser} />)
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument();
  })
  it('should render userName', () => {
    render(<UserAccount user={user} />)
    expect(screen.getByText(user.name)).toBeInTheDocument();
  })
})