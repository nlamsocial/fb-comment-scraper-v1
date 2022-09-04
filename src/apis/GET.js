function GET() {
    let response;
    const url =
        'https://script.google.com/macros/s/AKfycbze4emIHihMyNkWxufJdl3Bvivr0gLff2kXFFcqS1UvSldB7WhIvquulCwWNpyi-jke/exec';
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            response = res;
        });

    return response;
}

export default GET;
