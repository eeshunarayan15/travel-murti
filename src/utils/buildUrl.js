const buildUrl = (url, params = {}) => {
  let finalUrl = url;

  Object.keys(params).forEach((key) => {
    finalUrl = finalUrl.replace(`{${key}}`, params[key]);
  });

  return finalUrl;
};

export default buildUrl;