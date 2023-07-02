import { Company } from "./company"
import { Product } from "./products"

export interface Company_detail {
    ID?: number,
    Comp_det_stock?: number
    Comp_det_maximum_mount?: number
    Comp_det_minimun_moun?: number
    Product_id?: number
    Company_id?: number
    Company?: Company
    Product?: Product
}