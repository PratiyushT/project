import { useState } from "react";

export default function App() {
  const [userInput, setUserInput] = useState({
    value: "",
    isBeginning: true,
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const [numberArr, setNumberArr] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setNumberArr([]);
    const numberArr = userInput.value.split(/[, ]+/);

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
    const value = e.target.value.replace(/[^0-9, ]/g, "");
    setUserInput({ value, isBeginning: true });
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="w-screen h-screen flex flex-col justify-center items-center"
      >
        {/* INPUT AREA  */}
        <input
          value={userInput.value}
          onChange={changeHandler}
          type="text"
          placeholder="Enter your number"
          className="focus:outline-none border border-gray-400 py-1 px-2 focus:border-gray-700"
          required
        />

        {/* SUBMIT BUTTON  */}
        {userInput.isBeginning && loading === false && (
          <button type="submit">Is it even?</button>
        )}

        {/* LOADING TEXT  */}
        {loading && <p>Loading...</p>}

        {/* RESULT DISPLAY AREA  */}
        {numberArr.length > 0 &&
          numberArr.map((e) => {
            console.log(e);
            return (
              !userInput.isBeginning &&
              !loading && (
                <p>
                  The number {e.number} is {!e.iseven ? "odd" : "even"}.
                </p>
              )
            );
          })}
      </form>
    </div>
  );
}
