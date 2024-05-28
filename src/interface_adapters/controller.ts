import express from "express";
import MakeReservation from "../use_cases/MakeReservation";
import Repository from "./repository";
import Connection from "../frameworks_and_drivers/Connection";
import GetReservation from "../use_cases/GetReservation";

const app = express();
app.use(express.json());
const connection = new Connection();
const repository = new Repository(connection);
const makeReservation = new MakeReservation(repository);
const getReservation = new GetReservation(repository);

app.post("/make_reservation", async function (req, res) {
	const output = await makeReservation.execute(req.body);
	res.json(output);
});

app.get("/reservations/:reservationId", async function (req, res) {
	const output = await getReservation.execute(req.params.reservationId);
	res.json(output);
});

app.listen(3000);