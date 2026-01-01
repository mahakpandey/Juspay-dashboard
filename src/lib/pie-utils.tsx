/* eslint-disable */
import * as React from "react";
import { SVGProps } from "react";
import { clsx } from "clsx";
import { Coordinate } from "recharts/types/util/types";

const getDeltaAngle = (startAngle: number, endAngle: number) => {
  const sign = mathSign(endAngle - startAngle);
  const deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);

  return sign * deltaAngle;
};

export const RADIAN = Math.PI / 180;
export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): Coordinate => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius,
});

interface TangentCircleDef {
  cx: number;
  cy: number;
  radius: number;
  angle: number;
  sign: number;
  isExternal?: boolean;
  cornerRadius: number;
  cornerIsExternal?: boolean;
}

const getTangentCircle = ({
  cx,
  cy,
  radius,
  angle,
  sign,
  isExternal,
  cornerRadius,
  cornerIsExternal,
}: TangentCircleDef) => {
  const centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  const theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
  const centerAngle = cornerIsExternal ? angle : angle + sign * theta;
  const center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  // The coordinate of point which is tangent to the circle
  const circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  // The coordinate of point which is tangent to the radius line
  const lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
  const lineTangency = polarToCartesian(
    cx,
    cy,
    centerRadius * Math.cos(theta * RADIAN),
    lineTangencyAngle,
  );
  return { center, circleTangency, lineTangency, theta };
};

const getSectorPath = ({
  cx = 0,
  cy = 0,
  innerRadius = 0,
  outerRadius = 1,
  startAngle = 0,
  endAngle = 360,
}: GeometrySector) => {
  const angle = getDeltaAngle(startAngle, endAngle);

  // When the angle of sector equals to 360, star point and end point coincide
  const tempEndAngle = startAngle + angle;
  const outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);

  let path = `M ${outerStartPoint.x},${outerStartPoint.y}
    A ${outerRadius},${outerRadius},0,
    ${+(Math.abs(angle) > 180)},${+(startAngle > tempEndAngle)},
    ${outerEndPoint.x},${outerEndPoint.y}
  `;

  if (innerRadius > 0) {
    const innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    const innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += `L ${innerEndPoint.x},${innerEndPoint.y}
            A ${innerRadius},${innerRadius},0,
            ${+(Math.abs(angle) > 180)},${+(startAngle <= tempEndAngle)},
            ${innerStartPoint.x},${innerStartPoint.y} Z`;
  } else {
    path += `L ${cx},${cy} Z`;
  }

  return path;
};

export const mathSign = (value: number) => {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }

  return -1;
};

const getSectorWithCorner = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  cornerRadius,
  forceCornerRadius,
  cornerIsExternal,
  startAngle,
  endAngle,
}: GeometrySectorWithCornerRadius) => {
  const sign = mathSign(endAngle - startAngle);
  const {
    circleTangency: soct,
    lineTangency: solt,
    theta: sot,
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: startAngle,
    sign,
    cornerRadius,
    cornerIsExternal,
  });
  const {
    circleTangency: eoct,
    lineTangency: eolt,
    theta: eot,
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: endAngle,
    sign: -sign,
    cornerRadius,
    cornerIsExternal,
  });

  const outerArcAngle = cornerIsExternal
    ? Math.abs(startAngle - endAngle)
    : Math.abs(startAngle - endAngle) - sot - eot;

  console.log({ cornerRadius, outerArcAngle, innerRadius });

  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return `M ${solt.x},${solt.y}
        a${cornerRadius},${cornerRadius},0,0,1,${cornerRadius * 2},0
        a${cornerRadius},${cornerRadius},0,0,1,${-cornerRadius * 2},0
      `;
    }
    return getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
    });
  }

  // A${cornerRadius},${cornerRadius},0,0,${+(sign > 0)},${soct.x},${soct.y}
  let path = `M ${soct.x},${soct.y}
    A${outerRadius},${outerRadius},0,${+(outerArcAngle > 180)},${+(sign < 0)},${eoct.x},${eoct.y}
    A${cornerRadius},${cornerRadius},0,0,${+(sign < 0)},${eolt.x},${eolt.y}
  `;

  if (innerRadius > 0) {
    const {
      circleTangency: sict,
      lineTangency: silt,
      theta: sit,
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: startAngle,
      sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal,
    });
    const {
      circleTangency: eict,
      lineTangency: eilt,
      theta: eit,
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: endAngle,
      sign: -sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal,
    });
    const innerArcAngle = cornerIsExternal
      ? Math.abs(startAngle - endAngle)
      : Math.abs(startAngle - endAngle) - sit - eit;

    if (innerArcAngle < 0 && cornerRadius === 0) {
      return `${path}L${cx},${cy}Z`;
    }

    path += `L${eilt.x},${eilt.y}
      A${cornerRadius},${cornerRadius},0,0,${+(sign < 0)},${eict.x},${eict.y}
      A${innerRadius},${innerRadius},0,${+(innerArcAngle > 180)},${+(sign > 0)},${sict.x},${sict.y}
      A${cornerRadius},${cornerRadius},0,0,${+(sign > 0)},${soct.x},${soct.y}Z`;
  } else {
    path += `L${cx},${cy}Z`;
  }

  console.log({ path });
  return path;
};

