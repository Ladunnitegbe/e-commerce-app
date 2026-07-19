import { useState, useCallback } from "react";

export default function Toggle({ initialOn = false, render }) {
  const [on, setOn] = useState(initialOn);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return render(on, toggle);
}
