import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Button } from "."

describe('<Button />', () => {
  it('should render the button with text "Load more"', () => {
    render(<Button text="Load more" />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function when the button get clicked', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />)

    const button = screen.getByRole('button', { name: /load more/i });
    userEvent.click(button)
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled attibute is true', () => {
    render(<Button text='Load more' disable={true} />)

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeDisabled();
  }); 

  it('should be enabled when disable is false', () => {
    render(<Button text="Load more" disable={false} />);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
  }) 

  it('should match the button snapshot', () => {
    const fn = jest.fn()
    const { container } = render(<Button text="Load more" disable={false} onClick={fn} />)
    expect(container.firstChild).toMatchSnapshot()
  })
});