#include <ArduinoJson.h>
#include <avr/wdt.h>
#include <Ethernet.h>
#include <EEPROM.h>
#include <SPI.h>

#define PINO_RELE_TEMP 8

const String SENHA_ACESSO = "abcde";

unsigned char mac[] = {0xA4, 0x28, 0xC2, 0xCA, 0x54, 0x2E};
unsigned char ip[] = {192, 168, 15, 70};
unsigned char gateway[] = {192, 168, 15, 254};
unsigned char subnet[] = {255, 255, 255, 0};

String bufferJSON = "";
bool armazenaBuffer = false;
long sensorTemp = 0;
int tempConfig = 0;
unsigned long previousMillis = 0;

//#Definições de função
void restaurarEstados(void);
void enviarStatusArduino(EthernetClient client);
void enviarErroAcesso(EthernetClient client);
void processarSaida(int pinPcb, int acao, int duracao);
void readSensor(void);
int getPin(int pinPcb);

EthernetServer server(3041);

void setup()
{
  pinMode(A0, INPUT);
  pinMode(PINO_RELE_TEMP, OUTPUT);
  wdt_enable(WDTO_8S);

  Serial.begin(9600);

  while (!Serial)
    continue;

  restaurarEstados();
  Ethernet.begin(mac, ip, gateway, subnet);

  server.begin();

  Serial.println(F("Server is ready."));
  Serial.print(F("Please connect to http://"));
  Serial.println(Ethernet.localIP());
}

void loop()
{
  wdt_reset();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > 1000)
  {
    previousMillis = currentMillis;

    readSensor();
  }

  EthernetClient client = server.available();
  if (!client)
    return;

  while (client.connected())
  {
    wdt_reset();
    if (client.available())
    {
      char c = client.read();
      Serial.print(c);
      if (c == '{')
      {
        armazenaBuffer = true;
      }
      if (armazenaBuffer && c != ' ' && c != '\r' && c != '\n')
      {
        bufferJSON += c;
      }
      if (c == '}')
      {
        armazenaBuffer = false;

        StaticJsonBuffer<300> jsonBuffer;
        JsonObject &data = jsonBuffer.parseObject(bufferJSON);

        const char *senha = data["password"];

        if (SENHA_ACESSO == String(senha))
        {

          int pin = data["pin"];
          int acao = data["action"];
          int duracao = data["time"];
          int tempAdj = data["tempAdj"];

          if (tempAdj)
          {
            tempConfig = tempAdj;
            EEPROM.write(20, tempConfig);
          }
          else if (pin)
          {
            processarSaida(getPin(pin), acao, duracao);
          }
          enviarStatusArduino(client);
        }
        else
        {
          enviarErroAcesso(client);
        }
        bufferJSON = "";
      }
    }
  }
}

void enviarStatusArduino(EthernetClient client)
{
  StaticJsonBuffer<300> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonObject &pins = root.createNestedObject("pins");
  pins["d0"] = digitalRead(0);
  pins["d1"] = digitalRead(1);
  pins["d2"] = digitalRead(2);
  pins["d3"] = digitalRead(3);
  pins["d4"] = digitalRead(4);
  pins["d5"] = digitalRead(5);
  pins["d6"] = digitalRead(6);
  pins["d7"] = digitalRead(7);
  pins["d8"] = digitalRead(8);
  pins["d9"] = digitalRead(9);
  pins["d10"] = digitalRead(A1);
  pins["d11"] = digitalRead(A2);
  pins["d12"] = digitalRead(A3);
  pins["d13"] = digitalRead(A4);
  pins["d14"] = digitalRead(A5);
  pins["temp"] = sensorTemp;
  pins["tempAdj"] = tempConfig;

  Serial.print(F("Sending: "));
  root.printTo(Serial);
  Serial.println();

  client.println("HTTP/1.0 200 OK");
  client.println("Content-Type: application/json");
  client.println("Connection: close");
  client.println();

  root.prettyPrintTo(client);
  client.stop();
}

void enviarErroAcesso(EthernetClient client)
{
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["message"] = "acesso negado";

  client.println("HTTP/1.0 401 Acess Deined");
  client.println("Content-Type: application/json");
  client.println("Connection: close");
  client.println();

  root.prettyPrintTo(client);
  client.stop();
}

void processarSaida(int pin, int acao, int duracao)
{
  if (duracao <= 1)
  {
    digitalWrite(pin, acao);
    EEPROM.write(pin, acao);
  }
  else if (duracao > 1 && acao == 1)
  {
    digitalWrite(pin, HIGH);
    delay(duracao);
    digitalWrite(pin, LOW);
  }
  delay(20);
}

void restaurarEstados()
{
  tempConfig = EEPROM.read(20);

  for (int i = 0; i <= 14; i++)
  {
    int status = EEPROM.read(i);
    pinMode(getPin(i), OUTPUT);

    if (i != 255)
    {
      digitalWrite(getPin(i), status);
    }
    else
    {
      digitalWrite(getPin(i), LOW);
      EEPROM.write(i, 0);
    }
  }
}

void readSensor()
{
  float temp_media = 0;

  for (int i = 0; i < 50; i++)
  {
    temp_media += (float(analogRead(A0)) * 5 / (1023)) / 0.01;
  }
  sensorTemp = (int)temp_media / 50;

  if (sensorTemp >= tempConfig)
  {
    digitalWrite(PINO_RELE_TEMP, HIGH);
    Serial.println("ligado");
  }
  else if ((sensorTemp + 3) <= tempConfig)
  {
    digitalWrite(PINO_RELE_TEMP, LOW);
    Serial.println("desligado");
  }
}

int getPin(int pinPcb){
    switch(pinPcb){
    case 10:
    return A1;
    case 11:
    return A2;
    case 12:
    return A3;
    case 13:
    return A4;
    case 14:
    return A5;
    default:
    return pinPcb;
}