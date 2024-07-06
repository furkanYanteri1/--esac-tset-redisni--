import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

export function startTour() {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      classes: "shepherd-theme-arrows",
      scrollTo: { behavior: "smooth", block: "center" },
    },
    useModalOverlay: true,
  });

  tour.addStep({
    id: "generate-program",
    text: "Click this button to generate a new program.",
    attachTo: {
      element: ".generate-program-button",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  // Add the new step for the start button
  tour.addStep({
    id: "start-races",
    text: "Then start the races from here.",
    attachTo: {
      element: ".start-button",
      on: "bottom",
    },
    buttons: [
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.start();
}