export interface GeometrySector {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
}

export type GeometrySectorWithCornerRadius = GeometrySector & {
  cornerRadius: number;
  forceCornerRadius: boolean;
  cornerIsExternal: boolean;
};

interface SectorProps extends GeometrySectorWithCornerRadius {
  className?: string;
}

/**
 * SVG cx, cy are `string | number | undefined`, but internally we use `number` so let's
 * override the types here.
 */
export type Props = Omit<
  SVGProps<SVGPathElement>,
  "cx" | "cy" | "dangerouslySetInnerHTML"
> &
  Partial<SectorProps>;

const defaultProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
} as const satisfies Partial<Props>;

export const Sector: React.FC<Props> = (sectorProps) => {
  console.log("Sector");

  const props = resolveDefaultProps(sectorProps, defaultProps);
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    cornerRadius,
    forceCornerRadius = false,
    cornerIsExternal = false,
    startAngle,
    endAngle,
    className,
  } = props;

  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }

  const layerClass = clsx("recharts-sector", className);
  const deltaRadius = outerRadius - innerRadius;
  const cr = getPercentValue(cornerRadius || 0, deltaRadius, 0, true);
  let path;

  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx,
      cy,
      innerRadius,
      outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius,
      cornerIsExternal,
      startAngle,
      endAngle,
    });
  } else {
    path = getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
    });
  }

  return (
    <path {...svgPropertiesAndEvents(props)} className={layerClass} d={path} />
  );
};

type SVGElementPropsAndEventsType =
  | SVGElementPropKeysType
  | EventKeysType
  | DataAttributeKeyType;

type SVGPropsAndEvents<T> = Pick<
  T,
  Extract<keyof T, SVGElementPropsAndEventsType>
>;

