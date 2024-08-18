import axios from "axios";
import { ApiRoutes } from "./apiRoutes";
import { FetchSingleTicketOrderRequest } from "../models/ITicketOrder";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL_TEST,
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

export function useFetchTicketOrders() {
  async function fetchTicketOrders(userId: string) {
    return API.get(`${ApiRoutes.TicketOrders}?userId=${userId}`);
  }

  return fetchTicketOrders;
}

export function useFetchTicketOrder() {
  async function fetchTicketOrder({
    userId,
    orderId,
  }: FetchSingleTicketOrderRequest) {
    return API.get(
      `${ApiRoutes.TicketOrders}?userId=${userId}&orderId=${orderId}`
    );
  }

  return fetchTicketOrder;
}
