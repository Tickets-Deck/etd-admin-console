import axios from "axios";
import { ApiRoutes } from "./apiRoutes";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL_LIVE,
});

export function useFetchDashboardInfo() {
  async function fetchDashboardInfo(userId: string) {
    return API.get(`${ApiRoutes.FetchDashboardKpis}?userId=${userId}`);
  }

  return fetchDashboardInfo;
}

export function useFetchRecentTransactions() {
  async function fetchRecentTransactions(userId: string) {
    return API.get(`${ApiRoutes.FetchRecentTransactions}?userId=${userId}`);
  }

  return fetchRecentTransactions;
}

export function useFetchPayments() {
  async function fetchPayments(userId: string) {
    return API.get(`${ApiRoutes.Payments}?userId=${userId}`);
  }

  return fetchPayments;
}

export function useFetchUsers() {
  async function fetchUsers(userId: string) {
    return API.get(`${ApiRoutes.Users}?userId=${userId}`);
  }

  return fetchUsers;
}