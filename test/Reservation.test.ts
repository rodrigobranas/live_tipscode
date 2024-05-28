import axios from "axios";
import makeReservation from "../src/use_cases/MakeReservation";
import getReservation from "../src/use_cases/GetReservation";
import Reservation from "../src/entities/Reservation";
import Room from "../src/entities/Room";

test("Deve fazer a reserva de um quarto", async function () {
	const room = new Room("", "day", 1000)
	const reservation = Reservation.create("", "john.doe@gmail.com", new Date("2023-03-01T10:00:00"), new Date("2023-03-05T10:00:00"));
	reservation.calculate(room);
	expect(reservation.reservationId).toBeDefined();
	expect(reservation.email).toBe("john.doe@gmail.com");
	expect(reservation.duration).toBe(4);
	expect(reservation.price).toBe(4000);
	expect(reservation.status).toBe("confirmed");
});
