export const formatCost = (value: string | number) => {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`;
};
