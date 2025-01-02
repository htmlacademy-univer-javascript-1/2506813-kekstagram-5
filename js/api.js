const urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const sendRequest = (onSuccess, onFail, method, body) =>{
  fetch (
    urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const loadData = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);

const uploadData = (onSuccess, onFail, method = 'POST', body) => sendRequest(onSuccess, onFail, method, body);

export{loadData, uploadData};
