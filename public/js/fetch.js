'use strict';

const customFetch = async (url) => {
  try {
    const response = await fetch(url);
    const result = response.json();

    return result;
  } catch (err) {
    console.log('Error fetching:-', err);
  }
};

export default customFetch;