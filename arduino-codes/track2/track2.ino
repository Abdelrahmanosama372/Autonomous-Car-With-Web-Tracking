#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;
bool once = true;
float current_angle = 0;

void setup(void) {
	// Serial.begin(115200);
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);

	// Try to initialize!
	if (!mpu.begin()) {
		// Serial.println("Failed to find MPU6050 chip");
		while (1) {
		  delay(10);
		}
	}
	// Serial.println("MPU6050 Found!");

	// set accelerometer range to +-8G
	mpu.setAccelerometerRange(MPU6050_RANGE_8_G);

	// set gyro range to +- 500 deg/s
	mpu.setGyroRange(MPU6050_RANGE_500_DEG);

	// set filter bandwidth to 21 Hz
	mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

	delay(4000);
}

void loop() {
  digitalWrite(2,HIGH);
	/* Get new sensor events with the readings */
	sensors_event_t a, g, temp;
	mpu.getEvent(&a, &g, &temp);
  // Serial.println(current_angle);
  current_angle += (g.gyro.z*180/(3.14)) * 0.01;
  while(once){
    while(current_angle < 40){
      digitalWrite(5,HIGH);
      // Serial.println(current_angle);
      sensors_event_t a, g, temp;
	    mpu.getEvent(&a, &g, &temp);
      current_angle += (g.gyro.z*180/(3.14)) * 0.01;
    }
    while(current_angle > 0){
      digitalWrite(5,LOW);
      digitalWrite(3,HIGH);
      // Serial.println(current_angle); 
      sensors_event_t a, g, temp;
	    mpu.getEvent(&a, &g, &temp);
      current_angle += (g.gyro.z*180/(3.14)) * 0.01;
    }

    digitalWrite(3,LOW);
    once = false;
  }

  current_angle += (g.gyro.z*180/(3.14)) * 0.01;

  if(current_angle  > 3)
  {
    while(1)
    {
      digitalWrite(3,HIGH);
      digitalWrite(5,LOW);
      sensors_event_t a, g, temp;
    	mpu.getEvent(&a, &g, &temp);
      current_angle += (g.gyro.z*180/(3.14)) * 0.01;
      if(current_angle < 0);
        break;

    }
  } else if(current_angle < -3)
  {
    while(1)
    {
      digitalWrite(5,HIGH);
      digitalWrite(3,LOW);
      sensors_event_t a, g, temp;
	    mpu.getEvent(&a, &g, &temp);
      current_angle += (g.gyro.z*180/(3.14)) * 0.01;
      if(current_angle > 0)
        break;
    }
  } else {
    digitalWrite(3,LOW);
    digitalWrite(5,LOW);
   
  }


  delay(10);
}
