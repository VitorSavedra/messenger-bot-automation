const fs = require("fs");
const csvjson = require("csvjson");

function convertCsvToJson() {

    var data = fs.readFileSync(('raw_file.csv'), { encoding: 'utf8' });

    var options = {
        delimiter: ',',
        quote: '"',
        //headers: "phone,firstname,lastname,partner,message,delivered,dateDelivered"
    };

    var objJSON = csvjson.toObject(data, options);
    //console.log(objJSON);
    fs.writeFileSync('raw_file.json', JSON.stringify(objJSON, null, 4));
};

convertCsvToJson();