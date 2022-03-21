import React from "react";
const lazy = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = "0px"
}) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold
    });
const current = target.current;
observer.observe(current);
return () => {
      observer.unobserve(current);
    };
  });
};
export default lazy;