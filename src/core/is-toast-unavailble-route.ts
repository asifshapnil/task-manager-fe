const routesNotShowingToast = [
  "/tickethistory",
  "signup",
  "signin"
];

export const isToastUnavailableRoute = (responseUrl: string) => {
  let matched = false;

  for (let route of routesNotShowingToast) {
    if (responseUrl.includes(route)) {
      matched = true;
    }
  }

  return matched;
};
