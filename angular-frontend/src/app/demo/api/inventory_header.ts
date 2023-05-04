import { Inventory_detail } from "./inventory_detail"

export interface Inventory_header {
    ID?: number,
    Inv_head_date?: Date
    Company_id?: number
    Users_id?: number
    Inventory_details?: Inventory_detail[] 
}