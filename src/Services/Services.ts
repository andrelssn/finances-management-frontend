import axios, { type AxiosResponse } from "axios";

type LoginData = {
    email: string;
    password: string;
};

type fetchResponse =
  | { success: true; response: AxiosResponse }
  | { success: false; response?: AxiosResponse; message?: string };

export async function getData(uri: string): Promise<fetchResponse> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.get(apiUrl + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return { success: true, response };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Erro desconhecido" };
    }
}

export async function postData(data: { uri: string, body: unknown }): Promise<fetchResponse> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.post(apiUrl + data.uri, JSON.stringify(data.body), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return { success: true, response };
    } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            return { success: false, response: error.response };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Erro desconhecido" };
    }
}

export async function putData(data: { uri: string, body: string[] }) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.put(apiUrl + data.uri, JSON.stringify(data.body), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export async function deleteData(uri: string) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.delete(apiUrl + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}


export async function loginPostData(data: { uri: string; body: LoginData }): Promise<fetchResponse> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.post(apiUrl + data.uri, data.body, {
            headers: { "Content-Type": "application/json" },
        });

        return { success: true, response };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Erro desconhecido" };
    }
}

export async function logoutData(uri: string) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL as string;

        const response = await axios.post(apiUrl + uri, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

interface SecurityManagementInterface {
    data: {
        t: string;
    };
}

export function SecurityManagement(response: SecurityManagementInterface) {
    const loginResponse = response;
    console.log(response);

    const split1 = loginResponse.data.t.split("|")[0];
    const split2 = loginResponse.data.t.split("|")[1];

    sessionStorage.setItem("s1", split1);
    localStorage.setItem("s2", split2);

    return true;
}

export const getSecurityKey = () => {
    const s1 = sessionStorage.getItem("s1");
    const s2 = localStorage.getItem("s2");

    const key = s1 + "|" + s2;

    return key;
}

export const clearSecurity = () => {
    localStorage.clear();
    sessionStorage.clear();
}