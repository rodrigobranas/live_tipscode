import pgp from "pg-promise";

export default class Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	async query (statement: string, data: any) {
		return this.connection.query(statement, data);
	}

	async close () {
		await this.connection.$pool.end();
	}
}