const EventKeys = [
  "dangerouslySetInnerHTML",
  "onCopy",
  "onCopyCapture",
  "onCut",
  "onCutCapture",
  "onPaste",
  "onPasteCapture",
  "onCompositionEnd",
  "onCompositionEndCapture",
  "onCompositionStart",
  "onCompositionStartCapture",
  "onCompositionUpdate",
  "onCompositionUpdateCapture",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onChangeCapture",
  "onBeforeInput",
  "onBeforeInputCapture",
  "onInput",
  "onInputCapture",
  "onReset",
  "onResetCapture",
  "onSubmit",
  "onSubmitCapture",
  "onInvalid",
  "onInvalidCapture",
  "onLoad",
  "onLoadCapture",
  "onError",
  "onErrorCapture",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyPressCapture",
  "onKeyUp",
  "onKeyUpCapture",
  "onAbort",
  "onAbortCapture",
  "onCanPlay",
  "onCanPlayCapture",
  "onCanPlayThrough",
  "onCanPlayThroughCapture",
  "onDurationChange",
  "onDurationChangeCapture",
  "onEmptied",
  "onEmptiedCapture",
  "onEncrypted",
  "onEncryptedCapture",
  "onEnded",
  "onEndedCapture",
  "onLoadedData",
  "onLoadedDataCapture",
  "onLoadedMetadata",
  "onLoadedMetadataCapture",
  "onLoadStart",
  "onLoadStartCapture",
  "onPause",
  "onPauseCapture",
  "onPlay",
  "onPlayCapture",
  "onPlaying",
  "onPlayingCapture",
  "onProgress",
  "onProgressCapture",
  "onRateChange",
  "onRateChangeCapture",
  "onSeeked",
  "onSeekedCapture",
  "onSeeking",
  "onSeekingCapture",
  "onStalled",
  "onStalledCapture",
  "onSuspend",
  "onSuspendCapture",
  "onTimeUpdate",
  "onTimeUpdateCapture",
  "onVolumeChange",
  "onVolumeChangeCapture",
  "onWaiting",
  "onWaitingCapture",
  "onAuxClick",
  "onAuxClickCapture",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onContextMenuCapture",
  "onDoubleClick",
  "onDoubleClickCapture",
  "onDrag",
  "onDragCapture",
  "onDragEnd",
  "onDragEndCapture",
  "onDragEnter",
  "onDragEnterCapture",
  "onDragExit",
  "onDragExitCapture",
  "onDragLeave",
  "onDragLeaveCapture",
  "onDragOver",
  "onDragOverCapture",
  "onDragStart",
  "onDragStartCapture",
  "onDrop",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseMoveCapture",
  "onMouseOut",
  "onMouseOutCapture",
  "onMouseOver",
  "onMouseOverCapture",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onSelectCapture",
  "onTouchCancel",
  "onTouchCancelCapture",
  "onTouchEnd",
  "onTouchEndCapture",
  "onTouchMove",
  "onTouchMoveCapture",
  "onTouchStart",
  "onTouchStartCapture",
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerMove",
  "onPointerMoveCapture",
  "onPointerUp",
  "onPointerUpCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerEnter",
  "onPointerEnterCapture",
  "onPointerLeave",
  "onPointerLeaveCapture",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  "onScroll",
  "onScrollCapture",
  "onWheel",
  "onWheelCapture",
  "onAnimationStart",
  "onAnimationStartCapture",
  "onAnimationEnd",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationIterationCapture",
  "onTransitionEnd",
  "onTransitionEndCapture",
] as const;

export type EventKeysType = (typeof EventKeys)[number];

export function isEventKey(key: PropertyKey): key is EventKeysType {
  if (typeof key !== "string") {
    return false;
  }
  const allowedEventKeys: ReadonlyArray<string> = EventKeys;
  return allowedEventKeys.includes(key);
}
export function svgPropertiesAndEvents<T extends Record<PropertyKey, any>>(
  obj: T,
): SVGPropsAndEvents<T> {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) =>
      isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key),
  );
  return Object.fromEntries(filteredEntries) as SVGPropsAndEvents<T>;
}

export const getPercentValue = (
  percent: number | string,
  totalValue: number | undefined,
  defaultValue = 0,
  validate = false,
) => {
  if (!isNumber(percent) && typeof percent !== "string") {
    return defaultValue;
  }

  let value: number;

  if (isPercent(percent)) {
    if (totalValue == null) {
      return defaultValue;
    }
    const index = percent.indexOf("%");
    value =
      (totalValue * parseFloat((percent as string).slice(0, index))) / 100;
  } else {
    value = +percent;
  }

  if (isNan(value)) {
    value = defaultValue;
  }

  if (validate && totalValue != null && value > totalValue) {
    value = totalValue;
  }

  return value;
};

export const isNan = (value: unknown): boolean => {
  // eslint-disable-next-line eqeqeq
  return typeof value == "number" && value != +value;
};

export type Percent = `${number}%`;

