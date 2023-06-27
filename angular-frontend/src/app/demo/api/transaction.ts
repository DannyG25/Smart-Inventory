import { Transaction_detail } from "./transaction_detail"
import { User } from "./users"

export interface Transaction {
    ID?: number,
    Tran_date?: Date
    Tran_Total?: number
    Device_id?: number
    Users_id?: number
    Users2_id?: number
    Transaction_details?: Transaction_detail[]
    Users?: User
    Users2?: User

}