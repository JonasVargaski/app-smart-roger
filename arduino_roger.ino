#include <ArduinoJson.h>
#include <Ethernet.h>
#include <SPI.h>

const String SENHA_ACESSO = "1a2b3c4e";
const int DURACAO_PULSO = 700;

byte mac[] = {0xA4, 0x28, 0x72, 0xCA, 0x55, 0x2F};
byte ip[] = {192, 168, 0, 110};
byte gateway[] = {192, 168, 0, 1};
byte subnet[] = {255, 255, 255, 0};

String bufferJSON = "";
bool armazenaBuffer = false;

EthernetServer server(80);

void setup()
{
  iniciarDesligado();
  Serial.begin(9600);
  while (!Serial)
    continue;

  Ethernet.begin(mac, ip, gateway, subnet);

  server.begin();

  Serial.println(F("Server is ready."));
  Serial.print(F("Please connect to http://"));
  Serial.println(Ethernet.localIP());
}

void loop()
{
  EthernetClient client = server.available();
  if (!client)
    return;

  while (client.connected())
  {
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

          long pin = data["pin"];
          long acao = data["action"];
          const char *tipo = data["type"];

          if (pin)
          {
            processarSaida(pin, acao, String(tipo));
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
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonObject &pins = root.createNestedObject("pins");
  pins["a0"] = analogRead(A0);
  pins["a1"] = analogRead(A1);
  pins["a2"] = analogRead(A2);
  pins["a3"] = analogRead(A3);
  pins["a4"] = analogRead(A4);
  pins["a5"] = analogRead(A5);

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
  pins["d12"] = digitalRead(12);
  pins["d13"] = digitalRead(13);

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

void processarSaida(int pin, int acao, String tipo)
{
  pinMode(pin, OUTPUT);
  if (tipo == "R")
  {
    digitalWrite(pin, acao);
    delay(10);
  }
  else if (tipo == "P" && acao == 1)
  {
    digitalWrite(pin, HIGH);
    delay(DURACAO_PULSO);
    digitalWrite(pin, LOW);
  }
}

void iniciarDesligado()
{
  for (int i = 0; i < 13; i++)
  {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }
}
