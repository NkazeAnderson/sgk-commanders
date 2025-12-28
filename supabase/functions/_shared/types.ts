import { notificationTypes } from "./constant.ts";

export type notificationTypesCodesT = keyof typeof notificationTypes

export type notificationMessageT = {
    to: string|string[],
    title: string,
    body: string,
    data?: Record<string ,string|number>
}
