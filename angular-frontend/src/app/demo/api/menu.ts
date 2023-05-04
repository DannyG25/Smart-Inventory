import { Rol_menu } from "./rol_menu"

export interface Menu {
    ID?: number,
    Men_name?: string
    Men_link?: string
    menuID?: number
    Children_men?: Menu[]
    Rol_menus?: Rol_menu[]

}