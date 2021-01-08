import fs from "fs";
import path from "path";
import cors from "cors";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import * as csvToJson from "convert-csv-to-json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ╦═╗┌─┐┬ ┬┌┬┐┌─┐┌─┐┬
// ╠╦╝│ ││ │ │ ├┤ └─┐│
// ╩╚═└─┘└─┘ ┴ └─┘└─┘o

app.get("/", (_, res) => {
  res.send("There's nothing here\n send a POST request to /csv");
});

// ╦ ╦┌─┐┌┐┌┌┬┐┬  ┌─┐┬─┐┌─┐┬
// ╠═╣├─┤│││ │││  ├┤ ├┬┘└─┐│
// ╩ ╩┴ ┴┘└┘─┴┘┴─┘└─┘┴└─└─┘o
type CSVRouteKind = {
  url: string;
  select_fields: Array<string>;
};

type CSVResult<I> = {
  conversion_key: string;
  json: I;
};

app.post("/csv", async (req, res) => {
  //! depreciated!
  const csv = (req.param("csv") as unknown) as CSVRouteKind;
  if (!csv) {
    panic(res, "No CSV file is present");
  }
  if (!csv.url.includes(".csv")) {
    panic(res, "URL is not a valid CSV file");
  }
  const { filePath, jsonPath } = await downloadCSV(csv.url);
  //   const csvFile = path.resolve(process.cwd(), "./downloads/sample.csv");

  csvToJson.fieldDelimiter(",").generateJsonFileFromCsv(filePath, jsonPath);
  fs.readFile(jsonPath, (err, data) => {
    //!BAD
    if (err) res.send(err);

    const JSONFile: Array<object> = JSON.parse(data.toString());

    const result: CSVResult<object[]> = {
      conversion_key: makeid(32),
      json:
        csv?.select_fields?.length > 0
          ? omit(JSONFile, csv.select_fields)
          : JSONFile,
    };

    // console.log(result);
    res.send(result);
  });
});

// ╦ ╦┌─┐┬  ┌─┐┌─┐┬─┐  ╔═╗┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌┌─┐┬
// ╠═╣├┤ │  ├─┘├┤ ├┬┘  ╠╣ │ │││││   │ ││ ││││└─┐│
// ╩ ╩└─┘┴─┘┴  └─┘┴└─  ╚  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘└─┘o

/**
 * @description Downloads a file and returns the filepath
 * @param url
 */
type ResolvAbles = {
  filePath: string;
  name: string;
  fileName: string;
  jsonPath: string;
};
async function downloadCSV(url: string): Promise<ResolvAbles> {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(url);
    const name = path.basename(url, ".csv");
    const downloadPath = process.cwd() + "/downloads/";

    console.log(downloadPath);
    const _path = path.resolve(downloadPath + fileName);
    const file = fs.createWriteStream(_path);

    https.get(url, (response) => {
      const stream = response.pipe(file);
      stream.on("finish", function () {
        const resolvAbles: ResolvAbles = {
          jsonPath: path.resolve(downloadPath, `./${name}.json`),
          filePath: _path,
          fileName,
          name,
        };
        resolve(resolvAbles);
      });
    });
  });
}

function omit(obj: Array<any>, omittables: string[]): any[] {
  return obj.map((currentObject) => pick(currentObject, omittables));
}
function pick<T>(object: Array<T>, keys: Array<string>): Array<T> {
  // @ts-expect-error
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}
// helper <FN/>
const panic = (res, message: string): void => {
  res.send(message);
};

function makeid(length: number): string {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// ╔╗ ┌─┐┌─┐┌┬┐┬ ┬┌─┐┬
// ╠╩╗│ ││ │ │ │ │├─┘│
// ╚═╝└─┘└─┘ ┴ └─┘┴  o
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
