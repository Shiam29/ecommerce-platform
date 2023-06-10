import {render, screen, fireEvent, renderHook} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CartPage from "./CartPage";

const mockNavigate = jest.fn();

jest.mock("lottie-react", () => ({
  Lottie: () => null,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CartPage", () => {
  it("renders the form", () => {
    render(<CartPage />);

    expect(screen.getByText("Street")).toBeInTheDocument();
    expect(screen.getByText("Suburb")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Card number")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pay now" })).toBeInTheDocument();
  });

  it("displays error messages for invalid inputs", async () => {
    render(<CartPage />);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Pay now" }));
    });

    expect(screen.getByText("Please enter a street address")).toBeInTheDocument();
    expect(screen.getByText("Please enter a suburb")).toBeInTheDocument();
    expect(screen.getByText("Please enter a cardholdername")).toBeInTheDocument();
    expect(screen.getByText("Invalid cvc")).toBeInTheDocument();
  });
});