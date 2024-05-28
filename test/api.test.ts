import axios from "axios";

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
	const responseMakeReservation = await axios.post("http://localhost:3000/make_reservation", inputMakeReservation);
	const outputMakeReservation = responseMakeReservation.data;
	expect(outputMakeReservation.reservationId).toBeDefined();
	const responseGetReservation = await axios.get(`http://localhost:3000/reservations/${outputMakeReservation.reservationId}`);
	const outputGetReservation = responseGetReservation.data;
	expect(outputGetReservation.email).toBe("john.doe@gmail.com");
	expect(outputGetReservation.duration).toBe(4);
	expect(outputGetReservation.price).toBe(4000);
	expect(outputGetReservation.status).toBe("confirmed");
});
