import React from "react";
import Review from "./Review";

const ReviewCart = () => {
  return (
    <section className="bg-[#F9FCFF]">
      <div className="container mx-auto px-5 pt-16 pb-16 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-primary font-bold">Clients Review</h2>
          <p className="text-accent text-sm">
            Most popular blog of this website, created by expart
          </p>
        </div>
        <div>
          <Review />
        </div>
      </div>
    </section>
  );
};

export default ReviewCart;
