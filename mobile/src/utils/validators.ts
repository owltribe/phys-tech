export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0)
    return "Электронная почта не может быть пустой.";
  if (!re.test(email)) return "Упс! Нам нужна валидная электронная почта.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Пароль не может быть пустым.";

  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Имя не может быть пустым.";

  return "";
};
