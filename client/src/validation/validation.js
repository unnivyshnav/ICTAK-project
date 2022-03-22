export const errorMessage = {
  password:
    "Should include at least 1 letter, 1 number and 1 special character!",
  email: "It should be a valid email address!",
  " confirmpassword": "Password don't match",
  others: "Cant be empty",
  phone: "Enter a valid phone number",
  option: "Must select one option",
  photo: "Must choose a file",
};

export const pattern = {
  password: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
  phone: `[1-9]{1}[0-9]{9}`,
};
