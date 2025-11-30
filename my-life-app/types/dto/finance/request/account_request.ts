export interface AccountRequest {
    name: string;
    type: 'BANK' | 'CASH' | 'E_WALLET';
    initialBalance: number;
}