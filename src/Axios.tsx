interface Headers {
    headers: {}
}

const headers = (): Headers  => {
    const jwt = localStorage.getItem('jwt')
    return {headers: {
        Authorization: `Bearer ${jwt}`
    }}
}


export default headers