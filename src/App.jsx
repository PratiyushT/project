import { useState } from "react";

export default function App() {
  const [userInput, setUserInput] = useState({
    value: "",
    isBeginning: true,
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const [isEven, setIsEven] = useState(false);
  const [displayMessage, setDisplayMessage] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    switch (true) {
      case userInput.value > 999999:
        alert("Enter a number smaller than 1,000,000");
        setUserInput({ value: 999999, isBeginning: true });
        break;
      case userInput.value < 1:
        alert("Enter a number greater than 0 ");
        setUserInput({ value: 1, isBeginning: true });
        break;

      default:
        setDisplayMessage(userInput.value);
        setUserInput({
          value: userInput.value,
          isBeginning: false,
          error: false,
        });

        setLoading(true);
        const resp = await fetch(
          `https://api.isevenapi.xyz/api/iseven/${Number(userInput.value)}`
        );
        setLoading(false);
        const data = await resp.json();

        setIsEven(data.iseven);
        setUserInput({ value: "" });
        break;
    }
  };

  const changeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9, ]/g, "");
    setDisplayMessage("beginning");
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
        {loading === true && <p>Loading...</p>}

        {/* RESULT DISPLAY AREA  */}
        <p>
          {isEven &&
            !userInput.isBeginning &&
            loading === false &&
            `${displayMessage} is an even number`}
        </p>
        <p>
          {!isEven &&
            !userInput.isBeginning &&
            loading === false &&
            `${displayMessage} is a odd number`}
        </p>
      </form>
    </div>
  );
}
