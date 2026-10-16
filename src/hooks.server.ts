import { initDDSServerMagic } from "$lib/server/init.server";
import { exit } from "process";

export const init = async (): Promise<void> => {
	exit(1); // Temporary test
	initDDSServerMagic();
};
