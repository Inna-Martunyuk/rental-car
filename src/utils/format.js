export const formatNumberWithCommas = (number) => {
  return new Intl.NumberFormat("uk-UA").format(number);
};
