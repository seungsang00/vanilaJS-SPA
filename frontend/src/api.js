const API_ENDPOINT = 'http://localhost:4001';

async function getResponse(url) {
  try {
    const result = await fetch(url);
    const returnCode = result.status;

    if (returnCode === 200) {
      return result.json();
    } else {
      throw { returnCode, msg: '데이터 요청 실패. 잠시 후 다시 요청해주세요.' };
    }
  } catch (exception) {
    const { returnCode } = exception;
    const regexClientError = new RegExp('4[0-9]{2}$');
    const regexServerError = new RegExp('5[0-9]{2}$');

    if (regexClientError.test(returnCode)) {
      console.log('Client Request Error : ', returnCode);
    } else if (regexServerError.test(returnCode)) {
      console.log('Internal Server Error : ', returnCode);
    } else {
      console.log('Request Error : ', returnCode);
    }

    return { data: null };
  }
}

const api = {
  fetchBestContents: () => {
    const url = `${API_ENDPOINT}/api/best`;
    return getResponse(url);
  },

  fetchAllContents: () => {
    const url = `${API_ENDPOINT}/api/content/all`;
    return getResponse(url);
  },

  fetchContents: ({ category, page = 1 }) => {
    const url = `${API_ENDPOINT}/api/content/${category}?page=${page}`;
    return getResponse(url);
  },

  fetchDetail: (contentUrl) => {
    const url = `${API_ENDPOINT}/api/detail${contentUrl}`;
    return getResponse(url);
  },
};

export default api;
