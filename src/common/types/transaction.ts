export enum TransactionStatus {
  AUTHORIZED = `AUTHORIZED`,
  APPROVED = `approved`,
  FAILED = `FAILED`,
  FAILURE = `FAILURE`,
  IN_PROCESS = `in_process`,
  REJECTED = `rejected`,
  NULL = `null`,
  UNDEFINED = `undefined`,
}

export const TransactionStatusLabel: Record<string, string> = {
  [TransactionStatus.AUTHORIZED]: `Autorizada`,
  [TransactionStatus.APPROVED]: `Aprobada`,
  [TransactionStatus.FAILED]: `Rechazada`,
  [TransactionStatus.FAILURE]: `Rechazada`,
  [TransactionStatus.IN_PROCESS]: `en proceso`,
  [TransactionStatus.REJECTED]: `Rechazada`,
  [TransactionStatus.NULL]: `Rechazada`,
  [TransactionStatus.UNDEFINED]: `Rechazada`,
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
