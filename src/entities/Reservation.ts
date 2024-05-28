import crypto from "crypto";
import Room from "./Room";

export default class Reservation {

	constructor (readonly reservationId: string, readonly roomId: string, readonly email: string, readonly checkinDate: Date, readonly checkoutDate: Date, public duration: number, public price: number, public status: string) {
	}
	
	static create (roomId: string, email: string, checkinDate: Date, checkoutDate: Date) {
		const reservationId = crypto.randomUUID();
		const status = "confirmed";
		const duration = 0;
		const price = 0;
		return new Reservation(reservationId, roomId, email, checkinDate, checkoutDate, duration, price, status);
	}

	calculate (room: Room) {
		this.duration = (this.checkoutDate.getTime() - this.checkinDate.getTime())/(1000*60*60*24);
		this.price = this.duration * room.price;
	}
}
