import React, { useState } from "react";
import Instruction from "./Instruction";
import Results from "./Results";

const Main = () => {
  const [userInput, setUserInput] = useState({
    value: "",
    isBeginning: true,
    showInstruction: true,
  });
  const [loading, setLoading] = useState(false);
  const [numberArr, setNumberArr] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setNumberArr([]);

    //Create array by splitting at "," or " " and also check for repetition
    let numberArr = [];
    const initialArr = userInput.value.trim().split(/[, ]+/);
    initialArr.forEach((element) => {
      if (!numberArr.includes(element)) {
        numberArr.push(element);
      }
    });

    //Fetch data from API for every number in the array
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

          setUserInput({ value: "", showInstruction: false });
          break;
      }
    });
  };

  //Check at every change in input box.
  const changeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9, ]/g, "");
    setUserInput({ value, isBeginning: true, showInstruction: true });
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
          <Results numberArr={numberArr} />
        )}
      </form>

      {/* SHOW INSTRUCTIONS AREA  */}
      {userInput.showInstruction && <Instruction />}
    </div>
  );
};

export default Main;
