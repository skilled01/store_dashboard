import Swal from "sweetalert2/dist/sweetalert2.js";
export default  (store: any, message: string|null = null) => {
  const error = Object.values(store.errors);

  if (error.length === 0) {
    Swal.fire({
      text: message ?? "You have successfully logged in!",
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      heightAuto: true,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-primary",
      },
    });
  } else {
    Swal.fire({
      text: error[0] as string,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Try again!",
      heightAuto: true,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    }).then(() => {
      store.errors = {};
    });
  }
};
