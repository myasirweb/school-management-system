const REWARDS_KEY = "sms_rewards";

export const loadRewards = () => {
  try {
    const serialized = localStorage.getItem(REWARDS_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveRewards = (rewards) => {
  try {
    localStorage.setItem(REWARDS_KEY, JSON.stringify(rewards));
  } catch {
    // ignore
  }
};

export const clearRewards = () => {
  try {
    localStorage.removeItem(REWARDS_KEY);
  } catch {
    // ignore
  }
};
