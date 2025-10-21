import { notificationTypes } from "./constant";

export type notificationTypesCodesT = keyof typeof notificationTypes

export type notificationMessageT = {
    to: string,
    title: string,
    body: string,
    data?: Record<string ,string|number>
}
