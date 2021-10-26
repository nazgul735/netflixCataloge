import { render, screen } from "@testing-library/react";
import ReviewCard from "../components/ReviewCard";



describe("when ReviewCard renders", () => {
    it("should return the correct information", () => {
        render(
            <ReviewCard rating={0} />
        );
        expect(
            screen.findAllByText("user")
        );
    })

})