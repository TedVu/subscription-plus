const nameRules = [
  (name: string) => {
    if (name?.length >= 3) return true;
    return 'Subscription name must be at least 3 characters.';
  },
];

const isAllDataCorrect = (
  name: string,
  date: string,
  subscriptionDateErrorMsg: boolean | undefined
) => {
  let isCorrect = true;

  // subscription name must be at least 3 characters
  if (name.length < 3) {
    isCorrect = false;
  }

  // subscription date must be filled
  if (date === null) {
    subscriptionDateErrorMsg = false;
    isCorrect = false;
  } else {
    subscriptionDateErrorMsg = undefined;
  }
  return isCorrect;
};

export { nameRules, isAllDataCorrect };
