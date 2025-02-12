import axios from "axios";
import { ApiRoutes } from "./apiRoutes";
import { TransactionFeeRequest } from "../models/ITransactionFee";
import { CouponCodeRequest } from "../models/ICoupon";
import { IEventEmail } from "../models/IEmail";
import { LoginUserRequest, LoginUserResponse } from "../models/ILoginUser";
import { EventVisibility } from "../enums/IEventVisibility";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL,
});

export const getApiConfig = (token: string) => {
  // This is the function that will be used to get the CSRF token
  //   const userToken = getAuthToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`, // all endpoints require a token
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
};

export function useRequestCredentialToken() {
  async function requestToken() {
    return API.get(ApiRoutes.RequestCredentialToken, getApiConfig(""));
  }

  return requestToken;
}

export function useLoginUser() {
  // Request token
  const requestToken = useRequestCredentialToken();

  async function loginUser(data: LoginUserRequest) {
    const token = await requestToken();

    return API.post<LoginUserResponse>(
      ApiRoutes.AdminUserLogin,
      data,
      getApiConfig(token.data.token)
    );
  }

  return loginUser;
}

export function useFetchAdminUser() {
  // Request token
  //   const requestToken = useRequestCredentialToken();
  async function fetchAdminUser(id: string, token: string) {
    return API.get(ApiRoutes.FetchAdminUser(id), getApiConfig(token));
  }

  return fetchAdminUser;
}

export function useFetchDashboardInfo() {
  async function fetchDashboardInfo(token: string) {
    return API.get(ApiRoutes.FetchDashboardKpis, getApiConfig(token));
  }

  return fetchDashboardInfo;
}

export function useFetchRecentTransactions() {
  async function fetchRecentTransactions(token: string) {
    return API.get(ApiRoutes.FetchRecentTransactions, getApiConfig(token));
  }

  return fetchRecentTransactions;
}

export function useFetchTicketOrder() {
  async function fetchTicketOrder(tickerOrderId: string, token: string) {
    return API.get(
      ApiRoutes.FetchSingleTicketOrder(tickerOrderId),
      getApiConfig(token)
    );
  }

  return fetchTicketOrder;
}

export function useFetchTicketOrders() {
  async function fetchTicketOrders(
    token: string,
    page?: string,
    limit?: string,
    searchQuery?: string,
    paymentStatus?: string
  ) {
    return API.get(
      `${ApiRoutes.TicketOrders}?page=${page ?? 1}&limit=${
        limit ?? 10
      }&searchQuery=${searchQuery ?? ""}${
        paymentStatus ? `&paymentStatus=${paymentStatus ?? ""}` : ""
      }`,
      getApiConfig(token)
    );
  }

  return fetchTicketOrders;
}

export function useFetchPayments() {
  async function fetchPayments(
    token: string,
    page?: string,
    limit?: string,
    searchQuery?: string,
    paymentStatus?: string
  ) {
    return API.get(
      `${ApiRoutes.Payments}?page=${page ?? 1}&limit=${
        limit ?? 10
      }&searchQuery=${searchQuery ?? ""}${
        paymentStatus ? `&paymentStatus=${paymentStatus ?? ""}` : ""
      }`,
      getApiConfig(token)
    );
  }

  return fetchPayments;
}

export function useVerifyPayment() {
  async function verifyPayment(token: string, transactionReference: string) {
    return API.get(ApiRoutes.VerifyPayment(transactionReference), getApiConfig(token));
  }

  return verifyPayment;
}

export function useFetchUsers() {
  async function fetchUsers(
    token: string,
    page?: string,
    limit?: string,
    searchQuery?: string,
    customerType?: "customers" | "organizers"
  ) {
    return API.get(
      `${ApiRoutes.Users}?page=${page ?? 1}&limit=${limit ?? 10}&searchQuery=${
        searchQuery ?? ""
      }${customerType ? `&customerType=${customerType ?? ""}` : ""}`,
      getApiConfig(token)
    );
  }

  return fetchUsers;
}

export function useFetchEvents() {
  async function fetchEvents(
    token: string,
    page?: string,
    limit?: string,
    searchQuery?: string,
    eventVisibility?: EventVisibility
  ) {
    return API.get(
      `${ApiRoutes.Events}?page=${page ?? 1}&limit=${limit ?? 10}&searchQuery=${
        searchQuery ?? ""
      }${eventVisibility ? `&visibility=${eventVisibility ?? ""}` : ""}`,
      getApiConfig(token)
    );
  }

  return fetchEvents;
}

export function useFetchTransactionFees() {
  async function fetchTransactionFees(token: string) {
    return API.get(ApiRoutes.TransactionFees, getApiConfig(token));
  }

  return fetchTransactionFees;
}

export function useCreateTransactionFee() {
  async function createTransactionFee(
    token: string,
    data: TransactionFeeRequest
  ) {
    return API.post(ApiRoutes.TransactionFees, data, getApiConfig(token));
  }

  return createTransactionFee;
}

export function useDeleteTransactionFee() {
  async function deleteTransactionFee(token: string, transactionFeeId: string) {
    return API.delete(
      `${ApiRoutes.TransactionFees}?transactionFeeId=${transactionFeeId}`,
      getApiConfig(token)
    );
  }

  return deleteTransactionFee;
}

export function useCreateCouponCode() {
  async function createCouponCode(token: string, data: CouponCodeRequest) {
    return API.post(ApiRoutes.CouponCodes, data, getApiConfig(token));
  }

  return createCouponCode;
}

export function useFetchCouponCodes() {
  async function fetchCouponCodes(token: string) {
    return API.get(ApiRoutes.CouponCodes, getApiConfig(token));
  }

  return fetchCouponCodes;
}

export function useDeleteCouponCode() {
  async function deleteCouponCode(token: string, couponCodeId: string) {
    return API.delete(
      `${ApiRoutes.CouponCodes}/${couponCodeId}`,
      getApiConfig(token)
    );
  }

  return deleteCouponCode;
}

export function useSendEmailToAllTicketOrderContacts() {
  async function sendEmailToAllTicketOrderContacts(
    userId: string,
    emailInfo: IEventEmail
  ) {
    return API.post(`${ApiRoutes.Events}?userId=${userId}`, emailInfo);
  }

  return sendEmailToAllTicketOrderContacts;
}
