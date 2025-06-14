"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Ban, Eye, TicketCheck } from "lucide-react";
import { Payment } from "@/models/IPayment";
import { PaymentStatus } from "@/enums/IPaymentStatus";
import { PaymentServiceProvider } from "@/enums/IPaymentServiceProvider";
import { serializer } from "@/constants/serializer";
import moment from "moment";
import { NairaPrice } from "@/constants/priceFormatter";

interface PaymentsTableProps {
  onViewTicket?: (payment: Payment) => void;
}

export function PaymentsTable({ onViewTicket }: PaymentsTableProps) {
  const dummyPayments: Payment[] = [
    {
      id: "pay_1",
      userId: "user_1",
      ticketOrderId: "order_1",
      amount: "15000.00",
      amountPaid: "15000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_123456789",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: "2023-05-15T10:30:00Z",
      createdAt: "2023-05-15T10:25:00Z",
      updatedAt: "2023-05-15T10:30:00Z",
      user: {
        id: "user_1",
        firstName: "John",
        lastName: "Doe",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_1",
        orderId: "ORD-001",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_2",
      userId: "user_2",
      ticketOrderId: "order_2",
      amount: "25000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Pending,
      paymentReference: "ref_987654321",
      paymentServiceProvider: PaymentServiceProvider.Flutterwave,
      paidAt: null,
      createdAt: "2023-05-16T11:20:00Z",
      updatedAt: "2023-05-16T11:20:00Z",
      user: {
        id: "user_2",
        firstName: "Jane",
        lastName: "Smith",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_2",
        orderId: "ORD-002",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_3",
      userId: "user_3",
      ticketOrderId: "order_3",
      amount: "10000.00",
      amountPaid: "10000.00",
      currency: "USD",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_555666777",
      paymentServiceProvider: PaymentServiceProvider.BankTransfer,
      paidAt: "2023-05-17T14:45:00Z",
      createdAt: "2023-05-17T14:30:00Z",
      updatedAt: "2023-05-17T14:45:00Z",
      user: {
        id: "user_3",
        firstName: "Michael",
        lastName: "Johnson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_3",
        orderId: "ORD-003",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_4",
      userId: "user_4",
      ticketOrderId: "order_4",
      amount: "5000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Failed,
      paymentReference: "ref_888999000",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: null,
      createdAt: "2023-05-18T09:15:00Z",
      updatedAt: "2023-05-18T09:30:00Z",
      user: {
        id: "user_4",
        firstName: "Sarah",
        lastName: "Williams",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_4",
        orderId: "ORD-004",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_5",
      userId: "user_5",
      ticketOrderId: "order_5",
      amount: "30000.00",
      amountPaid: "30000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_111222333",
      paymentServiceProvider: PaymentServiceProvider.Cash,
      paidAt: "2023-05-19T16:20:00Z",
      createdAt: "2023-05-19T16:00:00Z",
      updatedAt: "2023-05-19T16:20:00Z",
      user: {
        id: "user_5",
        firstName: "David",
        lastName: "Brown",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_5",
        orderId: "ORD-005",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    // Additional payments with varied data
    {
      id: "pay_6",
      userId: "user_6",
      ticketOrderId: "order_6",
      amount: "12000.00",
      amountPaid: "12000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_444555666",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: "2023-05-20T12:10:00Z",
      createdAt: "2023-05-20T12:00:00Z",
      updatedAt: "2023-05-20T12:10:00Z",
      user: {
        id: "user_6",
        firstName: "Emily",
        lastName: "Davis",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_6",
        orderId: "ORD-006",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_7",
      userId: "user_7",
      ticketOrderId: "order_7",
      amount: "18000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Pending,
      paymentReference: "ref_777888999",
      paymentServiceProvider: PaymentServiceProvider.Flutterwave,
      paidAt: null,
      createdAt: "2023-05-21T13:45:00Z",
      updatedAt: "2023-05-21T13:45:00Z",
      user: {
        id: "user_7",
        firstName: "Robert",
        lastName: "Miller",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_7",
        orderId: "ORD-007",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_8",
      userId: "user_8",
      ticketOrderId: "order_8",
      amount: "22000.00",
      amountPaid: "22000.00",
      currency: "USD",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_333222111",
      paymentServiceProvider: PaymentServiceProvider.BankTransfer,
      paidAt: "2023-05-22T15:30:00Z",
      createdAt: "2023-05-22T15:15:00Z",
      updatedAt: "2023-05-22T15:30:00Z",
      user: {
        id: "user_8",
        firstName: "Lisa",
        lastName: "Wilson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_8",
        orderId: "ORD-008",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_9",
      userId: "user_9",
      ticketOrderId: "order_9",
      amount: "8000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Failed,
      paymentReference: "ref_666777888",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: null,
      createdAt: "2023-05-23T10:20:00Z",
      updatedAt: "2023-05-23T10:35:00Z",
      user: {
        id: "user_9",
        firstName: "James",
        lastName: "Taylor",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_9",
        orderId: "ORD-009",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_10",
      userId: "user_10",
      ticketOrderId: "order_10",
      amount: "35000.00",
      amountPaid: "35000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_999000111",
      paymentServiceProvider: PaymentServiceProvider.Cash,
      paidAt: "2023-05-24T17:45:00Z",
      createdAt: "2023-05-24T17:30:00Z",
      updatedAt: "2023-05-24T17:45:00Z",
      user: {
        id: "user_10",
        firstName: "Patricia",
        lastName: "Anderson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_10",
        orderId: "ORD-010",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    // Continue with more payments up to 25...
    {
      id: "pay_11",
      userId: "user_11",
      ticketOrderId: "order_11",
      amount: "14000.00",
      amountPaid: "14000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_222333444",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: "2023-05-25T11:15:00Z",
      createdAt: "2023-05-25T11:00:00Z",
      updatedAt: "2023-05-25T11:15:00Z",
      user: {
        id: "user_11",
        firstName: "Thomas",
        lastName: "Jackson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_11",
        orderId: "ORD-011",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_12",
      userId: "user_12",
      ticketOrderId: "order_12",
      amount: "16000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Pending,
      paymentReference: "ref_555444333",
      paymentServiceProvider: PaymentServiceProvider.Flutterwave,
      paidAt: null,
      createdAt: "2023-05-26T14:20:00Z",
      updatedAt: "2023-05-26T14:20:00Z",
      user: {
        id: "user_12",
        firstName: "Jennifer",
        lastName: "White",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_12",
        orderId: "ORD-012",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_13",
      userId: "user_13",
      ticketOrderId: "order_13",
      amount: "19000.00",
      amountPaid: "19000.00",
      currency: "USD",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_888777666",
      paymentServiceProvider: PaymentServiceProvider.BankTransfer,
      paidAt: "2023-05-27T16:40:00Z",
      createdAt: "2023-05-27T16:25:00Z",
      updatedAt: "2023-05-27T16:40:00Z",
      user: {
        id: "user_13",
        firstName: "Daniel",
        lastName: "Harris",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_13",
        orderId: "ORD-013",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_14",
      userId: "user_14",
      ticketOrderId: "order_14",
      amount: "7000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Failed,
      paymentReference: "ref_111333555",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: null,
      createdAt: "2023-05-28T09:30:00Z",
      updatedAt: "2023-05-28T09:45:00Z",
      user: {
        id: "user_14",
        firstName: "Susan",
        lastName: "Martin",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_14",
        orderId: "ORD-014",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_15",
      userId: "user_15",
      ticketOrderId: "order_15",
      amount: "28000.00",
      amountPaid: "28000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_999888777",
      paymentServiceProvider: PaymentServiceProvider.Cash,
      paidAt: "2023-05-29T18:10:00Z",
      createdAt: "2023-05-29T17:55:00Z",
      updatedAt: "2023-05-29T18:10:00Z",
      user: {
        id: "user_15",
        firstName: "Paul",
        lastName: "Thompson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_15",
        orderId: "ORD-015",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    // Additional payments...
    {
      id: "pay_16",
      userId: "user_16",
      ticketOrderId: "order_16",
      amount: "13000.00",
      amountPaid: "13000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_444666888",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: "2023-05-30T12:25:00Z",
      createdAt: "2023-05-30T12:10:00Z",
      updatedAt: "2023-05-30T12:25:00Z",
      user: {
        id: "user_16",
        firstName: "Karen",
        lastName: "Garcia",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_16",
        orderId: "ORD-016",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_17",
      userId: "user_17",
      ticketOrderId: "order_17",
      amount: "17000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Pending,
      paymentReference: "ref_777555333",
      paymentServiceProvider: PaymentServiceProvider.Flutterwave,
      paidAt: null,
      createdAt: "2023-05-31T13:50:00Z",
      updatedAt: "2023-05-31T13:50:00Z",
      user: {
        id: "user_17",
        firstName: "Mark",
        lastName: "Martinez",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_17",
        orderId: "ORD-017",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_18",
      userId: "user_18",
      ticketOrderId: "order_18",
      amount: "21000.00",
      amountPaid: "21000.00",
      currency: "USD",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_222444666",
      paymentServiceProvider: PaymentServiceProvider.BankTransfer,
      paidAt: "2023-06-01T15:35:00Z",
      createdAt: "2023-06-01T15:20:00Z",
      updatedAt: "2023-06-01T15:35:00Z",
      user: {
        id: "user_18",
        firstName: "Nancy",
        lastName: "Robinson",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_18",
        orderId: "ORD-018",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_19",
      userId: "user_19",
      ticketOrderId: "order_19",
      amount: "9000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Failed,
      paymentReference: "ref_888666444",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: null,
      createdAt: "2023-06-02T10:40:00Z",
      updatedAt: "2023-06-02T10:55:00Z",
      user: {
        id: "user_19",
        firstName: "Steven",
        lastName: "Clark",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_19",
        orderId: "ORD-019",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_20",
      userId: "user_20",
      ticketOrderId: "order_20",
      amount: "32000.00",
      amountPaid: "32000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_555777999",
      paymentServiceProvider: PaymentServiceProvider.Cash,
      paidAt: "2023-06-03T17:20:00Z",
      createdAt: "2023-06-03T17:05:00Z",
      updatedAt: "2023-06-03T17:20:00Z",
      user: {
        id: "user_20",
        firstName: "Betty",
        lastName: "Rodriguez",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_20",
        orderId: "ORD-020",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    // Final payments...
    {
      id: "pay_21",
      userId: "user_21",
      ticketOrderId: "order_21",
      amount: "11000.00",
      amountPaid: "11000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_333555777",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: "2023-06-04T11:50:00Z",
      createdAt: "2023-06-04T11:35:00Z",
      updatedAt: "2023-06-04T11:50:00Z",
      user: {
        id: "user_21",
        firstName: "Edward",
        lastName: "Lewis",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_21",
        orderId: "ORD-021",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_22",
      userId: "user_22",
      ticketOrderId: "order_22",
      amount: "23000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Pending,
      paymentReference: "ref_666888222",
      paymentServiceProvider: PaymentServiceProvider.Flutterwave,
      paidAt: null,
      createdAt: "2023-06-05T14:15:00Z",
      updatedAt: "2023-06-05T14:15:00Z",
      user: {
        id: "user_22",
        firstName: "Margaret",
        lastName: "Lee",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_22",
        orderId: "ORD-022",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_23",
      userId: "user_23",
      ticketOrderId: "order_23",
      amount: "24000.00",
      amountPaid: "24000.00",
      currency: "USD",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_999111333",
      paymentServiceProvider: PaymentServiceProvider.BankTransfer,
      paidAt: "2023-06-06T16:00:00Z",
      createdAt: "2023-06-06T15:45:00Z",
      updatedAt: "2023-06-06T16:00:00Z",
      user: {
        id: "user_23",
        firstName: "Brian",
        lastName: "Walker",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_23",
        orderId: "ORD-023",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_24",
      userId: "user_24",
      ticketOrderId: "order_24",
      amount: "6000.00",
      amountPaid: null,
      currency: "NGN",
      paymentStatus: PaymentStatus.Failed,
      paymentReference: "ref_444222666",
      paymentServiceProvider: PaymentServiceProvider.Paystack,
      paidAt: null,
      createdAt: "2023-06-07T09:50:00Z",
      updatedAt: "2023-06-07T10:05:00Z",
      user: {
        id: "user_24",
        firstName: "Ruth",
        lastName: "Hall",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_24",
        orderId: "ORD-024",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
    {
      id: "pay_25",
      userId: "user_25",
      ticketOrderId: "order_25",
      amount: "27000.00",
      amountPaid: "27000.00",
      currency: "NGN",
      paymentStatus: PaymentStatus.Paid,
      paymentReference: "ref_777333999",
      paymentServiceProvider: PaymentServiceProvider.Cash,
      paidAt: "2023-06-08T18:30:00Z",
      createdAt: "2023-06-08T18:15:00Z",
      updatedAt: "2023-06-08T18:30:00Z",
      user: {
        id: "user_25",
        firstName: "Kevin",
        lastName: "Allen",
        email: `johnny${(Math.random() * 5).toFixed(2)}@gmail.com`,
      },
      ticketOrder: {
        id: "to_25",
        orderId: "ORD-025",
        contactEmail: "sampleemail@gmail.com",
        quantity: 4,
        event: {
          title: "Sample Event",
        },
      },
    },
  ];

  const [payments] = useState<Payment[]>(dummyPayments);

  //   const getStatusBadge = (status: string) => {
  //     switch (status) {
  //       case "valid":
  //         return <Badge className="bg-green-500">Valid</Badge>
  //       case "used":
  //         return <Badge className="bg-blue-500">Used</Badge>
  //       case "refunded":
  //         return <Badge className="bg-yellow-500">Refunded</Badge>
  //       case "cancelled":
  //         return <Badge className="bg-red-500">Cancelled</Badge>
  //       default:
  //         return <Badge variant="outline">Unknown</Badge>
  //     }
  //   }

  const getStatusStyle = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Pending:
        return "text-yellow bg-yellow/10 p-2 px-3 rounded-full";
      case PaymentStatus.Paid:
        return "text-success bg-success/10 p-2 px-3 rounded-full";
      case PaymentStatus.Failed:
        return "text-failed bg-failed/10 p-2 px-3 rounded-full";
      default:
        "text-yellow bg-yellow/10 p-2 px-3 rounded-full";
        return;
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Reference</TableHead>
            <TableHead>Contact person</TableHead>
            <TableHead>Event name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action(s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {payment.paymentReference}
              </TableCell>
              <TableCell>
                <div>
                  <p>{payment.user.firstName + "" + payment.user.lastName}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.user.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>{payment.ticketOrder.event.title}</TableCell>
              <TableCell>{payment.ticketOrder.quantity}</TableCell>
              <TableCell className="text-right">
                 {NairaPrice.format(Number(payment.amount))}
              </TableCell>
              <TableCell>
                {moment(payment.createdAt).format("MMM D, YYYY | hh:mma")}
              </TableCell>
              <TableCell>
                {serializer.paymentServiceProvoder(
                  payment.paymentServiceProvider
                )}
              </TableCell>
              <TableCell
                className={getStatusStyle(payment.paymentStatus)}
              >
                {serializer.paymentStatus(payment.paymentStatus)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewTicket?.(payment)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {payment.paymentStatus === PaymentStatus.Pending && (
                      <DropdownMenuItem>
                        <TicketCheck className="mr-2 h-4 w-4" />
                        <span>Confirm</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
