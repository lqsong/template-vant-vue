/**
 * @description: 自定义I18n store
 * @author LiQingSong
 */
import { Locale } from "vant";
import { defineStore } from "pinia";
import { isArray, isObject } from "@/utils/is";
import { getLocale, defaultLang } from "@/utils/i18n";

import { TI18n, TI18nKey, TUseFormat } from "@/@types/i18n";

// 导入 vant 语言包
import vantZhCN from "vant/es/locale/lang/zh-CN";
import vantZhTW from "vant/es/locale/lang/zh-TW";
import vantEnUS from "vant/es/locale/lang/en-US";

// 导入全局自定义语言
import globalLocales from "@/locales";

// state ts类型
export interface II18nState {
	// 语言名
	locale: TI18nKey;
	// 语言包
	messages: TI18n;
	// vant 语言包
	vantMessages: { [key in TI18nKey]: any };
}

// 获取当前系统或存储的语言
const sysLocale = getLocale();

export const useI18nStore = defineStore("useI18nStore", {
	state: (): II18nState => {
		return {
			locale: globalLocales[sysLocale] ? sysLocale : defaultLang,
			messages: globalLocales,
			vantMessages: {
				"zh-CN": vantZhCN,
				"zh-TW": vantZhTW,
				"en-US": vantEnUS,
			},
		};
	},
	getters: {},
	actions: {
		/**
		 * @description 引入语言包
		 * @param locales 当前本地(文件夹下)语言包
		 * @returns (key: string, format?: TUseFormat) => string
		 */
		use(locales?: TI18n) {
			return (key: string, format?: TUseFormat) => {
				const i18nMessage = this.messages[this.locale] || {};
				const locale = locales ? locales[this.locale] || {} : {};
				let str = i18nMessage[key] || locale[key] || key;

				if (isObject(format) || isArray(format)) {
					const newFormat: any = format;
					for (const key in newFormat) {
						if (Object.prototype.hasOwnProperty.call(newFormat, key)) {
							const pattern = `\\{${key}\\}`;
							str = str.replace(new RegExp(pattern, "ig"), newFormat[key]);
						}
					}
				}

				return str;
			};
		},

		/**
		 * @description 设置 vant 多语言
		 * @param locale 语言名称
		 */
		setVantLocale(locale?: TI18nKey) {
			const l = locale || this.locale;
			Locale.use(l, this.vantMessages[l]);
		},
	},
});
