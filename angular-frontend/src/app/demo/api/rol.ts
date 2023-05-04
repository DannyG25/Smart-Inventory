import { Rol_menu } from "./rol_menu"
import { User } from "./users"

export interface Rol {
    ID?: number,
    Rol_name?: string
    Rol_menus?: Rol_menu[]
    Users?: User[]
}