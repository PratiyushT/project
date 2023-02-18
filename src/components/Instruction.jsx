import React from "react";

const Instruction = () => {
  return <div className="bg-zinc-200 p-10 space-y-4" >
    <h1 className="text-center font-bold">How does this calculator work?</h1>
    <p>You can enter number or numbers that are separated by commas (",") or spaces (" ")</p>
    <p>Any number that is perfectly divisible by 2 is an even number. Others are odd.</p>
    <p>Only enter between the range of 0 to 999,999. Negative numbers and letters cannot be typed.</p>


  </div>
};

export default Instruction;
