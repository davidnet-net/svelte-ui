import { initDDSServerMagic } from "$lib/server/init.server";

export const init = async (): Promise<void> => {
	initDDSServerMagic();
};
