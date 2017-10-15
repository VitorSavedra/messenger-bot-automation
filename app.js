const CSV = require('csv-string');
const robot = require("robotjs");
const fs = require("fs");
const concat = require('concat-files');

// Velocidade do cursor do mouse.
robot.setMouseDelay(200);

function sendMessage() {

    var raw = require("./raw_file.json");

    raw.forEach(function (message) {
        var rawPhone = message.phone;
        var rawFirstname = message.firstname;
        var rawLastname = message.lastname;
        var rawPartner = message.partner;
        var rawMessage = message.message;
        var rawDelivered = message.delivered;
        var rawDateDelivered = message.dateDelivered;

        if (rawDelivered === "false") {

            // Procura contato no mensageiro.
            robot.moveMouseSmooth(?, ?);
            robot.mouseClick();
            robot.typeString(rawPhone);
            robot.keyTap("enter");

            // Envia mensagem para contato.
            robot.moveMouseSmooth(?, ?);
            robot.mouseClick();
            robot.typeString(rawMessage);
            robot.keyTap("enter");

            console.log("Enviada mensagem: '" + rawMessage + "', para " + rawFirstname + " " +
                rawLastname + " no telefone " + rawPhone + " da empresa " + rawPartner + ".");

            rawDelivered = true;
            rawDateDelivered = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            var objDeliveredFalse = {
                phone: rawPhone,
                firstname: rawFirstname,
                lastname: rawLastname,
                partner: rawPartner,
                message: rawMessage,
                delivered: rawDelivered,
                dateDelivered: rawDateDelivered
            };

            // Insere em 'delivered.csv' log de mensagens enviadas.
            fs.appendFile("./delivered.csv", CSV.stringify(objDeliveredFalse), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            });

            // Trata mensagens já enviadas para não repetir envios.
        } else if (rawDelivered === "true") {

            console.log("Mensagem já enviada para o usuário selecionado.");

            var objDeliveredTrue = {
                phone: rawPhone,
                firstname: rawFirstname,
                lastname: rawLastname,
                partner: rawPartner,
                message: rawMessage,
                delivered: rawDelivered,
                dateDelivered: rawDateDelivered
            };

            // Insere em 'notDelivered.csv' log de mensagens não enviadas.
            fs.appendFile("./notDelivered.csv", CSV.stringify(objDeliveredTrue), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            });
        };
    });

    // Concatena em arquivo 'raw_file.csv' log de mensagens enviadas e não enviadas.
    // Útil para relatórios de disparos de mensagens para humanos.
    concat([
        './headers.csv',
        './delivered.csv',
        './notDelivered.csv'
    ], './raw_file.csv', function (err) {
        if (err) throw err
        console.log('done');
    });
};

sendMessage();