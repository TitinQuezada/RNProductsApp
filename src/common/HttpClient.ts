import axios from "axios";
import { Configuration } from "./Configuration";
import { AxiosError } from 'axios';
import { ErrorResponse } from "../interfaces/ErrorResponse";
import asyncStorage from "@react-native-async-storage/async-storage";

export const HttpClient = axios.create({
    baseURL: Configuration.apiUrl,
});

HttpClient.interceptors.request.use(async request => {
    const token = await asyncStorage.getItem('token');

    if (token) {
        request.headers = { ...request.headers, ['x-token']: token }
    }

    return request;
});

HttpClient.interceptors.response.use(response => response, (error: AxiosError): Promise<ErrorResponse> => {

    let errorMessage: string;

    if (error.response?.data.errors) {
        errorMessage = error.response?.data.errors[0].msg;
    } else {
        errorMessage = error.response?.data.msg;
    }

    const errorResponse: ErrorResponse = {
        errorMessage,
        status: error.response?.status,
    };

    return Promise.reject(errorResponse);
});