import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ╦═╗┌─┐┬ ┬┌┬┐┌─┐┌─┐┬
// ╠╦╝│ ││ │ │ ├┤ └─┐│
// ╩╚═└─┘└─┘ ┴ └─┘└─┘o

app.get("/", (_, res) => {
  res.redirect("/csv");
});
app.get("/csv", handleCSVRoute);

// ╦ ╦┌─┐┌┐┌┌┬┐┬  ┌─┐┬─┐┌─┐┬
// ╠═╣├─┤│││ │││  ├┤ ├┬┘└─┐│
// ╩ ╩┴ ┴┘└┘─┴┘┴─┘└─┘┴└─└─┘o
function handleCSVRoute(req, res) {
  res.send("It worls");
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
