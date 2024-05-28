import Reservation from "../entities/Reservation";
import Room from "../entities/Room";
import Connection from "../frameworks_and_drivers/Connection";

export default class Repository {

	constructor (readonly connection: Connection) {
	}

	async getRoom (roomId: string) {
		const [room] = await this.connection.query("select * from branas.room where room_id = $1", [roomId]);
		return new Room(room.room_id, room.type, parseFloat(room.price));
	}
	
	async saveReservation (reservation: Reservation) {
		await this.connection.query("insert into branas.reservation (reservation_id, room_id, email, checkin_date, checkout_date, duration, price, status) values ($1, $2, $3, $4, $5, $6, $7, $8)", [reservation.reservationId, reservation.roomId, reservation.email, reservation.checkinDate, reservation.checkoutDate, reservation.duration, reservation.price, reservation.status]);
	}

	async getReservation (reservationId: string) {
		const [reservation] = await this.connection.query("select * from branas.reservation where reservation_id = $1", [reservationId]);
		return new Reservation(reservation.reservation_id, reservation.room_id, reservation.email, reservation.checkin_date, reservation.checkout_date, parseFloat(reservation.duration), parseFloat(reservation.price), reservation.status);
	}

}
