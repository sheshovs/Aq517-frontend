export enum TransactionStatus {
  AUTHORIZED = `AUTHORIZED`,
  FAILED = `FAILED`,
  FAILURE = `FAILURE`,
}

export const TransactionStatusLabel = {
  [TransactionStatus.AUTHORIZED]: `Autorizada`,
  [TransactionStatus.FAILED]: `Rechazada`,
  [TransactionStatus.FAILURE]: `Rechazada`,
}

export interface TransactionResponse {
  vci: string
  amount: number
  status: TransactionStatus
  buy_order: string
  session_id: string
  card_detail: {
    card_number: string
  }
  accounting_date: string
  transaction_date: string
  authorization_code: string
  payment_type_code: string
  response_code: number
  installments_number: number
}
