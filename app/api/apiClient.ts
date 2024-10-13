import axios from "axios";
import { ApiRoutes } from "./apiRoutes";
import { FetchSingleTicketOrderRequest } from "../models/ITicketOrder";
import { TransactionFeeRequest } from "../models/ITransactionFee";
import { CouponCodeRequest } from "../models/ICoupon";
import { IEventEmail } from "../models/IEmail";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL_DEV,
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

export function useFetchTransactionFees() {
    async function fetchTransactionFees(userId: string) {
        return API.get(`${ApiRoutes.TransactionFees}?userId=${userId}`);
    }
    
    return fetchTransactionFees;
}

export function useCreateTransactionFee() {
    async function createTransactionFee(userId: string, data: TransactionFeeRequest) {
        return API.post(`${ApiRoutes.TransactionFees}?userId=${userId}`, data);
    }
    
    return createTransactionFee;
}

export function useDeleteTransactionFee() {
    async function deleteTransactionFee(userId: string, transactionFeeId: string) {
        return API.delete(`${ApiRoutes.TransactionFees}?userId=${userId}&transactionFeeId=${transactionFeeId}`);
    }
    
    return deleteTransactionFee;
}

export function useFetchEvents() {
  async function fetchEvents(userId: string, eventId?: string) {
    return API.get(`${ApiRoutes.Events}?userId=${userId}&eventId=${eventId ?? ''}`);
  }

  return fetchEvents;
}

export function useCreateCouponCode() {
  async function createCouponCode(userId: string, data: CouponCodeRequest) {
    return API.post(`${ApiRoutes.CouponCodes}?userId=${userId}`, data);
  }

  return createCouponCode;
}

export function useFetchCouponCodes() {
    async function fetchCouponCodes(userId: string) {
        return API.get(`${ApiRoutes.CouponCodes}?userId=${userId}`);
    }
    
    return fetchCouponCodes;
}

export function useDeleteCouponCode() {
    async function deleteCouponCode(userId: string, couponCodeId: string) {
        return API.delete(`${ApiRoutes.CouponCodes}?userId=${userId}&couponId=${couponCodeId}`);
    }
    
    return deleteCouponCode;
}

export function useSendEmailToAllTicketOrderContacts() {
    async function sendEmailToAllTicketOrderContacts(userId: string, emailInfo: IEventEmail) {
        return API.post(`${ApiRoutes.Events}?userId=${userId}`, emailInfo);
    }
    
    return sendEmailToAllTicketOrderContacts;
}