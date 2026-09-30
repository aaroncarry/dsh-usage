window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-usage",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
				throw new Error("cached value already set");
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) Object.assign(mergedDescriptors, Object.getOwnPropertyDescriptors(def));
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
			const values = new Set(def.values);
			inst._zod.values = values;
			inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, _params) => {
			const def = schema._zod.def;
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
			else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			return new ZodObject({
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			});
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			return new ZodEnum({
				type: "enum",
				entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region lib/typert.remote-client.js
		let _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema$value;
		const _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema$value ??= object({
			"completed": number().readonly(),
			"total": number().readonly(),
			"running": boolean().readonly()
		});
		let _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema$value;
		const _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema$value ??= boolean();
		let _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema$value;
		const _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema$value ??= object({
			"capturedAt": number().readonly(),
			"projects": array(object({
				"id": string().readonly(),
				"title": string().readonly()
			})).readonly(),
			"sessions": array(object({
				"id": intersection(string(), unknown()).readonly(),
				"title": string().readonly(),
				"projectId": string().readonly().optional(),
				"lastAt": number().readonly(),
				"missingTurns": number().readonly()
			})).readonly(),
			"records": array(object({
				"sessionId": intersection(string(), unknown()).readonly(),
				"at": number().readonly(),
				"inputTokens": number().readonly(),
				"outputTokens": number().readonly(),
				"totalTokens": number().readonly(),
				"cacheReadTokens": number().readonly().optional(),
				"cacheWriteTokens": number().readonly().optional(),
				"provider": string().readonly().optional(),
				"model": string().readonly().optional()
			})).readonly(),
			"issues": array(object({
				"kind": union([
					literal("unreadable-session"),
					literal("missing-turn"),
					literal("unattributed-turn")
				]).readonly(),
				"sessionId": intersection(string(), unknown()).readonly(),
				"title": string().readonly(),
				"projectId": string().readonly().optional(),
				"at": number().readonly().optional()
			})).readonly(),
			"unreadableSessions": number().readonly()
		});
		const TYPERT_REMOTE = {
			package: "@deepseek-ai/dsh-client-ui-usage",
			descriptors: [{
				id: "@deepseek-ai/dsh-client-ui-usage#usageStatistics/progress",
				service: "usageStatistics",
				namespace: "usageStatistics",
				method: "progress",
				invocation: { kind: "direct" },
				parameters: [],
				result: {
					mode: "strict",
					typeSymbol: "@deepseek-ai/dsh-client-ui-usage/types#UsageProgress",
					create: _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema
				},
				sourceLocation: {
					"file": "packages/client/ui-usage/src/index.ts",
					"line": 50,
					"column": 3
				}
			}, {
				id: "@deepseek-ai/dsh-client-ui-usage#usageStatistics/snapshot",
				service: "usageStatistics",
				namespace: "usageStatistics",
				method: "snapshot",
				invocation: { kind: "direct" },
				parameters: [{
					name: "force",
					wire: "force",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-client-ui-usage#usageStatistics/snapshot:force",
						create: _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema
					}
				}],
				result: {
					mode: "strict",
					typeSymbol: "@deepseek-ai/dsh-client-ui-usage/types#UsageSnapshot",
					create: _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema
				},
				sourceLocation: {
					"file": "packages/client/ui-usage/src/index.ts",
					"line": 59,
					"column": 9
				}
			}]
		};
		//#endregion
		//#region \0dsh-css:D:\Code\deepseek-harness\packages\client\ui-usage\src\client\UsagePage.module.css.mjs
		const css = "._6rDMoW_page{--usage-blue:var(--dsw-alias-link);--usage-green:var(--dsw-alias-state-success-primary);--usage-amber:var(--dsw-alias-state-warn-primary);--usage-teal:color-mix(in srgb, var(--usage-green) 70%, var(--usage-blue));--usage-violet:color-mix(in srgb, var(--dsw-alias-state-error-secondary) 45%, var(--usage-blue));--usage-coral:color-mix(in srgb, var(--dsw-alias-state-error-primary) 65%, var(--usage-amber));--usage-olive:color-mix(in srgb, var(--usage-green) 50%, var(--usage-amber));--usage-input:var(--usage-teal);--usage-heat-cell-size:12px;--usage-heat-gap:3px;--usage-model-0:var(--usage-teal);--usage-model-1:var(--usage-violet);--usage-model-2:var(--usage-amber);--usage-model-3:var(--usage-blue);--usage-model-4:var(--usage-coral);--usage-model-5:var(--usage-green);--usage-project-0:var(--usage-amber);--usage-project-1:var(--usage-green);--usage-project-2:var(--usage-violet);--usage-project-3:var(--usage-blue);--usage-project-4:var(--usage-coral);--usage-project-5:var(--usage-olive);--usage-provider-0:var(--usage-coral);--usage-provider-1:var(--usage-teal);--usage-provider-2:var(--usage-violet);--usage-provider-3:var(--usage-blue);--usage-provider-4:var(--usage-amber);--usage-provider-5:var(--usage-green);--usage-composition-0:var(--usage-teal);--usage-composition-1:var(--usage-violet);--usage-composition-2:var(--usage-blue);--usage-composition-3:var(--usage-amber);--usage-composition-4:var(--dsw-alias-label-tertiary);box-sizing:border-box;height:100%;color:var(--dsw-alias-label-primary);padding:0 clamp(20px,4vw,48px) 48px;overflow:auto}._6rDMoW_content{max-width:1160px;margin:0 auto}._6rDMoW_pageHead{box-sizing:border-box;align-items:flex-end;min-height:108px;padding:28px 0 12px;display:flex}._6rDMoW_pageHead h1{margin:0;font-size:24px;font-weight:500}._6rDMoW_pageHead p,._6rDMoW_cardHead p{color:var(--dsw-alias-label-secondary);margin:4px 0 0;font-size:12px}._6rDMoW_toolbar{flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px;min-height:56px;margin:0 0 18px;display:flex}._6rDMoW_filters{flex-wrap:wrap;gap:10px;margin-left:auto;display:flex}._6rDMoW_filters label,._6rDMoW_trendSelect,._6rDMoW_heatYear{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:5px;font-size:11px;display:flex}._6rDMoW_filters select,._6rDMoW_trendSelect select,._6rDMoW_heatYear select{border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);min-width:140px;height:34px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:0 10px;font-size:12px}._6rDMoW_heatYear select{min-width:120px}._6rDMoW_trendControls{flex-wrap:wrap;align-items:flex-end;gap:12px;display:flex}._6rDMoW_trendSelect select{max-width:220px}._6rDMoW_card,._6rDMoW_summary{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l3);border-radius:14px;margin-bottom:20px}._6rDMoW_summary{grid-template-columns:repeat(5,minmax(0,1fr));padding:18px 0;display:grid}._6rDMoW_stat{flex-direction:column;gap:4px;min-width:0;padding:0 17px;display:flex}._6rDMoW_stat+._6rDMoW_stat{border-left:.5px solid var(--dsw-alias-border-l3)}._6rDMoW_stat span,._6rDMoW_stat small{color:var(--dsw-alias-label-secondary);font-size:11px}._6rDMoW_stat strong{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:23px;font-weight:500}._6rDMoW_card{padding:20px 22px}._6rDMoW_card h2{margin:0;font-size:16px;font-weight:500}._6rDMoW_cardHead{flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._6rDMoW_heatScroll{padding:20px 0 8px;overflow-x:auto}._6rDMoW_monthLabels{gap:var(--usage-heat-gap);width:100%;color:var(--dsw-alias-label-secondary);margin-bottom:8px;font-size:10px;display:grid}._6rDMoW_monthLabels span{white-space:nowrap}._6rDMoW_heatmap{gap:var(--usage-heat-gap);width:100%;display:grid}._6rDMoW_heatWeek{gap:var(--usage-heat-gap);grid-template-rows:repeat(7,auto);display:grid}._6rDMoW_heatCell,._6rDMoW_heatFoot i{box-sizing:border-box;border-radius:3px;display:inline-block}._6rDMoW_heatCell{aspect-ratio:1;cursor:pointer;width:100%;position:relative}._6rDMoW_heatCell:hover{outline:2px solid var(--usage-blue);outline-offset:1px}._6rDMoW_heatCell:focus-visible{outline:2px solid var(--usage-blue);outline-offset:2px}._6rDMoW_heatSelected{outline:2px solid var(--usage-blue);outline-offset:1px}._6rDMoW_heatFuture{background:var(--dsw-alias-bg-layer-2);border:1px dashed var(--dsw-alias-border-l3);cursor:default}._6rDMoW_heatFuture:hover{outline:none}._6rDMoW_heatFoot i{width:var(--usage-heat-cell-size);height:var(--usage-heat-cell-size)}._6rDMoW_heat0{background:var(--dsw-alias-bg-layer-1);border:1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 35%, var(--dsw-alias-bg-layer-1))}._6rDMoW_heat1{background:color-mix(in srgb, var(--usage-blue) 20%, var(--dsw-alias-bg-layer-2))}._6rDMoW_heat2{background:color-mix(in srgb, var(--usage-blue) 40%, var(--dsw-alias-bg-layer-2))}._6rDMoW_heat3{background:color-mix(in srgb, var(--usage-blue) 65%, var(--dsw-alias-bg-layer-2))}._6rDMoW_heat4{background:var(--usage-blue)}._6rDMoW_heatHidden{opacity:0}._6rDMoW_heatFoot{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:11px;display:flex}._6rDMoW_heatFoot>span:last-child{align-items:center;gap:4px;display:inline-flex}._6rDMoW_heatFoot strong{color:var(--dsw-alias-label-primary);font-weight:500}._6rDMoW_segments{gap:4px;display:flex}._6rDMoW_segments button,._6rDMoW_notice button{border:.5px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:7px;padding:5px 10px;font-size:11px}._6rDMoW_segments button._6rDMoW_selected{background:color-mix(in srgb, var(--usage-blue) 13%, transparent);color:var(--usage-blue);border-color:#0000}._6rDMoW_legend{color:var(--dsw-alias-label-secondary);align-items:center;gap:7px;margin:17px 0 0;font-size:11px;display:flex}._6rDMoW_inputDot{background:var(--usage-input);border-radius:50%;width:8px;height:8px;display:inline-block}._6rDMoW_chartWrap{margin-top:8px;position:relative}._6rDMoW_chart{width:100%;display:block}._6rDMoW_chart:focus-visible{outline:2px solid var(--usage-blue);outline-offset:2px;border-radius:4px}._6rDMoW_gridLine{stroke:var(--dsw-alias-border-l3);stroke-width:1px}._6rDMoW_inputLine{fill:none;stroke:var(--usage-input);stroke-width:2.5px;stroke-linejoin:round;stroke-linecap:round}._6rDMoW_chartGuide{stroke:var(--dsw-alias-label-tertiary);stroke-width:1px;stroke-dasharray:3 3}._6rDMoW_chartPoint{fill:var(--dsw-alias-bg-layer-1);stroke:var(--usage-input);stroke-width:2.5px}._6rDMoW_chartTick{fill:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:10px}._6rDMoW_chartTooltip{border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-tooltip-bg);box-shadow:0 3px 12px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);white-space:nowrap;pointer-events:none;color:var(--dsw-static-neutral-bluish-00);flex-direction:column;gap:3px;padding:5px 8px;font-size:11px;display:flex;position:absolute;top:0;transform:translate(-50%)}._6rDMoW_chartTooltip strong{color:var(--dsw-static-neutral-bluish-00);font-variant-numeric:tabular-nums;font-weight:500}._6rDMoW_chartAxis{color:var(--dsw-alias-label-secondary);justify-content:space-between;padding-left:8.6%;padding-right:4%;font-size:11px;display:flex}._6rDMoW_efficiencyStats{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:20px 0;display:grid}._6rDMoW_efficiencyStats>div{background:var(--dsw-alias-bg-layer-2);border-radius:8px;flex-direction:column;gap:6px;min-width:0;padding:10px 12px;display:flex}._6rDMoW_efficiencyStats span{color:var(--dsw-alias-label-secondary);font-size:11px}._6rDMoW_efficiencyStats strong{font-variant-numeric:tabular-nums;font-size:17px;font-weight:500}._6rDMoW_twoCols{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;display:grid}._6rDMoW_twoCols ._6rDMoW_card{min-height:215px;margin-bottom:0}._6rDMoW_twoCols+._6rDMoW_card{margin-top:20px}._6rDMoW_composition,._6rDMoW_rankList{flex-direction:column;gap:14px;margin-top:20px;display:flex}._6rDMoW_compRow{grid-template-columns:90px 1fr 62px;align-items:center;gap:12px;font-size:11px;display:grid}._6rDMoW_compRow strong,._6rDMoW_rankMeta strong{font-variant-numeric:tabular-nums;text-align:right;font-weight:500}._6rDMoW_track{background:var(--dsw-alias-bg-layer-3);border-radius:99px;height:8px;overflow:hidden}._6rDMoW_track>span{border-radius:99px;min-width:0;height:100%;display:block}._6rDMoW_rankMeta{justify-content:space-between;gap:10px;margin-bottom:6px;font-size:11px;display:flex}._6rDMoW_rankMeta>span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._6rDMoW_share{align-items:center;gap:24px;margin-top:20px;display:flex}._6rDMoW_donut{border-radius:50%;flex:none;place-items:center;width:128px;height:128px;display:grid;position:relative}._6rDMoW_donut:before{content:\"\";background:var(--dsw-alias-bg-layer-1);border-radius:50%;position:absolute;inset:25px}._6rDMoW_donut span{font-size:16px;font-weight:500;position:relative}._6rDMoW_shareLegend{flex-direction:column;flex:1;gap:9px;min-width:0;display:flex}._6rDMoW_shareLegend>div{align-items:center;gap:7px;font-size:11px;display:flex}._6rDMoW_shareLegend i{border-radius:50%;flex:none;width:8px;height:8px}._6rDMoW_shareLegend span{text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}._6rDMoW_shareLegend strong{font-variant-numeric:tabular-nums;font-weight:500}._6rDMoW_sessionList{margin-top:14px}._6rDMoW_sessionRow{border:0;border-top:.5px solid var(--dsw-alias-border-l3);text-align:left;width:100%;color:inherit;cursor:pointer;font:inherit;background:0 0;align-items:center;gap:14px;padding:12px 4px;display:flex}._6rDMoW_sessionRow:hover{background:var(--dsw-alias-bg-layer-2)}._6rDMoW_sessionIndex{width:20px;color:var(--dsw-alias-label-secondary);font-size:12px}._6rDMoW_sessionText{flex-direction:column;flex:1;gap:3px;min-width:0;display:flex}._6rDMoW_sessionText strong{text-overflow:ellipsis;white-space:nowrap;font-weight:500;overflow:hidden}._6rDMoW_sessionText small{color:var(--dsw-alias-label-secondary)}._6rDMoW_sessionTotal{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;font-size:12px}._6rDMoW_empty{color:var(--dsw-alias-label-secondary);padding:22px 0;font-size:12px}._6rDMoW_toolbarStatus{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;align-items:center;gap:12px;padding-bottom:8px;font-size:11px;display:flex}._6rDMoW_toolbarStatus button,._6rDMoW_clearDay,._6rDMoW_qualityHead button{border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;border-radius:7px;padding:5px 9px;font-size:11px}._6rDMoW_toolbarStatus button:disabled,._6rDMoW_qualityHead button:disabled{opacity:.5;cursor:default}._6rDMoW_qualityToggle{color:var(--usage-blue)!important}._6rDMoW_clearDay{margin:-6px 0 12px}._6rDMoW_qualityPanel{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);border-radius:12px;margin:0 0 18px;padding:16px 20px}._6rDMoW_qualityHead{justify-content:space-between;align-items:center;gap:12px;display:flex}._6rDMoW_qualityHead p{color:var(--dsw-alias-label-secondary);margin:0;font-size:11px}._6rDMoW_qualityGroup{border-top:.5px solid var(--dsw-alias-border-l3);margin-top:12px;padding-top:12px}._6rDMoW_qualityGroupHead{flex-wrap:wrap;align-items:baseline;gap:5px 12px;font-size:12px;display:flex}._6rDMoW_qualityGroupHead strong{font-weight:500}._6rDMoW_qualityGroupHead span{color:var(--dsw-alias-label-secondary);font-size:11px}._6rDMoW_qualityList{grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 12px;max-height:150px;margin-top:10px;display:grid;overflow:auto}._6rDMoW_qualityList button{background:var(--dsw-alias-bg-layer-2);min-width:0;color:var(--dsw-alias-label-primary);text-align:left;font:inherit;cursor:pointer;border:0;border-radius:6px;justify-content:space-between;gap:10px;padding:7px 8px;font-size:11px;display:flex}._6rDMoW_qualityList button:hover{background:var(--dsw-alias-bg-layer-3)}._6rDMoW_qualityList span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}._6rDMoW_qualityList small{color:var(--dsw-alias-label-secondary);flex:none}._6rDMoW_loading{min-height:160px;color:var(--dsw-alias-label-secondary);justify-content:center;align-items:center;gap:10px;font-size:12px;display:flex}._6rDMoW_loading i{border:2px solid var(--dsw-alias-border-l3);border-top-color:var(--usage-blue);border-radius:50%;width:16px;height:16px;animation:.8s linear infinite _6rDMoW_usage-spin}@keyframes _6rDMoW_usage-spin{to{transform:rotate(360deg)}}._6rDMoW_notice{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border-radius:8px;justify-content:space-between;align-items:center;margin:0 0 14px;padding:9px 12px;font-size:11px;display:flex}@media (width<=800px){._6rDMoW_filters{width:100%}._6rDMoW_filters label{flex:140px}._6rDMoW_summary{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:20px}._6rDMoW_stat:nth-child(4){border-left:0}._6rDMoW_twoCols,._6rDMoW_qualityList{grid-template-columns:1fr}._6rDMoW_efficiencyStats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (prefers-reduced-motion:reduce){._6rDMoW_loading i{animation:none}}";
		const tagId = "@deepseek-ai/dsh-client-ui-usage/UsagePage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-usage";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var UsagePage_module_css_default = {
			"card": "_6rDMoW_card",
			"cardHead": "_6rDMoW_cardHead",
			"chart": "_6rDMoW_chart",
			"chartAxis": "_6rDMoW_chartAxis",
			"chartGuide": "_6rDMoW_chartGuide",
			"chartPoint": "_6rDMoW_chartPoint",
			"chartTick": "_6rDMoW_chartTick",
			"chartTooltip": "_6rDMoW_chartTooltip",
			"chartWrap": "_6rDMoW_chartWrap",
			"clearDay": "_6rDMoW_clearDay",
			"compRow": "_6rDMoW_compRow",
			"composition": "_6rDMoW_composition",
			"content": "_6rDMoW_content",
			"donut": "_6rDMoW_donut",
			"efficiencyStats": "_6rDMoW_efficiencyStats",
			"empty": "_6rDMoW_empty",
			"filters": "_6rDMoW_filters",
			"gridLine": "_6rDMoW_gridLine",
			"heat0": "_6rDMoW_heat0",
			"heat1": "_6rDMoW_heat1",
			"heat2": "_6rDMoW_heat2",
			"heat3": "_6rDMoW_heat3",
			"heat4": "_6rDMoW_heat4",
			"heatCell": "_6rDMoW_heatCell",
			"heatFoot": "_6rDMoW_heatFoot",
			"heatFuture": "_6rDMoW_heatFuture",
			"heatHidden": "_6rDMoW_heatHidden",
			"heatScroll": "_6rDMoW_heatScroll",
			"heatSelected": "_6rDMoW_heatSelected",
			"heatWeek": "_6rDMoW_heatWeek",
			"heatYear": "_6rDMoW_heatYear",
			"heatmap": "_6rDMoW_heatmap",
			"inputDot": "_6rDMoW_inputDot",
			"inputLine": "_6rDMoW_inputLine",
			"legend": "_6rDMoW_legend",
			"loading": "_6rDMoW_loading",
			"monthLabels": "_6rDMoW_monthLabels",
			"notice": "_6rDMoW_notice",
			"page": "_6rDMoW_page",
			"pageHead": "_6rDMoW_pageHead",
			"qualityGroup": "_6rDMoW_qualityGroup",
			"qualityGroupHead": "_6rDMoW_qualityGroupHead",
			"qualityHead": "_6rDMoW_qualityHead",
			"qualityList": "_6rDMoW_qualityList",
			"qualityPanel": "_6rDMoW_qualityPanel",
			"qualityToggle": "_6rDMoW_qualityToggle",
			"rankList": "_6rDMoW_rankList",
			"rankMeta": "_6rDMoW_rankMeta",
			"segments": "_6rDMoW_segments",
			"selected": "_6rDMoW_selected",
			"sessionIndex": "_6rDMoW_sessionIndex",
			"sessionList": "_6rDMoW_sessionList",
			"sessionRow": "_6rDMoW_sessionRow",
			"sessionText": "_6rDMoW_sessionText",
			"sessionTotal": "_6rDMoW_sessionTotal",
			"share": "_6rDMoW_share",
			"shareLegend": "_6rDMoW_shareLegend",
			"stat": "_6rDMoW_stat",
			"summary": "_6rDMoW_summary",
			"toolbar": "_6rDMoW_toolbar",
			"toolbarStatus": "_6rDMoW_toolbarStatus",
			"track": "_6rDMoW_track",
			"trendControls": "_6rDMoW_trendControls",
			"trendSelect": "_6rDMoW_trendSelect",
			"twoCols": "_6rDMoW_twoCols",
			"usage-spin": "_6rDMoW_usage-spin"
		};
		//#endregion
		//#region src/client/UsagePage.tsx
		/** Interactive charts over one Host observation of durable token usage. */
		const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
		const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
		const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
		const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
		function dayStart(time) {
			const date = new Date(time);
			return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
		}
		function dayLabel(time) {
			return new Intl.DateTimeFormat(void 0, {
				month: "short",
				day: "numeric"
			}).format(time);
		}
		function amount(value) {
			return new Intl.NumberFormat(void 0, {
				notation: value >= 1e4 ? "compact" : "standard",
				maximumFractionDigits: 1
			}).format(value);
		}
		function change(current, previous) {
			return previous > 0 ? `${current >= previous ? "+" : ""}${((current - previous) / previous * 100).toFixed(1)}%` : "—";
		}
		function grouped(records, getName) {
			const sums = /* @__PURE__ */ new Map();
			for (const record of records) {
				const name = getName(record);
				sums.set(name, (sums.get(name) ?? 0) + record.totalTokens);
			}
			return [...sums].map(([name, total]) => ({
				name,
				total
			})).sort((a, b) => b.total - a.total);
		}
		function streaks(days) {
			const active = new Set(days);
			const today = dayStart(Date.now());
			let current = 0;
			let cursor = active.has(today) ? today : new Date(today).setDate(new Date(today).getDate() - 1);
			while (active.has(cursor)) {
				current++;
				const date = new Date(cursor);
				cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getTime();
			}
			let longest = 0;
			let run = 0;
			const first = new Date(today);
			first.setDate(first.getDate() - 364);
			for (let offset = 0; offset < 365; offset++) {
				const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + offset);
				run = active.has(date.getTime()) ? run + 1 : 0;
				longest = Math.max(longest, run);
			}
			return {
				current,
				longest
			};
		}
		function TrendChart({ records, period, anchorAt, mode, metric, label, t }) {
			const [hovered, setHovered] = (0, react.useState)();
			const anchor = dayStart(anchorAt);
			const data = [];
			for (let offset = period - 1; offset >= 0; offset--) {
				const date = new Date(anchor);
				const at = new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset).getTime();
				data.push({
					at,
					endAt: at,
					input: 0,
					turns: 0,
					cacheRead: 0,
					cacheKnown: true
				});
			}
			const byDay = new Map(data.map((item, index) => [item.at, index]));
			for (const record of records) {
				const index = byDay.get(dayStart(record.at));
				if (index === void 0) continue;
				const item = data[index];
				if (item === void 0) continue;
				item.input += record.totalTokens - record.outputTokens;
				item.turns++;
				item.cacheRead += record.cacheReadTokens ?? 0;
				item.cacheKnown &&= record.cacheReadTokens !== void 0;
			}
			const points = mode === "weekly" ? data.reduce((weeks, item) => {
				const date = new Date(item.at);
				const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() + 6) % 7).getTime();
				let week = weeks.at(-1);
				if (week?.at !== monday) {
					week = {
						at: monday,
						endAt: item.at,
						input: 0,
						turns: 0,
						cacheRead: 0,
						cacheKnown: true
					};
					weeks.push(week);
				}
				week.endAt = item.at;
				week.input += item.input;
				week.turns += item.turns;
				week.cacheRead += item.cacheRead;
				week.cacheKnown &&= item.cacheKnown;
				return weeks;
			}, []) : data;
			if (mode === "cumulative") {
				let input = 0;
				for (const item of points) {
					input += item.input;
					item.input = input;
				}
			}
			const valueOf = (point) => {
				if (metric === "turns") return point.turns;
				if (metric === "averageInput") return point.turns ? point.input / point.turns : 0;
				if (metric === "cacheRate") return point.turns && !point.cacheKnown ? void 0 : point.input ? point.cacheRead / point.input * 100 : 0;
				return point.input;
			};
			const values = points.map(valueOf);
			const maximum = metric === "cacheRate" ? 100 : Math.max(1, ...values.filter((value) => value !== void 0));
			const position = (index) => {
				return {
					x: 68 + (points.length === 1 ? 345 : index * 690 / (points.length - 1)),
					y: 150 - (values[index] ?? 0) / maximum * 120
				};
			};
			const line = values.map((value, index) => value === void 0 ? "" : `${index === 0 || values[index - 1] === void 0 ? "M" : "L"} ${position(index).x} ${position(index).y}`).join(" ");
			const activeIndex = hovered !== void 0 && hovered < points.length ? hovered : void 0;
			const active = activeIndex === void 0 ? void 0 : points[activeIndex];
			const activePosition = activeIndex === void 0 ? void 0 : position(activeIndex);
			const updateHover = (clientX, width, left) => {
				const x = (clientX - left) / width * 790;
				setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - 68) / 690 * (points.length - 1)))));
			};
			const format = (value) => value === void 0 ? "—" : metric === "cacheRate" ? `${value.toFixed(1)}%` : `${new Intl.NumberFormat(void 0, { maximumFractionDigits: metric === "averageInput" ? 1 : 0 }).format(value)} ${metric === "turns" ? t("turns") : t("tokenUnit")}`;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UsagePage_module_css_default.chartWrap,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
						className: UsagePage_module_css_default.chart,
						viewBox: "0 0 790 180",
						role: "img",
						"aria-label": label,
						tabIndex: 0,
						onPointerMove: (event) => {
							const bounds = event.currentTarget.getBoundingClientRect();
							updateHover(event.clientX, bounds.width, bounds.left);
						},
						onPointerLeave: () => {
							setHovered(void 0);
						},
						onFocus: () => {
							setHovered(points.length - 1);
						},
						onBlur: () => {
							setHovered(void 0);
						},
						onKeyDown: (event) => {
							if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
							event.preventDefault();
							setHovered((index) => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === "ArrowLeft" ? -1 : 1))));
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
								width: "790",
								height: "180",
								fill: "transparent"
							}),
							[
								0,
								1,
								2,
								3
							].map((tick) => {
								const y = 150 - tick * 40;
								const value = maximum * tick / 3;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
									x1: "68",
									x2: "758",
									y1: y,
									y2: y,
									className: UsagePage_module_css_default.gridLine
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
									x: "60",
									y: y + 4,
									textAnchor: "end",
									className: UsagePage_module_css_default.chartTick,
									children: metric === "cacheRate" ? `${Math.round(value)}%` : amount(value)
								})] }, tick);
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								d: line,
								className: UsagePage_module_css_default.inputLine
							}),
							points.length === 1 && values[0] !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
								cx: position(0).x,
								cy: position(0).y,
								r: "3",
								className: UsagePage_module_css_default.chartPoint
							}),
							activePosition && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
								x1: activePosition.x,
								x2: activePosition.x,
								y1: "30",
								y2: "150",
								className: UsagePage_module_css_default.chartGuide
							}), values[activeIndex ?? 0] !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
								cx: activePosition.x,
								cy: activePosition.y,
								r: "5",
								className: UsagePage_module_css_default.chartPoint
							})] })
						]
					}),
					active && activePosition && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.chartTooltip,
						style: { left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` },
						role: "status",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: mode === "weekly" ? `${dayLabel(active.at)} – ${dayLabel(active.endAt)}` : new Intl.DateTimeFormat(void 0, {
							year: "numeric",
							month: "short",
							day: "numeric"
						}).format(active.at) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
							label,
							" · ",
							format(values[activeIndex ?? 0])
						] })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.chartAxis,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: dayLabel(points[0]?.at ?? anchor) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: dayLabel(points.at(-1)?.endAt ?? anchor) })]
					})
				]
			});
		}
		function Heatmap({ records, years, year, selectedDay, onYearChange, onSelectDay, t }) {
			const totals = /* @__PURE__ */ new Map();
			for (const record of records) {
				const day = dayStart(record.at);
				totals.set(day, (totals.get(day) ?? 0) + record.totalTokens);
			}
			const today = dayStart(Date.now());
			const first = year === "rolling" ? new Date(new Date(today).getFullYear(), new Date(today).getMonth(), new Date(today).getDate() - 364) : new Date(year, 0, 1);
			const last = year === "rolling" ? today : new Date(year, 11, 31).getTime();
			const start = new Date(first.getFullYear(), first.getMonth(), first.getDate() - first.getDay());
			const cells = [];
			for (const day = new Date(start); day.getTime() <= last; day.setDate(day.getDate() + 1)) cells.push({
				at: day.getTime(),
				total: totals.get(day.getTime()) ?? 0,
				visible: day.getTime() >= first.getTime() && day.getTime() <= today,
				future: day.getTime() >= first.getTime() && day.getTime() > today
			});
			while (cells.length % 7 !== 0) cells.push({
				at: today,
				total: 0,
				visible: false,
				future: false
			});
			const weeks = cells.length / 7;
			const months = Array.from({ length: weeks }, (_, week) => {
				const cell = cells[week * 7];
				if (cell === void 0) return "";
				const date = new Date(Math.max(cell.at, first.getTime()));
				const previousCell = week === 0 ? void 0 : cells[(week - 1) * 7];
				const previous = previousCell === void 0 ? void 0 : new Date(Math.max(previousCell.at, first.getTime()));
				return previous === void 0 || date.getMonth() !== previous.getMonth() ? new Intl.DateTimeFormat(void 0, { month: "short" }).format(date) : "";
			});
			const active = [...totals].filter(([day, total]) => day >= first.getTime() && day <= last && total > 0);
			const max = Math.max(1, ...active.map(([, total]) => total));
			const streak = streaks(active.map(([day]) => day));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: UsagePage_module_css_default.card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.cardHead,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("heatmap") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: year === "rolling" ? t("heatmapNote") : `${year} · ${t("oneCellDay")}` })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: UsagePage_module_css_default.heatYear,
							children: [t("heatmapRange"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								value: year,
								onChange: (event) => {
									onYearChange(event.target.value === "rolling" ? "rolling" : Number(event.target.value));
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "rolling",
									children: t("rollingYear")
								}), years.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: item,
									children: item
								}, item))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.heatScroll,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UsagePage_module_css_default.monthLabels,
							style: {
								gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`,
								minWidth: `${weeks * 12 + (weeks - 1) * 3}px`
							},
							children: months.map((month, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: month }, index))
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UsagePage_module_css_default.heatmap,
							style: {
								gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`,
								minWidth: `${weeks * 12 + (weeks - 1) * 3}px`
							},
							children: Array.from({ length: weeks }, (_, week) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: UsagePage_module_css_default.heatWeek,
								children: cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
									const level = cell.total === 0 ? 0 : Math.max(1, Math.ceil(cell.total / max * 4));
									const detail = `${new Intl.DateTimeFormat(void 0, {
										year: "numeric",
										month: "long",
										day: "numeric"
									}).format(cell.at)}\n${new Intl.NumberFormat(void 0).format(cell.total)} ${t("tokenUnit")}`;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label: detail,
										side: "top",
										portal: true,
										delayMs: 80,
										disabled: !cell.visible,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: `${UsagePage_module_css_default.heatCell} ${cell.visible ? UsagePage_module_css_default[`heat${level}`] : cell.future ? UsagePage_module_css_default.heatFuture : UsagePage_module_css_default.heatHidden} ${selectedDay === cell.at ? UsagePage_module_css_default.heatSelected : ""}`,
											role: cell.visible ? "button" : void 0,
											tabIndex: cell.visible && cell.at === (selectedDay ?? today) ? 0 : -1,
											"aria-label": cell.visible ? detail : void 0,
											"aria-pressed": cell.visible ? selectedDay === cell.at : void 0,
											onClick: () => {
												if (cell.visible) onSelectDay(cell.at);
											},
											onKeyDown: (event) => {
												if (!cell.visible) return;
												if (event.key === "Enter" || event.key === " ") {
													event.preventDefault();
													onSelectDay(cell.at);
													return;
												}
												const delta = event.key === "ArrowRight" ? 7 : event.key === "ArrowLeft" ? -7 : event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
												if (delta === 0) return;
												event.preventDefault();
												const target = cells[week * 7 + day + delta];
												if (target?.visible) event.currentTarget.closest(`.${UsagePage_module_css_default.heatmap}`)?.querySelector(`[data-day="${target.at}"]`)?.focus();
											},
											"data-day": cell.at
										})
									}, day);
								})
							}, week))
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.heatFoot,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
							t("currentStreak"),
							" ",
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
								streak.current,
								" ",
								t("days")
							] }),
							" · ",
							t("longestStreak"),
							" ",
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
								streak.longest,
								" ",
								t("days")
							] })
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
							t("less"),
							" ",
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: UsagePage_module_css_default.heat0 }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: UsagePage_module_css_default.heat1 }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: UsagePage_module_css_default.heat2 }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: UsagePage_module_css_default.heat3 }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: UsagePage_module_css_default.heat4 }),
							" ",
							t("more")
						] })]
					})
				]
			});
		}
		function RankBars({ rows, empty, unit }) {
			const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0));
			return rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: UsagePage_module_css_default.empty,
				children: empty
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: UsagePage_module_css_default.rankList,
				children: rows.slice(0, 6).map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: `${row.name}\n${new Intl.NumberFormat(void 0).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`,
					side: "top",
					portal: true,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.rankRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UsagePage_module_css_default.rankMeta,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: row.name }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
								amount(row.total),
								" · ",
								(row.total / total * 100).toFixed(1),
								"%"
							] })]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UsagePage_module_css_default.track,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: {
								width: `${row.total / total * 100}%`,
								background: PROJECT_COLORS[index % PROJECT_COLORS.length]
							} })
						})]
					})
				}, row.name))
			});
		}
		function ShareDonut({ rows, empty, other, colors, unit }) {
			const [hovered, setHovered] = (0, react.useState)();
			const total = rows.reduce((sum, row) => sum + row.total, 0);
			if (total === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: UsagePage_module_css_default.empty,
				children: empty
			});
			const shown = rows.length <= 6 ? rows : [...rows.slice(0, 5), {
				name: other,
				total: rows.slice(5).reduce((sum, row) => sum + row.total, 0)
			}];
			let offset = 0;
			const stops = shown.map((row, index) => {
				const from = offset;
				offset += row.total / total * 100;
				return `${colors[index % colors.length]} ${from}% ${offset}%`;
			});
			const detail = (row) => `${row.name}\n${new Intl.NumberFormat(void 0).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`;
			const onDonutMove = (clientX, clientY, element) => {
				const bounds = element.getBoundingClientRect();
				const share = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI) / (2 * Math.PI) * total;
				let used = 0;
				setHovered(shown.findIndex((row) => (used += row.total) > share));
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UsagePage_module_css_default.share,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: hovered === void 0 || hovered < 0 ? `${new Intl.NumberFormat(void 0).format(total)} ${unit}` : detail(shown[hovered]),
					side: "top",
					portal: true,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: UsagePage_module_css_default.donut,
						style: { background: `conic-gradient(${stops.join(", ")})` },
						onPointerMove: (event) => {
							onDonutMove(event.clientX, event.clientY, event.currentTarget);
						},
						onPointerLeave: () => {
							setHovered(void 0);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: amount(total) })
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: UsagePage_module_css_default.shareLegend,
					children: shown.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
						label: detail(row),
						side: "top",
						portal: true,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: colors[index % colors.length] } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: row.name }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [(row.total / total * 100).toFixed(1), "%"] })
						] })
					}, `${index}:${row.name}`))
				})]
			});
		}
		function sessionRoute(records, id, unknown) {
			const own = records.filter((record) => record.sessionId === id);
			return `${grouped(own, (record) => record.provider ?? unknown)[0]?.name ?? unknown} / ${grouped(own, (record) => record.model ?? unknown)[0]?.name ?? unknown}`;
		}
		function QualityPanel({ issues, refreshing, onOpen, onRebuild, t }) {
			const groups = [
				[
					"unreadable-session",
					t("unreadableSessions"),
					t("unreadableExplanation")
				],
				[
					"missing-turn",
					t("missingTurns"),
					t("missingExplanation")
				],
				[
					"unattributed-turn",
					t("unattributedTurns"),
					t("unattributedExplanation")
				]
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: UsagePage_module_css_default.qualityPanel,
				"aria-label": t("dataQuality"),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: UsagePage_module_css_default.qualityHead,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("qualityIntro") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						disabled: refreshing,
						onClick: onRebuild,
						children: t("rebuild")
					})]
				}), groups.map(([kind, label, explanation]) => {
					const own = issues.filter((issue) => issue.kind === kind);
					const sessions = /* @__PURE__ */ new Map();
					for (const issue of own) {
						const previous = sessions.get(issue.sessionId);
						const at = Math.max(previous?.at ?? 0, issue.at ?? 0) || void 0;
						sessions.set(issue.sessionId, {
							title: issue.title,
							count: (previous?.count ?? 0) + 1,
							...at === void 0 ? {} : { at }
						});
					}
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePage_module_css_default.qualityGroup,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UsagePage_module_css_default.qualityGroupHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
								label,
								" · ",
								own.length
							] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: explanation })]
						}), sessions.size > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UsagePage_module_css_default.qualityList,
							children: [...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => {
									onOpen(id);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: item.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: kind === "unreadable-session" ? t("openSession") : `${item.count} ${t("turns")}${item.at === void 0 ? "" : ` · ${dayLabel(item.at)}`}` })]
							}, id))
						})]
					}, kind);
				})]
			});
		}
		/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
		function UsagePage({ useUsage, activate, retry, rebuild, openSession, t }) {
			const { snapshot, error, refreshing, progress } = useUsage((state) => state);
			const [period, setPeriod] = (0, react.useState)(30);
			const [selectedDay, setSelectedDay] = (0, react.useState)();
			const [heatYear, setHeatYear] = (0, react.useState)("rolling");
			const [qualityOpen, setQualityOpen] = (0, react.useState)(false);
			const [project, setProject] = (0, react.useState)("");
			const [model, setModel] = (0, react.useState)("");
			const [trend, setTrend] = (0, react.useState)("daily");
			const [trendModel, setTrendModel] = (0, react.useState)("");
			const [efficiencyMetric, setEfficiencyMetric] = (0, react.useState)("turns");
			const [efficiencyMode, setEfficiencyMode] = (0, react.useState)("daily");
			const [efficiencyModel, setEfficiencyModel] = (0, react.useState)("");
			const [sessionMode, setSessionMode] = (0, react.useState)("high");
			(0, react.useEffect)(() => activate(), [activate]);
			const today = dayStart(snapshot?.capturedAt ?? Date.now());
			const anchor = selectedDay ?? today;
			const anchorDate = new Date(anchor);
			const daysInView = selectedDay === void 0 ? period : 1;
			const start = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - daysInView + 1).getTime();
			const end = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() + 1).getTime();
			const previousStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - 2 * daysInView + 1).getTime();
			const sessionById = (0, react.useMemo)(() => new Map(snapshot?.sessions.map((session) => [session.id, session]) ?? []), [snapshot]);
			const projectById = (0, react.useMemo)(() => new Map(snapshot?.projects.map((item) => [item.id, item.title]) ?? []), [snapshot]);
			const projectRecords = (snapshot?.records ?? []).filter((record) => !project || sessionById.get(record.sessionId)?.projectId === project);
			const models = [...new Set(projectRecords.map((record) => record.model).filter((value) => value !== void 0))].sort();
			const scoped = projectRecords.filter((record) => !model || record.model === model);
			const selected = scoped.filter((record) => record.at >= start && record.at < end);
			const trendModels = [...new Set(selected.map((record) => record.model).filter((value) => value !== void 0))].sort();
			const activeTrendModel = trendModels.includes(trendModel) ? trendModel : "";
			const trendRecords = selected.filter((record) => !activeTrendModel || record.model === activeTrendModel);
			const activeEfficiencyModel = trendModels.includes(efficiencyModel) ? efficiencyModel : "";
			const efficiencyRecords = selected.filter((record) => !activeEfficiencyModel || record.model === activeEfficiencyModel);
			const efficiencyInput = efficiencyRecords.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
			const efficiencyCacheShare = efficiencyRecords.length > 0 && efficiencyRecords.every((record) => record.cacheReadTokens !== void 0) && efficiencyInput > 0 ? `${(efficiencyRecords.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / efficiencyInput * 100).toFixed(1)}%` : "—";
			const previous = scoped.filter((record) => record.at >= previousStart && record.at < start);
			const allHeat = scoped;
			const total = selected.reduce((sum, record) => sum + record.totalTokens, 0);
			const prior = previous.reduce((sum, record) => sum + record.totalTokens, 0);
			const dayTotals = grouped(selected, (record) => String(dayStart(record.at)));
			const peak = Math.max(0, ...dayTotals.map((day) => day.total));
			const priorDays = grouped(previous, (record) => String(dayStart(record.at)));
			const priorPeak = Math.max(0, ...priorDays.map((day) => day.total));
			const cacheComplete = selected.length > 0 && selected.every((record) => record.cacheReadTokens !== void 0);
			const cacheRead = selected.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0);
			const prompt = selected.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
			const cacheRate = cacheComplete && prompt > 0 ? `${(cacheRead / prompt * 100).toFixed(1)}%` : "—";
			const previousCacheComplete = previous.length > 0 && previous.every((record) => record.cacheReadTokens !== void 0);
			const previousPrompt = previous.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
			const previousRate = previousCacheComplete && previousPrompt > 0 ? previous.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / previousPrompt * 100 : void 0;
			const cacheDelta = previousRate === void 0 || cacheRate === "—" ? "—" : `${(Number.parseFloat(cacheRate) - previousRate).toFixed(1)} ${t("percentagePoints")}`;
			const qualityIssues = (snapshot?.issues ?? []).filter((issue) => !project || issue.projectId === project).filter((issue) => issue.at === void 0 || issue.at >= start && issue.at < end);
			const unreadableIssues = qualityIssues.filter((issue) => issue.kind === "unreadable-session");
			const missingIssues = qualityIssues.filter((issue) => issue.kind === "missing-turn");
			const unattributedIssues = qualityIssues.filter((issue) => issue.kind === "unattributed-turn");
			const completedTurns = efficiencyRecords.length;
			const averageInputPerTurn = completedTurns ? efficiencyInput / completedTurns : 0;
			const coverage = !model && !activeEfficiencyModel && unreadableIssues.length === 0 && completedTurns + missingIssues.length > 0 ? `${(completedTurns / (completedTurns + missingIssues.length) * 100).toFixed(1)}%` : "—";
			const modelRows = grouped(selected, (record) => record.model ?? t("unknown"));
			const heatYears = [...new Set([new Date(today).getFullYear(), ...(snapshot?.records ?? []).map((record) => new Date(record.at).getFullYear())])].sort((a, b) => b - a);
			const providerRows = grouped(selected, (record) => record.provider ?? t("unknown"));
			const projectRows = grouped(selected, (record) => projectById.get(sessionById.get(record.sessionId)?.projectId ?? "") ?? t("unknown"));
			const sessionTotals = /* @__PURE__ */ new Map();
			for (const record of selected) sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens);
			const sessions = (snapshot?.sessions ?? []).filter((session) => {
				if (project && session.projectId !== project) return false;
				if (model && !sessionTotals.has(session.id)) return false;
				return sessionMode === "high" ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end;
			}).sort((a, b) => sessionMode === "high" ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0) : b.lastAt - a.lastAt).slice(0, 10);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("main", {
				className: UsagePage_module_css_default.page,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: UsagePage_module_css_default.content,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("header", {
							className: UsagePage_module_css_default.pageHead,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: t("title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("subtitle") })] })
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UsagePage_module_css_default.notice,
							role: "alert",
							children: [
								snapshot ? t("staleError") : t("error"),
								" ",
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									onClick: retry,
									children: t("retry")
								})
							]
						}),
						!snapshot && !error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UsagePage_module_css_default.loading,
							role: "status",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								t("loading"),
								progress?.total ? ` · ${progress.completed}/${progress.total}` : ""
							]
						}),
						snapshot && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: UsagePage_module_css_default.toolbar,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: UsagePage_module_css_default.toolbarStatus,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: refreshing ? `${t("refreshing")}${progress?.total ? ` ${progress.completed}/${progress.total}` : ""}` : `${error ? t("staleAsOf") : t("updatedAt")} ${new Intl.DateTimeFormat(void 0, {
											month: "short",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit"
										}).format(snapshot.capturedAt)}` }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											disabled: refreshing,
											onClick: retry,
											children: t("refresh")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: UsagePage_module_css_default.qualityToggle,
											"aria-expanded": qualityOpen,
											onClick: () => {
												setQualityOpen(!qualityOpen);
											},
											children: [
												t("dataQuality"),
												" · ",
												unreadableIssues.length,
												" ",
												t("sessionsUnit"),
												" / ",
												missingIssues.length,
												" ",
												t("turns"),
												" / ",
												unattributedIssues.length,
												" ",
												t("unattributedShort")
											]
										})
									]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: UsagePage_module_css_default.filters,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("period"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: selectedDay === void 0 ? period : "selected",
											onChange: (event) => {
												setSelectedDay(void 0);
												setPeriod(Number(event.target.value));
												setTrendModel("");
											},
											children: [
												selectedDay !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
													value: "selected",
													children: new Intl.DateTimeFormat(void 0, {
														year: "numeric",
														month: "numeric",
														day: "numeric"
													}).format(selectedDay)
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
													value: 7,
													children: t("days7")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
													value: 30,
													children: t("days30")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
													value: 90,
													children: t("days90")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
													value: 365,
													children: t("days365")
												})
											]
										})] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("project"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: project,
											onChange: (event) => {
												setProject(event.target.value);
												setModel("");
												setTrendModel("");
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: t("allProjects")
											}), snapshot.projects.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: item.id,
												children: item.title
											}, item.id))]
										})] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("model"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: model,
											onChange: (event) => {
												setModel(event.target.value);
												setTrendModel("");
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: t("allModels")
											}), models.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: item,
												children: item
											}, item))]
										})] })
									]
								})]
							}),
							selectedDay !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: UsagePage_module_css_default.clearDay,
								onClick: () => {
									setSelectedDay(void 0);
								},
								children: t("clearDay")
							}),
							qualityOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(QualityPanel, {
								issues: qualityIssues,
								refreshing,
								onOpen: openSession,
								onRebuild: rebuild,
								t
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("section", {
								className: UsagePage_module_css_default.summary,
								"aria-label": t("title"),
								children: [
									[
										t("total"),
										amount(total),
										`${t("compared")} ${change(total, prior)}`
									],
									[
										t("average"),
										amount(Math.round(total / daysInView)),
										`${t("compared")} ${change(total, prior)}`
									],
									[
										t("peak"),
										amount(peak),
										`${t("compared")} ${change(peak, priorPeak)}`
									],
									[
										t("active"),
										`${dayTotals.length} ${t("days")}`,
										`${t("compared")} ${change(dayTotals.length, priorDays.length)}`
									],
									[
										t("cacheRate"),
										cacheRate,
										`${t("compared")} ${cacheDelta}`
									]
								].map(([label, value, note]) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: UsagePage_module_css_default.stat,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: value }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: note })
									]
								}, label))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Heatmap, {
								records: allHeat,
								years: heatYears,
								year: heatYear,
								selectedDay,
								onYearChange: (value) => {
									setHeatYear(value);
									setSelectedDay(void 0);
								},
								onSelectDay: (value) => {
									setSelectedDay((current) => current === value ? void 0 : value);
									setTrendModel("");
								},
								t
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: UsagePage_module_css_default.card,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: UsagePage_module_css_default.cardHead,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("trend") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("trendNote") })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: UsagePage_module_css_default.trendControls,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
												className: UsagePage_module_css_default.trendSelect,
												children: [t("trendScope"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
													value: activeTrendModel,
													onChange: (event) => {
														setTrendModel(event.target.value);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "",
														children: t("trendTotal")
													}), trendModels.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: item,
														children: item
													}, item))]
												})]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: UsagePage_module_css_default.segments,
												children: [
													"daily",
													"weekly",
													"cumulative"
												].map((mode) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: trend === mode ? UsagePage_module_css_default.selected : "",
													onClick: () => {
														setTrend(mode);
													},
													children: t(mode)
												}, mode))
											})]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: UsagePage_module_css_default.legend,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: UsagePage_module_css_default.inputDot }), t("input")]
									}),
									trendRecords.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TrendChart, {
										records: trendRecords,
										period: daysInView,
										anchorAt: anchor,
										mode: trend,
										metric: "input",
										label: `${t("input")} · ${activeTrendModel || t("trendTotal")}`,
										t
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: UsagePage_module_css_default.empty,
										children: t("noData")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: UsagePage_module_css_default.card,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: UsagePage_module_css_default.cardHead,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("efficiency") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("efficiencyNote") })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: UsagePage_module_css_default.trendControls,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
													className: UsagePage_module_css_default.trendSelect,
													children: [t("trendScope"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
														value: activeEfficiencyModel,
														onChange: (event) => {
															setEfficiencyModel(event.target.value);
														},
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
															value: "",
															children: t("trendTotal")
														}), trendModels.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
															value: item,
															children: item
														}, item))]
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
													className: UsagePage_module_css_default.trendSelect,
													children: [t("efficiencyMetric"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
														value: efficiencyMetric,
														onChange: (event) => {
															setEfficiencyMetric(event.target.value);
														},
														children: [
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
																value: "turns",
																children: t("completedTurns")
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
																value: "averageInput",
																children: t("averageInputPerTurn")
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
																value: "cacheRate",
																children: t("cacheReadShare")
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: UsagePage_module_css_default.segments,
													children: ["daily", "weekly"].map((mode) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														className: efficiencyMode === mode ? UsagePage_module_css_default.selected : "",
														onClick: () => {
															setEfficiencyMode(mode);
														},
														children: t(mode)
													}, mode))
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: UsagePage_module_css_default.efficiencyStats,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("completedTurns") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: new Intl.NumberFormat(void 0).format(completedTurns) })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("averageInputPerTurn") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: completedTurns ? amount(averageInputPerTurn) : "—" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("cacheReadShare") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: efficiencyCacheShare })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
												label: t("coverageExplanation"),
												side: "top",
												portal: true,
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [t("measuredCoverage"), " ⓘ"] })
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: coverage })] })
										]
									}),
									efficiencyRecords.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TrendChart, {
										records: efficiencyRecords,
										period: daysInView,
										anchorAt: anchor,
										mode: efficiencyMode,
										metric: efficiencyMetric,
										label: `${efficiencyMetric === "turns" ? t("completedTurns") : efficiencyMetric === "averageInput" ? t("averageInputPerTurn") : t("cacheReadShare")} · ${activeEfficiencyModel || t("trendTotal")}`,
										t
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: UsagePage_module_css_default.empty,
										children: t("noData")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: UsagePage_module_css_default.twoCols,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: UsagePage_module_css_default.card,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("composition") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: UsagePage_module_css_default.composition,
											children: [
												[t("uncached"), selected.reduce((sum, record) => sum + record.inputTokens, 0)],
												[t("cacheRead"), cacheRead],
												[t("cacheWrite"), selected.reduce((sum, record) => sum + (record.cacheWriteTokens ?? 0), 0)],
												[t("output"), selected.reduce((sum, record) => sum + record.outputTokens, 0)],
												[t("unknownInput"), selected.reduce((sum, record) => sum + Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0)), 0)]
											].map(([name, value], index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
												label: `${name}\n${new Intl.NumberFormat(void 0).format(value)} ${t("tokenUnit")} · ${total ? (value / total * 100).toFixed(1) : "0.0"}%`,
												side: "top",
												portal: true,
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: UsagePage_module_css_default.compRow,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: name }),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: UsagePage_module_css_default.track,
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: {
																width: `${total ? value / total * 100 : 0}%`,
																background: COMPOSITION_COLORS[index]
															} })
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: amount(value) })
													]
												})
											}, name))
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: UsagePage_module_css_default.card,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("models") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShareDonut, {
											rows: modelRows,
											empty: t("noData"),
											other: t("other"),
											colors: MODEL_COLORS,
											unit: t("tokenUnit")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: UsagePage_module_css_default.card,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("projects") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RankBars, {
											rows: projectRows,
											empty: t("noData"),
											unit: t("tokenUnit")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: UsagePage_module_css_default.card,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("providers") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShareDonut, {
											rows: providerRows,
											empty: t("noData"),
											other: t("other"),
											colors: PROVIDER_COLORS,
											unit: t("tokenUnit")
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: UsagePage_module_css_default.card,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: UsagePage_module_css_default.cardHead,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("sessions") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: UsagePage_module_css_default.segments,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: sessionMode === "high" ? UsagePage_module_css_default.selected : "",
											onClick: () => {
												setSessionMode("high");
											},
											children: t("highUsage")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: sessionMode === "recent" ? UsagePage_module_css_default.selected : "",
											onClick: () => {
												setSessionMode("recent");
											},
											children: t("recent")
										})]
									})]
								}), sessions.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: UsagePage_module_css_default.empty,
									children: t("noData")
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: UsagePage_module_css_default.sessionList,
									children: sessions.map((session, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: UsagePage_module_css_default.sessionRow,
										onClick: () => {
											openSession(session.id);
										},
										title: t("openSession"),
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: UsagePage_module_css_default.sessionIndex,
												children: index + 1
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: UsagePage_module_css_default.sessionText,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: session.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
													projectById.get(session.projectId ?? "") ?? t("unknown"),
													" · ",
													sessionMode === "recent" ? `${t("lastChat")} ${dayLabel(session.lastAt)}` : sessionRoute(selected, session.id, t("unknown"))
												] })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: UsagePage_module_css_default.sessionTotal,
												children: [
													amount(sessionTotals.get(session.id) ?? 0),
													" ",
													t("tokenUnit")
												]
											})
										]
									}, session.id))
								})]
							})
						] })
					]
				})
			});
		}
		//#endregion
		//#region src/client/UsageIcon.tsx
		/** Decorative glyph for the usage sidebar entry. */
		/** Render the sidebar's requested icon size. @param props - sidebar icon props. @returns the glyph. */
		function UsageIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDataOutlineRegular, { size });
		}
		//#endregion
		//#region src/client/locales.ts
		/** Copy for the desktop usage dashboard. */
		const zh = {
			panel: "用量统计",
			title: "用量统计",
			subtitle: "查看 Token 使用趋势与构成",
			period: "时间范围",
			project: "项目",
			model: "模型",
			allProjects: "全部项目",
			allModels: "全部模型",
			days7: "最近 7 天",
			days30: "最近 30 天",
			days90: "最近 90 天",
			days365: "最近 365 天",
			total: "累计 Token",
			average: "日均 Token",
			peak: "单日峰值",
			active: "活跃天数",
			cacheRate: "缓存命中率",
			compared: "较上一周期",
			unavailable: "暂无可核实的数据",
			retry: "重试",
			loading: "正在读取会话用量…",
			refreshing: "正在更新用量…",
			error: "读取用量失败",
			staleError: "更新失败，当前显示上次保存的数据",
			staleAsOf: "数据截至",
			updatedAt: "更新于",
			refresh: "刷新",
			heatmap: "Token 活动",
			heatmapNote: "过去 365 天 · 每格一天",
			heatmapRange: "查看范围",
			rollingYear: "最近一年",
			oneCellDay: "每格一天",
			clearDay: "清除日期筛选",
			dataQuality: "数据完整性",
			qualityIntro: "统计总量仅包含供应商报告的完整用量。",
			rebuild: "重新统计全部数据",
			unreadableSessions: "无法读取的会话",
			unreadableExplanation: "这些会话的用量未计入总量",
			missingTurns: "缺少完整用量的轮次",
			missingExplanation: "这些轮次的用量未计入总量",
			unattributedTurns: "无法归属模型或供应商的轮次",
			unattributedExplanation: "用量已计入总量，归为未归属",
			turns: "轮次",
			sessionsUnit: "会话",
			unattributedShort: "未归属轮次",
			currentStreak: "当前连续",
			longestStreak: "最长连续",
			days: "天",
			less: "少",
			more: "多",
			trend: "用量趋势",
			trendNote: "输入 Token",
			trendScope: "模型趋势",
			trendTotal: "总量",
			daily: "每日",
			weekly: "每周",
			cumulative: "累计",
			percentagePoints: "个百分点",
			efficiency: "使用效率",
			efficiencyNote: "按已完成轮次统计",
			efficiencyMetric: "观测项",
			completedTurns: "已计量轮次",
			averageInputPerTurn: "每轮平均输入",
			cacheReadShare: "缓存读取占输入",
			measuredCoverage: "可核实轮次占比",
			coverageExplanation: "已计量轮次 ÷ 已计量及缺少用量的轮次；无法读取会话或按模型筛选时不可计算。",
			input: "输入",
			output: "输出",
			composition: "输入输出构成",
			uncached: "普通输入",
			cacheRead: "缓存读取",
			cacheWrite: "缓存写入",
			unknownInput: "其他输入",
			models: "模型用量占比",
			projects: "项目用量",
			providers: "供应商用量占比",
			sessions: "会话 Top 10",
			highUsage: "高用量",
			recent: "最近聊天",
			lastChat: "最近聊天",
			unknown: "未归属",
			other: "其他",
			noData: "所选范围暂无 Token 用量",
			missing: "部分会话的用量未知",
			tokenUnit: "Token",
			openSession: "打开会话"
		};
		/** English fallback dictionary. */
		const en = {
			panel: "Usage",
			title: "Token usage",
			subtitle: "Track token trends and composition",
			period: "Period",
			project: "Project",
			model: "Model",
			allProjects: "All projects",
			allModels: "All models",
			days7: "Last 7 days",
			days30: "Last 30 days",
			days90: "Last 90 days",
			days365: "Last 365 days",
			total: "Total tokens",
			average: "Daily average",
			peak: "Peak day",
			active: "Active days",
			cacheRate: "Cache hit rate",
			compared: "vs previous period",
			unavailable: "No verified data",
			retry: "Retry",
			loading: "Reading session usage…",
			refreshing: "Updating usage…",
			error: "Could not load usage",
			staleError: "Update failed; showing the last saved data",
			staleAsOf: "Data as of",
			updatedAt: "Updated",
			refresh: "Refresh",
			heatmap: "Token activity",
			heatmapNote: "Past 365 days · one cell per day",
			heatmapRange: "Range",
			rollingYear: "Past year",
			oneCellDay: "One cell per day",
			clearDay: "Clear day filter",
			dataQuality: "Data quality",
			qualityIntro: "Totals include only complete provider-reported usage.",
			rebuild: "Recalculate all sessions",
			unreadableSessions: "Unreadable sessions",
			unreadableExplanation: "Their usage is excluded from totals",
			missingTurns: "Turns without complete usage",
			missingExplanation: "Their usage is excluded from totals",
			unattributedTurns: "Turns without one model or provider",
			unattributedExplanation: "Their usage is included under Unattributed",
			turns: "turns",
			sessionsUnit: "sessions",
			unattributedShort: "unattributed turns",
			currentStreak: "Current streak",
			longestStreak: "Longest streak",
			days: "days",
			less: "Less",
			more: "More",
			trend: "Usage trend",
			trendNote: "Input tokens",
			trendScope: "Model trend",
			trendTotal: "Total",
			daily: "Daily",
			weekly: "Weekly",
			cumulative: "Cumulative",
			percentagePoints: "pp",
			efficiency: "Usage efficiency",
			efficiencyNote: "Based on completed turns",
			efficiencyMetric: "Metric",
			completedTurns: "Measured turns",
			averageInputPerTurn: "Average input per turn",
			cacheReadShare: "Cache read share of input",
			measuredCoverage: "Measurable turn coverage",
			coverageExplanation: "Measured turns divided by measured and missing-usage turns; unavailable with unreadable sessions or a model filter.",
			input: "Input",
			output: "Output",
			composition: "Token composition",
			uncached: "Uncached input",
			cacheRead: "Cache read",
			cacheWrite: "Cache write",
			unknownInput: "Other input",
			models: "Usage by model",
			projects: "Usage by project",
			providers: "Usage by provider",
			sessions: "Top 10 sessions",
			highUsage: "High usage",
			recent: "Recent chats",
			lastChat: "Last chat",
			unknown: "Unattributed",
			other: "Other",
			noData: "No token usage in this period",
			missing: "Some session usage is unknown",
			tokenUnit: "tokens",
			openSession: "Open session"
		};
		//#endregion
		//#region src/client/index.ts
		const PANEL_ID = "usage-statistics";
		/** Service required to mount this plugin's own Remote contribution. */
		const inject = ["remote"];
		/** Register the usage dashboard and its navigation icon. @param ctx - browser services. */
		function registerUi(ctx) {
			ctx.effect(() => ctx.locale.register("usageStatistics", {
				zh,
				en
			}), "ui-usage: dictionaries");
			const t = ctx.locale.bind("usageStatistics");
			const usage = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({
				error: false,
				refreshing: false
			}, { persist: { name: "dsh.usage-statistics.snapshot.v2" } });
			let disposeActive;
			let refreshActive;
			const activate = () => {
				disposeActive?.();
				let disposed = false;
				let busy = false;
				let rerun = false;
				let nextForce = false;
				const refresh = async (force = false) => {
					if (busy) {
						rerun = true;
						nextForce ||= force;
						return;
					}
					busy = true;
					usage.set({
						...usage.getSnapshot(),
						refreshing: true,
						error: false,
						progress: {
							completed: 0,
							total: 0,
							running: true
						}
					});
					do {
						rerun = false;
						const runForce = force || nextForce;
						force = false;
						nextForce = false;
						const timer = setInterval(() => {
							ctx.remote.usageStatistics.progress().then((result) => {
								if (result.ok && !disposed) usage.set({
									...usage.getSnapshot(),
									progress: result.value
								});
							}).catch((_progressFailure) => {});
						}, 500);
						try {
							const result = await ctx.remote.usageStatistics.snapshot(runForce);
							if (!result.ok) throw new Error(result.error.message);
							if (!disposed) usage.set({
								snapshot: result.value,
								error: false,
								refreshing: rerun,
								progress: {
									completed: result.value.sessions.length + result.value.unreadableSessions,
									total: result.value.sessions.length + result.value.unreadableSessions,
									running: rerun
								}
							});
						} catch (_loadFailure) {
							if (!disposed) usage.set({
								...usage.getSnapshot(),
								error: true,
								refreshing: rerun,
								progress: {
									completed: 0,
									total: 0,
									running: false
								}
							});
						} finally {
							clearInterval(timer);
						}
					} while (rerun && !disposed);
					busy = false;
				};
				refreshActive = (force) => {
					refresh(force);
				};
				const disposeStatus = ctx.remote.$on("api-session/status", (_id, running) => {
					if (!running) refresh();
				});
				const disposeAdded = ctx.remote.$on("api-session/added", () => {
					refresh();
				});
				const disposeRemoved = ctx.remote.$on("api-session/removed", () => {
					refresh();
				});
				const disposeReset = ctx.on("connection/reset", () => {
					refresh();
				});
				refresh();
				const dispose = () => {
					disposed = true;
					disposeStatus();
					disposeAdded();
					disposeRemoved();
					disposeReset();
					if (disposeActive === dispose) {
						disposeActive = void 0;
						refreshActive = void 0;
					}
				};
				disposeActive = dispose;
				return dispose;
			};
			ctx.effect(() => () => {
				disposeActive?.();
			}, "ui-usage: observation");
			const face = {
				hooks: { usage },
				activate,
				retry: () => {
					refreshActive?.();
				},
				rebuild: () => {
					refreshActive?.(true);
				},
				openSession: (id) => {
					ctx.uiWorkspace.openSession(id);
				}
			};
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID,
				locale: "usageStatistics",
				inject: () => face
			}, UsagePage));
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: 15,
				label: () => t("panel"),
				locale: "usageStatistics"
			}, UsageIcon));
		}
		/**
		* Mount this bundle's Host Remote and browser UI as one reversible plugin.
		* @param ctx - browser services.
		* @returns disposer for the dashboard and its Remote namespace.
		*/
		async function apply(ctx) {
			const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
			const ui = ctx.inject([
				"remote.usageStatistics",
				"slots",
				"locale",
				"uiWorkspace"
			], registerUi);
			try {
				await ui;
			} catch (error) {
				await ui.dispose();
				await disposeRemote();
				throw error;
			}
			return async () => {
				await ui.dispose();
				await disposeRemote();
			};
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map