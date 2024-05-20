import { useState } from "react";

export default function Player({ initialName, symbol, isActive, changeNameHandler }) {
  const [name, changeName] = useState(initialName);
  const [editing, edit] = useState(false);

  function handleChange(event) {
    changeName(event.target.value);
  }

  var action = "Edit";
  let playerName = <span className="player-name">{name}</span>;
  if (editing) {
    playerName = (
      <input type="text" required value={name} onChange={handleChange} />
    );
    action = "Save";
  }

  function callEdit() {
    edit((update) => !update);
    if (editing) {
      changeNameHandler(symbol, name );
    }
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={callEdit}>{action}</button>
    </li>
  );
}
