'use strict';

import fetch from 'node-fetch';

const customFetch = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (err) {
    console.log('Error fetching:-', err);
  }
};

export default customFetch;
