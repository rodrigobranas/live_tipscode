import pgp from "pg-promise";
import Repository from "../interface_adapters/repository";

export default class GetReservation {

	constructor (readonly repository: Repository) {
	}

	async execute (reservationId: string) {
		const reservation = await this.repository.getReservation(reservationId);
		return reservation;
	}
}
