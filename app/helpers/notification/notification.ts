import * as PusherPushNotifications from "@pusher/push-notifications-web";


const instanceId:any =
  process.env.INSTANCE_ID


export const beamsClient:any = new PusherPushNotifications.Client({
    instanceId: instanceId,
  });
  
  beamsClient
    .start()
    .then((beamsClien:any) => beamsClient.getDeviceId())
    .then((deviceId:any) =>
      console.log("Successfully registered with Beams. Device ID:", deviceId)
    )
    .catch(console.error);