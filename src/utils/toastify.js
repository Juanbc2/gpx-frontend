import { toast } from "react-toastify";

export const notify = (type, message) => {
  toast[type](message);
};