export const isPercent = (
  value: string | number | undefined,
): value is Percent =>
  typeof value === "string" && value.indexOf("%") === value.length - 1;

export const isNumber = (value: unknown): value is number =>
  (typeof value === "number" || value instanceof Number) && !isNan(value);

import { isValidElement } from "react";

const SVGElementPropKeys = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle",
] as const;

export type SVGElementPropKeysType = (typeof SVGElementPropKeys)[number];

export function isSvgElementPropKey(key: PropertyKey): boolean {
  if (typeof key !== "string") {
    return false;
  }
  const allowedSvgKeys: ReadonlyArray<string> = SVGElementPropKeys;
  return allowedSvgKeys.includes(key);
}

export type DataAttributeKeyType = `data-${string}`;

export type SVGPropsNoEvents<T> = Pick<
  T,
  Extract<keyof T, SVGElementPropKeysType | DataAttributeKeyType>
>;

/**
 * Checks if the property is a data attribute.
 * @param key The property key.
 * @returns True if the key starts with 'data-', false otherwise.
 */
export function isDataAttribute(key: PropertyKey): key is DataAttributeKeyType {
  return typeof key === "string" && key.startsWith("data-");
}

/**
 * Filters an object to only include SVG properties. Removes all event handlers too.
 * @param obj - The object to filter
 * @returns A new object containing only valid SVG properties, excluding event handlers.
 */
export function svgPropertiesNoEvents<T extends Record<PropertyKey, any>>(
  obj: T | boolean,
): SVGPropsNoEvents<T> | null {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => isSvgElementPropKey(key) || isDataAttribute(key),
  );
  return Object.fromEntries(filteredEntries) as SVGPropsNoEvents<T>;
}

/**
 * Function to filter SVG properties from various input types.
 * The input types can be:
 * - A record of string keys to any values, in which case it returns a record of only SVG properties
 * - A React element, in which case it returns the props of the element filtered to only SVG properties
 * - Anything else, in which case it returns null
 *
 * This function has a wide-open return type, because it will read and filter the props of an arbitrary React element.
 * This can be SVG, HTML, whatnot, with arbitrary values, so we can't type it more specifically.
 *
 * If you wish to have a type-safe version, use svgPropertiesNoEvents directly with a typed object.
 *
 * @param input - The input to filter, which can be a record, a React element, or other types.
 * @returns A record of SVG properties if the input is a record or React element, otherwise null.
 */
export function svgPropertiesNoEventsFromUnknown(
  input: unknown,
): Partial<Record<SVGElementPropKeysType, unknown>> | null {
  if (input == null) {
    return null;
  }

  if (
    isValidElement(input) &&
    typeof input.props === "object" &&
    input.props !== null
  ) {
    const p: Partial<Record<PropertyKey, unknown>> = input.props;
    return svgPropertiesNoEvents(p);
  }

  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesNoEvents(input);
  }

  return null;
}
/**
 * This function mimics the behavior of the `defaultProps` static property in React.
 * Functional components do not have a defaultProps property, so this function is useful to resolve default props.
 *
 * The common recommendation is to use ES6 destructuring with default values in the function signature,
 * but you need to be careful there and make sure you destructure all the individual properties
 * and not the whole object. See the test file for example.
 *
 * And because destructuring all properties one by one is a faff, and it's easy to miss one property,
 * this function exists.
 *
 * @param realProps - the props object passed to the component by the user
 * @param defaultProps - the default props object defined in the component by Recharts
 * @returns - the props object with all the default props resolved. All `undefined` values are replaced with the default value.
 */
