import React, { useState } from "react";
import Instruction from "./Instruction";

const Main = () => {
  const [userInput, setUserInput] = useState({
    value: "",
    isBeginning: true,
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const [numberArr, setNumberArr] = useState([]);
  const [showInstruction, setShowInstruction] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    setNumberArr([]);
    const numberArr = userInput.value.trim().split(/[, ]+/);

    numberArr.forEach(async (arrayNumber) => {
      const number = Number(arrayNumber);
      switch (true) {
        case number > 999999:
          alert("Enter a number smaller than 1,000,000");
          setUserInput({ value: 999999, isBeginning: true });
          break;
        case number < 1:
          alert("Enter a number greater than 0 ");
          setUserInput({ value: 1, isBeginning: true });
          break;
        default:
          setLoading(true);
          const resp = await fetch(
            `https://api.isevenapi.xyz/api/iseven/${number}`
          );
          setLoading(false);
          const data = await resp.json();
          setNumberArr((prevArr) => [
            ...prevArr,
            { number, iseven: data.iseven },
          ]);

          setUserInput({ value: "" });
          break;
      }
    });
  };

  const changeHandler = (e) => {
    setShowInstruction(false);
    const value = e.target.value.replace(/[^0-9, ]/g, "");
    setUserInput({ value, isBeginning: true });
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center space-y-4"
      >
        {/* INPUT AREA  */}
        <input
          value={userInput.value}
          onChange={changeHandler}
          type="text"
          placeholder="Enter your number"
          className="focus:outline-none border border-gray-400 py-1 px-2 focus:border-gray-700 rounded-md"
          required
        />

        {/* SUBMIT BUTTON  */}
        {userInput.isBeginning && loading === false && (
          <button
            type="submit"
            className="bg-green-400 text-white py-2 px-2 font-semibold rounded-md hover:bg-green-600"
          >
            Calculate
          </button>
        )}

        {/* LOADING TEXT  */}
        {loading && (
          <p className="bg-green-400 text-white py-2 px-2 font-semibold rounded-md">
            Loading...
          </p>
        )}

        {/* RESULT DISPLAY AREA  */}
        {numberArr.length > 0 && !userInput.isBeginning && !loading && (
          <div className="bg-gray-100 p-8 space-y-5 rounded-md font-semibold">
            {numberArr.map((e) => {
              return (
                <>
                  <p className="">
                    The number {e.number} is{" "}
                    <span className="font-bold">
                      {!e.iseven ? "odd" : "even"}
                    </span>
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
        )}
      </form>

      {showInstruction && <Instruction />}
    </div>
  );
};

export default Main;
