import React from "react";
import { it, describe, expect, beforeEach, jest } from "@jest/globals";
import { createProduct } from "../api/products";
import CreateProductPage from "./CreateProductPage";
import { render, fireEvent, screen } from "@testing-library/react";

const mockUseForm = () => ({
  useForm: jest.fn(),
});

const mockProductsApi = () => ({
  createProduct: jest.fn(),
})

jest.mock("../api/products", () => ({
  createProduct: () => null
}))

jest.mock("@mantine/form", () => ({
  default: mockUseForm,
}))

describe("CreateProductPage", () => {
  describe("when user is not logged in", () => {
    beforeEach(() => {
      render(<CreateProductPage />);
    });

    it("should redirect to login page", () => {
      expect(screen.getByText("Log in")).toBeInTheDocument();
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      const user = {
        name: "test user",
        email: "test@test.com",
        token: "abc123",
      };
      render(<CreateProductPage user={user} />);
    });

    it("should render form inputs", () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });

    it("should call submit handler when form is submitted", () => {
      fireEvent.submit(screen.getByTestId("create-product-form"));
      expect(useForm().handleSubmit).toHaveBeenCalledTimes(1);
    });

    describe("on successful form submission", () => {
      beforeEach(() => {
        createProduct.mockResolvedValue({ success: true });

        fireEvent.submit(screen.getByTestId("create-product-form"));
      });

      it("should redirect to homepage", () => {
        // We'll assert that the page redirects to the homepage after a successful form submission
        expect(window.location.href).toEqual("/");
      });
    });

    describe("on form submission error", () => {
      beforeEach(() => {
        // We'll mock the createProduct function to return an error response
        // This simulates the scenario where the form submission fails
        createProduct.mockRejectedValue(new Error("Submission error"));

        // We'll trigger a form submission by firing a submit event on the rendered form
        fireEvent.submit(screen.getByTestId("create-product-form"));
      });

      it("should display error message", async () => {
        // We'll assert that the page displays an error message after a failed form submission
        expect(await screen.findByText("Submission error")).toBeInTheDocument();
      });
    });
  });
});
