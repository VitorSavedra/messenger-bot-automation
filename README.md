# Messenger Bot Automation
Automação para envio de mensagens em massa através de mensageiros instantâneos (Facebook Messenger, WhatsApp, Telegram, etc.).


### Instalação:

- Clone este repositório:

    ```sh
    $ git clone https://github.com/VitorSavedra/messenger-bot-automation.git
    ```

- Instale as dependências:
    ```sh
    $ npm install
    ```

Simples assim. :)


### Como usar:

1. Antes de tudo, altere a posição dos campos/cursor em dois locais:

    ```javascript
    Linha 25. robot.moveMouseSmooth(?, ?);
    ```
    Substitua '?' pelos eixos x e y, respectivamente, da posição do campo de busca de contatos.

    ```javascript
    Linha 31. robot.moveMouseSmooth(?, ?);
    ```
    Substitua '?' pelos eixos x e y, respectivamente, da posição do campo de envio/escrita da mensagem a ser disparada.

    Para coletar os eixos x e y, das posições, mova o cursos do mouse até o local e execute:

    ```sh
    $ node getPositionCursos.js
    ```

2. Após alterada as posições, é necessário subir o arquivo do qual o script extrairá as informações das mensagens a serem disparadas. Para isso, há dois modos:

    a. Através de um arquivo CSV:
        - O arquivo deve obedecer o layout:
        `phone,firstname,lastname,partner,message,delivered,dateDelivered`

            - Pode-se substituir os valores de `phone` pelo nome do contato. Este campo é utilizado somente para a busca do contato no mensageiro.

        - Nomeie o arquivo como `raw_file.csv` e salve no diretório raíz.
        - Execute:
            ```sh
            $ node csvToJson.js
            ```
    
    b. Através de um arquivo JSON:
        ```
        {
        "phone": "5511987654321",
        "firstname": "Vitor",
        "lastname": "Savedra",
        "partner": "",
        "message": "Hello World!",
        "delivered": "false",
        "dateDelivered": ""
        }
        ```

    Obs.: apenas mensagens com status `delivered: false` serão enviadas.

3. Abra o mensageiro e execute o script:
    ```sh
    $ node app.js
    ```

### Funcionamento:
Após término de execução, serão carregados 3 arquivos, onde:

- `delivered.csv`: mensagens enviadas com sucesso;
- `notDelivered.csv`: mensagens não enviadas;
- `raw_file.csv`: concatenação de mensagens enviadas e não enviadas. Pode ser útil para relatórios à humanos.

### Aviso legal:
Esse script e esse autor não tem qualquer ligação com qualquer mensageiro instantâneo ou empresas ligadas a estes. O projeto é de cunho acadêmico e sua utilização deve obedecer os termos de uso e políticas de pricacidade de mensageiros instantâneos (ou outro) ao qual foi/será aplicado, cabendo a responsabilidade de qualquer efeito legal ao executor.