export interface OrderItem {
  id: string
  title: string
  quantity: number
  unit_price: number
  currency_id: string
}

export interface Order {
  items: OrderItem[]
}
