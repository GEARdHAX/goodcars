import time
import urllib.request
import RPi.GPIO as GPIO
import Adafruit_DHT as dht

myAPI = "B1NJJTPMVTSXX8LC"

GPIO.setmode(GPIO.BCM)

sensor = dht.DHT11
pin = 4

print("IoT Development Kit")

while True:
    try:
        print("Reading sensor data...")
        humidity, temp = dht.read_retry(sensor, pin)

        if temp is not None and humidity is not None:
            print("Temperature =", temp, "C")
            print("Humidity =", humidity, "%")

            baseURL = "https://api.thingspeak.com/update?api_key=" + myAPI + "&field1=" + str(temp) + "&field2=" + str(humidity)

            response = urllib.request.urlopen(baseURL)
            print("Data uploaded to ThingSpeak!")

        else:
            print("Sensor reading failed!")

    except Exception as e:
        print("Error:", e)

    time.sleep(15)
