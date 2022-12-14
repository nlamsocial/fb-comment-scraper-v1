function POST(data) {
    console.log(data);
    console.log('POSTING');

    const url =
        'https://script.google.com/macros/s/AKfycbze4emIHihMyNkWxufJdl3Bvivr0gLff2kXFFcqS1UvSldB7WhIvquulCwWNpyi-jke/exec';
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((res) => console.log(res));
}

export default POST;
