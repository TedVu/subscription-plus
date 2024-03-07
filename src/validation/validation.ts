const nameRules = [
  (name: string) => {
    if (name?.length >= 3) return true;
    return 'Subscription name must be at least 3 characters.';
  },
];

const isAllDataCorrect = (name: string) => {
  let isCorrect = true;

  // subscription name must be at least 3 characters
  if (name.length < 3) {
    isCorrect = false;
  }

  return isCorrect;
};

export { nameRules, isAllDataCorrect };
