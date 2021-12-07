import moment from "moment";

export const formatDate = (data) => {
  return moment(data).format("DD/MM/YYYY");
};

export const formatDateTwo = (date) => {
  return (
    date.substring(6, 10) +
    "-" +
    date.substring(3, 5) +
    "-" +
    date.substring(0, 2)
  );
};
