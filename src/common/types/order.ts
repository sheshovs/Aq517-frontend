export interface OrderItem {
  title: string
  quantity: number
  unit_price: number
  currency_id: string
}

export interface Order {
  items: OrderItem[]
}
