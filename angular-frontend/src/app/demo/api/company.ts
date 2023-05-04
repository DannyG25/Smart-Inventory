import { Company_detail } from "./company_detail"
import { Device } from "./device"
import { Inventory_header } from "./inventory_header"
import { User } from "./users"

export interface Company {
    ID?: number,
    Comp_name?: string
    Comp_address?: string
    Comp_mail?: string
    Comp_ruc?: string
    Comp_phone?: string
    CompanyID?: number
    Children_comp?: Company[]
    Company_details?: Company_detail[]
    Devices?: Device[]
    User?: User[]
    Inventory_headers?: Inventory_header[]

}