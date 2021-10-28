import { ApolloProvider } from "@apollo/client";
import {render,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import { client, store } from "../setupTests";


beforeEach(()=>{
    render(
 <ApolloProvider client={client}>
    <BrowserRouter>
        <Provider store={store}>
        <Login/>
        </Provider>
    </BrowserRouter>
</ApolloProvider>
    );
});

describe("when rendered", () => {
    it("should display form", () => {
      expect(
        screen.getByLabelText("Username")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Password")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("LoginButton")
      ).toBeInTheDocument();
    });
    it("should display link to registration", () => {
        expect(
          screen.getByText(/Or click here to register as a new user/i)
        ).toBeInTheDocument();
      });
  });