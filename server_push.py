from pusher_config import *
import pusher
import psutil
from datetime import datetime
import time

channels_client = pusher.Pusher(
  app_id= my_app_id,
  key= my_key,
  secret= my_secret ,
  cluster= my_cluster,
  ssl= my_ssl
)

while True:
    print("Sleeping for 15 seconds")
    time.sleep(15)
    message =  {
        'datetime': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'cpu': psutil.cpu_percent(interval=1),
        'memory': psutil.virtual_memory().percent,
        'disk': psutil.disk_usage('/').percent
    }
    print("Sending a message")
    channels_client.trigger(channel, event, message)

