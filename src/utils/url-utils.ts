import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function getPostUrlBySlug(slug: string): string {
	return url(`/posts/${slug}/`);
}

export function withLanguageSearchParam(
	rawUrl: string,
	language?: string,
): string {
	if (!language) return rawUrl;
	const searchParamJoiner = rawUrl.includes("?") ? "&" : "?";
	return `${rawUrl}${searchParamJoiner}lang=${encodeURIComponent(language)}`;
}

export function getTagUrl(tag: string, language?: string): string {
	if (!tag) return withLanguageSearchParam(url("/archive/"), language);
	return withLanguageSearchParam(
		url(`/archive/?tag=${encodeURIComponent(tag.trim())}`),
		language,
	);
}

export function getCategoryUrl(
	category: string | null,
	language?: string,
): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase()
	)
		return withLanguageSearchParam(
			url("/archive/?uncategorized=true"),
			language,
		);
	return withLanguageSearchParam(
		url(`/archive/?category=${encodeURIComponent(category.trim())}`),
		language,
	);
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return path.substring(0, lastSlashIndex + 1);
}

export function url(path: string) {
	return joinUrl("", import.meta.env.BASE_URL, path);
}
