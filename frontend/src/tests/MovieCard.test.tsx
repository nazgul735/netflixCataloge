import MovieCard from "../components/MovieCard";
import { render, screen } from "@testing-library/react";



describe("when MovieCard renders", () => {
    it("should return the correct information", () => {
        render(
            <MovieCard children={undefined} picture={""} storyline={"Dette er en storyline"} id={""} />
        );
        expect(
            screen.findAllByText("storyline")
        );
    })

})