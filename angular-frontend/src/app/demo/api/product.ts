import { Category } from "./category"
import { Company_detail } from "./company_detail"
import { Inventory_detail } from "./inventory_detail"
import { Tax } from "./tax"
import { Transaction_detail } from "./transaction_detail"
import { Unit_measure } from "./unit_measure"

export interface Product {
    ID?: number,
    Pro_name?: string
    Pro_description?: string
    Pro_price?: number
    Pro_photo?: string
    Pro_experydate?: Date
    Pro_marca?: string
    Category_id?: number
    Tax_id?: number
    UnitMeasure_id?: number
    ProductID?: number
    Children_pro?: Product[]
    Company_details?: Company_detail[]
    Inventory_details?: Inventory_detail[]
    Transaction_details?: Transaction_detail[]

    Category?: Category
    Tax?: Tax
    Unit_measure?: Unit_measure
}