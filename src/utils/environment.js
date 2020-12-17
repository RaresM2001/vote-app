const getApiUrl = () => {
  const environment = process.env.NODE_ENV;
  var url;
  if (environment == "development") url = "http://localhost:8081";
  else url = "http://localhost:8081";
  return url;
}

export default  {
  getApiUrl
}