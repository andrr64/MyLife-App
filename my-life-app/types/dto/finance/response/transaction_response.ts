export interface TransactionResponse {
  id: string; // UUID

  // flat account
  accountId: string;
  accountName: string;

  // flat category (optional)
  categoryId: number | null;
  categoryName: string | null;

  // main
  amount: number;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  description: string | null;

  // transfer specific (optional)
  transferPairId: string | null;

  // time
  transactionDate: string; // ISO-8601
  createdAt: string; // ISO-8601
}