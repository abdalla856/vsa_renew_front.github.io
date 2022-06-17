export default (user = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...user, userinfo: action.payload };
    case "FETCH_ALL":
      return action.payload;
    case "FETCHUSER":
      return  action.payload;
    default:
      return user;
  }
};