export function resolveDefaultProps<T, D extends Partial<T>>(
  realProps: T,
  defaultProps: D & DisallowExtraKeys<T, D>,
): RequiresDefaultProps<T, D> {
  /*
   * To avoid mutating the original `realProps` object passed to the function, create a shallow copy of it.
   * `resolvedProps` will be modified directly with the defaults.
   */
  const resolvedProps: T = { ...realProps };
  /*
   * Since the function guarantees `D extends Partial<T>`, this assignment is safe.
   * It allows TypeScript to work with the well-defined `Partial<T>` type inside the loop,
   * making subsequent type inference (especially for `dp[key]`) much more straightforward for the compiler.
   * This is a key step to improve type safety *without* value assertions later.
   */
  const dp: Partial<T> = defaultProps;
  /*
   * `Object.keys` doesn't preserve strong key types - it always returns Array<string>.
   * However, due to the `D extends Partial<T>` constraint,
   * we know these keys *must* also be valid keys of `T`.
   * This assertion informs TypeScript of this relationship, avoiding type errors when using `key` to index `acc` (type T).
   *
   * Type assertions are not sound but in this case it's necessary
   * as `Object.keys` does not do what we want it to do.
   */
  const keys = Object.keys(defaultProps) as Array<keyof T>;
  const withDefaults: T = keys.reduce((acc: T, key: keyof T): T => {
    if (acc[key] === undefined && dp[key] !== undefined) {
      acc[key] = dp[key];
    }
    return acc;
  }, resolvedProps);
  /*
   * And again type assertions are not safe but here we have done the runtime work
   * so let's bypass the lack of static type safety and tell the compiler what happened.
   */
  return withDefaults as RequiresDefaultProps<T, D>;
}

/**
 * Helper type to extract the keys of T that are required.
 * It iterates through each key K in T. If Pick<T, K> cannot be assigned an empty object {},
 * it means K is required, so we keep K; otherwise, we discard it (never).
 * [keyof T] at the end creates a union of the kept keys.
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Helper type to extract the keys of T that are optional.
 * It iterates through each key K in T. If Pick<T, K> can be assigned an empty object {},
 * it means K is optional (or potentially missing), so we keep K; otherwise, we discard it (never).
 * [keyof T] at the end creates a union of the kept keys.
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Helper type to ensure keys of D exist in T.
 * For each key K in D, if K is also a key of T, keep the type D[K].
 * If K is NOT a key of T, map it to type `never`.
 * An object cannot have a property of type `never`, effectively disallowing extra keys.
 */
export type DisallowExtraKeys<T, D> = {
  [K in keyof D]: K extends keyof T ? D[K] : never;
};

/**
 * This type will take a source type `Props` and a default type `Defaults` and will return a new type
 * where all properties that are optional in `Props` but required in `Defaults` are made required in the result.
 * Properties that are required in `Props` and optional in `Defaults` will remain required.
 * Properties that are optional in both `Props` and `Defaults` will remain optional.
 *
 * This is useful for creating a type that represents the resolved props of a component with default props.
 */
export type RequiresDefaultProps<Props, Defaults extends Partial<Props>> =
  // Section 1: Properties that were already required in T.
  // We use Pick<T, RequiredKeys<T>> to select only the keys that were originally
  // required in T. Pick preserves their required status and original types.
  Pick<Props, RequiredKeys<Props>> &
    // Section 2: Properties that were optional in T BUT have a default specified in D.
    // These properties should become required in the resulting type.
    // - OptionalKeys<T>: Gets the union of keys that are optional in T.
    // - RequiredKeys<D>: Gets the keys that are required in the default props D.
    // - Extract<..., ...>: Finds the intersection of these two sets – the keys that are optional in T AND required in D.
    // - Pick<T, Extract<...>>: Selects these specific properties from T. At this stage, they still retain their original optional ('?') status from T.
    // - Required<...>: Wraps the picked properties, removing the '?' modifier and making them required. Their underlying type (e.g., `string | undefined`) remains unchanged.
    Required<
      Pick<Props, Extract<OptionalKeys<Props>, RequiredKeys<Defaults>>>
    > &
    // Section 3: Properties that were optional in T AND do NOT have a default in D.
    // These properties should remain optional.
    // - Exclude<OptionalKeys<T>, keyof D>: Finds the keys that are optional in T but are NOT present in D.
    // - Pick<T, Exclude<...>>: Selects these properties from T. Pick preserves their original optional status and types.
    Pick<Props, Exclude<OptionalKeys<Props>, keyof Defaults>>;
