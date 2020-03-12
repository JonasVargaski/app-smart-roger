#include <ArduinoJson.h>
#include <avr/wdt.h>
#include <Ethernet.h>
#include <EEPROM.h>
#include <SPI.h>

const String SENHA_ACESSO = "abcde";

unsigned char mac[] = {0xA1, 0x78, 0x52, 0x2A, 0x57, 0x2E};
unsigned char ip[] = {192, 168, 0, 17};
unsigned char gateway[] = {192, 168, 0, 1};
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
void processarSaida(int pin, int acao, int duracao);
void readSensor(void);

EthernetServer server(3041);

void setup()
{
  pinMode(A0, INPUT);
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
            EEPROM.write(12, tempConfig);
          }
          else if (pin)
          {
            processarSaida(pin, acao, duracao);
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
  pins["d10"] = digitalRead(10);
  pins["d11"] = digitalRead(11);
  pins["d12"] = digitalRead(11);
  pins["d13"] = digitalRead(13);
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
  pinMode(pin, OUTPUT);
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
  tempConfig = EEPROM.read(12);

  for (int i = 0; i <= 12; i++)
  {
    pinMode(i, OUTPUT);
    int status = EEPROM.read(i);

    if (i != 255)
    {
      digitalWrite(i, status);
    }
    else
    {
      digitalWrite(i, LOW);
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
    digitalWrite(13, HIGH);
  }
  else if ((sensorTemp + 3) <= tempConfig)
  {
    digitalWrite(13, LOW);
  }
}