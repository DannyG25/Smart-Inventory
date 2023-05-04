import { Inventory_header } from "./inventory_header"
import { Transaction } from "./transaction"

export interface User {
    ID?: number,
    User_username?:       string
	User_password?:       string
	User_identification?: string
	User_names?:          string
	User_lastnames?:      string
	User_address?:        string
	User_phone?:          string
	Company_id?:          number
	Rol_id?: number
	Inventory_headers?: Inventory_header[]
	Employees?: Transaction[]
	Beneficiary?: Transaction[]
}