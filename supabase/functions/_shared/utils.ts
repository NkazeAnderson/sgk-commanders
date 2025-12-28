import { notificationMessageT } from "./types.ts";

export async function sendPushNotification(message:notificationMessageT) {
    console.log(message);
    try {
         const res =   await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
    });
    console.log(res.status);
    

    console.log("NOtification send res", await res.json());
    return await res.json()
    } catch (error) {
        console.log(error);
        
    }
    

}