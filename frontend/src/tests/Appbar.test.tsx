import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {client, store} from "../setupTests"; 
import Appbar from "../components/Appbar"; 
beforeEach(()=>{

    render(
 <ApolloProvider client={client}>
    <BrowserRouter>
        <Provider store={store}>
        <Appbar/>
        </Provider>
    </BrowserRouter>
</ApolloProvider>
    );
});

describe("when rendered", () => {
    it("should display correct items", () => {
      expect(
        screen.getByText(/Movie database/i)
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText("search")
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
            name: /Log/i
          })
      ).toBeInTheDocument();
    });
  });

describe("when username exist in sessionStorage", () => {
    window.sessionStorage.setItem("username","faker")
    it("should display the logged in user", () => {
      expect(
        screen.getByText(/Logged in as faker/i)
      ).toBeInTheDocument();
    });
  });