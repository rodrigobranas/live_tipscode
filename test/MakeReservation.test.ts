import axios from "axios";
import makeReservation from "../src/use_cases/MakeReservation";
import getReservation from "../src/use_cases/GetReservation";
import MakeReservation from "../src/use_cases/MakeReservation";
import Repository from "../src/interface_adapters/repository";
import Connection from "../src/frameworks_and_drivers/Connection";
import GetReservation from "../src/use_cases/GetReservation";

test("Deve fazer a reserva de um quarto", async function () {
	const inputMakeReservation = {
		roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
		email: "john.doe@gmail.com",
		checkinDate: "2023-03-01T10:00:00",
		checkoutDate: "2023-03-05T10:00:00",
		creditCardNumber: "1111 1111 1111 1111",
		creditCardHolder: "JOHN DOE",
		creditCardExpDate: "08/26",
		creditCardCvv: "123"
	}
	const connection = new Connection();
	const repository = new Repository(connection);
	const makeReservation = new MakeReservation(repository);
	const getReservation = new GetReservation(repository);
	const outputMakeReservation = await makeReservation.execute(inputMakeReservation);
	expect(outputMakeReservation.reservationId).toBeDefined();
	const outputGetReservation = await getReservation.execute(outputMakeReservation.reservationId);
	expect(outputGetReservation.email).toBe("john.doe@gmail.com");
	expect(outputGetReservation.duration).toBe(4);
	expect(outputGetReservation.price).toBe(4000);
	expect(outputGetReservation.status).toBe("confirmed");
	await connection.close();
});
