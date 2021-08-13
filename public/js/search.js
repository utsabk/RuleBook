'use strict';

const searchInput = document.getElementById('serach-input');

searchInput.addEventListener('keyup', async(event) =>{

    event.preventDefault();

    const query = searchInput.value;

    console.log('search query:-',query)

})