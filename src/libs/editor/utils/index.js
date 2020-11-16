export const message = {
  error: (str) => alert(str),
  confirm: ({ title, onOk }) => {
    var result = prompt(title, "");
    if (result != null) {
      onOk(result);
    }
  },
};
export const preventParentEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
