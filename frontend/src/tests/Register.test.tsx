import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {client, store} from "../setupTests"; 
import Register from "../pages/register/Register";
beforeEach(()=>{
    render(
 <ApolloProvider client={client}>
    <BrowserRouter>
        <Provider store={store}>
        <Register/>
        </Provider>
    </BrowserRouter>
</ApolloProvider>
    );
});

describe("when rendered", () => {
    it("should display register form", () => {
      expect(
        screen.getByLabelText("Username")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("E-mail")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Password")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Retype password")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("RegisterButton")
      ).toBeInTheDocument();
    });
  });