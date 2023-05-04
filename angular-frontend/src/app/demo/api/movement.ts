import { Device } from "./device"

export interface Movement {
    ID?: number,
    Mov_type?: string
    Move_description?: string
    Devices?: Device[]

}