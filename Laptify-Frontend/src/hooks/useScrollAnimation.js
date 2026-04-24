import { useEffect, useRef } from "react";

export const useScrollAnimation = (
  options = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    animationClass: "animate-fade-in-scale",
  }
) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add(options.animationClass);
        observer.unobserve(element);
      }
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.animationClass, options.threshold, options.rootMargin]);

  return ref;
};

export default useScrollAnimation;
