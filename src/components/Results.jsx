import React from "react";

const Results = ({ numberArr }) => {
  return (
    <div className="bg-gray-100 p-8 space-y-5 rounded-md font-semibold">
      {numberArr.map((e) => {
        return (
          <>
            <p className="">
              The number {e.number} is{" "}
              <span className="font-bold">{!e.iseven ? "odd" : "even"}</span>
            </p>
            <div className="flex text-lg border-b-2">
              <p className="relative top-2.5">2</p>
              <div className="border-t-4 border-l-4 border-r-4 h-12 mx-2.5">
                <p className="py-1.5 text-center px-2">{e.number}</p>
              </div>
              <p className="relative top-2.5">{e.number / 2}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Results;
