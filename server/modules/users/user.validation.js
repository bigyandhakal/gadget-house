const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password)=>{
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return re.test(password)
}

module.exports = {validateEmail, validatePassword}