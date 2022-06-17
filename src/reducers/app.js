export default (apps = [], action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "CREATE":
      return [...apps, action.payload];
    case "UPLOAD":
      return [...apps, action.payload];
    case "LOGIN":
      return action.payload;
      

    default:
      return apps;
  }
};
