import { siteConfig } from "@/config";

export function normalizeLanguage(value?: string | null): string {
	if (!value) return siteConfig.lang.toLowerCase();
	return value.trim().replace(/-/g, "_").toLowerCase();
}

export function getPostLanguage(value?: string | null): string {
	return normalizeLanguage(value || siteConfig.lang);
}

export function getCurrentLanguageFromUrl(url: URL): string {
	const queryLang = url.searchParams.get("lang");
	return normalizeLanguage(queryLang || siteConfig.lang);
}

export function toHtmlLang(language: string): string {
	return normalizeLanguage(language).replace(/_/g, "-");
}
