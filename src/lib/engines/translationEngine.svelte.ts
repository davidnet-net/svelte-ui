export interface ParaglideRuntimeType<T extends string> {
	locales: readonly T[];
	getLocale: () => T;
	setLocale: (locale: T) => void;
}

/**
 * Make sure to provide paraglide functions.
 *
 * @example
 * import * as runtime from "../paraglide/runtime.js";
 * createTranslationEngine(runtime);
 */
export function createTranslationEngine<T extends string>(
	paraglideRuntime: ParaglideRuntimeType<T>
) {
	const { locales, getLocale, setLocale } = paraglideRuntime;

	if (!Array.isArray(locales) || locales.length === 0) {
		throw new Error("createTranslationEngine: 'locales' must be a non-empty array.");
	}

	if (typeof getLocale !== "function" || typeof setLocale !== "function") {
		throw new Error("createTranslationEngine: 'getLocale' and 'setLocale' must be functions.");
	}

	/**
	 * Type generated dynamically with "locales" from the injected runtime
	 */
	type Locale = T;

	/**
	 * Validates and normalizes a language string against the supported locales.
	 *
	 * @param lang - The language string to validate, typically from a header.
	 * @returns The matching {@link Locale} if valid, otherwise `null`.
	 */
	async function validateLanguage(lang: string | null): Promise<Locale | null> {
		if (!lang) {
			return null;
		}

		const candidate = lang.split(",")[0].split("-")[0].trim().toLowerCase();

		// Check if the candidate exists in the injected locales list
		if ((locales as readonly string[]).includes(candidate)) {
			return candidate as Locale;
		} else {
			return null;
		}
	}

	return async function translationEngine() {
		//TODO JWT Session language preference
		document.documentElement.lang = getLocale();

		// Check if on the most best navigator language.
		let navigatorLanguageBestMatch: Locale | null = null;
		for (const lang of navigator.languages) {
			const validated = await validateLanguage(lang);
			if (validated) {
				navigatorLanguageBestMatch = validated;
				break;
			}
		}

		if (navigatorLanguageBestMatch && navigatorLanguageBestMatch !== getLocale()) {
			setLocale(navigatorLanguageBestMatch);
			document.documentElement.lang = getLocale();
			return;
		}
	};
}
