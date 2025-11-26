export interface AccountResponse {
  id: string; // UUID
  name: string;
  type: "BANK" | "CASH" | "E_WALLET";
  balance: number; // BigDecimal
  currency: string;
  createdAt: string; // ISO-8601
}