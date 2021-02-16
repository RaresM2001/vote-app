const getApiUrl = () => {
  const environment = process.env.NODE_ENV;
  var url;
  if (environment == "development") url = "http://localhost:8081";
  else url = "https://vote-app-mrvit.herokuapp.com";
  return url;
}

export default  {
  getApiUrl
}