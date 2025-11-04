import { useCallback, useEffect } from "react";
import { driverInstance } from "../utils/driverInstance";

interface DriverStep {
  element?: string;
  popover: {
    title?: string;
    description: string;
  };
}

interface HighlightOptions {
  element: string;
  popover?: {
    title?: string;
    description: string;
  };
}

// Dynamically load Driver.js CSS only when needed
const loadDriverCSS = () => {
  if (typeof document !== "undefined" && !document.querySelector('link[href*="driver.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/node_modules/driver.js/dist/driver.css";
    document.head.appendChild(link);
  }
};

export const useDriver = () => {
  useEffect(() => {
    loadDriverCSS();
  }, []);

  const startTour = useCallback((steps: DriverStep[]) => {
    // Check if a tour is already active
    if (driverInstance.isActive()) {
      return;
    }

    driverInstance.setSteps(steps);
    driverInstance.drive();
  }, []);

  const highlightElement = useCallback((element: string, options?: Omit<HighlightOptions, "element">) => {
    driverInstance.highlight({
      element,
      ...options,
    });
  }, []);

  const destroyTour = useCallback(() => {
    driverInstance.destroy();
  }, []);

  const isTourActive = useCallback(() => {
    return driverInstance.isActive();
  }, []);

  return {
    driver: driverInstance,
    startTour,
    highlightElement,
    destroyTour,
    isTourActive,
  };
};
