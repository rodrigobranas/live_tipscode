import Reservation from "../entities/Reservation";
import Repository from "../interface_adapters/repository";

export default class MakeReservation {

	constructor (readonly repository: Repository) {
	}

	async execute (input: any) {
		const room = await this.repository.getRoom(input.roomId);
		const reservation = Reservation.create(input.roomId, input.email, new Date(input.checkinDate), new Date(input.checkoutDate));
		reservation.calculate(room);
		await this.repository.saveReservation(reservation);
		return {
			reservationId: reservation.reservationId
		}
	}
}