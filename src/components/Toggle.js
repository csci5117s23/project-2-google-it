import { useState } from "react";
// https://webtips.dev/toggle-buttons-in-react
export default function Toggle({ label, toggled, onClick }) {
  const [isToggled, toggle] = useState(toggled);
  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label class="toggleLabel">
      <input class="toggleInput" type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span class="toggleSpan"></span>
      <strong class="toggleStrong">{label}</strong>
    </label>
  );
}