import { Binnacle } from "./binnacle"

export interface Device {
    ID?: number,
    Dev_antenna?: string
    Company_id?: number
    Movement_id?: number
    Binnacles?: Binnacle[]

}