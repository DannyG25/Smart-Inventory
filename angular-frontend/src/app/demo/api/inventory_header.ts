import { Company } from "./company"
import { Inventory_detail } from "./inventory_detail"
import { User } from "./users"

export interface Inventory_header {
    ID?: number,
    Inv_head_date?: Date
    Company_id?: number
    Users_id?: number
    Inventory_details?: Inventory_detail[] 
    Company?: Company
    Users?:User
}