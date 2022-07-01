import React from "react";

export default function Welcome() {
  const callFunctionTemplate = async (name) => {
    let call = 'https://businessaide-backend.herokuapp.com/getEmployee/?';
    call = call + 'name=' + name; // do this for each parameter you want to send
    let result = await (await fetch(call)).json()
    console.log(result);
  }
  return (
    <div>
      <h1>welcome!</h1>
   
    </div>
  );
}
