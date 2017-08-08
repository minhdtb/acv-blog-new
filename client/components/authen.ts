import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export function login(credentials): Promise<any> {
    let url = `${BASE_URL}/api/login`;
    return new Promise((resolve, reject) => {
        axios.post(url, credentials).then(value => {
            resolve(value.data);
        }).catch(reject);
    });
}

export function isLogged(): boolean {
    return false;
}