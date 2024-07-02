import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function setToken(access_token: string, refresh_token: string) {
    cookies.set("access_token", access_token, { path: "/" });
    cookies.set("refresh_token", refresh_token, { path: "/" });
    const user = jwtDecode(access_token);
    localStorage.setItem("userpublicinfo", JSON.stringify(user));
    window.location.href = 'http://localhost:3001';
}

export function removeToken() {
    cookies.remove("access_token", { path: "/" });
    cookies.remove("refresh_token", { path: "/" });
}


export function getTokenDcrypted(token: any) {
    return jwtDecode(token);
}

export function getUserInfo() {
    const user = JSON.parse(
        JSON.parse(JSON.stringify(localStorage.getItem("userpublicinfo")))
    );
    return user;
}

export function clearAllCookies() {
    const allCookies = cookies.getAll();

    for (const cookieName in allCookies) {
        cookies.remove(cookieName);
    }
}

export async function signOut() {
    clearAllCookies();
    localStorage.clear();
}

export function getLoginStatus(): Promise<boolean> {
    return new Promise((resolve) => {
        if(cookies.get('access_token')) return resolve(true);
        return resolve(false);
    })
}
