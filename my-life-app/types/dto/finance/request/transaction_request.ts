export interface TransactionRequest {
    accountId: string;
    targetAccountId?: string;
    categoryId: number | undefined;
    amount: number;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    description?: string;
    transactionDate: string;
}