'use strict';

import fetch from 'node-fetch';


const customFetch = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  return text;
};

export default customFetch;