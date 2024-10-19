import { Link } from "react-router-dom";

function ToggleButton() {
  return (
    <>
      <div className="toggleButton">
        <div className="box">
          <Link to='/'  class="link">Play Offline</Link>
          <Link to='/computer' class="link">VS AI</Link>
        </div>
      </div>
    </>
  );
}

export default ToggleButton;
