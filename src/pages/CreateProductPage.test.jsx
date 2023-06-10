import {render, screen, fireEvent, renderHook} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CreateProductPage from "./CreateProductPage";
import {useAuth} from "../contexts/AuthProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CreateProductPage", () => {

  it("renders the form", () => {
    render(<CreateProductPage />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Image URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("displays error messages for invalid inputs", async () => {
    render(<CreateProductPage />);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Create" }));
    });

    expect(screen.getByText("Please enter a name")).toBeInTheDocument();
    expect(screen.getByText("Price must be greater than 0")).toBeInTheDocument();
  });
});