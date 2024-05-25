import { Ref } from "vue";
const nameRules = [
  (name: string) => {
    if (name?.length >= 3) return true;
    return "Subscription name must be at least 3 characters.";
  },
];

const isAllDataCorrect = (
  name: string,
  date: string,
  subscriptionDateErrorMsg: Ref<boolean | undefined>
) => {
  let isCorrect = true;

  if (name.length < 3) {
    isCorrect = false;
  }

  if (!date) {
    subscriptionDateErrorMsg.value = false;
    isCorrect = false;
  } else {
    subscriptionDateErrorMsg.value = undefined;
  }
  return isCorrect;
};

export { nameRules, isAllDataCorrect };
