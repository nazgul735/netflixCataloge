
import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {client, store} from "../setupTests"; 
import FilterModal from "../components/FilterModal"; 
beforeEach(()=>{
    render(
 <ApolloProvider client={client}>
    <BrowserRouter>
        <Provider store={store}>
        <FilterModal open={true} handleClose={()=>jest.fn()}/>
        </Provider>
    </BrowserRouter>
</ApolloProvider>
    );
});

describe("when rendered", () => {
    it("should display correct form attributes when opened", () => {
      expect(
        screen.getByText("Filter by genre")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Filter by year/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Selected genre")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("From year")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("To year")
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
            name: /Apply filter/i
          })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
            name: /Close filter/i
          })
      ).toBeInTheDocument();

      expect(screen.getAllByText(/genre/i)).toHaveLength(2);
    });

  });

