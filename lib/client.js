window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-usage",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const css = ".UsagePage_page{--usage-blue: var(--dsw-alias-link);--usage-green: var(--dsw-alias-state-success-primary);--usage-amber: var(--dsw-alias-state-warn-primary);--usage-teal: color-mix(in srgb, var(--usage-green) 70%, var(--usage-blue));--usage-violet: color-mix(in srgb, var(--dsw-alias-state-error-secondary) 45%, var(--usage-blue));--usage-coral: color-mix(in srgb, var(--dsw-alias-state-error-primary) 65%, var(--usage-amber));--usage-olive: color-mix(in srgb, var(--usage-green) 50%, var(--usage-amber));--usage-input: var(--usage-teal);--usage-heat-cell-size: 12px;--usage-heat-gap: 3px;--usage-model-0: var(--usage-teal);--usage-model-1: var(--usage-violet);--usage-model-2: var(--usage-amber);--usage-model-3: var(--usage-blue);--usage-model-4: var(--usage-coral);--usage-model-5: var(--usage-green);--usage-project-0: var(--usage-amber);--usage-project-1: var(--usage-green);--usage-project-2: var(--usage-violet);--usage-project-3: var(--usage-blue);--usage-project-4: var(--usage-coral);--usage-project-5: var(--usage-olive);--usage-provider-0: var(--usage-coral);--usage-provider-1: var(--usage-teal);--usage-provider-2: var(--usage-violet);--usage-provider-3: var(--usage-blue);--usage-provider-4: var(--usage-amber);--usage-provider-5: var(--usage-green);--usage-composition-0: var(--usage-teal);--usage-composition-1: var(--usage-violet);--usage-composition-2: var(--usage-blue);--usage-composition-3: var(--usage-amber);--usage-composition-4: var(--dsw-alias-label-tertiary);box-sizing:border-box;height:100%;overflow:auto;padding:0 clamp(20px,4vw,48px) 48px;color:var(--dsw-alias-label-primary)}.UsagePage_content{max-width:1160px;margin:0 auto}.UsagePage_pageHead{min-height:108px;display:flex;align-items:flex-end;padding:28px 0 12px;box-sizing:border-box}.UsagePage_pageHead h1{margin:0;font-size:24px;font-weight:500}.UsagePage_pageHead p,.UsagePage_cardHead p{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:12px}.UsagePage_toolbar{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:12px;min-height:56px;margin:0 0 18px}.UsagePage_filters{display:flex;flex-wrap:wrap;gap:10px;margin-left:auto}.UsagePage_filters label,.UsagePage_trendSelect,.UsagePage_heatYear{display:flex;flex-direction:column;gap:5px;color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_filters select,.UsagePage_trendSelect select,.UsagePage_heatYear select{min-width:140px;height:34px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l3);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px}.UsagePage_heatYear select{min-width:120px}.UsagePage_trendControls{display:flex;align-items:flex-end;flex-wrap:wrap;gap:12px}.UsagePage_trendSelect select{max-width:220px}.UsagePage_card,.UsagePage_summary{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l3);border-radius:14px;margin-bottom:20px}.UsagePage_summary{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding:18px 0}.UsagePage_stat{min-width:0;padding:0 17px;display:flex;flex-direction:column;gap:4px}.UsagePage_stat+.UsagePage_stat{border-left:.5px solid var(--dsw-alias-border-l3)}.UsagePage_stat span,.UsagePage_stat small{color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_stat strong{font-size:23px;font-weight:500;white-space:nowrap;font-variant-numeric:tabular-nums}.UsagePage_card{padding:20px 22px}.UsagePage_card h2{margin:0;font-size:16px;font-weight:500}.UsagePage_cardHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}.UsagePage_heatScroll{overflow-x:auto;padding:20px 0 8px}.UsagePage_monthLabels{display:grid;gap:var(--usage-heat-gap);width:100%;margin-bottom:8px;color:var(--dsw-alias-label-secondary);font-size:10px}.UsagePage_monthLabels span{white-space:nowrap}.UsagePage_heatmap{display:grid;gap:var(--usage-heat-gap);width:100%}.UsagePage_heatWeek{display:grid;grid-template-rows:repeat(7,auto);gap:var(--usage-heat-gap)}.UsagePage_heatCell,.UsagePage_heatFoot i{box-sizing:border-box;border-radius:3px;display:inline-block}.UsagePage_heatCell{position:relative;width:100%;aspect-ratio:1;cursor:pointer}.UsagePage_heatCell:hover{outline:2px solid var(--usage-blue);outline-offset:1px}.UsagePage_heatCell:focus-visible{outline:2px solid var(--usage-blue);outline-offset:2px}.UsagePage_heatSelected{outline:2px solid var(--usage-blue);outline-offset:1px}.UsagePage_heatFuture{background:var(--dsw-alias-bg-layer-2);border:1px dashed var(--dsw-alias-border-l3);cursor:default}.UsagePage_heatFuture:hover{outline:none}.UsagePage_heatFoot i{width:var(--usage-heat-cell-size);height:var(--usage-heat-cell-size)}.UsagePage_heat0{background:var(--dsw-alias-bg-layer-1);border:1px solid color-mix(in srgb,var(--dsw-alias-label-tertiary) 35%,var(--dsw-alias-bg-layer-1))}.UsagePage_heat1{background:color-mix(in srgb,var(--usage-blue) 20%,var(--dsw-alias-bg-layer-2))}.UsagePage_heat2{background:color-mix(in srgb,var(--usage-blue) 40%,var(--dsw-alias-bg-layer-2))}.UsagePage_heat3{background:color-mix(in srgb,var(--usage-blue) 65%,var(--dsw-alias-bg-layer-2))}.UsagePage_heat4{background:var(--usage-blue)}.UsagePage_heatHidden{opacity:0}.UsagePage_heatFoot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_heatFoot>span:last-child{display:inline-flex;align-items:center;gap:4px}.UsagePage_heatFoot strong{color:var(--dsw-alias-label-primary);font-weight:500}.UsagePage_segments{display:flex;gap:4px}.UsagePage_segments button,.UsagePage_notice button{border:.5px solid var(--dsw-alias-border-l3);border-radius:7px;padding:5px 10px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer}.UsagePage_segments button.UsagePage_selected{background:color-mix(in srgb,var(--usage-blue) 13%,transparent);border-color:transparent;color:var(--usage-blue)}.UsagePage_legend{display:flex;align-items:center;gap:7px;color:var(--dsw-alias-label-secondary);font-size:11px;margin:17px 0 0}.UsagePage_inputDot{width:8px;height:8px;border-radius:50%;display:inline-block;background:var(--usage-input)}.UsagePage_chartWrap{margin-top:8px;position:relative}.UsagePage_chart{width:100%;display:block}.UsagePage_chart:focus-visible{outline:2px solid var(--usage-blue);outline-offset:2px;border-radius:4px}.UsagePage_gridLine{stroke:var(--dsw-alias-border-l3);stroke-width:1}.UsagePage_inputLine{fill:none;stroke:var(--usage-input);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round}.UsagePage_chartGuide{stroke:var(--dsw-alias-label-tertiary);stroke-width:1;stroke-dasharray:3 3}.UsagePage_chartPoint{fill:var(--dsw-alias-bg-layer-1);stroke:var(--usage-input);stroke-width:2.5}.UsagePage_chartTick{fill:var(--dsw-alias-label-secondary);font-size:10px;font-variant-numeric:tabular-nums}.UsagePage_chartTooltip{position:absolute;top:0;transform:translate(-50%);display:flex;flex-direction:column;gap:3px;padding:5px 8px;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-tooltip-bg);box-shadow:0 3px 12px color-mix(in srgb,var(--dsw-alias-label-primary) 12%,transparent);white-space:nowrap;pointer-events:none;font-size:11px;color:var(--dsw-static-neutral-bluish-00)}.UsagePage_chartTooltip strong{color:var(--dsw-static-neutral-bluish-00);font-weight:500;font-variant-numeric:tabular-nums}.UsagePage_chartAxis{display:flex;justify-content:space-between;padding-left:8.6%;padding-right:4%;color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_efficiencyStats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:20px 0}.UsagePage_efficiencyStats>div{display:flex;flex-direction:column;gap:6px;min-width:0;padding:10px 12px;border-radius:8px;background:var(--dsw-alias-bg-layer-2)}.UsagePage_efficiencyStats span{color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_efficiencyStats strong{font-size:17px;font-weight:500;font-variant-numeric:tabular-nums}.UsagePage_twoCols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.UsagePage_twoCols .UsagePage_card{margin-bottom:0;min-height:215px}.UsagePage_twoCols+.UsagePage_card{margin-top:20px}.UsagePage_composition,.UsagePage_rankList{margin-top:20px;display:flex;flex-direction:column;gap:14px}.UsagePage_compRow{display:grid;grid-template-columns:90px 1fr 62px;align-items:center;gap:12px;font-size:11px}.UsagePage_compRow strong,.UsagePage_rankMeta strong{font-weight:500;font-variant-numeric:tabular-nums;text-align:right}.UsagePage_track{height:8px;background:var(--dsw-alias-bg-layer-3);border-radius:99px;overflow:hidden}.UsagePage_track>span{height:100%;display:block;border-radius:99px;min-width:0}.UsagePage_rankMeta{display:flex;justify-content:space-between;gap:10px;font-size:11px;margin-bottom:6px}.UsagePage_rankMeta>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.UsagePage_share{display:flex;gap:24px;align-items:center;margin-top:20px}.UsagePage_donut{position:relative;width:128px;height:128px;border-radius:50%;flex:none;display:grid;place-items:center}.UsagePage_donut:before{content:\"\";position:absolute;inset:25px;border-radius:50%;background:var(--dsw-alias-bg-layer-1)}.UsagePage_donut span{position:relative;font-size:16px;font-weight:500}.UsagePage_shareLegend{min-width:0;flex:1;display:flex;flex-direction:column;gap:9px}.UsagePage_shareLegend>div{display:flex;align-items:center;gap:7px;font-size:11px}.UsagePage_shareLegend i{width:8px;height:8px;border-radius:50%;flex:none}.UsagePage_shareLegend span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.UsagePage_shareLegend strong{font-weight:500;font-variant-numeric:tabular-nums}.UsagePage_sessionList{margin-top:14px}.UsagePage_sessionRow{width:100%;border:0;border-top:.5px solid var(--dsw-alias-border-l3);padding:12px 4px;display:flex;gap:14px;align-items:center;text-align:left;background:transparent;color:inherit;cursor:pointer;font:inherit}.UsagePage_sessionRow:hover{background:var(--dsw-alias-bg-layer-2)}.UsagePage_sessionIndex{width:20px;color:var(--dsw-alias-label-secondary);font-size:12px}.UsagePage_sessionText{min-width:0;display:flex;flex-direction:column;gap:3px;flex:1}.UsagePage_sessionText strong{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.UsagePage_sessionText small{color:var(--dsw-alias-label-secondary)}.UsagePage_sessionTotal{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;font-size:12px}.UsagePage_empty{padding:22px 0;color:var(--dsw-alias-label-secondary);font-size:12px}.UsagePage_toolbarStatus{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding-bottom:8px;color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_toolbarStatus button,.UsagePage_clearDay,.UsagePage_qualityHead button{border:.5px solid var(--dsw-alias-border-l3);border-radius:7px;padding:5px 9px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:11px;cursor:pointer}.UsagePage_toolbarStatus button:disabled,.UsagePage_qualityHead button:disabled{opacity:.5;cursor:default}.UsagePage_qualityToggle{color:var(--usage-blue)!important}.UsagePage_clearDay{margin:-6px 0 12px}.UsagePage_qualityPanel{box-sizing:border-box;padding:16px 20px;margin:0 0 18px;border:.5px solid var(--dsw-alias-border-l3);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}.UsagePage_qualityHead{display:flex;align-items:center;justify-content:space-between;gap:12px}.UsagePage_qualityHead p{margin:0;color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_qualityGroup{border-top:.5px solid var(--dsw-alias-border-l3);padding-top:12px;margin-top:12px}.UsagePage_qualityGroupHead{display:flex;flex-wrap:wrap;gap:5px 12px;align-items:baseline;font-size:12px}.UsagePage_qualityGroupHead strong{font-weight:500}.UsagePage_qualityGroupHead span{color:var(--dsw-alias-label-secondary);font-size:11px}.UsagePage_qualityList{max-height:150px;overflow:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 12px;margin-top:10px}.UsagePage_qualityList button{min-width:0;display:flex;justify-content:space-between;gap:10px;padding:7px 8px;border:0;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);text-align:left;font:inherit;font-size:11px;cursor:pointer}.UsagePage_qualityList button:hover{background:var(--dsw-alias-bg-layer-3)}.UsagePage_qualityList span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.UsagePage_qualityList small{flex:none;color:var(--dsw-alias-label-secondary)}.UsagePage_loading{min-height:160px;display:flex;align-items:center;justify-content:center;gap:10px;color:var(--dsw-alias-label-secondary);font-size:12px}.UsagePage_loading i{width:16px;height:16px;border:2px solid var(--dsw-alias-border-l3);border-top-color:var(--usage-blue);border-radius:50%;animation:UsagePage_usage-spin .8s linear infinite}@keyframes UsagePage_usage-spin{to{transform:rotate(360deg)}}.UsagePage_notice{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:8px;margin:0 0 14px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:11px}@media(max-width:800px){.UsagePage_filters{width:100%}.UsagePage_filters label{flex:1 1 140px}.UsagePage_summary{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:20px}.UsagePage_stat:nth-child(4){border-left:0}.UsagePage_twoCols,.UsagePage_qualityList{grid-template-columns:1fr}.UsagePage_efficiencyStats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(prefers-reduced-motion:reduce){.UsagePage_loading i{animation:none}}";
		const tagId = "@deepseek-ai/dsh-client-ui-usage/UsagePage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-usage";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/index.ts
		var client_exports = {};
		__export(client_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = __toCommonJS(client_exports);

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/core.js
		var _a;
		// @__NO_SIDE_EFFECTS__
		function $constructor(name, initializer3, params) {
		  function init(inst, def) {
		    if (!inst._zod) {
		      Object.defineProperty(inst, "_zod", {
		        value: {
		          def,
		          constr: _,
		          traits: /* @__PURE__ */ new Set()
		        },
		        enumerable: false
		      });
		    }
		    if (inst._zod.traits.has(name)) {
		      return;
		    }
		    inst._zod.traits.add(name);
		    initializer3(inst, def);
		    const proto = _.prototype;
		    const keys = Object.keys(proto);
		    for (let i = 0; i < keys.length; i++) {
		      const k = keys[i];
		      if (!(k in inst)) {
		        inst[k] = proto[k].bind(inst);
		      }
		    }
		  }
		  const Parent = params?.Parent ?? Object;
		  class Definition extends Parent {
		  }
		  Object.defineProperty(Definition, "name", { value: name });
		  function _(def) {
		    var _a3;
		    const inst = params?.Parent ? new Definition() : this;
		    init(inst, def);
		    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
		    for (const fn of inst._zod.deferred) {
		      fn();
		    }
		    return inst;
		  }
		  Object.defineProperty(_, "init", { value: init });
		  Object.defineProperty(_, Symbol.hasInstance, {
		    value: (inst) => {
		      if (params?.Parent && inst instanceof params.Parent)
		        return true;
		      return inst?._zod?.traits?.has(name);
		    }
		  });
		  Object.defineProperty(_, "name", { value: name });
		  return _;
		}
		var $brand = Symbol("zod_brand");
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
		(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
		var globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
		  if (newConfig)
		    Object.assign(globalConfig, newConfig);
		  return globalConfig;
		}

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/util.js
		var util_exports = {};
		__export(util_exports, {
		  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
		  Class: () => Class,
		  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
		  aborted: () => aborted,
		  allowsEval: () => allowsEval,
		  assert: () => assert,
		  assertEqual: () => assertEqual,
		  assertIs: () => assertIs,
		  assertNever: () => assertNever,
		  assertNotEqual: () => assertNotEqual,
		  assignProp: () => assignProp,
		  base64ToUint8Array: () => base64ToUint8Array,
		  base64urlToUint8Array: () => base64urlToUint8Array,
		  cached: () => cached,
		  captureStackTrace: () => captureStackTrace,
		  cleanEnum: () => cleanEnum,
		  cleanRegex: () => cleanRegex,
		  clone: () => clone,
		  cloneDef: () => cloneDef,
		  createTransparentProxy: () => createTransparentProxy,
		  defineLazy: () => defineLazy,
		  esc: () => esc,
		  escapeRegex: () => escapeRegex,
		  explicitlyAborted: () => explicitlyAborted,
		  extend: () => extend,
		  finalizeIssue: () => finalizeIssue,
		  floatSafeRemainder: () => floatSafeRemainder,
		  getElementAtPath: () => getElementAtPath,
		  getEnumValues: () => getEnumValues,
		  getLengthableOrigin: () => getLengthableOrigin,
		  getParsedType: () => getParsedType,
		  getSizableOrigin: () => getSizableOrigin,
		  hexToUint8Array: () => hexToUint8Array,
		  isObject: () => isObject,
		  isPlainObject: () => isPlainObject,
		  issue: () => issue,
		  joinValues: () => joinValues,
		  jsonStringifyReplacer: () => jsonStringifyReplacer,
		  merge: () => merge,
		  mergeDefs: () => mergeDefs,
		  normalizeParams: () => normalizeParams,
		  nullish: () => nullish,
		  numKeys: () => numKeys,
		  objectClone: () => objectClone,
		  omit: () => omit,
		  optionalKeys: () => optionalKeys,
		  parsedType: () => parsedType,
		  partial: () => partial,
		  pick: () => pick,
		  prefixIssues: () => prefixIssues,
		  primitiveTypes: () => primitiveTypes,
		  promiseAllObject: () => promiseAllObject,
		  propertyKeyTypes: () => propertyKeyTypes,
		  randomString: () => randomString,
		  required: () => required,
		  safeExtend: () => safeExtend,
		  shallowClone: () => shallowClone,
		  slugify: () => slugify,
		  stringifyPrimitive: () => stringifyPrimitive,
		  uint8ArrayToBase64: () => uint8ArrayToBase64,
		  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
		  uint8ArrayToHex: () => uint8ArrayToHex,
		  unwrapMessage: () => unwrapMessage
		});
		function assertEqual(val) {
		  return val;
		}
		function assertNotEqual(val) {
		  return val;
		}
		function assertIs(_arg) {
		}
		function assertNever(_x) {
		  throw new Error("Unexpected value in exhaustive check");
		}
		function assert(_) {
		}
		function getEnumValues(entries) {
		  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
		  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		  return values;
		}
		function joinValues(array2, separator = "|") {
		  return array2.map((val) => stringifyPrimitive(val)).join(separator);
		}
		function jsonStringifyReplacer(_, value) {
		  if (typeof value === "bigint")
		    return value.toString();
		  return value;
		}
		function cached(getter) {
		  const set = false;
		  return {
		    get value() {
		      if (!set) {
		        const value = getter();
		        Object.defineProperty(this, "value", { value });
		        return value;
		      }
		      throw new Error("cached value already set");
		    }
		  };
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
		  if (Math.abs(ratio - roundedRatio) < tolerance)
		    return 0;
		  return ratio - roundedRatio;
		}
		var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
		function defineLazy(object2, key, getter) {
		  let value = void 0;
		  Object.defineProperty(object2, key, {
		    get() {
		      if (value === EVALUATING) {
		        return void 0;
		      }
		      if (value === void 0) {
		        value = EVALUATING;
		        value = getter();
		      }
		      return value;
		    },
		    set(v) {
		      Object.defineProperty(object2, key, {
		        value: v
		        // configurable: true,
		      });
		    },
		    configurable: true
		  });
		}
		function objectClone(obj) {
		  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
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
		  for (const def of defs) {
		    const descriptors = Object.getOwnPropertyDescriptors(def);
		    Object.assign(mergedDescriptors, descriptors);
		  }
		  return Object.defineProperties({}, mergedDescriptors);
		}
		function cloneDef(schema) {
		  return mergeDefs(schema._zod.def);
		}
		function getElementAtPath(obj, path) {
		  if (!path)
		    return obj;
		  return path.reduce((acc, key) => acc?.[key], obj);
		}
		function promiseAllObject(promisesObj) {
		  const keys = Object.keys(promisesObj);
		  const promises = keys.map((key) => promisesObj[key]);
		  return Promise.all(promises).then((results) => {
		    const resolvedObj = {};
		    for (let i = 0; i < keys.length; i++) {
		      resolvedObj[keys[i]] = results[i];
		    }
		    return resolvedObj;
		  });
		}
		function randomString(length = 10) {
		  const chars = "abcdefghijklmnopqrstuvwxyz";
		  let str = "";
		  for (let i = 0; i < length; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
		  }
		  return str;
		}
		function esc(str) {
		  return JSON.stringify(str);
		}
		function slugify(input) {
		  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
		};
		function isObject(data) {
		  return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		var allowsEval = /* @__PURE__ */ cached(() => {
		  if (globalConfig.jitless) {
		    return false;
		  }
		  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
		    return false;
		  }
		  try {
		    const F = Function;
		    new F("");
		    return true;
		  } catch (_) {
		    return false;
		  }
		});
		function isPlainObject(o) {
		  if (isObject(o) === false)
		    return false;
		  const ctor = o.constructor;
		  if (ctor === void 0)
		    return true;
		  if (typeof ctor !== "function")
		    return true;
		  const prot = ctor.prototype;
		  if (isObject(prot) === false)
		    return false;
		  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
		    return false;
		  }
		  return true;
		}
		function shallowClone(o) {
		  if (isPlainObject(o))
		    return { ...o };
		  if (Array.isArray(o))
		    return [...o];
		  if (o instanceof Map)
		    return new Map(o);
		  if (o instanceof Set)
		    return new Set(o);
		  return o;
		}
		function numKeys(data) {
		  let keyCount = 0;
		  for (const key in data) {
		    if (Object.prototype.hasOwnProperty.call(data, key)) {
		      keyCount++;
		    }
		  }
		  return keyCount;
		}
		var getParsedType = (data) => {
		  const t = typeof data;
		  switch (t) {
		    case "undefined":
		      return "undefined";
		    case "string":
		      return "string";
		    case "number":
		      return Number.isNaN(data) ? "nan" : "number";
		    case "boolean":
		      return "boolean";
		    case "function":
		      return "function";
		    case "bigint":
		      return "bigint";
		    case "symbol":
		      return "symbol";
		    case "object":
		      if (Array.isArray(data)) {
		        return "array";
		      }
		      if (data === null) {
		        return "null";
		      }
		      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
		        return "promise";
		      }
		      if (typeof Map !== "undefined" && data instanceof Map) {
		        return "map";
		      }
		      if (typeof Set !== "undefined" && data instanceof Set) {
		        return "set";
		      }
		      if (typeof Date !== "undefined" && data instanceof Date) {
		        return "date";
		      }
		      if (typeof File !== "undefined" && data instanceof File) {
		        return "file";
		      }
		      return "object";
		    default:
		      throw new Error(`Unknown data type: ${t}`);
		  }
		};
		var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
		var primitiveTypes = /* @__PURE__ */ new Set([
		  "string",
		  "number",
		  "bigint",
		  "boolean",
		  "symbol",
		  "undefined"
		]);
		function escapeRegex(str) {
		  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
		  const cl = new inst._zod.constr(def ?? inst._zod.def);
		  if (!def || params?.parent)
		    cl._zod.parent = inst;
		  return cl;
		}
		function normalizeParams(_params) {
		  const params = _params;
		  if (!params)
		    return {};
		  if (typeof params === "string")
		    return { error: () => params };
		  if (params?.message !== void 0) {
		    if (params?.error !== void 0)
		      throw new Error("Cannot specify both `message` and `error` params");
		    params.error = params.message;
		  }
		  delete params.message;
		  if (typeof params.error === "string")
		    return { ...params, error: () => params.error };
		  return params;
		}
		function createTransparentProxy(getter) {
		  let target;
		  return new Proxy({}, {
		    get(_, prop, receiver) {
		      target ?? (target = getter());
		      return Reflect.get(target, prop, receiver);
		    },
		    set(_, prop, value, receiver) {
		      target ?? (target = getter());
		      return Reflect.set(target, prop, value, receiver);
		    },
		    has(_, prop) {
		      target ?? (target = getter());
		      return Reflect.has(target, prop);
		    },
		    deleteProperty(_, prop) {
		      target ?? (target = getter());
		      return Reflect.deleteProperty(target, prop);
		    },
		    ownKeys(_) {
		      target ?? (target = getter());
		      return Reflect.ownKeys(target);
		    },
		    getOwnPropertyDescriptor(_, prop) {
		      target ?? (target = getter());
		      return Reflect.getOwnPropertyDescriptor(target, prop);
		    },
		    defineProperty(_, prop, descriptor) {
		      target ?? (target = getter());
		      return Reflect.defineProperty(target, prop, descriptor);
		    }
		  });
		}
		function stringifyPrimitive(value) {
		  if (typeof value === "bigint")
		    return value.toString() + "n";
		  if (typeof value === "string")
		    return `"${value}"`;
		  return `${value}`;
		}
		function optionalKeys(shape) {
		  return Object.keys(shape).filter((k) => {
		    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
		  });
		}
		var NUMBER_FORMAT_RANGES = {
		  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		  int32: [-2147483648, 2147483647],
		  uint32: [0, 4294967295],
		  float32: [-34028234663852886e22, 34028234663852886e22],
		  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		var BIGINT_FORMAT_RANGES = {
		  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
		  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
		};
		function pick(schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".pick() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const newShape = {};
		      for (const key in mask) {
		        if (!(key in currDef.shape)) {
		          throw new Error(`Unrecognized key: "${key}"`);
		        }
		        if (!mask[key])
		          continue;
		        newShape[key] = currDef.shape[key];
		      }
		      assignProp(this, "shape", newShape);
		      return newShape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function omit(schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".omit() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const newShape = { ...schema._zod.def.shape };
		      for (const key in mask) {
		        if (!(key in currDef.shape)) {
		          throw new Error(`Unrecognized key: "${key}"`);
		        }
		        if (!mask[key])
		          continue;
		        delete newShape[key];
		      }
		      assignProp(this, "shape", newShape);
		      return newShape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function extend(schema, shape) {
		  if (!isPlainObject(shape)) {
		    throw new Error("Invalid input to extend: expected a plain object");
		  }
		  const checks = schema._zod.def.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    const existingShape = schema._zod.def.shape;
		    for (const key in shape) {
		      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
		        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
		      }
		    }
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const _shape = { ...schema._zod.def.shape, ...shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    }
		  });
		  return clone(schema, def);
		}
		function safeExtend(schema, shape) {
		  if (!isPlainObject(shape)) {
		    throw new Error("Invalid input to safeExtend: expected a plain object");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const _shape = { ...schema._zod.def.shape, ...shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    }
		  });
		  return clone(schema, def);
		}
		function merge(a, b) {
		  if (a._zod.def.checks?.length) {
		    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
		  }
		  const def = mergeDefs(a._zod.def, {
		    get shape() {
		      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    },
		    get catchall() {
		      return b._zod.def.catchall;
		    },
		    checks: b._zod.def.checks ?? []
		  });
		  return clone(a, def);
		}
		function partial(Class2, schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".partial() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const oldShape = schema._zod.def.shape;
		      const shape = { ...oldShape };
		      if (mask) {
		        for (const key in mask) {
		          if (!(key in oldShape)) {
		            throw new Error(`Unrecognized key: "${key}"`);
		          }
		          if (!mask[key])
		            continue;
		          shape[key] = Class2 ? new Class2({
		            type: "optional",
		            innerType: oldShape[key]
		          }) : oldShape[key];
		        }
		      } else {
		        for (const key in oldShape) {
		          shape[key] = Class2 ? new Class2({
		            type: "optional",
		            innerType: oldShape[key]
		          }) : oldShape[key];
		        }
		      }
		      assignProp(this, "shape", shape);
		      return shape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function required(Class2, schema, mask) {
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const oldShape = schema._zod.def.shape;
		      const shape = { ...oldShape };
		      if (mask) {
		        for (const key in mask) {
		          if (!(key in shape)) {
		            throw new Error(`Unrecognized key: "${key}"`);
		          }
		          if (!mask[key])
		            continue;
		          shape[key] = new Class2({
		            type: "nonoptional",
		            innerType: oldShape[key]
		          });
		        }
		      } else {
		        for (const key in oldShape) {
		          shape[key] = new Class2({
		            type: "nonoptional",
		            innerType: oldShape[key]
		          });
		        }
		      }
		      assignProp(this, "shape", shape);
		      return shape;
		    }
		  });
		  return clone(schema, def);
		}
		function aborted(x, startIndex = 0) {
		  if (x.aborted === true)
		    return true;
		  for (let i = startIndex; i < x.issues.length; i++) {
		    if (x.issues[i]?.continue !== true) {
		      return true;
		    }
		  }
		  return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
		  if (x.aborted === true)
		    return true;
		  for (let i = startIndex; i < x.issues.length; i++) {
		    if (x.issues[i]?.continue === false) {
		      return true;
		    }
		  }
		  return false;
		}
		function prefixIssues(path, issues) {
		  return issues.map((iss) => {
		    var _a3;
		    (_a3 = iss).path ?? (_a3.path = []);
		    iss.path.unshift(path);
		    return iss;
		  });
		}
		function unwrapMessage(message) {
		  return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config2) {
		  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
		  const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
		  rest.path ?? (rest.path = []);
		  rest.message = message;
		  if (ctx?.reportInput) {
		    rest.input = _input;
		  }
		  return rest;
		}
		function getSizableOrigin(input) {
		  if (input instanceof Set)
		    return "set";
		  if (input instanceof Map)
		    return "map";
		  if (input instanceof File)
		    return "file";
		  return "unknown";
		}
		function getLengthableOrigin(input) {
		  if (Array.isArray(input))
		    return "array";
		  if (typeof input === "string")
		    return "string";
		  return "unknown";
		}
		function parsedType(data) {
		  const t = typeof data;
		  switch (t) {
		    case "number": {
		      return Number.isNaN(data) ? "nan" : "number";
		    }
		    case "object": {
		      if (data === null) {
		        return "null";
		      }
		      if (Array.isArray(data)) {
		        return "array";
		      }
		      const obj = data;
		      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
		        return obj.constructor.name;
		      }
		    }
		  }
		  return t;
		}
		function issue(...args) {
		  const [iss, input, inst] = args;
		  if (typeof iss === "string") {
		    return {
		      message: iss,
		      code: "custom",
		      input,
		      inst
		    };
		  }
		  return { ...iss };
		}
		function cleanEnum(obj) {
		  return Object.entries(obj).filter(([k, _]) => {
		    return Number.isNaN(Number.parseInt(k, 10));
		  }).map((el) => el[1]);
		}
		function base64ToUint8Array(base642) {
		  const binaryString = atob(base642);
		  const bytes = new Uint8Array(binaryString.length);
		  for (let i = 0; i < binaryString.length; i++) {
		    bytes[i] = binaryString.charCodeAt(i);
		  }
		  return bytes;
		}
		function uint8ArrayToBase64(bytes) {
		  let binaryString = "";
		  for (let i = 0; i < bytes.length; i++) {
		    binaryString += String.fromCharCode(bytes[i]);
		  }
		  return btoa(binaryString);
		}
		function base64urlToUint8Array(base64url2) {
		  const base642 = base64url2.replace(/-/g, "+").replace(/_/g, "/");
		  const padding = "=".repeat((4 - base642.length % 4) % 4);
		  return base64ToUint8Array(base642 + padding);
		}
		function uint8ArrayToBase64url(bytes) {
		  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
		}
		function hexToUint8Array(hex) {
		  const cleanHex = hex.replace(/^0x/, "");
		  if (cleanHex.length % 2 !== 0) {
		    throw new Error("Invalid hex string length");
		  }
		  const bytes = new Uint8Array(cleanHex.length / 2);
		  for (let i = 0; i < cleanHex.length; i += 2) {
		    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
		  }
		  return bytes;
		}
		function uint8ArrayToHex(bytes) {
		  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
		}
		var Class = class {
		  constructor(..._args) {
		  }
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/errors.js
		var initializer = (inst, def) => {
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
		var $ZodError = $constructor("$ZodError", initializer);
		var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
		function flattenError(error, mapper = (issue2) => issue2.message) {
		  const fieldErrors = {};
		  const formErrors = [];
		  for (const sub of error.issues) {
		    if (sub.path.length > 0) {
		      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		      fieldErrors[sub.path[0]].push(mapper(sub));
		    } else {
		      formErrors.push(mapper(sub));
		    }
		  }
		  return { formErrors, fieldErrors };
		}
		function formatError(error, mapper = (issue2) => issue2.message) {
		  const fieldErrors = { _errors: [] };
		  const processError = (error2, path = []) => {
		    for (const issue2 of error2.issues) {
		      if (issue2.code === "invalid_union" && issue2.errors.length) {
		        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
		      } else if (issue2.code === "invalid_key") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else if (issue2.code === "invalid_element") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else {
		        const fullpath = [...path, ...issue2.path];
		        if (fullpath.length === 0) {
		          fieldErrors._errors.push(mapper(issue2));
		        } else {
		          let curr = fieldErrors;
		          let i = 0;
		          while (i < fullpath.length) {
		            const el = fullpath[i];
		            const terminal = i === fullpath.length - 1;
		            if (!terminal) {
		              curr[el] = curr[el] || { _errors: [] };
		            } else {
		              curr[el] = curr[el] || { _errors: [] };
		              curr[el]._errors.push(mapper(issue2));
		            }
		            curr = curr[el];
		            i++;
		          }
		        }
		      }
		    }
		  };
		  processError(error);
		  return fieldErrors;
		}

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/parse.js
		var _parse = (_Err) => (schema, value, _ctx, _params) => {
		  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
		  const result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise) {
		    throw new $ZodAsyncError();
		  }
		  if (result.issues.length) {
		    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		    captureStackTrace(e, _params?.callee);
		    throw e;
		  }
		  return result.value;
		};
		var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
		  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
		  let result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise)
		    result = await result;
		  if (result.issues.length) {
		    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		    captureStackTrace(e, params?.callee);
		    throw e;
		  }
		  return result.value;
		};
		var _safeParse = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
		  const result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise) {
		    throw new $ZodAsyncError();
		  }
		  return result.issues.length ? {
		    success: false,
		    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		  } : { success: true, data: result.value };
		};
		var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
		var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
		  let result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise)
		    result = await result;
		  return result.issues.length ? {
		    success: false,
		    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		  } : { success: true, data: result.value };
		};
		var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
		var _encode = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _parse(_Err)(schema, value, ctx);
		};
		var _decode = (_Err) => (schema, value, _ctx) => {
		  return _parse(_Err)(schema, value, _ctx);
		};
		var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _parseAsync(_Err)(schema, value, ctx);
		};
		var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
		  return _parseAsync(_Err)(schema, value, _ctx);
		};
		var _safeEncode = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _safeParse(_Err)(schema, value, ctx);
		};
		var _safeDecode = (_Err) => (schema, value, _ctx) => {
		  return _safeParse(_Err)(schema, value, _ctx);
		};
		var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _safeParseAsync(_Err)(schema, value, ctx);
		};
		var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
		  return _safeParseAsync(_Err)(schema, value, _ctx);
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/regexes.js
		var cuid = /^[cC][0-9a-z]{6,}$/;
		var cuid2 = /^[0-9a-z]+$/;
		var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		var xid = /^[0-9a-vA-V]{20}$/;
		var ksuid = /^[A-Za-z0-9]{27}$/;
		var nanoid = /^[a-zA-Z0-9_-]{21}$/;
		var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		var uuid = (version2) => {
		  if (!version2)
		    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
		  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
		  return new RegExp(_emoji, "u");
		}
		var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		var base64url = /^[A-Za-z0-9_-]*$/;
		var httpProtocol = /^https?$/;
		var e164 = /^\+[1-9]\d{6,14}$/;
		var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
		  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
		  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		  return regex;
		}
		function time(args) {
		  return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime(args) {
		  const time3 = timeSource({ precision: args.precision });
		  const opts = ["Z"];
		  if (args.local)
		    opts.push("");
		  if (args.offset)
		    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
		  const timeRegex = `${time3}(?:${opts.join("|")})`;
		  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		var string = (params) => {
		  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
		  return new RegExp(`^${regex}$`);
		};
		var integer = /^-?\d+$/;
		var number = /^-?\d+(?:\.\d+)?$/;
		var boolean = /^(?:true|false)$/i;
		var lowercase = /^[^A-Z]*$/;
		var uppercase = /^[^a-z]*$/;

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/checks.js
		var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
		  var _a3;
		  inst._zod ?? (inst._zod = {});
		  inst._zod.def = def;
		  (_a3 = inst._zod).onattach ?? (_a3.onattach = []);
		});
		var numericOriginMap = {
		  number: "number",
		  bigint: "bigint",
		  object: "date"
		};
		var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const origin = numericOriginMap[typeof def.value];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		    if (def.value < curr) {
		      if (def.inclusive)
		        bag.maximum = def.value;
		      else
		        bag.exclusiveMaximum = def.value;
		    }
		  });
		  inst._zod.check = (payload) => {
		    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
		      return;
		    }
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
		var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const origin = numericOriginMap[typeof def.value];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		    if (def.value > curr) {
		      if (def.inclusive)
		        bag.minimum = def.value;
		      else
		        bag.exclusiveMinimum = def.value;
		    }
		  });
		  inst._zod.check = (payload) => {
		    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
		      return;
		    }
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
		var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  inst._zod.onattach.push((inst2) => {
		    var _a3;
		    (_a3 = inst2._zod.bag).multipleOf ?? (_a3.multipleOf = def.value);
		  });
		  inst._zod.check = (payload) => {
		    if (typeof payload.value !== typeof def.value)
		      throw new Error("Cannot mix number and bigint in multiple_of check.");
		    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
		    if (isMultiple)
		      return;
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
		var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  def.format = def.format || "float64";
		  const isInt = def.format?.includes("int");
		  const origin = isInt ? "int" : "number";
		  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.format = def.format;
		    bag.minimum = minimum;
		    bag.maximum = maximum;
		    if (isInt)
		      bag.pattern = integer;
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
		        if (input > 0) {
		          payload.issues.push({
		            input,
		            code: "too_big",
		            maximum: Number.MAX_SAFE_INTEGER,
		            note: "Integers must be within the safe integer range.",
		            inst,
		            origin,
		            inclusive: true,
		            continue: !def.abort
		          });
		        } else {
		          payload.issues.push({
		            input,
		            code: "too_small",
		            minimum: Number.MIN_SAFE_INTEGER,
		            note: "Integers must be within the safe integer range.",
		            inst,
		            origin,
		            inclusive: true,
		            continue: !def.abort
		          });
		        }
		        return;
		      }
		    }
		    if (input < minimum) {
		      payload.issues.push({
		        origin: "number",
		        input,
		        code: "too_small",
		        minimum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		    if (input > maximum) {
		      payload.issues.push({
		        origin: "number",
		        input,
		        code: "too_big",
		        maximum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		    if (def.maximum < curr)
		      inst2._zod.bag.maximum = def.maximum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length <= def.maximum)
		      return;
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
		var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		    if (def.minimum > curr)
		      inst2._zod.bag.minimum = def.minimum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length >= def.minimum)
		      return;
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
		var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.minimum = def.length;
		    bag.maximum = def.length;
		    bag.length = def.length;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length === def.length)
		      return;
		    const origin = getLengthableOrigin(input);
		    const tooBig = length > def.length;
		    payload.issues.push({
		      origin,
		      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
		      inclusive: true,
		      exact: true,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
		  var _a3, _b;
		  $ZodCheck.init(inst, def);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.format = def.format;
		    if (def.pattern) {
		      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		      bag.patterns.add(def.pattern);
		    }
		  });
		  if (def.pattern)
		    (_a3 = inst._zod).check ?? (_a3.check = (payload) => {
		      def.pattern.lastIndex = 0;
		      if (def.pattern.test(payload.value))
		        return;
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
		  else
		    (_b = inst._zod).check ?? (_b.check = () => {
		    });
		});
		var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
		  $ZodCheckStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    def.pattern.lastIndex = 0;
		    if (def.pattern.test(payload.value))
		      return;
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
		var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
		  def.pattern ?? (def.pattern = lowercase);
		  $ZodCheckStringFormat.init(inst, def);
		});
		var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
		  def.pattern ?? (def.pattern = uppercase);
		  $ZodCheckStringFormat.init(inst, def);
		});
		var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const escapedRegex = escapeRegex(def.includes);
		  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
		  def.pattern = pattern;
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.includes(def.includes, def.position))
		      return;
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
		var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
		  def.pattern ?? (def.pattern = pattern);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.startsWith(def.prefix))
		      return;
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
		var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
		  def.pattern ?? (def.pattern = pattern);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.endsWith(def.suffix))
		      return;
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
		var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  inst._zod.check = (payload) => {
		    payload.value = def.tx(payload.value);
		  };
		});

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/doc.js
		var Doc = class {
		  constructor(args = []) {
		    this.content = [];
		    this.indent = 0;
		    if (this)
		      this.args = args;
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
		    const content = arg;
		    const lines = content.split("\n").filter((x) => x);
		    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		    for (const line of dedented) {
		      this.content.push(line);
		    }
		  }
		  compile() {
		    const F = Function;
		    const args = this?.args;
		    const content = this?.content ?? [``];
		    const lines = [...content.map((x) => `  ${x}`)];
		    return new F(...args, lines.join("\n"));
		  }
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/versions.js
		var version = {
		  major: 4,
		  minor: 4,
		  patch: 3
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/schemas.js
		var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
		  var _a3;
		  inst ?? (inst = {});
		  inst._zod.def = def;
		  inst._zod.bag = inst._zod.bag || {};
		  inst._zod.version = version;
		  const checks = [...inst._zod.def.checks ?? []];
		  if (inst._zod.traits.has("$ZodCheck")) {
		    checks.unshift(inst);
		  }
		  for (const ch of checks) {
		    for (const fn of ch._zod.onattach) {
		      fn(inst);
		    }
		  }
		  if (checks.length === 0) {
		    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
		    inst._zod.deferred?.push(() => {
		      inst._zod.run = inst._zod.parse;
		    });
		  } else {
		    const runChecks = (payload, checks2, ctx) => {
		      let isAborted = aborted(payload);
		      let asyncResult;
		      for (const ch of checks2) {
		        if (ch._zod.def.when) {
		          if (explicitlyAborted(payload))
		            continue;
		          const shouldRun = ch._zod.def.when(payload);
		          if (!shouldRun)
		            continue;
		        } else if (isAborted) {
		          continue;
		        }
		        const currLen = payload.issues.length;
		        const _ = ch._zod.check(payload);
		        if (_ instanceof Promise && ctx?.async === false) {
		          throw new $ZodAsyncError();
		        }
		        if (asyncResult || _ instanceof Promise) {
		          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
		            await _;
		            const nextLen = payload.issues.length;
		            if (nextLen === currLen)
		              return;
		            if (!isAborted)
		              isAborted = aborted(payload, currLen);
		          });
		        } else {
		          const nextLen = payload.issues.length;
		          if (nextLen === currLen)
		            continue;
		          if (!isAborted)
		            isAborted = aborted(payload, currLen);
		        }
		      }
		      if (asyncResult) {
		        return asyncResult.then(() => {
		          return payload;
		        });
		      }
		      return payload;
		    };
		    const handleCanaryResult = (canary, payload, ctx) => {
		      if (aborted(canary)) {
		        canary.aborted = true;
		        return canary;
		      }
		      const checkResult = runChecks(payload, checks, ctx);
		      if (checkResult instanceof Promise) {
		        if (ctx.async === false)
		          throw new $ZodAsyncError();
		        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
		      }
		      return inst._zod.parse(checkResult, ctx);
		    };
		    inst._zod.run = (payload, ctx) => {
		      if (ctx.skipChecks) {
		        return inst._zod.parse(payload, ctx);
		      }
		      if (ctx.direction === "backward") {
		        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
		        if (canary instanceof Promise) {
		          return canary.then((canary2) => {
		            return handleCanaryResult(canary2, payload, ctx);
		          });
		        }
		        return handleCanaryResult(canary, payload, ctx);
		      }
		      const result = inst._zod.parse(payload, ctx);
		      if (result instanceof Promise) {
		        if (ctx.async === false)
		          throw new $ZodAsyncError();
		        return result.then((result2) => runChecks(result2, checks, ctx));
		      }
		      return runChecks(result, checks, ctx);
		    };
		  }
		  defineLazy(inst, "~standard", () => ({
		    validate: (value) => {
		      try {
		        const r = safeParse(inst, value);
		        return r.success ? { value: r.data } : { issues: r.error?.issues };
		      } catch (_) {
		        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
		      }
		    },
		    vendor: "zod",
		    version: 1
		  }));
		});
		var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
		  inst._zod.parse = (payload, _) => {
		    if (def.coerce)
		      try {
		        payload.value = String(payload.value);
		      } catch (_2) {
		      }
		    if (typeof payload.value === "string")
		      return payload;
		    payload.issues.push({
		      expected: "string",
		      code: "invalid_type",
		      input: payload.value,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
		  $ZodCheckStringFormat.init(inst, def);
		  $ZodString.init(inst, def);
		});
		var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
		  def.pattern ?? (def.pattern = guid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
		  if (def.version) {
		    const versionMap = {
		      v1: 1,
		      v2: 2,
		      v3: 3,
		      v4: 4,
		      v5: 5,
		      v6: 6,
		      v7: 7,
		      v8: 8
		    };
		    const v = versionMap[def.version];
		    if (v === void 0)
		      throw new Error(`Invalid UUID version: "${def.version}"`);
		    def.pattern ?? (def.pattern = uuid(v));
		  } else
		    def.pattern ?? (def.pattern = uuid());
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
		  def.pattern ?? (def.pattern = email);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
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
		        if (!def.hostname.test(url.hostname)) {
		          payload.issues.push({
		            code: "invalid_format",
		            format: "url",
		            note: "Invalid hostname",
		            pattern: def.hostname.source,
		            input: payload.value,
		            inst,
		            continue: !def.abort
		          });
		        }
		      }
		      if (def.protocol) {
		        def.protocol.lastIndex = 0;
		        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
		          payload.issues.push({
		            code: "invalid_format",
		            format: "url",
		            note: "Invalid protocol",
		            pattern: def.protocol.source,
		            input: payload.value,
		            inst,
		            continue: !def.abort
		          });
		        }
		      }
		      if (def.normalize) {
		        payload.value = url.href;
		      } else {
		        payload.value = trimmed;
		      }
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
		var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
		  def.pattern ?? (def.pattern = emoji());
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
		  def.pattern ?? (def.pattern = nanoid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
		  def.pattern ?? (def.pattern = cuid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
		  def.pattern ?? (def.pattern = cuid2);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
		  def.pattern ?? (def.pattern = ulid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
		  def.pattern ?? (def.pattern = xid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
		  def.pattern ?? (def.pattern = ksuid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
		  def.pattern ?? (def.pattern = datetime(def));
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
		  def.pattern ?? (def.pattern = date);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
		  def.pattern ?? (def.pattern = time(def));
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
		  def.pattern ?? (def.pattern = duration);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
		  def.pattern ?? (def.pattern = ipv4);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.format = `ipv4`;
		});
		var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
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
		var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
		  def.pattern ?? (def.pattern = cidrv4);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
		  def.pattern ?? (def.pattern = cidrv6);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    const parts = payload.value.split("/");
		    try {
		      if (parts.length !== 2)
		        throw new Error();
		      const [address, prefix] = parts;
		      if (!prefix)
		        throw new Error();
		      const prefixNum = Number(prefix);
		      if (`${prefixNum}` !== prefix)
		        throw new Error();
		      if (prefixNum < 0 || prefixNum > 128)
		        throw new Error();
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
		  if (data === "")
		    return true;
		  if (/\s/.test(data))
		    return false;
		  if (data.length % 4 !== 0)
		    return false;
		  try {
		    atob(data);
		    return true;
		  } catch {
		    return false;
		  }
		}
		var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
		  def.pattern ?? (def.pattern = base64);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.contentEncoding = "base64";
		  inst._zod.check = (payload) => {
		    if (isValidBase64(payload.value))
		      return;
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
		  if (!base64url.test(data))
		    return false;
		  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
		  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
		  return isValidBase64(padded);
		}
		var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
		  def.pattern ?? (def.pattern = base64url);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.contentEncoding = "base64url";
		  inst._zod.check = (payload) => {
		    if (isValidBase64URL(payload.value))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: "base64url",
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
		  def.pattern ?? (def.pattern = e164);
		  $ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
		  try {
		    const tokensParts = token.split(".");
		    if (tokensParts.length !== 3)
		      return false;
		    const [header] = tokensParts;
		    if (!header)
		      return false;
		    const parsedHeader = JSON.parse(atob(header));
		    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
		      return false;
		    if (!parsedHeader.alg)
		      return false;
		    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
		      return false;
		    return true;
		  } catch {
		    return false;
		  }
		}
		var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    if (isValidJWT(payload.value, def.alg))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: "jwt",
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = inst._zod.bag.pattern ?? number;
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce)
		      try {
		        payload.value = Number(payload.value);
		      } catch (_) {
		      }
		    const input = payload.value;
		    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
		      return payload;
		    }
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
		var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
		  $ZodCheckNumberFormat.init(inst, def);
		  $ZodNumber.init(inst, def);
		});
		var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = boolean;
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce)
		      try {
		        payload.value = Boolean(payload.value);
		      } catch (_) {
		      }
		    const input = payload.value;
		    if (typeof input === "boolean")
		      return payload;
		    payload.issues.push({
		      expected: "boolean",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload) => payload;
		});
		var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
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
		  if (result.issues.length) {
		    final.issues.push(...prefixIssues(index, result.issues));
		  }
		  final.value[index] = result.value;
		}
		var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
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
		      if (result instanceof Promise) {
		        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
		      } else {
		        handleArrayResult(result, payload, i);
		      }
		    }
		    if (proms.length) {
		      return Promise.all(proms).then(() => payload);
		    }
		    return payload;
		  };
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
		  const isPresent = key in input;
		  if (result.issues.length) {
		    if (isOptionalIn && isOptionalOut && !isPresent) {
		      return;
		    }
		    final.issues.push(...prefixIssues(key, result.issues));
		  }
		  if (!isPresent && !isOptionalIn) {
		    if (!result.issues.length) {
		      final.issues.push({
		        code: "invalid_type",
		        expected: "nonoptional",
		        input: void 0,
		        path: [key]
		      });
		    }
		    return;
		  }
		  if (result.value === void 0) {
		    if (isPresent) {
		      final.value[key] = void 0;
		    }
		  } else {
		    final.value[key] = result.value;
		  }
		}
		function normalizeDef(def) {
		  const keys = Object.keys(def.shape);
		  for (const k of keys) {
		    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
		      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
		    }
		  }
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
		    if (key === "__proto__")
		      continue;
		    if (keySet.has(key))
		      continue;
		    if (t === "never") {
		      unrecognized.push(key);
		      continue;
		    }
		    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
		    if (r instanceof Promise) {
		      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
		    } else {
		      handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		    }
		  }
		  if (unrecognized.length) {
		    payload.issues.push({
		      code: "unrecognized_keys",
		      keys: unrecognized,
		      input,
		      inst
		    });
		  }
		  if (!proms.length)
		    return payload;
		  return Promise.all(proms).then(() => {
		    return payload;
		  });
		}
		var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
		  $ZodType.init(inst, def);
		  const desc = Object.getOwnPropertyDescriptor(def, "shape");
		  if (!desc?.get) {
		    const sh = def.shape;
		    Object.defineProperty(def, "shape", {
		      get: () => {
		        const newSh = { ...sh };
		        Object.defineProperty(def, "shape", {
		          value: newSh
		        });
		        return newSh;
		      }
		    });
		  }
		  const _normalized = cached(() => normalizeDef(def));
		  defineLazy(inst._zod, "propValues", () => {
		    const shape = def.shape;
		    const propValues = {};
		    for (const key in shape) {
		      const field = shape[key]._zod;
		      if (field.values) {
		        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
		        for (const v of field.values)
		          propValues[key].add(v);
		      }
		    }
		    return propValues;
		  });
		  const isObject2 = isObject;
		  const catchall = def.catchall;
		  let value;
		  inst._zod.parse = (payload, ctx) => {
		    value ?? (value = _normalized.value);
		    const input = payload.value;
		    if (!isObject2(input)) {
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
		      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
		      if (r instanceof Promise) {
		        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
		      } else {
		        handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		      }
		    }
		    if (!catchall) {
		      return proms.length ? Promise.all(proms).then(() => payload) : payload;
		    }
		    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
		  };
		});
		var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
		  $ZodObject.init(inst, def);
		  const superParse = inst._zod.parse;
		  const _normalized = cached(() => normalizeDef(def));
		  const generateFastpass = (shape) => {
		    const doc = new Doc(["shape", "payload", "ctx"]);
		    const normalized = _normalized.value;
		    const parseStr = (key) => {
		      const k = esc(key);
		      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		    };
		    doc.write(`const input = payload.value;`);
		    const ids = /* @__PURE__ */ Object.create(null);
		    let counter = 0;
		    for (const key of normalized.keys) {
		      ids[key] = `key_${counter++}`;
		    }
		    doc.write(`const newResult = {};`);
		    for (const key of normalized.keys) {
		      const id = ids[key];
		      const k = esc(key);
		      const schema = shape[key];
		      const isOptionalIn = schema?._zod?.optin === "optional";
		      const isOptionalOut = schema?._zod?.optout === "optional";
		      doc.write(`const ${id} = ${parseStr(key)};`);
		      if (isOptionalIn && isOptionalOut) {
		        doc.write(`
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
		      } else if (!isOptionalIn) {
		        doc.write(`
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
		      } else {
		        doc.write(`
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
		    }
		    doc.write(`payload.value = newResult;`);
		    doc.write(`return payload;`);
		    const fn = doc.compile();
		    return (payload, ctx) => fn(shape, payload, ctx);
		  };
		  let fastpass;
		  const isObject2 = isObject;
		  const jit = !globalConfig.jitless;
		  const allowsEval2 = allowsEval;
		  const fastEnabled = jit && allowsEval2.value;
		  const catchall = def.catchall;
		  let value;
		  inst._zod.parse = (payload, ctx) => {
		    value ?? (value = _normalized.value);
		    const input = payload.value;
		    if (!isObject2(input)) {
		      payload.issues.push({
		        expected: "object",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
		      if (!fastpass)
		        fastpass = generateFastpass(def.shape);
		      payload = fastpass(payload, ctx);
		      if (!catchall)
		        return payload;
		      return handleCatchall([], input, payload, ctx, value, inst);
		    }
		    return superParse(payload, ctx);
		  };
		});
		function handleUnionResults(results, final, inst, ctx) {
		  for (const result of results) {
		    if (result.issues.length === 0) {
		      final.value = result.value;
		      return final;
		    }
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
		var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
		  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
		  defineLazy(inst._zod, "values", () => {
		    if (def.options.every((o) => o._zod.values)) {
		      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
		    }
		    return void 0;
		  });
		  defineLazy(inst._zod, "pattern", () => {
		    if (def.options.every((o) => o._zod.pattern)) {
		      const patterns = def.options.map((o) => o._zod.pattern);
		      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		    }
		    return void 0;
		  });
		  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		  inst._zod.parse = (payload, ctx) => {
		    if (first) {
		      return first(payload, ctx);
		    }
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
		        if (result.issues.length === 0)
		          return result;
		        results.push(result);
		      }
		    }
		    if (!async)
		      return handleUnionResults(results, payload, inst, ctx);
		    return Promise.all(results).then((results2) => {
		      return handleUnionResults(results2, payload, inst, ctx);
		    });
		  };
		});
		var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
		    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
		    const async = left instanceof Promise || right instanceof Promise;
		    if (async) {
		      return Promise.all([left, right]).then(([left2, right2]) => {
		        return handleIntersectionResults(payload, left2, right2);
		      });
		    }
		    return handleIntersectionResults(payload, left, right);
		  };
		});
		function mergeValues(a, b) {
		  if (a === b) {
		    return { valid: true, data: a };
		  }
		  if (a instanceof Date && b instanceof Date && +a === +b) {
		    return { valid: true, data: a };
		  }
		  if (isPlainObject(a) && isPlainObject(b)) {
		    const bKeys = Object.keys(b);
		    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		    const newObj = { ...a, ...b };
		    for (const key of sharedKeys) {
		      const sharedValue = mergeValues(a[key], b[key]);
		      if (!sharedValue.valid) {
		        return {
		          valid: false,
		          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
		        };
		      }
		      newObj[key] = sharedValue.data;
		    }
		    return { valid: true, data: newObj };
		  }
		  if (Array.isArray(a) && Array.isArray(b)) {
		    if (a.length !== b.length) {
		      return { valid: false, mergeErrorPath: [] };
		    }
		    const newArray = [];
		    for (let index = 0; index < a.length; index++) {
		      const itemA = a[index];
		      const itemB = b[index];
		      const sharedValue = mergeValues(itemA, itemB);
		      if (!sharedValue.valid) {
		        return {
		          valid: false,
		          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
		        };
		      }
		      newArray.push(sharedValue.data);
		    }
		    return { valid: true, data: newArray };
		  }
		  return { valid: false, mergeErrorPath: [] };
		}
		function handleIntersectionResults(result, left, right) {
		  const unrecKeys = /* @__PURE__ */ new Map();
		  let unrecIssue;
		  for (const iss of left.issues) {
		    if (iss.code === "unrecognized_keys") {
		      unrecIssue ?? (unrecIssue = iss);
		      for (const k of iss.keys) {
		        if (!unrecKeys.has(k))
		          unrecKeys.set(k, {});
		        unrecKeys.get(k).l = true;
		      }
		    } else {
		      result.issues.push(iss);
		    }
		  }
		  for (const iss of right.issues) {
		    if (iss.code === "unrecognized_keys") {
		      for (const k of iss.keys) {
		        if (!unrecKeys.has(k))
		          unrecKeys.set(k, {});
		        unrecKeys.get(k).r = true;
		      }
		    } else {
		      result.issues.push(iss);
		    }
		  }
		  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
		  if (bothKeys.length && unrecIssue) {
		    result.issues.push({ ...unrecIssue, keys: bothKeys });
		  }
		  if (aborted(result))
		    return result;
		  const merged = mergeValues(left.value, right.value);
		  if (!merged.valid) {
		    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
		  }
		  result.value = merged.data;
		  return result;
		}
		var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
		  $ZodType.init(inst, def);
		  const values = getEnumValues(def.entries);
		  const valuesSet = new Set(values);
		  inst._zod.values = valuesSet;
		  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (valuesSet.has(input)) {
		      return payload;
		    }
		    payload.issues.push({
		      code: "invalid_value",
		      values,
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
		  $ZodType.init(inst, def);
		  if (def.values.length === 0) {
		    throw new Error("Cannot create literal schema with no valid values");
		  }
		  const values = new Set(def.values);
		  inst._zod.values = values;
		  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (values.has(input)) {
		      return payload;
		    }
		    payload.issues.push({
		      code: "invalid_value",
		      values: def.values,
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      throw new $ZodEncodeError(inst.constructor.name);
		    }
		    const _out = def.transform(payload.value, payload);
		    if (ctx.async) {
		      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
		      return output.then((output2) => {
		        payload.value = output2;
		        payload.fallback = true;
		        return payload;
		      });
		    }
		    if (_out instanceof Promise) {
		      throw new $ZodAsyncError();
		    }
		    payload.value = _out;
		    payload.fallback = true;
		    return payload;
		  };
		});
		function handleOptionalResult(result, input) {
		  if (input === void 0 && (result.issues.length || result.fallback)) {
		    return { issues: [], value: void 0 };
		  }
		  return result;
		}
		var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  inst._zod.optout = "optional";
		  defineLazy(inst._zod, "values", () => {
		    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
		  });
		  defineLazy(inst._zod, "pattern", () => {
		    const pattern = def.innerType._zod.pattern;
		    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    if (def.innerType._zod.optin === "optional") {
		      const input = payload.value;
		      const result = def.innerType._zod.run(payload, ctx);
		      if (result instanceof Promise)
		        return result.then((r) => handleOptionalResult(r, input));
		      return handleOptionalResult(result, input);
		    }
		    if (payload.value === void 0) {
		      return payload;
		    }
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
		  $ZodOptional.init(inst, def);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
		  inst._zod.parse = (payload, ctx) => {
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
		  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		  defineLazy(inst._zod, "pattern", () => {
		    const pattern = def.innerType._zod.pattern;
		    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
		  });
		  defineLazy(inst._zod, "values", () => {
		    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    if (payload.value === null)
		      return payload;
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    if (payload.value === void 0) {
		      payload.value = def.defaultValue;
		      return payload;
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => handleDefaultResult(result2, def));
		    }
		    return handleDefaultResult(result, def);
		  };
		});
		function handleDefaultResult(payload, def) {
		  if (payload.value === void 0) {
		    payload.value = def.defaultValue;
		  }
		  return payload;
		}
		var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    if (payload.value === void 0) {
		      payload.value = def.defaultValue;
		    }
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "values", () => {
		    const v = def.innerType._zod.values;
		    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => handleNonOptionalResult(result2, inst));
		    }
		    return handleNonOptionalResult(result, inst);
		  };
		});
		function handleNonOptionalResult(payload, inst) {
		  if (!payload.issues.length && payload.value === void 0) {
		    payload.issues.push({
		      code: "invalid_type",
		      expected: "nonoptional",
		      input: payload.value,
		      inst
		    });
		  }
		  return payload;
		}
		var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => {
		        payload.value = result2.value;
		        if (result2.issues.length) {
		          payload.value = def.catchValue({
		            ...payload,
		            error: {
		              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		            },
		            input: payload.value
		          });
		          payload.issues = [];
		          payload.fallback = true;
		        }
		        return payload;
		      });
		    }
		    payload.value = result.value;
		    if (result.issues.length) {
		      payload.value = def.catchValue({
		        ...payload,
		        error: {
		          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		        },
		        input: payload.value
		      });
		      payload.issues = [];
		      payload.fallback = true;
		    }
		    return payload;
		  };
		});
		var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "values", () => def.in._zod.values);
		  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      const right = def.out._zod.run(payload, ctx);
		      if (right instanceof Promise) {
		        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
		      }
		      return handlePipeResult(right, def.in, ctx);
		    }
		    const left = def.in._zod.run(payload, ctx);
		    if (left instanceof Promise) {
		      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
		    }
		    return handlePipeResult(left, def.out, ctx);
		  };
		});
		function handlePipeResult(left, next, ctx) {
		  if (left.issues.length) {
		    left.aborted = true;
		    return left;
		  }
		  return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
		}
		var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
		  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then(handleReadonlyResult);
		    }
		    return handleReadonlyResult(result);
		  };
		});
		function handleReadonlyResult(payload) {
		  payload.value = Object.freeze(payload.value);
		  return payload;
		}
		var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _) => {
		    return payload;
		  };
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const r = def.fn(input);
		    if (r instanceof Promise) {
		      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
		    }
		    handleRefineResult(r, payload, input, inst);
		    return;
		  };
		});
		function handleRefineResult(result, payload, input, inst) {
		  if (!result) {
		    const _iss = {
		      code: "custom",
		      input,
		      inst,
		      // incorporates params.error into issue reporting
		      path: [...inst._zod.def.path ?? []],
		      // incorporates params.error into issue reporting
		      continue: !inst._zod.def.abort
		      // params: inst._zod.def.params,
		    };
		    if (inst._zod.def.params)
		      _iss.params = inst._zod.def.params;
		    payload.issues.push(issue(_iss));
		  }
		}

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/registries.js
		var _a2;
		var $output = Symbol("ZodOutput");
		var $input = Symbol("ZodInput");
		var $ZodRegistry = class {
		  constructor() {
		    this._map = /* @__PURE__ */ new WeakMap();
		    this._idmap = /* @__PURE__ */ new Map();
		  }
		  add(schema, ..._meta) {
		    const meta2 = _meta[0];
		    this._map.set(schema, meta2);
		    if (meta2 && typeof meta2 === "object" && "id" in meta2) {
		      this._idmap.set(meta2.id, schema);
		    }
		    return this;
		  }
		  clear() {
		    this._map = /* @__PURE__ */ new WeakMap();
		    this._idmap = /* @__PURE__ */ new Map();
		    return this;
		  }
		  remove(schema) {
		    const meta2 = this._map.get(schema);
		    if (meta2 && typeof meta2 === "object" && "id" in meta2) {
		      this._idmap.delete(meta2.id);
		    }
		    this._map.delete(schema);
		    return this;
		  }
		  get(schema) {
		    const p = schema._zod.parent;
		    if (p) {
		      const pm = { ...this.get(p) ?? {} };
		      delete pm.id;
		      const f = { ...pm, ...this._map.get(schema) };
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
		(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
		var globalRegistry = globalThis.__zod_globalRegistry;

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class2, params) {
		  return new Class2({
		    type: "string",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "email",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "guid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v4",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v6",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v7",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "url",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji2(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "emoji",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "nanoid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cuid2",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ulid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "xid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ksuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ipv4",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ipv6",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cidrv4",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cidrv6",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "base64",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "base64url",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "e164",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "jwt",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class2, params) {
		  return new Class2({
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
		function _isoDate(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "date",
		    check: "string_format",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "time",
		    check: "string_format",
		    precision: null,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "duration",
		    check: "string_format",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class2, params) {
		  return new Class2({
		    type: "number",
		    checks: [],
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "safeint",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class2, params) {
		  return new Class2({
		    type: "boolean",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class2) {
		  return new Class2({
		    type: "unknown"
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class2, params) {
		  return new Class2({
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
		  const ch = new $ZodCheckMaxLength({
		    check: "max_length",
		    ...normalizeParams(params),
		    maximum
		  });
		  return ch;
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
		function _array(Class2, element, params) {
		  return new Class2({
		    type: "array",
		    element,
		    // get element() {
		    //   return element;
		    // },
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class2, fn, _params) {
		  const schema = new Class2({
		    type: "custom",
		    check: "custom",
		    fn,
		    ...normalizeParams(_params)
		  });
		  return schema;
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
		  const ch = /* @__PURE__ */ _check((payload) => {
		    payload.addIssue = (issue2) => {
		      if (typeof issue2 === "string") {
		        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
		      } else {
		        const _issue = issue2;
		        if (_issue.fatal)
		          _issue.continue = false;
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

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
		  let target = params?.target ?? "draft-2020-12";
		  if (target === "draft-4")
		    target = "draft-04";
		  if (target === "draft-7")
		    target = "draft-07";
		  return {
		    processors: params.processors ?? {},
		    metadataRegistry: params?.metadata ?? globalRegistry,
		    target,
		    unrepresentable: params?.unrepresentable ?? "throw",
		    override: params?.override ?? (() => {
		    }),
		    io: params?.io ?? "output",
		    counter: 0,
		    seen: /* @__PURE__ */ new Map(),
		    cycles: params?.cycles ?? "ref",
		    reused: params?.reused ?? "inline",
		    external: params?.external ?? void 0
		  };
		}
		function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
		  var _a3;
		  const def = schema._zod.def;
		  const seen = ctx.seen.get(schema);
		  if (seen) {
		    seen.count++;
		    const isCycle = _params.schemaPath.includes(schema);
		    if (isCycle) {
		      seen.cycle = _params.path;
		    }
		    return seen.schema;
		  }
		  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
		  ctx.seen.set(schema, result);
		  const overrideSchema = schema._zod.toJSONSchema?.();
		  if (overrideSchema) {
		    result.schema = overrideSchema;
		  } else {
		    const params = {
		      ..._params,
		      schemaPath: [..._params.schemaPath, schema],
		      path: _params.path
		    };
		    if (schema._zod.processJSONSchema) {
		      schema._zod.processJSONSchema(ctx, result.schema, params);
		    } else {
		      const _json = result.schema;
		      const processor = ctx.processors[def.type];
		      if (!processor) {
		        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
		      }
		      processor(schema, ctx, _json, params);
		    }
		    const parent = schema._zod.parent;
		    if (parent) {
		      if (!result.ref)
		        result.ref = parent;
		      process(parent, ctx, params);
		      ctx.seen.get(parent).isParent = true;
		    }
		  }
		  const meta2 = ctx.metadataRegistry.get(schema);
		  if (meta2)
		    Object.assign(result.schema, meta2);
		  if (ctx.io === "input" && isTransforming(schema)) {
		    delete result.schema.examples;
		    delete result.schema.default;
		  }
		  if (ctx.io === "input" && "_prefault" in result.schema)
		    (_a3 = result.schema).default ?? (_a3.default = result.schema._prefault);
		  delete result.schema._prefault;
		  const _result = ctx.seen.get(schema);
		  return _result.schema;
		}
		function extractDefs(ctx, schema) {
		  const root = ctx.seen.get(schema);
		  if (!root)
		    throw new Error("Unprocessed schema. This is a bug in Zod.");
		  const idToSchema = /* @__PURE__ */ new Map();
		  for (const entry of ctx.seen.entries()) {
		    const id = ctx.metadataRegistry.get(entry[0])?.id;
		    if (id) {
		      const existing = idToSchema.get(id);
		      if (existing && existing !== entry[0]) {
		        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
		      }
		      idToSchema.set(id, entry[0]);
		    }
		  }
		  const makeURI = (entry) => {
		    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		    if (ctx.external) {
		      const externalId = ctx.external.registry.get(entry[0])?.id;
		      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
		      if (externalId) {
		        return { ref: uriGenerator(externalId) };
		      }
		      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
		      entry[1].defId = id;
		      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
		    }
		    if (entry[1] === root) {
		      return { ref: "#" };
		    }
		    const uriPrefix = `#`;
		    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
		    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		    return { defId, ref: defUriPrefix + defId };
		  };
		  const extractToDef = (entry) => {
		    if (entry[1].schema.$ref) {
		      return;
		    }
		    const seen = entry[1];
		    const { ref, defId } = makeURI(entry);
		    seen.def = { ...seen.schema };
		    if (defId)
		      seen.defId = defId;
		    const schema2 = seen.schema;
		    for (const key in schema2) {
		      delete schema2[key];
		    }
		    schema2.$ref = ref;
		  };
		  if (ctx.cycles === "throw") {
		    for (const entry of ctx.seen.entries()) {
		      const seen = entry[1];
		      if (seen.cycle) {
		        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

		Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		      }
		    }
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
		    const id = ctx.metadataRegistry.get(entry[0])?.id;
		    if (id) {
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
		  if (!root)
		    throw new Error("Unprocessed schema. This is a bug in Zod.");
		  const flattenRef = (zodSchema) => {
		    const seen = ctx.seen.get(zodSchema);
		    if (seen.ref === null)
		      return;
		    const schema2 = seen.def ?? seen.schema;
		    const _cached = { ...schema2 };
		    const ref = seen.ref;
		    seen.ref = null;
		    if (ref) {
		      flattenRef(ref);
		      const refSeen = ctx.seen.get(ref);
		      const refSchema = refSeen.schema;
		      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
		        schema2.allOf = schema2.allOf ?? [];
		        schema2.allOf.push(refSchema);
		      } else {
		        Object.assign(schema2, refSchema);
		      }
		      Object.assign(schema2, _cached);
		      const isParentRef = zodSchema._zod.parent === ref;
		      if (isParentRef) {
		        for (const key in schema2) {
		          if (key === "$ref" || key === "allOf")
		            continue;
		          if (!(key in _cached)) {
		            delete schema2[key];
		          }
		        }
		      }
		      if (refSchema.$ref && refSeen.def) {
		        for (const key in schema2) {
		          if (key === "$ref" || key === "allOf")
		            continue;
		          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
		            delete schema2[key];
		          }
		        }
		      }
		    }
		    const parent = zodSchema._zod.parent;
		    if (parent && parent !== ref) {
		      flattenRef(parent);
		      const parentSeen = ctx.seen.get(parent);
		      if (parentSeen?.schema.$ref) {
		        schema2.$ref = parentSeen.schema.$ref;
		        if (parentSeen.def) {
		          for (const key in schema2) {
		            if (key === "$ref" || key === "allOf")
		              continue;
		            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
		              delete schema2[key];
		            }
		          }
		        }
		      }
		    }
		    ctx.override({
		      zodSchema,
		      jsonSchema: schema2,
		      path: seen.path ?? []
		    });
		  };
		  for (const entry of [...ctx.seen.entries()].reverse()) {
		    flattenRef(entry[0]);
		  }
		  const result = {};
		  if (ctx.target === "draft-2020-12") {
		    result.$schema = "https://json-schema.org/draft/2020-12/schema";
		  } else if (ctx.target === "draft-07") {
		    result.$schema = "http://json-schema.org/draft-07/schema#";
		  } else if (ctx.target === "draft-04") {
		    result.$schema = "http://json-schema.org/draft-04/schema#";
		  } else if (ctx.target === "openapi-3.0") {
		  } else {
		  }
		  if (ctx.external?.uri) {
		    const id = ctx.external.registry.get(schema)?.id;
		    if (!id)
		      throw new Error("Schema is missing an `id` property");
		    result.$id = ctx.external.uri(id);
		  }
		  Object.assign(result, root.def ?? root.schema);
		  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
		  if (rootMetaId !== void 0 && result.id === rootMetaId)
		    delete result.id;
		  const defs = ctx.external?.defs ?? {};
		  for (const entry of ctx.seen.entries()) {
		    const seen = entry[1];
		    if (seen.def && seen.defId) {
		      if (seen.def.id === seen.defId)
		        delete seen.def.id;
		      defs[seen.defId] = seen.def;
		    }
		  }
		  if (ctx.external) {
		  } else {
		    if (Object.keys(defs).length > 0) {
		      if (ctx.target === "draft-2020-12") {
		        result.$defs = defs;
		      } else {
		        result.definitions = defs;
		      }
		    }
		  }
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
		  if (ctx.seen.has(_schema))
		    return false;
		  ctx.seen.add(_schema);
		  const def = _schema._zod.def;
		  if (def.type === "transform")
		    return true;
		  if (def.type === "array")
		    return isTransforming(def.element, ctx);
		  if (def.type === "set")
		    return isTransforming(def.valueType, ctx);
		  if (def.type === "lazy")
		    return isTransforming(def.getter(), ctx);
		  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
		    return isTransforming(def.innerType, ctx);
		  }
		  if (def.type === "intersection") {
		    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
		  }
		  if (def.type === "record" || def.type === "map") {
		    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		  }
		  if (def.type === "pipe") {
		    if (_schema._zod.traits.has("$ZodCodec"))
		      return true;
		    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
		  }
		  if (def.type === "object") {
		    for (const key in def.shape) {
		      if (isTransforming(def.shape[key], ctx))
		        return true;
		    }
		    return false;
		  }
		  if (def.type === "union") {
		    for (const option of def.options) {
		      if (isTransforming(option, ctx))
		        return true;
		    }
		    return false;
		  }
		  if (def.type === "tuple") {
		    for (const item of def.items) {
		      if (isTransforming(item, ctx))
		        return true;
		    }
		    if (def.rest && isTransforming(def.rest, ctx))
		      return true;
		    return false;
		  }
		  return false;
		}
		var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
		  const ctx = initializeContext({ ...params, processors });
		  process(schema, ctx);
		  extractDefs(ctx, schema);
		  return finalize(ctx, schema);
		};
		var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
		  const { libraryOptions, target } = params ?? {};
		  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
		  process(schema, ctx);
		  extractDefs(ctx, schema);
		  return finalize(ctx, schema);
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/core/json-schema-processors.js
		var formatMap = {
		  guid: "uuid",
		  url: "uri",
		  datetime: "date-time",
		  json_string: "json-string",
		  regex: ""
		  // do not set
		};
		var stringProcessor = (schema, ctx, _json, _params) => {
		  const json = _json;
		  json.type = "string";
		  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
		  if (typeof minimum === "number")
		    json.minLength = minimum;
		  if (typeof maximum === "number")
		    json.maxLength = maximum;
		  if (format) {
		    json.format = formatMap[format] ?? format;
		    if (json.format === "")
		      delete json.format;
		    if (format === "time") {
		      delete json.format;
		    }
		  }
		  if (contentEncoding)
		    json.contentEncoding = contentEncoding;
		  if (patterns && patterns.size > 0) {
		    const regexes = [...patterns];
		    if (regexes.length === 1)
		      json.pattern = regexes[0].source;
		    else if (regexes.length > 1) {
		      json.allOf = [
		        ...regexes.map((regex) => ({
		          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
		          pattern: regex.source
		        }))
		      ];
		    }
		  }
		};
		var numberProcessor = (schema, ctx, _json, _params) => {
		  const json = _json;
		  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
		  if (typeof format === "string" && format.includes("int"))
		    json.type = "integer";
		  else
		    json.type = "number";
		  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
		  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
		  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
		  if (exMin) {
		    if (legacy) {
		      json.minimum = exclusiveMinimum;
		      json.exclusiveMinimum = true;
		    } else {
		      json.exclusiveMinimum = exclusiveMinimum;
		    }
		  } else if (typeof minimum === "number") {
		    json.minimum = minimum;
		  }
		  if (exMax) {
		    if (legacy) {
		      json.maximum = exclusiveMaximum;
		      json.exclusiveMaximum = true;
		    } else {
		      json.exclusiveMaximum = exclusiveMaximum;
		    }
		  } else if (typeof maximum === "number") {
		    json.maximum = maximum;
		  }
		  if (typeof multipleOf === "number")
		    json.multipleOf = multipleOf;
		};
		var booleanProcessor = (_schema, _ctx, json, _params) => {
		  json.type = "boolean";
		};
		var neverProcessor = (_schema, _ctx, json, _params) => {
		  json.not = {};
		};
		var unknownProcessor = (_schema, _ctx, _json, _params) => {
		};
		var enumProcessor = (schema, _ctx, json, _params) => {
		  const def = schema._zod.def;
		  const values = getEnumValues(def.entries);
		  if (values.every((v) => typeof v === "number"))
		    json.type = "number";
		  if (values.every((v) => typeof v === "string"))
		    json.type = "string";
		  json.enum = values;
		};
		var literalProcessor = (schema, ctx, json, _params) => {
		  const def = schema._zod.def;
		  const vals = [];
		  for (const val of def.values) {
		    if (val === void 0) {
		      if (ctx.unrepresentable === "throw") {
		        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
		      } else {
		      }
		    } else if (typeof val === "bigint") {
		      if (ctx.unrepresentable === "throw") {
		        throw new Error("BigInt literals cannot be represented in JSON Schema");
		      } else {
		        vals.push(Number(val));
		      }
		    } else {
		      vals.push(val);
		    }
		  }
		  if (vals.length === 0) {
		  } else if (vals.length === 1) {
		    const val = vals[0];
		    json.type = val === null ? "null" : typeof val;
		    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		      json.enum = [val];
		    } else {
		      json.const = val;
		    }
		  } else {
		    if (vals.every((v) => typeof v === "number"))
		      json.type = "number";
		    if (vals.every((v) => typeof v === "string"))
		      json.type = "string";
		    if (vals.every((v) => typeof v === "boolean"))
		      json.type = "boolean";
		    if (vals.every((v) => v === null))
		      json.type = "null";
		    json.enum = vals;
		  }
		};
		var customProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Custom types cannot be represented in JSON Schema");
		  }
		};
		var transformProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Transforms cannot be represented in JSON Schema");
		  }
		};
		var arrayProcessor = (schema, ctx, _json, params) => {
		  const json = _json;
		  const def = schema._zod.def;
		  const { minimum, maximum } = schema._zod.bag;
		  if (typeof minimum === "number")
		    json.minItems = minimum;
		  if (typeof maximum === "number")
		    json.maxItems = maximum;
		  json.type = "array";
		  json.items = process(def.element, ctx, {
		    ...params,
		    path: [...params.path, "items"]
		  });
		};
		var objectProcessor = (schema, ctx, _json, params) => {
		  const json = _json;
		  const def = schema._zod.def;
		  json.type = "object";
		  json.properties = {};
		  const shape = def.shape;
		  for (const key in shape) {
		    json.properties[key] = process(shape[key], ctx, {
		      ...params,
		      path: [...params.path, "properties", key]
		    });
		  }
		  const allKeys = new Set(Object.keys(shape));
		  const requiredKeys = new Set([...allKeys].filter((key) => {
		    const v = def.shape[key]._zod;
		    if (ctx.io === "input") {
		      return v.optin === void 0;
		    } else {
		      return v.optout === void 0;
		    }
		  }));
		  if (requiredKeys.size > 0) {
		    json.required = Array.from(requiredKeys);
		  }
		  if (def.catchall?._zod.def.type === "never") {
		    json.additionalProperties = false;
		  } else if (!def.catchall) {
		    if (ctx.io === "output")
		      json.additionalProperties = false;
		  } else if (def.catchall) {
		    json.additionalProperties = process(def.catchall, ctx, {
		      ...params,
		      path: [...params.path, "additionalProperties"]
		    });
		  }
		};
		var unionProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  const isExclusive = def.inclusive === false;
		  const options = def.options.map((x, i) => process(x, ctx, {
		    ...params,
		    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
		  }));
		  if (isExclusive) {
		    json.oneOf = options;
		  } else {
		    json.anyOf = options;
		  }
		};
		var intersectionProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  const a = process(def.left, ctx, {
		    ...params,
		    path: [...params.path, "allOf", 0]
		  });
		  const b = process(def.right, ctx, {
		    ...params,
		    path: [...params.path, "allOf", 1]
		  });
		  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
		  const allOf = [
		    ...isSimpleIntersection(a) ? a.allOf : [a],
		    ...isSimpleIntersection(b) ? b.allOf : [b]
		  ];
		  json.allOf = allOf;
		};
		var nullableProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  const inner = process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  if (ctx.target === "openapi-3.0") {
		    seen.ref = def.innerType;
		    json.nullable = true;
		  } else {
		    json.anyOf = [inner, { type: "null" }];
		  }
		};
		var nonoptionalProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		};
		var defaultProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		var prefaultProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  if (ctx.io === "input")
		    json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		var catchProcessor = (schema, ctx, json, params) => {
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
		var pipeProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
		  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
		  process(innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = innerType;
		};
		var readonlyProcessor = (schema, ctx, json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  json.readOnly = true;
		};
		var optionalProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		};

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/classic/iso.js
		var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
		  $ZodISODateTime.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function datetime2(params) {
		  return _isoDateTime(ZodISODateTime, params);
		}
		var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
		  $ZodISODate.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function date2(params) {
		  return _isoDate(ZodISODate, params);
		}
		var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
		  $ZodISOTime.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function time2(params) {
		  return _isoTime(ZodISOTime, params);
		}
		var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
		  $ZodISODuration.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function duration2(params) {
		  return _isoDuration(ZodISODuration, params);
		}

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/classic/errors.js
		var initializer2 = (inst, issues) => {
		  $ZodError.init(inst, issues);
		  inst.name = "ZodError";
		  Object.defineProperties(inst, {
		    format: {
		      value: (mapper) => formatError(inst, mapper)
		      // enumerable: false,
		    },
		    flatten: {
		      value: (mapper) => flattenError(inst, mapper)
		      // enumerable: false,
		    },
		    addIssue: {
		      value: (issue2) => {
		        inst.issues.push(issue2);
		        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		      }
		      // enumerable: false,
		    },
		    addIssues: {
		      value: (issues2) => {
		        inst.issues.push(...issues2);
		        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		      }
		      // enumerable: false,
		    },
		    isEmpty: {
		      get() {
		        return inst.issues.length === 0;
		      }
		      // enumerable: false,
		    }
		  });
		};
		var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, {
		  Parent: Error
		});

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/classic/parse.js
		var parse2 = /* @__PURE__ */ _parse(ZodRealError);
		var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
		var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
		var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		var encode = /* @__PURE__ */ _encode(ZodRealError);
		var decode = /* @__PURE__ */ _decode(ZodRealError);
		var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

		// ../../../../../../../private/tmp/dsh-usage-build/deps/zod/v4/classic/schemas.js
		var _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
		  const proto = Object.getPrototypeOf(inst);
		  let installed = _installedGroups.get(proto);
		  if (!installed) {
		    installed = /* @__PURE__ */ new Set();
		    _installedGroups.set(proto, installed);
		  }
		  if (installed.has(group))
		    return;
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
		var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
		  $ZodType.init(inst, def);
		  Object.assign(inst["~standard"], {
		    jsonSchema: {
		      input: createStandardJSONSchemaMethod(inst, "input"),
		      output: createStandardJSONSchemaMethod(inst, "output")
		    }
		  });
		  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
		  inst.def = def;
		  inst.type = def.type;
		  Object.defineProperty(inst, "_def", { value: def });
		  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
		  inst.safeParse = (data, params) => safeParse2(inst, data, params);
		  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
		  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
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
		      const def2 = this.def;
		      return this.clone(util_exports.mergeDefs(def2, {
		        checks: [
		          ...def2.checks ?? [],
		          ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
		        ]
		      }), { parent: true });
		    },
		    with(...chks) {
		      return this.check(...chks);
		    },
		    clone(def2, params) {
		      return clone(this, def2, params);
		    },
		    brand() {
		      return this;
		    },
		    register(reg, meta2) {
		      reg.add(this, meta2);
		      return this;
		    },
		    refine(check, params) {
		      return this.check(refine(check, params));
		    },
		    superRefine(refinement, params) {
		      return this.check(superRefine(refinement, params));
		    },
		    overwrite(fn) {
		      return this.check(_overwrite(fn));
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
		      if (args.length === 0)
		        return globalRegistry.get(this);
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
		var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
		  $ZodString.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
		  const bag = inst._zod.bag;
		  inst.format = bag.format ?? null;
		  inst.minLength = bag.minimum ?? null;
		  inst.maxLength = bag.maximum ?? null;
		  _installLazyMethods(inst, "_ZodString", {
		    regex(...args) {
		      return this.check(_regex(...args));
		    },
		    includes(...args) {
		      return this.check(_includes(...args));
		    },
		    startsWith(...args) {
		      return this.check(_startsWith(...args));
		    },
		    endsWith(...args) {
		      return this.check(_endsWith(...args));
		    },
		    min(...args) {
		      return this.check(_minLength(...args));
		    },
		    max(...args) {
		      return this.check(_maxLength(...args));
		    },
		    length(...args) {
		      return this.check(_length(...args));
		    },
		    nonempty(...args) {
		      return this.check(_minLength(1, ...args));
		    },
		    lowercase(params) {
		      return this.check(_lowercase(params));
		    },
		    uppercase(params) {
		      return this.check(_uppercase(params));
		    },
		    trim() {
		      return this.check(_trim());
		    },
		    normalize(...args) {
		      return this.check(_normalize(...args));
		    },
		    toLowerCase() {
		      return this.check(_toLowerCase());
		    },
		    toUpperCase() {
		      return this.check(_toUpperCase());
		    },
		    slugify() {
		      return this.check(_slugify());
		    }
		  });
		});
		var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
		  $ZodString.init(inst, def);
		  _ZodString.init(inst, def);
		  inst.email = (params) => inst.check(_email(ZodEmail, params));
		  inst.url = (params) => inst.check(_url(ZodURL, params));
		  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
		  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
		  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
		  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
		  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
		  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
		  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
		  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
		  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
		  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
		  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
		  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
		  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
		  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
		  inst.xid = (params) => inst.check(_xid(ZodXID, params));
		  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
		  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
		  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
		  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
		  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
		  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
		  inst.datetime = (params) => inst.check(datetime2(params));
		  inst.date = (params) => inst.check(date2(params));
		  inst.time = (params) => inst.check(time2(params));
		  inst.duration = (params) => inst.check(duration2(params));
		});
		function string2(params) {
		  return _string(ZodString, params);
		}
		var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  _ZodString.init(inst, def);
		});
		var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
		  $ZodEmail.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
		  $ZodGUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
		  $ZodUUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
		  $ZodURL.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
		  $ZodEmoji.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
		  $ZodNanoID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
		  $ZodCUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
		  $ZodCUID2.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
		  $ZodULID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
		  $ZodXID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
		  $ZodKSUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
		  $ZodIPv4.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
		  $ZodIPv6.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
		  $ZodCIDRv4.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
		  $ZodCIDRv6.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
		  $ZodBase64.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
		  $ZodBase64URL.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
		  $ZodE164.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
		  $ZodJWT.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
		  $ZodNumber.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
		  _installLazyMethods(inst, "ZodNumber", {
		    gt(value, params) {
		      return this.check(_gt(value, params));
		    },
		    gte(value, params) {
		      return this.check(_gte(value, params));
		    },
		    min(value, params) {
		      return this.check(_gte(value, params));
		    },
		    lt(value, params) {
		      return this.check(_lt(value, params));
		    },
		    lte(value, params) {
		      return this.check(_lte(value, params));
		    },
		    max(value, params) {
		      return this.check(_lte(value, params));
		    },
		    int(params) {
		      return this.check(int(params));
		    },
		    safe(params) {
		      return this.check(int(params));
		    },
		    positive(params) {
		      return this.check(_gt(0, params));
		    },
		    nonnegative(params) {
		      return this.check(_gte(0, params));
		    },
		    negative(params) {
		      return this.check(_lt(0, params));
		    },
		    nonpositive(params) {
		      return this.check(_lte(0, params));
		    },
		    multipleOf(value, params) {
		      return this.check(_multipleOf(value, params));
		    },
		    step(value, params) {
		      return this.check(_multipleOf(value, params));
		    },
		    finite() {
		      return this;
		    }
		  });
		  const bag = inst._zod.bag;
		  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
		  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
		  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
		  inst.isFinite = true;
		  inst.format = bag.format ?? null;
		});
		function number2(params) {
		  return _number(ZodNumber, params);
		}
		var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
		  $ZodNumberFormat.init(inst, def);
		  ZodNumber.init(inst, def);
		});
		function int(params) {
		  return _int(ZodNumberFormat, params);
		}
		var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
		  $ZodBoolean.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean2(params) {
		  return _boolean(ZodBoolean, params);
		}
		var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
		  $ZodUnknown.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
		});
		function unknown() {
		  return _unknown(ZodUnknown);
		}
		var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
		  $ZodNever.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
		  return _never(ZodNever, params);
		}
		var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
		  $ZodArray.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
		  inst.element = def.element;
		  _installLazyMethods(inst, "ZodArray", {
		    min(n, params) {
		      return this.check(_minLength(n, params));
		    },
		    nonempty(params) {
		      return this.check(_minLength(1, params));
		    },
		    max(n, params) {
		      return this.check(_maxLength(n, params));
		    },
		    length(n, params) {
		      return this.check(_length(n, params));
		    },
		    unwrap() {
		      return this.element;
		    }
		  });
		});
		function array(element, params) {
		  return _array(ZodArray, element, params);
		}
		var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
		  $ZodObjectJIT.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
		  util_exports.defineLazy(inst, "shape", () => {
		    return def.shape;
		  });
		  _installLazyMethods(inst, "ZodObject", {
		    keyof() {
		      return _enum(Object.keys(this._zod.def.shape));
		    },
		    catchall(catchall) {
		      return this.clone({ ...this._zod.def, catchall });
		    },
		    passthrough() {
		      return this.clone({ ...this._zod.def, catchall: unknown() });
		    },
		    loose() {
		      return this.clone({ ...this._zod.def, catchall: unknown() });
		    },
		    strict() {
		      return this.clone({ ...this._zod.def, catchall: never() });
		    },
		    strip() {
		      return this.clone({ ...this._zod.def, catchall: void 0 });
		    },
		    extend(incoming) {
		      return util_exports.extend(this, incoming);
		    },
		    safeExtend(incoming) {
		      return util_exports.safeExtend(this, incoming);
		    },
		    merge(other) {
		      return util_exports.merge(this, other);
		    },
		    pick(mask) {
		      return util_exports.pick(this, mask);
		    },
		    omit(mask) {
		      return util_exports.omit(this, mask);
		    },
		    partial(...args) {
		      return util_exports.partial(ZodOptional, this, args[0]);
		    },
		    required(...args) {
		      return util_exports.required(ZodNonOptional, this, args[0]);
		    }
		  });
		});
		function object(shape, params) {
		  const def = {
		    type: "object",
		    shape: shape ?? {},
		    ...util_exports.normalizeParams(params)
		  };
		  return new ZodObject(def);
		}
		var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
		  $ZodUnion.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
		  inst.options = def.options;
		});
		function union(options, params) {
		  return new ZodUnion({
		    type: "union",
		    options,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
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
		var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
		  $ZodEnum.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
		  inst.enum = def.entries;
		  inst.options = Object.values(def.entries);
		  const keys = new Set(Object.keys(def.entries));
		  inst.extract = (values, params) => {
		    const newEntries = {};
		    for (const value of values) {
		      if (keys.has(value)) {
		        newEntries[value] = def.entries[value];
		      } else
		        throw new Error(`Key ${value} not found in enum`);
		    }
		    return new ZodEnum({
		      ...def,
		      checks: [],
		      ...util_exports.normalizeParams(params),
		      entries: newEntries
		    });
		  };
		  inst.exclude = (values, params) => {
		    const newEntries = { ...def.entries };
		    for (const value of values) {
		      if (keys.has(value)) {
		        delete newEntries[value];
		      } else
		        throw new Error(`Key ${value} not found in enum`);
		    }
		    return new ZodEnum({
		      ...def,
		      checks: [],
		      ...util_exports.normalizeParams(params),
		      entries: newEntries
		    });
		  };
		});
		function _enum(values, params) {
		  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
		  return new ZodEnum({
		    type: "enum",
		    entries,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
		  $ZodLiteral.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
		  inst.values = new Set(def.values);
		  Object.defineProperty(inst, "value", {
		    get() {
		      if (def.values.length > 1) {
		        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		      }
		      return def.values[0];
		    }
		  });
		});
		function literal(value, params) {
		  return new ZodLiteral({
		    type: "literal",
		    values: Array.isArray(value) ? value : [value],
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
		  $ZodTransform.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
		  inst._zod.parse = (payload, _ctx) => {
		    if (_ctx.direction === "backward") {
		      throw new $ZodEncodeError(inst.constructor.name);
		    }
		    payload.addIssue = (issue2) => {
		      if (typeof issue2 === "string") {
		        payload.issues.push(util_exports.issue(issue2, payload.value, def));
		      } else {
		        const _issue = issue2;
		        if (_issue.fatal)
		          _issue.continue = false;
		        _issue.code ?? (_issue.code = "custom");
		        _issue.input ?? (_issue.input = payload.value);
		        _issue.inst ?? (_issue.inst = inst);
		        payload.issues.push(util_exports.issue(_issue));
		      }
		    };
		    const output = def.transform(payload.value, payload);
		    if (output instanceof Promise) {
		      return output.then((output2) => {
		        payload.value = output2;
		        payload.fallback = true;
		        return payload;
		      });
		    }
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
		var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
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
		var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
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
		var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
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
		var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
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
		      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		    }
		  });
		}
		var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
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
		      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		    }
		  });
		}
		var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
		  $ZodNonOptional.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
		  return new ZodNonOptional({
		    type: "nonoptional",
		    innerType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
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
		var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
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
		    // ...util.normalizeParams(params),
		  });
		}
		var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
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
		var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
		  $ZodCustom.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
		  return _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
		  return _superRefine(fn, params);
		}

		// lib/typert.remote-client.js
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema$value;
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_progress_result$schema$value ??= object({
		  "completed": number2().readonly(),
		  "total": number2().readonly(),
		  "running": boolean2().readonly()
		});
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema$value;
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema$value ??= boolean2();
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema$value;
		var _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema = () => _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema$value ??= object({
		  "capturedAt": number2().readonly(),
		  "projects": array(object({
		    "id": string2().readonly(),
		    "title": string2().readonly()
		  })).readonly(),
		  "sessions": array(object({
		    "id": intersection(string2(), unknown()).readonly(),
		    "title": string2().readonly(),
		    "projectId": string2().readonly().optional(),
		    "lastAt": number2().readonly(),
		    "missingTurns": number2().readonly()
		  })).readonly(),
		  "records": array(object({
		    "sessionId": intersection(string2(), unknown()).readonly(),
		    "at": number2().readonly(),
		    "inputTokens": number2().readonly(),
		    "outputTokens": number2().readonly(),
		    "totalTokens": number2().readonly(),
		    "cacheReadTokens": number2().readonly().optional(),
		    "cacheWriteTokens": number2().readonly().optional(),
		    "provider": string2().readonly().optional(),
		    "model": string2().readonly().optional()
		  })).readonly(),
		  "issues": array(object({
		    "kind": union([literal("unreadable-session"), literal("missing-turn"), literal("unattributed-turn")]).readonly(),
		    "sessionId": intersection(string2(), unknown()).readonly(),
		    "title": string2().readonly(),
		    "projectId": string2().readonly().optional(),
		    "at": number2().readonly().optional()
		  })).readonly(),
		  "unreadableSessions": number2().readonly()
		});
		var TYPERT_REMOTE = {
		  package: "@deepseek-ai/dsh-client-ui-usage",
		  descriptors: [
		    {
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
		      sourceLocation: { "file": "packages/client/ui-usage/src/index.ts", "line": 50, "column": 3 }
		    },
		    {
		      id: "@deepseek-ai/dsh-client-ui-usage#usageStatistics/snapshot",
		      service: "usageStatistics",
		      namespace: "usageStatistics",
		      method: "snapshot",
		      invocation: { kind: "direct" },
		      parameters: [
		        {
		          name: "force",
		          wire: "force",
		          source: "json",
		          codec: {
		            mode: "strict",
		            typeSymbol: "@deepseek-ai/dsh-client-ui-usage#usageStatistics/snapshot:force",
		            create: _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_parameter_0$schema
		          }
		        }
		      ],
		      result: {
		        mode: "strict",
		        typeSymbol: "@deepseek-ai/dsh-client-ui-usage/types#UsageSnapshot",
		        create: _deepseek_ai_dsh_client_ui_usage_usageStatistics_snapshot_result$schema
		      },
		      sourceLocation: { "file": "packages/client/ui-usage/src/index.ts", "line": 59, "column": 9 }
		    }
		  ]
		};
		var typert_remote_client_default = TYPERT_REMOTE;

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/index.ts
		var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/UsagePage.tsx
		var import_react = require("react");
		var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/derive.ts
		function dayStart(time3) {
		  const date3 = new Date(time3);
		  return new Date(date3.getFullYear(), date3.getMonth(), date3.getDate()).getTime();
		}
		function shiftDay(time3, days) {
		  const date3 = new Date(time3);
		  return new Date(date3.getFullYear(), date3.getMonth(), date3.getDate() + days).getTime();
		}
		function inputOf(record) {
		  return record.totalTokens - record.outputTokens;
		}
		function sum(records, pick2) {
		  let total = 0;
		  for (const record of records) total += pick2(record);
		  return total;
		}
		function grouped(records, getName) {
		  const sums = /* @__PURE__ */ new Map();
		  for (const record of records) {
		    const name = getName(record);
		    sums.set(name, (sums.get(name) ?? 0) + record.totalTokens);
		  }
		  return [...sums].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
		}
		function cacheRatePercent(records) {
		  if (records.length === 0 || !records.every((record) => record.cacheReadTokens !== void 0)) return void 0;
		  const prompt = sum(records, inputOf);
		  return prompt > 0 ? sum(records, (record) => record.cacheReadTokens ?? 0) / prompt * 100 : void 0;
		}
		function streaks(days, first, last) {
		  const active = new Set(days);
		  let longest = 0;
		  let run = 0;
		  for (let day = first; day <= last; day = shiftDay(day, 1)) {
		    run = active.has(day) ? run + 1 : 0;
		    longest = Math.max(longest, run);
		  }
		  let current = 0;
		  for (let day = active.has(last) ? last : shiftDay(last, -1); active.has(day); day = shiftDay(day, -1)) current++;
		  return { current, longest };
		}
		function modelsOf(records) {
		  return [...new Set(records.map((record) => record.model).filter((value) => value !== void 0))].sort();
		}
		function dominantRoute(records, unknown2) {
		  return grouped(records, (record) => `${record.provider ?? unknown2} / ${record.model ?? unknown2}`)[0]?.name ?? `${unknown2} / ${unknown2}`;
		}
		function deriveDashboard(snapshot, filters, unknown2) {
		  const { period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode } = filters;
		  const today = dayStart(snapshot.capturedAt);
		  const anchor = selectedDay ?? today;
		  const daysInView = selectedDay === void 0 ? period : 1;
		  const start = shiftDay(anchor, 1 - daysInView);
		  const end = shiftDay(anchor, 1);
		  const previousStart = shiftDay(anchor, 1 - 2 * daysInView);
		  const sessionById = new Map(snapshot.sessions.map((session) => [session.id, session]));
		  const projectById = new Map(snapshot.projects.map((item) => [item.id, item.title]));
		  const projectRecords = project ? snapshot.records.filter((record) => sessionById.get(record.sessionId)?.projectId === project) : snapshot.records;
		  const models = modelsOf(projectRecords);
		  const scoped = model ? projectRecords.filter((record) => record.model === model) : projectRecords;
		  const selected = scoped.filter((record) => record.at >= start && record.at < end);
		  const previous = scoped.filter((record) => record.at >= previousStart && record.at < start);
		  const trendModels = modelsOf(selected);
		  const activeTrendModel = trendModels.includes(trendModel) ? trendModel : "";
		  const trendRecords = activeTrendModel ? selected.filter((record) => record.model === activeTrendModel) : selected;
		  const activeEfficiencyModel = trendModels.includes(efficiencyModel) ? efficiencyModel : "";
		  const efficiencyRecords = activeEfficiencyModel ? selected.filter((record) => record.model === activeEfficiencyModel) : selected;
		  const total = sum(selected, (record) => record.totalTokens);
		  const prior = sum(previous, (record) => record.totalTokens);
		  const dayTotals = grouped(selected, (record) => String(dayStart(record.at)));
		  const priorDays = grouped(previous, (record) => String(dayStart(record.at)));
		  const peak = Math.max(0, ...dayTotals.map((day) => day.total));
		  const priorPeak = Math.max(0, ...priorDays.map((day) => day.total));
		  const cacheRate = cacheRatePercent(selected);
		  const previousCacheRate = cacheRatePercent(previous);
		  const issuesInProject = project ? snapshot.issues.filter((issue2) => issue2.projectId === project) : snapshot.issues;
		  const qualityIssues = issuesInProject.filter((issue2) => issue2.at === void 0 || issue2.at >= start && issue2.at < end);
		  const unreadable = qualityIssues.filter((issue2) => issue2.kind === "unreadable-session").length;
		  const missing = qualityIssues.filter((issue2) => issue2.kind === "missing-turn").length;
		  const unattributed = qualityIssues.filter((issue2) => issue2.kind === "unattributed-turn").length;
		  const completedTurns = efficiencyRecords.length;
		  const efficiencyInput = sum(efficiencyRecords, inputOf);
		  const coverage = !model && !activeEfficiencyModel && unreadable === 0 && completedTurns + missing > 0 ? completedTurns / (completedTurns + missing) * 100 : void 0;
		  const sessionTotals = /* @__PURE__ */ new Map();
		  for (const record of selected) sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens);
		  const sessions = snapshot.sessions.filter((session) => {
		    if (project && session.projectId !== project) return false;
		    if (model && !sessionTotals.has(session.id)) return false;
		    return sessionMode === "high" ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end;
		  }).sort((a, b) => sessionMode === "high" ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0) : b.lastAt - a.lastAt).slice(0, 10).map((session) => ({
		    session,
		    total: sessionTotals.get(session.id) ?? 0,
		    route: dominantRoute(selected.filter((record) => record.sessionId === session.id), unknown2)
		  }));
		  return {
		    today,
		    anchor,
		    daysInView,
		    start,
		    end,
		    projectById,
		    models,
		    scoped,
		    selected,
		    trendModels,
		    activeTrendModel,
		    trendRecords,
		    activeEfficiencyModel,
		    efficiencyRecords,
		    total,
		    prior,
		    peak,
		    priorPeak,
		    activeDays: dayTotals.length,
		    priorActiveDays: priorDays.length,
		    cacheRate,
		    cacheRateDelta: cacheRate === void 0 || previousCacheRate === void 0 ? void 0 : cacheRate - previousCacheRate,
		    qualityIssues,
		    unreadable,
		    missing,
		    unattributed,
		    completedTurns,
		    averageInputPerTurn: completedTurns ? efficiencyInput / completedTurns : void 0,
		    efficiencyCacheShare: cacheRatePercent(efficiencyRecords),
		    coverage,
		    composition: {
		      uncached: sum(selected, (record) => record.inputTokens),
		      cacheRead: sum(selected, (record) => record.cacheReadTokens ?? 0),
		      cacheWrite: sum(selected, (record) => record.cacheWriteTokens ?? 0),
		      output: sum(selected, (record) => record.outputTokens),
		      other: sum(selected, (record) => Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0)))
		    },
		    modelRows: grouped(selected, (record) => record.model ?? unknown2),
		    providerRows: grouped(selected, (record) => record.provider ?? unknown2),
		    projectRows: grouped(selected, (record) => projectById.get(sessionById.get(record.sessionId)?.projectId ?? "") ?? unknown2),
		    heatYears: [.../* @__PURE__ */ new Set([new Date(today).getFullYear(), ...snapshot.records.map((record) => new Date(record.at).getFullYear())])].sort((a, b) => b - a),
		    sessions
		  };
		}

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/UsagePage.module.css
		var UsagePage_default = {
		  page: "UsagePage_page",
		  content: "UsagePage_content",
		  pageHead: "UsagePage_pageHead",
		  cardHead: "UsagePage_cardHead",
		  toolbar: "UsagePage_toolbar",
		  filters: "UsagePage_filters",
		  trendSelect: "UsagePage_trendSelect",
		  heatYear: "UsagePage_heatYear",
		  trendControls: "UsagePage_trendControls",
		  card: "UsagePage_card",
		  summary: "UsagePage_summary",
		  stat: "UsagePage_stat",
		  heatScroll: "UsagePage_heatScroll",
		  monthLabels: "UsagePage_monthLabels",
		  heatmap: "UsagePage_heatmap",
		  heatWeek: "UsagePage_heatWeek",
		  heatCell: "UsagePage_heatCell",
		  heatFoot: "UsagePage_heatFoot",
		  heatSelected: "UsagePage_heatSelected",
		  heatFuture: "UsagePage_heatFuture",
		  heat0: "UsagePage_heat0",
		  heat1: "UsagePage_heat1",
		  heat2: "UsagePage_heat2",
		  heat3: "UsagePage_heat3",
		  heat4: "UsagePage_heat4",
		  heatHidden: "UsagePage_heatHidden",
		  segments: "UsagePage_segments",
		  notice: "UsagePage_notice",
		  selected: "UsagePage_selected",
		  legend: "UsagePage_legend",
		  inputDot: "UsagePage_inputDot",
		  chartWrap: "UsagePage_chartWrap",
		  chart: "UsagePage_chart",
		  gridLine: "UsagePage_gridLine",
		  inputLine: "UsagePage_inputLine",
		  chartGuide: "UsagePage_chartGuide",
		  chartPoint: "UsagePage_chartPoint",
		  chartTick: "UsagePage_chartTick",
		  chartTooltip: "UsagePage_chartTooltip",
		  chartAxis: "UsagePage_chartAxis",
		  efficiencyStats: "UsagePage_efficiencyStats",
		  twoCols: "UsagePage_twoCols",
		  composition: "UsagePage_composition",
		  rankList: "UsagePage_rankList",
		  compRow: "UsagePage_compRow",
		  rankMeta: "UsagePage_rankMeta",
		  track: "UsagePage_track",
		  share: "UsagePage_share",
		  donut: "UsagePage_donut",
		  shareLegend: "UsagePage_shareLegend",
		  sessionList: "UsagePage_sessionList",
		  sessionRow: "UsagePage_sessionRow",
		  sessionIndex: "UsagePage_sessionIndex",
		  sessionText: "UsagePage_sessionText",
		  sessionTotal: "UsagePage_sessionTotal",
		  empty: "UsagePage_empty",
		  toolbarStatus: "UsagePage_toolbarStatus",
		  clearDay: "UsagePage_clearDay",
		  qualityHead: "UsagePage_qualityHead",
		  qualityToggle: "UsagePage_qualityToggle",
		  qualityPanel: "UsagePage_qualityPanel",
		  qualityGroup: "UsagePage_qualityGroup",
		  qualityGroupHead: "UsagePage_qualityGroupHead",
		  qualityList: "UsagePage_qualityList",
		  loading: "UsagePage_loading",
		  "usage-spin": "UsagePage_usage-spin"
		};

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/UsagePage.tsx
		var import_jsx_runtime = require("react/jsx-runtime");
		var MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
		var PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
		var PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
		var COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
		var INTEGER = new Intl.NumberFormat(void 0);
		var DECIMAL = new Intl.NumberFormat(void 0, { maximumFractionDigits: 1 });
		var COMPACT = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
		var DAY_SHORT = new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" });
		var DAY_MEDIUM = new Intl.DateTimeFormat(void 0, { year: "numeric", month: "short", day: "numeric" });
		var DAY_LONG = new Intl.DateTimeFormat(void 0, { year: "numeric", month: "long", day: "numeric" });
		var DAY_NUMERIC = new Intl.DateTimeFormat(void 0, { year: "numeric", month: "numeric", day: "numeric" });
		var MONTH_SHORT = new Intl.DateTimeFormat(void 0, { month: "short" });
		var DATE_TIME = new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
		function amount(value) {
		  return (value >= 1e4 ? COMPACT : DECIMAL).format(value);
		}
		function percent(value) {
		  return value === void 0 ? "\u2014" : `${value.toFixed(1)}%`;
		}
		function signed(value) {
		  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
		}
		function change(current, previous) {
		  return previous > 0 ? `${signed((current - previous) / previous * 100)}%` : "\u2014";
		}
		function share(value, total) {
		  return `${(total ? value / total * 100 : 0).toFixed(1)}%`;
		}
		function ProgressCount({ useProgress, prefix }) {
		  const progress = useProgress((state) => state.progress);
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: progress?.total ? `${prefix}${progress.completed}/${progress.total}` : "" });
		}
		function TrendChart({ records, period, anchorAt, mode, metric, label, t }) {
		  const [hovered, setHovered] = (0, import_react.useState)();
		  const anchor = dayStart(anchorAt);
		  const data = [];
		  for (let offset = period - 1; offset >= 0; offset--) {
		    const at = shiftDay(anchor, -offset);
		    data.push({ at, endAt: at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true });
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
		    const monday = shiftDay(item.at, -((new Date(item.at).getDay() + 6) % 7));
		    let week = weeks.at(-1);
		    if (week?.at !== monday) {
		      week = { at: monday, endAt: item.at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true };
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
		    if (metric === "averageInput") return point.turns ? point.input / point.turns : void 0;
		    if (metric === "cacheRate") return point.turns === 0 || !point.cacheKnown ? void 0 : point.input ? point.cacheRead / point.input * 100 : 0;
		    return point.input;
		  };
		  const values = points.map(valueOf);
		  const maximum = metric === "cacheRate" ? 100 : Math.max(1, ...values.filter((value) => value !== void 0));
		  const position = (index) => {
		    const x = 68 + (points.length === 1 ? 345 : index * 690 / (points.length - 1));
		    return { x, y: 150 - (values[index] ?? 0) / maximum * 120 };
		  };
		  const line = values.map((value, index) => value === void 0 ? "" : `${index === 0 || values[index - 1] === void 0 ? "M" : "L"} ${position(index).x} ${position(index).y}`).join(" ");
		  const activeIndex = hovered !== void 0 && hovered < points.length ? hovered : void 0;
		  const active = activeIndex === void 0 ? void 0 : points[activeIndex];
		  const activePosition = activeIndex === void 0 ? void 0 : position(activeIndex);
		  const updateHover = (clientX, width, left) => {
		    const x = (clientX - left) / width * 790;
		    setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - 68) / 690 * (points.length - 1)))));
		  };
		  const format = (value) => value === void 0 ? "\u2014" : metric === "cacheRate" ? `${value.toFixed(1)}%` : `${(metric === "averageInput" ? DECIMAL : INTEGER).format(value)} ${metric === "turns" ? t("turns") : t("tokenUnit")}`;
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.chartWrap, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
		      "svg",
		      {
		        className: UsagePage_default.chart,
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
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "790", height: "180", fill: "transparent" }),
		          [0, 1, 2, 3].map((tick) => {
		            const y = 150 - tick * 40;
		            const value = maximum * tick / 3;
		            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "68", x2: "758", y1: y, y2: y, className: UsagePage_default.gridLine }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x: "60", y: y + 4, textAnchor: "end", className: UsagePage_default.chartTick, children: metric === "cacheRate" ? `${Math.round(value)}%` : amount(value) })
		            ] }, tick);
		          }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: line, className: UsagePage_default.inputLine }),
		          values.map((value, index) => value !== void 0 && values[index - 1] === void 0 && values[index + 1] === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: position(index).x, cy: position(index).y, r: "3", className: UsagePage_default.chartPoint }, index) : null),
		          activePosition && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: activePosition.x, x2: activePosition.x, y1: "30", y2: "150", className: UsagePage_default.chartGuide }),
		            values[activeIndex ?? 0] !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: activePosition.x, cy: activePosition.y, r: "5", className: UsagePage_default.chartPoint })
		          ] })
		        ]
		      }
		    ),
		    active && activePosition && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.chartTooltip, style: { left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` }, role: "status", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "weekly" ? `${DAY_SHORT.format(active.at)} \u2013 ${DAY_SHORT.format(active.endAt)}` : DAY_MEDIUM.format(active.at) }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
		        label,
		        " \xB7 ",
		        format(values[activeIndex ?? 0])
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.chartAxis, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: DAY_SHORT.format(points[0]?.at ?? anchor) }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: DAY_SHORT.format(points.at(-1)?.endAt ?? anchor) })
		    ] })
		  ] });
		}
		function Heatmap({ records, years, year, today, selectedDay, onYearChange, onSelectDay, t }) {
		  const grid = (0, import_react.useMemo)(() => {
		    const totals = /* @__PURE__ */ new Map();
		    for (const record of records) {
		      const day = dayStart(record.at);
		      totals.set(day, (totals.get(day) ?? 0) + record.totalTokens);
		    }
		    const first2 = year === "rolling" ? shiftDay(today, -364) : new Date(year, 0, 1).getTime();
		    const last = year === "rolling" ? today : new Date(year, 11, 31).getTime();
		    const start = shiftDay(first2, -((new Date(first2).getDay() + 6) % 7));
		    const cells2 = [];
		    for (let day = start; day <= last; day = shiftDay(day, 1)) {
		      cells2.push({ at: day, total: totals.get(day) ?? 0, visible: day >= first2 && day <= today, future: day >= first2 && day > today });
		    }
		    while (cells2.length % 7 !== 0) cells2.push({ at: today, total: 0, visible: false, future: false });
		    const weeks2 = cells2.length / 7;
		    const months2 = Array.from({ length: weeks2 }, (_, week) => {
		      const cell = cells2[week * 7];
		      if (cell === void 0) return "";
		      const date3 = Math.max(cell.at, first2);
		      const previousCell = week === 0 ? void 0 : cells2[(week - 1) * 7];
		      const previous = previousCell === void 0 ? void 0 : Math.max(previousCell.at, first2);
		      return previous === void 0 || new Date(date3).getMonth() !== new Date(previous).getMonth() ? MONTH_SHORT.format(date3) : "";
		    });
		    const active = [...totals].filter(([day, total]) => day >= first2 && day <= last && total > 0);
		    const max2 = Math.max(1, ...active.map(([, total]) => total));
		    const lastShown2 = Math.min(last, today);
		    return { cells: cells2, weeks: weeks2, months: months2, max: max2, first: first2, lastShown: lastShown2, streak: streaks(active.map(([day]) => day), first2, lastShown2) };
		  }, [records, year, today]);
		  const { cells, weeks, months, max, first, lastShown, streak } = grid;
		  const tabStop = selectedDay !== void 0 && selectedDay >= first && selectedDay <= lastShown ? selectedDay : lastShown;
		  const size = { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` };
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.cardHead, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("heatmap") }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: year === "rolling" ? t("heatmapNote") : `${year} \xB7 ${t("oneCellDay")}` })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: UsagePage_default.heatYear, children: [
		        t("heatmapRange"),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: year, onChange: (event) => {
		          onYearChange(event.target.value === "rolling" ? "rolling" : Number(event.target.value));
		        }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "rolling", children: t("rollingYear") }),
		          years.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item, children: item }, item))
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.heatScroll, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.monthLabels, style: size, children: months.map((month, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: month }, index)) }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.heatmap, style: size, children: Array.from({ length: weeks }, (_, week) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.heatWeek, children: cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
		        const level = cell.total === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil(Math.sqrt(cell.total / max) * 4)));
		        const detail = `${DAY_LONG.format(cell.at)}
		${INTEGER.format(cell.total)} ${t("tokenUnit")}`;
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: detail, side: "top", portal: true, delayMs: 80, disabled: !cell.visible, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		          "span",
		          {
		            className: `${UsagePage_default.heatCell} ${cell.visible ? UsagePage_default[`heat${level}`] : cell.future ? UsagePage_default.heatFuture : UsagePage_default.heatHidden} ${selectedDay === cell.at ? UsagePage_default.heatSelected : ""}`,
		            role: cell.visible ? "button" : void 0,
		            tabIndex: cell.visible && cell.at === tabStop ? 0 : -1,
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
		              if (target?.visible) event.currentTarget.closest(`.${UsagePage_default.heatmap}`)?.querySelector(`[data-day="${target.at}"]`)?.focus();
		            },
		            "data-day": cell.at
		          }
		        ) }, day);
		      }) }, week)) })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.heatFoot, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
		        lastShown === today && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		          t("currentStreak"),
		          " ",
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
		            streak.current,
		            " ",
		            t("days")
		          ] }),
		          " \xB7 "
		        ] }),
		        t("longestStreak"),
		        " ",
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
		          streak.longest,
		          " ",
		          t("days")
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
		        t("less"),
		        " ",
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: UsagePage_default.heat0 }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: UsagePage_default.heat1 }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: UsagePage_default.heat2 }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: UsagePage_default.heat3 }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: UsagePage_default.heat4 }),
		        " ",
		        t("more")
		      ] })
		    ] })
		  ] });
		}
		function RankBars({ rows, empty, unit }) {
		  const total = Math.max(1, rows.reduce((sum2, row) => sum2 + row.total, 0));
		  return rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: UsagePage_default.empty, children: empty }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.rankList, children: rows.slice(0, 6).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: `${row.name}
		${INTEGER.format(row.total)} ${unit} \xB7 ${share(row.total, total)}`, side: "top", portal: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.rankRow, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.rankMeta, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
		        amount(row.total),
		        " \xB7 ",
		        share(row.total, total)
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.track, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] } }) })
		  ] }) }, row.name)) });
		}
		function ShareDonut({ rows, empty, other, colors, unit }) {
		  const [hovered, setHovered] = (0, import_react.useState)();
		  const total = rows.reduce((sum2, row) => sum2 + row.total, 0);
		  if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: UsagePage_default.empty, children: empty });
		  const shown = rows.length <= 6 ? rows : [
		    ...rows.slice(0, 5),
		    { name: other, total: rows.slice(5).reduce((sum2, row) => sum2 + row.total, 0) }
		  ];
		  let offset = 0;
		  const stops = shown.map((row, index) => {
		    const from = offset;
		    offset += row.total / total * 100;
		    return `${colors[index % colors.length]} ${from}% ${offset}%`;
		  });
		  const detail = (row) => `${row.name}
		${INTEGER.format(row.total)} ${unit} \xB7 ${share(row.total, total)}`;
		  const onDonutMove = (clientX, clientY, element) => {
		    const bounds = element.getBoundingClientRect();
		    const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI);
		    const portion = angle / (2 * Math.PI) * total;
		    let used = 0;
		    setHovered(shown.findIndex((row) => (used += row.total) > portion));
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.share, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: hovered === void 0 || hovered < 0 ? `${INTEGER.format(total)} ${unit}` : detail(shown[hovered]), side: "top", portal: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      "div",
		      {
		        className: UsagePage_default.donut,
		        style: { background: `conic-gradient(${stops.join(", ")})` },
		        onPointerMove: (event) => {
		          onDonutMove(event.clientX, event.clientY, event.currentTarget);
		        },
		        onPointerLeave: () => {
		          setHovered(void 0);
		        },
		        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: amount(total) })
		      }
		    ) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.shareLegend, children: shown.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: detail(row), side: "top", portal: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: colors[index % colors.length] } }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: share(row.total, total) })
		    ] }) }, `${index}:${row.name}`)) })
		  ] });
		}
		function QualityPanel({ issues, refreshing, onOpen, onRebuild, t }) {
		  const groups = [
		    ["unreadable-session", t("unreadableSessions"), t("unreadableExplanation")],
		    ["missing-turn", t("missingTurns"), t("missingExplanation")],
		    ["unattributed-turn", t("unattributedTurns"), t("unattributedExplanation")]
		  ];
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.qualityPanel, "aria-label": t("dataQuality"), children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.qualityHead, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("qualityIntro") }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { disabled: refreshing, onClick: onRebuild, children: t("rebuild") })
		    ] }),
		    groups.map(([kind, label, explanation]) => {
		      const own = issues.filter((issue2) => issue2.kind === kind);
		      const sessions = /* @__PURE__ */ new Map();
		      for (const issue2 of own) {
		        const previous = sessions.get(issue2.sessionId);
		        const at = Math.max(previous?.at ?? 0, issue2.at ?? 0) || void 0;
		        sessions.set(issue2.sessionId, {
		          title: issue2.title,
		          count: (previous?.count ?? 0) + 1,
		          ...at === void 0 ? {} : { at }
		        });
		      }
		      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.qualityGroup, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.qualityGroupHead, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
		            label,
		            " \xB7 ",
		            own.length
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: explanation })
		        ] }),
		        sessions.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.qualityList, children: [...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => {
		          onOpen(id);
		        }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: kind === "unreadable-session" ? t("openSession") : `${item.count} ${t("turns")}${item.at === void 0 ? "" : ` \xB7 ${DAY_SHORT.format(item.at)}`}` })
		        ] }, id)) })
		      ] }, kind);
		    })
		  ] });
		}
		function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, t }) {
		  const snapshot = useUsage((state) => state.snapshot);
		  const error = useUsage((state) => state.error);
		  const refreshing = useUsage((state) => state.refreshing);
		  const [period, setPeriod] = (0, import_react.useState)(30);
		  const [selectedDay, setSelectedDay] = (0, import_react.useState)();
		  const [heatYear, setHeatYear] = (0, import_react.useState)("rolling");
		  const [qualityOpen, setQualityOpen] = (0, import_react.useState)(false);
		  const [project, setProject] = (0, import_react.useState)("");
		  const [model, setModel] = (0, import_react.useState)("");
		  const [trend, setTrend] = (0, import_react.useState)("daily");
		  const [trendModel, setTrendModel] = (0, import_react.useState)("");
		  const [efficiencyMetric, setEfficiencyMetric] = (0, import_react.useState)("turns");
		  const [efficiencyMode, setEfficiencyMode] = (0, import_react.useState)("daily");
		  const [efficiencyModel, setEfficiencyModel] = (0, import_react.useState)("");
		  const [sessionMode, setSessionMode] = (0, import_react.useState)("high");
		  (0, import_react.useEffect)(() => activate(), [activate]);
		  const unknown2 = t("unknown");
		  const view = (0, import_react.useMemo)(() => snapshot === void 0 ? void 0 : deriveDashboard(
		    snapshot,
		    { period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode },
		    unknown2
		  ), [snapshot, period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode, unknown2]);
		  const efficiencyLabel = efficiencyMetric === "turns" ? t("completedTurns") : efficiencyMetric === "averageInput" ? t("averageInputPerTurn") : t("cacheReadShare");
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: UsagePage_default.page, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.content, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: UsagePage_default.pageHead, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: t("title") }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("subtitle") })
		    ] }) }),
		    error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.notice, role: "alert", children: [
		      snapshot ? t("staleError") : t("error"),
		      " ",
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: retry, children: t("retry") })
		    ] }),
		    !snapshot && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.loading, role: "status", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
		      t("loading"),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCount, { useProgress, prefix: " \xB7 " })
		    ] }),
		    snapshot && view && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.toolbar, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.toolbarStatus, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: refreshing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		            t("refreshing"),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCount, { useProgress, prefix: " " })
		          ] }) : `${error ? t("staleAsOf") : t("updatedAt")} ${DATE_TIME.format(snapshot.capturedAt)}` }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { disabled: refreshing, onClick: retry, children: t("refresh") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: UsagePage_default.qualityToggle, "aria-expanded": qualityOpen, onClick: () => {
		            setQualityOpen(!qualityOpen);
		          }, children: [
		            t("dataQuality"),
		            " \xB7 ",
		            view.unreadable,
		            " ",
		            t("sessionsUnit"),
		            " / ",
		            view.missing,
		            " ",
		            t("turns"),
		            " / ",
		            view.unattributed,
		            " ",
		            t("unattributedShort")
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.filters, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
		            t("period"),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: selectedDay === void 0 ? period : "selected", onChange: (event) => {
		              setSelectedDay(void 0);
		              setPeriod(Number(event.target.value));
		              setTrendModel("");
		            }, children: [
		              selectedDay !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "selected", children: DAY_NUMERIC.format(selectedDay) }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 7, children: t("days7") }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 30, children: t("days30") }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 90, children: t("days90") }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 365, children: t("days365") })
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
		            t("project"),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: project, onChange: (event) => {
		              setProject(event.target.value);
		              setModel("");
		              setTrendModel("");
		            }, children: [
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("allProjects") }),
		              snapshot.projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item.id, children: item.title }, item.id))
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
		            t("model"),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: model, onChange: (event) => {
		              setModel(event.target.value);
		              setTrendModel("");
		            }, children: [
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("allModels") }),
		              view.models.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item, children: item }, item))
		            ] })
		          ] })
		        ] })
		      ] }),
		      selectedDay !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: UsagePage_default.clearDay, onClick: () => {
		        setSelectedDay(void 0);
		      }, children: t("clearDay") }),
		      qualityOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityPanel, { issues: view.qualityIssues, refreshing, onOpen: openSession, onRebuild: rebuild, t }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: UsagePage_default.summary, "aria-label": t("title"), children: [
		        [t("total"), amount(view.total), `${t("compared")} ${change(view.total, view.prior)}`],
		        [t("average"), amount(Math.round(view.total / view.daysInView)), `${t("compared")} ${change(view.total, view.prior)}`],
		        [t("peak"), amount(view.peak), `${t("compared")} ${change(view.peak, view.priorPeak)}`],
		        [t("active"), `${view.activeDays} ${t("days")}`, `${t("compared")} ${change(view.activeDays, view.priorActiveDays)}`],
		        [t("cacheRate"), percent(view.cacheRate), `${t("compared")} ${view.cacheRateDelta === void 0 ? "\u2014" : `${signed(view.cacheRateDelta)} ${t("percentagePoints")}`}`]
		      ].map(([label, value, note]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.stat, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: note })
		      ] }, label)) }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		        Heatmap,
		        {
		          records: view.scoped,
		          years: view.heatYears,
		          year: heatYear,
		          today: view.today,
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
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.cardHead, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("trendNote") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.trendControls, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: UsagePage_default.trendSelect, children: [
		              t("trendScope"),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: view.activeTrendModel, onChange: (event) => {
		                setTrendModel(event.target.value);
		              }, children: [
		                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("trendTotal") }),
		                view.trendModels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item, children: item }, item))
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.segments, children: ["daily", "weekly", "cumulative"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: trend === mode ? UsagePage_default.selected : "", onClick: () => {
		              setTrend(mode);
		            }, children: t(mode) }, mode)) })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.legend, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: UsagePage_default.inputDot }),
		          t("input")
		        ] }),
		        view.trendRecords.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { records: view.trendRecords, period: view.daysInView, anchorAt: view.anchor, mode: trend, metric: "input", label: `${t("input")} \xB7 ${view.activeTrendModel || t("trendTotal")}`, t }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: UsagePage_default.empty, children: t("noData") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.cardHead, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("efficiency") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("efficiencyNote") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.trendControls, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: UsagePage_default.trendSelect, children: [
		              t("trendScope"),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: view.activeEfficiencyModel, onChange: (event) => {
		                setEfficiencyModel(event.target.value);
		              }, children: [
		                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("trendTotal") }),
		                view.trendModels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item, children: item }, item))
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: UsagePage_default.trendSelect, children: [
		              t("efficiencyMetric"),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: efficiencyMetric, onChange: (event) => {
		                setEfficiencyMetric(event.target.value);
		              }, children: [
		                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "turns", children: t("completedTurns") }),
		                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "averageInput", children: t("averageInputPerTurn") }),
		                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cacheRate", children: t("cacheReadShare") })
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.segments, children: ["daily", "weekly"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: efficiencyMode === mode ? UsagePage_default.selected : "", onClick: () => {
		              setEfficiencyMode(mode);
		            }, children: t(mode) }, mode)) })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.efficiencyStats, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("completedTurns") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: INTEGER.format(view.completedTurns) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("averageInputPerTurn") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: view.averageInputPerTurn === void 0 ? "\u2014" : amount(view.averageInputPerTurn) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("cacheReadShare") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: percent(view.efficiencyCacheShare) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: t("coverageExplanation"), side: "top", portal: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
		              t("measuredCoverage"),
		              " \u24D8"
		            ] }) }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: percent(view.coverage) })
		          ] })
		        ] }),
		        view.efficiencyRecords.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		          TrendChart,
		          {
		            records: view.efficiencyRecords,
		            period: view.daysInView,
		            anchorAt: view.anchor,
		            mode: efficiencyMode,
		            metric: efficiencyMetric,
		            label: `${efficiencyLabel} \xB7 ${view.activeEfficiencyModel || t("trendTotal")}`,
		            t
		          }
		        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: UsagePage_default.empty, children: t("noData") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.twoCols, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("composition") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.composition, children: [
		            [t("uncached"), view.composition.uncached],
		            [t("cacheRead"), view.composition.cacheRead],
		            [t("cacheWrite"), view.composition.cacheWrite],
		            [t("output"), view.composition.output],
		            [t("unknownInput"), view.composition.other]
		          ].map(([name, value], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: `${name}
		${INTEGER.format(value)} ${t("tokenUnit")} \xB7 ${share(value, view.total)}`, side: "top", portal: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.compRow, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.track, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${view.total ? value / view.total * 100 : 0}%`, background: COMPOSITION_COLORS[index] } }) }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: amount(value) })
		          ] }) }, name)) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("models") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDonut, { rows: view.modelRows, empty: t("noData"), other: t("other"), colors: MODEL_COLORS, unit: t("tokenUnit") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("projects") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, { rows: view.projectRows, empty: t("noData"), unit: t("tokenUnit") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("providers") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDonut, { rows: view.providerRows, empty: t("noData"), other: t("other"), colors: PROVIDER_COLORS, unit: t("tokenUnit") })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: UsagePage_default.card, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.cardHead, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("sessions") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: UsagePage_default.segments, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: sessionMode === "high" ? UsagePage_default.selected : "", onClick: () => {
		              setSessionMode("high");
		            }, children: t("highUsage") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: sessionMode === "recent" ? UsagePage_default.selected : "", onClick: () => {
		              setSessionMode("recent");
		            }, children: t("recent") })
		          ] })
		        ] }),
		        view.sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: UsagePage_default.empty, children: t("noData") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: UsagePage_default.sessionList, children: view.sessions.map(({ session, total, route }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: UsagePage_default.sessionRow, onClick: () => {
		          openSession(session.id);
		        }, title: t("openSession"), children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: UsagePage_default.sessionIndex, children: index + 1 }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: UsagePage_default.sessionText, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.title }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
		              view.projectById.get(session.projectId ?? "") ?? unknown2,
		              " \xB7 ",
		              sessionMode === "recent" ? `${t("lastChat")} ${DAY_SHORT.format(session.lastAt)}` : route
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: UsagePage_default.sessionTotal, children: [
		            amount(total),
		            " ",
		            t("tokenUnit")
		          ] })
		        ] }, session.id)) })
		      ] })
		    ] })
		  ] }) });
		}

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/UsageIcon.tsx
		var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");
		var import_jsx_runtime2 = require("react/jsx-runtime");
		function UsageIcon({ size }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconDataOutlineRegular, { size });
		}

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/locales.ts
		var zh = {
		  panel: "\u7528\u91CF\u7EDF\u8BA1",
		  title: "\u7528\u91CF\u7EDF\u8BA1",
		  subtitle: "\u67E5\u770B Token \u4F7F\u7528\u8D8B\u52BF\u4E0E\u6784\u6210",
		  period: "\u65F6\u95F4\u8303\u56F4",
		  project: "\u9879\u76EE",
		  model: "\u6A21\u578B",
		  allProjects: "\u5168\u90E8\u9879\u76EE",
		  allModels: "\u5168\u90E8\u6A21\u578B",
		  days7: "\u6700\u8FD1 7 \u5929",
		  days30: "\u6700\u8FD1 30 \u5929",
		  days90: "\u6700\u8FD1 90 \u5929",
		  days365: "\u6700\u8FD1 365 \u5929",
		  total: "\u7D2F\u8BA1 Token",
		  average: "\u65E5\u5747 Token",
		  peak: "\u5355\u65E5\u5CF0\u503C",
		  active: "\u6D3B\u8DC3\u5929\u6570",
		  cacheRate: "\u7F13\u5B58\u547D\u4E2D\u7387",
		  compared: "\u8F83\u4E0A\u4E00\u5468\u671F",
		  unavailable: "\u6682\u65E0\u53EF\u6838\u5B9E\u7684\u6570\u636E",
		  retry: "\u91CD\u8BD5",
		  loading: "\u6B63\u5728\u8BFB\u53D6\u4F1A\u8BDD\u7528\u91CF\u2026",
		  refreshing: "\u6B63\u5728\u66F4\u65B0\u7528\u91CF\u2026",
		  error: "\u8BFB\u53D6\u7528\u91CF\u5931\u8D25",
		  staleError: "\u66F4\u65B0\u5931\u8D25\uFF0C\u5F53\u524D\u663E\u793A\u4E0A\u6B21\u4FDD\u5B58\u7684\u6570\u636E",
		  staleAsOf: "\u6570\u636E\u622A\u81F3",
		  updatedAt: "\u66F4\u65B0\u4E8E",
		  refresh: "\u5237\u65B0",
		  heatmap: "Token \u6D3B\u52A8",
		  heatmapNote: "\u8FC7\u53BB 365 \u5929 \xB7 \u6BCF\u683C\u4E00\u5929",
		  heatmapRange: "\u67E5\u770B\u8303\u56F4",
		  rollingYear: "\u6700\u8FD1\u4E00\u5E74",
		  oneCellDay: "\u6BCF\u683C\u4E00\u5929",
		  clearDay: "\u6E05\u9664\u65E5\u671F\u7B5B\u9009",
		  dataQuality: "\u6570\u636E\u5B8C\u6574\u6027",
		  qualityIntro: "\u7EDF\u8BA1\u603B\u91CF\u4EC5\u5305\u542B\u4F9B\u5E94\u5546\u62A5\u544A\u7684\u5B8C\u6574\u7528\u91CF\u3002",
		  rebuild: "\u91CD\u65B0\u7EDF\u8BA1\u5168\u90E8\u6570\u636E",
		  unreadableSessions: "\u65E0\u6CD5\u8BFB\u53D6\u7684\u4F1A\u8BDD",
		  unreadableExplanation: "\u8FD9\u4E9B\u4F1A\u8BDD\u7684\u7528\u91CF\u672A\u8BA1\u5165\u603B\u91CF",
		  missingTurns: "\u7F3A\u5C11\u5B8C\u6574\u7528\u91CF\u7684\u8F6E\u6B21",
		  missingExplanation: "\u8FD9\u4E9B\u8F6E\u6B21\u7684\u7528\u91CF\u672A\u8BA1\u5165\u603B\u91CF",
		  unattributedTurns: "\u65E0\u6CD5\u5F52\u5C5E\u6A21\u578B\u6216\u4F9B\u5E94\u5546\u7684\u8F6E\u6B21",
		  unattributedExplanation: "\u7528\u91CF\u5DF2\u8BA1\u5165\u603B\u91CF\uFF0C\u5F52\u4E3A\u672A\u5F52\u5C5E",
		  turns: "\u8F6E\u6B21",
		  sessionsUnit: "\u4F1A\u8BDD",
		  unattributedShort: "\u672A\u5F52\u5C5E\u8F6E\u6B21",
		  currentStreak: "\u5F53\u524D\u8FDE\u7EED",
		  longestStreak: "\u6700\u957F\u8FDE\u7EED",
		  days: "\u5929",
		  less: "\u5C11",
		  more: "\u591A",
		  trend: "\u7528\u91CF\u8D8B\u52BF",
		  trendNote: "\u8F93\u5165 Token",
		  trendScope: "\u6A21\u578B\u8D8B\u52BF",
		  trendTotal: "\u603B\u91CF",
		  daily: "\u6BCF\u65E5",
		  weekly: "\u6BCF\u5468",
		  cumulative: "\u7D2F\u8BA1",
		  percentagePoints: "\u4E2A\u767E\u5206\u70B9",
		  efficiency: "\u4F7F\u7528\u6548\u7387",
		  efficiencyNote: "\u6309\u5DF2\u5B8C\u6210\u8F6E\u6B21\u7EDF\u8BA1",
		  efficiencyMetric: "\u89C2\u6D4B\u9879",
		  completedTurns: "\u5DF2\u8BA1\u91CF\u8F6E\u6B21",
		  averageInputPerTurn: "\u6BCF\u8F6E\u5E73\u5747\u8F93\u5165",
		  cacheReadShare: "\u7F13\u5B58\u8BFB\u53D6\u5360\u8F93\u5165",
		  measuredCoverage: "\u53EF\u6838\u5B9E\u8F6E\u6B21\u5360\u6BD4",
		  coverageExplanation: "\u5DF2\u8BA1\u91CF\u8F6E\u6B21 \xF7 \u5DF2\u8BA1\u91CF\u53CA\u7F3A\u5C11\u7528\u91CF\u7684\u8F6E\u6B21\uFF1B\u65E0\u6CD5\u8BFB\u53D6\u4F1A\u8BDD\u6216\u6309\u6A21\u578B\u7B5B\u9009\u65F6\u4E0D\u53EF\u8BA1\u7B97\u3002",
		  input: "\u8F93\u5165",
		  output: "\u8F93\u51FA",
		  composition: "\u8F93\u5165\u8F93\u51FA\u6784\u6210",
		  uncached: "\u666E\u901A\u8F93\u5165",
		  cacheRead: "\u7F13\u5B58\u8BFB\u53D6",
		  cacheWrite: "\u7F13\u5B58\u5199\u5165",
		  unknownInput: "\u5176\u4ED6\u8F93\u5165",
		  models: "\u6A21\u578B\u7528\u91CF\u5360\u6BD4",
		  projects: "\u9879\u76EE\u7528\u91CF",
		  providers: "\u4F9B\u5E94\u5546\u7528\u91CF\u5360\u6BD4",
		  sessions: "\u4F1A\u8BDD Top 10",
		  highUsage: "\u9AD8\u7528\u91CF",
		  recent: "\u6700\u8FD1\u804A\u5929",
		  lastChat: "\u6700\u8FD1\u804A\u5929",
		  unknown: "\u672A\u5F52\u5C5E",
		  other: "\u5176\u4ED6",
		  noData: "\u6240\u9009\u8303\u56F4\u6682\u65E0 Token \u7528\u91CF",
		  missing: "\u90E8\u5206\u4F1A\u8BDD\u7684\u7528\u91CF\u672A\u77E5",
		  tokenUnit: "Token",
		  openSession: "\u6253\u5F00\u4F1A\u8BDD"
		};
		var en = {
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
		  loading: "Reading session usage\u2026",
		  refreshing: "Updating usage\u2026",
		  error: "Could not load usage",
		  staleError: "Update failed; showing the last saved data",
		  staleAsOf: "Data as of",
		  updatedAt: "Updated",
		  refresh: "Refresh",
		  heatmap: "Token activity",
		  heatmapNote: "Past 365 days \xB7 one cell per day",
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

		// ../../../../../../../private/tmp/dsh-usage-build/work/lib-1790757428363/src/client/index.ts
		var PANEL_ID = "usage-statistics";
		var inject = ["remote"];
		function registerUi(ctx) {
		  ctx.effect(() => ctx.locale.register("usageStatistics", { zh, en }), "ui-usage: dictionaries");
		  const t = ctx.locale.bind("usageStatistics");
		  const usage = (0, import_dsh_client_store.createSnapshotStore)({ error: false, refreshing: false }, { persist: { name: "dsh.usage-statistics.snapshot.v2" } });
		  const progress = (0, import_dsh_client_store.createSnapshotStore)({});
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
		      usage.set({ ...usage.getSnapshot(), refreshing: true, error: false });
		      progress.set({ progress: { completed: 0, total: 0, running: true } });
		      do {
		        rerun = false;
		        const runForce = force || nextForce;
		        force = false;
		        nextForce = false;
		        const timer = setInterval(() => {
		          void ctx.remote.usageStatistics.progress().then((result) => {
		            if (result.ok && !disposed) progress.set({ progress: result.value });
		          }).catch((_progressFailure) => {
		          });
		        }, 500);
		        try {
		          const result = await ctx.remote.usageStatistics.snapshot(runForce);
		          if (!result.ok) throw new Error(result.error.message);
		          if (!disposed) {
		            const count = result.value.sessions.length + result.value.unreadableSessions;
		            usage.set({ snapshot: result.value, error: false, refreshing: rerun });
		            progress.set({ progress: { completed: count, total: count, running: rerun } });
		          }
		        } catch (_loadFailure) {
		          if (!disposed) {
		            usage.set({ ...usage.getSnapshot(), error: true, refreshing: rerun });
		            progress.set({});
		          }
		        } finally {
		          clearInterval(timer);
		        }
		      } while (rerun && !disposed);
		      busy = false;
		    };
		    refreshActive = (force) => {
		      void refresh(force);
		    };
		    const disposeStatus = ctx.remote.$on("api-session/status", (_id, running) => {
		      if (!running) void refresh();
		    });
		    const disposeAdded = ctx.remote.$on("api-session/added", () => {
		      void refresh();
		    });
		    const disposeRemoved = ctx.remote.$on("api-session/removed", () => {
		      void refresh();
		    });
		    const disposeReset = ctx.on("connection/reset", () => {
		      void refresh();
		    });
		    void refresh();
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
		    hooks: { usage, progress },
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
		async function apply(ctx) {
		  const disposeRemote = await ctx.remote.$mount(typert_remote_client_default);
		  const ui = ctx.inject(["remote.usageStatistics", "slots", "locale", "uiWorkspace"], registerUi);
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
		return module.exports;
	}
});
