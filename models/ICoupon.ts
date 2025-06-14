export type CouponCodeRequest = {
  code: string;
  discount: number;
  maxUsage: number | null; // default 10
  validUntil: Date;
  eventId: string | null;
};

export type CouponCodeEvent = {
  title: string;
  eventId: string;
};

export type CouponCodeResponse = {
  id: string;
  code: string;
  discount: number;
  maxUsage: number;
  validUntil: Date;
  events: CouponCodeEvent[];
};
