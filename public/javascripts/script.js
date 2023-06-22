const button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log('You clicked me!');
    // create check out session
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 2 },
                { id: 3, quantity: 2 }

            ]
        })
    })

        .then(res => {
            // check if status is ok
            if (res.ok) return res.json()
            // if res not ok
            return res.json().then(json => Promise.reject(json))
        })
        // url
        .then(({ url }) => {
            window.location = url
            console.log(`window.location = url ${url}`);
            
        })
        .catch(e => {
            console.error(e.error)
        })
})





