const axios = require('axios')

function updateUser(){
    let firstName = $('#firstName').val
    let lastName = $('#lastName').val

    axios.put('/', {
        firstName: firstName,
        lastName: lastName
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}


