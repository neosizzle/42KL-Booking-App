import { useState, useLayoutEffect } from "react";

/*
**Custom hook that sets the window width and height when resize
*/
const useWindowWidth = () => {
	const [width, setWidth] = useState(0);
	useLayoutEffect(() => {
	  function updateWidth() {
		setWidth(window.innerWidth);
	  }
	  window.addEventListener('resize', updateWidth);
	  updateWidth();
	  return () => window.removeEventListener('resize', updateWidth);
	}, []);
	return width;
  }

export default useWindowWidth;