import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { provinces, type ProvinceData } from "../../../data/provincesDensity";
// @ts-ignore
import spainMapSvg from "../../../assets/data/spain-map.svg?raw";

// Constants outside component to avoid recreation on each render
const TOOLTIP_WIDTH = 270;
const TOOLTIP_HEIGHT = 130;
const OFFSET = 14;
const MARGIN = 8;

// Province IDs for islands — need special tooltip positioning
const BALEARES_ID = "path236";
const CANARIAS_IDS = ["path374", "path390"];

type TooltipPlacement = "above" | "below";

interface TooltipState {
  show: boolean;
  data: ProvinceData | null;
  x: number;
  y: number;
  placement: TooltipPlacement;
  lockedId: string | null;
}

const initialTooltipState: TooltipState = {
  show: false,
  data: null,
  x: 0,
  y: 0,
  placement: "below",
  lockedId: null,
};

export const SpainMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [tooltipState, setTooltipState] =
    useState<TooltipState>(initialTooltipState);

  const getProvinceColor = useCallback(
    (density: number, isHovered: boolean, isLocked: boolean): string => {
      if (isHovered || isLocked) return "#004b79";
      if (density < 12) return "#cc0000";
      if (density <= 30) return "#d97878";
      return "#b3c5d6";
    },
    [],
  );

  const SvgMemoized = useMemo(() => {
    let svg = spainMapSvg as string;
    if (typeof svg !== "string") return svg;

    svg = svg
      .replace(
        /<svg[^>]*>/,
        '<svg viewBox="0 0 569 392" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">',
      )
      .replace(/<path[^>]*id="path3682"[^>]*\/>/g, "")
      .replace(/<path[^>]*id="path3682"[^>]*>.*?<\/path>/g, "")
      .replace(/clip-path="[^"]*"/g, "")
      .replace(/stroke="#ffffff"/g, 'stroke="#e2e8f0"')
      .replace(/stroke-width="[^"]*"/g, 'stroke-width="1"');

    provinces.forEach((prov) => {
      const baseColor = getProvinceColor(prov.density, false, false);
      const idPattern = `id="${prov.id}"`;
      if (!svg.includes(idPattern)) return;

      // Try: style attribute comes AFTER id
      const afterIdStyleRegex = new RegExp(
        `(id="${prov.id}"[^>]*?)style="([^"]*)"`,
        "g",
      );
      // Try: style attribute comes BEFORE id
      const beforeIdStyleRegex = new RegExp(
        `style="([^"]*)"([^>]*?id="${prov.id}"[^>]*?)`,
        "g",
      );

      if (afterIdStyleRegex.test(svg)) {
        svg = svg.replace(
          new RegExp(`(id="${prov.id}"[^>]*?)style="([^"]*)"`, "g"),
          `$1style="$2; fill: ${baseColor}; transition: fill 0.2s ease; cursor: pointer;"`,
        );
      } else if (beforeIdStyleRegex.test(svg)) {
        svg = svg.replace(
          new RegExp(`style="([^"]*)"([^>]*?id="${prov.id}"[^>]*?)`, "g"),
          `style="$1; fill: ${baseColor}; transition: fill 0.2s ease; cursor: pointer;"$2`,
        );
      } else {
        svg = svg.replace(
          new RegExp(`id="${prov.id}"`, "g"),
          `id="${prov.id}" style="fill: ${baseColor}; transition: fill 0.2s ease; cursor: pointer;"`,
        );
      }
    });

    return svg;
  }, [getProvinceColor]);

  /**
   * Smart tooltip positioning:
   * - Default: centered horizontally on cursor, below it
   * - Flips above if there is not enough room below
   * - Baleares (path236): tooltip appears to the LEFT of the cursor
   * - Canarias (path374, path390): tooltip appears ABOVE and to the RIGHT
   * - All coords are clamped to the container as a final safety net
   */
  const getSmartPosition = useCallback(
    (
      rawX: number,
      rawY: number,
      provinceId?: string,
    ): { x: number; y: number; placement: TooltipPlacement } => {
      if (!containerRef.current) {
        return { x: rawX, y: rawY, placement: "below" };
      }

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Clamp raw coords — islands render outside via overflow:visible
      // so their mouse events can report coords beyond the container size
      const cx = Math.max(0, Math.min(rawX, containerWidth));
      const cy = Math.max(0, Math.min(rawY, containerHeight));

      let x: number;
      let y: number;
      let placement: TooltipPlacement;

      if (provinceId === BALEARES_ID) {
        // Baleares: tooltip to the LEFT of the cursor, vertically centered
        x = cx - TOOLTIP_WIDTH - OFFSET;
        x = Math.max(MARGIN, x);
        y = cy - TOOLTIP_HEIGHT / 2;
        y = Math.max(
          MARGIN,
          Math.min(y, containerHeight - TOOLTIP_HEIGHT - MARGIN),
        );
        placement = "above";
      } else if (CANARIAS_IDS.includes(provinceId ?? "")) {
        // Canarias: tooltip ABOVE and to the RIGHT of the cursor
        x = cx + OFFSET;
        x = Math.max(
          MARGIN,
          Math.min(x, containerWidth - TOOLTIP_WIDTH - MARGIN),
        );
        y = cy - TOOLTIP_HEIGHT - OFFSET;
        y = Math.max(MARGIN, y);
        placement = "above";
      } else {
        // Default: centered below cursor, flip above if no room
        x = cx - TOOLTIP_WIDTH / 2;
        x = Math.max(
          MARGIN,
          Math.min(x, containerWidth - TOOLTIP_WIDTH - MARGIN),
        );

        const spaceBelow = containerHeight - cy - OFFSET;
        const spaceAbove = cy - OFFSET;

        if (spaceBelow >= TOOLTIP_HEIGHT + MARGIN) {
          y = cy + OFFSET;
          placement = "below";
        } else if (spaceAbove >= TOOLTIP_HEIGHT + MARGIN) {
          y = cy - OFFSET - TOOLTIP_HEIGHT;
          placement = "above";
        } else {
          if (spaceBelow >= spaceAbove) {
            y = Math.min(
              cy + OFFSET,
              containerHeight - TOOLTIP_HEIGHT - MARGIN,
            );
            placement = "below";
          } else {
            y = Math.max(MARGIN, cy - OFFSET - TOOLTIP_HEIGHT);
            placement = "above";
          }
        }
      }

      return { x, y, placement };
    },
    [],
  );

  const resetAllColors = useCallback(() => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector("svg");
    if (!svgEl) return;
    provinces.forEach((prov) => {
      const path = svgEl.querySelector(
        `[id="${prov.id}"]`,
      ) as SVGPathElement | null;
      if (path) {
        path.style.fill = getProvinceColor(prov.density, false, false);
      }
    });
  }, [getProvinceColor]);

  const handleMapInteraction = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!containerRef.current) return;

      const target = e.target as SVGElement;

      if (target.tagName !== "path") {
        if (e.type === "click") {
          setTooltipState((prev) => ({
            ...prev,
            show: false,
            data: null,
            lockedId: null,
          }));
          resetAllColors();
        }
        return;
      }

      const pathId = target.getAttribute("id") ?? "";
      const provinceData = provinces.find(
        (p) => p.id.toLowerCase() === pathId.toLowerCase(),
      );
      if (!provinceData) return;

      const rect = containerRef.current.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      const rawX = clientX - rect.left;
      const rawY = clientY - rect.top;
      // Pass the province ID so islands get special positioning
      const { x, y, placement } = getSmartPosition(rawX, rawY, pathId);

      if (e.type === "click") {
        e.stopPropagation();
        setTooltipState((prev) => {
          if (prev.lockedId === pathId) {
            // Unlock: revert to hover mode
            return { ...prev, lockedId: null };
          }
          // Lock new province
          resetAllColors();
          target.style.fill = getProvinceColor(
            provinceData.density,
            false,
            true,
          );
          return {
            show: true,
            data: provinceData,
            x,
            y,
            placement,
            lockedId: pathId,
          };
        });
      } else if (e.type === "mousemove" || e.type === "mouseover") {
        setTooltipState((prev) => {
          if (prev.lockedId) {
            // Update position only if hovering the locked province
            if (prev.lockedId === pathId) {
              return { ...prev, x, y, placement };
            }
            return prev;
          }
          target.style.fill = getProvinceColor(
            provinceData.density,
            true,
            false,
          );
          return { ...prev, show: true, data: provinceData, x, y, placement };
        });
      } else if (e.type === "mouseout") {
        setTooltipState((prev) => {
          if (prev.lockedId) return prev;
          target.style.fill = getProvinceColor(
            provinceData.density,
            false,
            false,
          );
          return { ...prev, show: false };
        });
      }
    },
    [getProvinceColor, resetAllColors, getSmartPosition],
  );

  // Global click listener to unlock tooltip
  useEffect(() => {
    const handleGlobalClick = () => {
      setTooltipState((prev) => {
        if (!prev.lockedId) return prev;
        resetAllColors();
        return { ...prev, show: false, data: null, lockedId: null };
      });
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [resetAllColors]);

  // Pre-compute status label and class to keep JSX clean
  const statusLabel =
    tooltipState.data == null
      ? ""
      : tooltipState.data.density < 12
        ? "Extrema despoblación"
        : tooltipState.data.density <= 30
          ? "Riesgo de despoblación"
          : "Normal";

  const statusClass =
    tooltipState.data == null
      ? ""
      : tooltipState.data.density < 12
        ? "bg-red-100 text-red-700"
        : tooltipState.data.density <= 30
          ? "bg-orange-100 text-orange-700"
          : "bg-slate-100 text-slate-700";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white rounded-3xl border border-gray-100 p-4 lg:p-8 shadow-sm flex flex-col justify-center items-center overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* MAP AREA */}
      <div
        className="w-full flex-grow flex items-center justify-center relative cursor-default"
        onMouseMove={handleMapInteraction}
        onMouseOver={handleMapInteraction}
        onMouseOut={handleMapInteraction}
        onClick={handleMapInteraction}
      >
        <div
          className="w-full max-w-[700px] drop-shadow-md"
          dangerouslySetInnerHTML={{ __html: SvgMemoized }}
        />

        {/* TOOLTIP */}
        <div
          ref={tooltipRef}
          className={`absolute z-50 bg-white rounded-xl shadow-2xl border border-blue-100 pointer-events-none transition-opacity duration-150 ease-out ${
            tooltipState.show ? "opacity-100" : "opacity-0 invisible"
          }`}
          style={{
            left: `${tooltipState.x}px`,
            top: `${tooltipState.y}px`,
            width: `${TOOLTIP_WIDTH}px`,
            willChange: "left, top, opacity",
          }}
        >
          {tooltipState.data && (
            <>
              <div className="px-4 py-3 border-b border-gray-100 bg-white rounded-t-xl">
                <h4 className="font-bold text-base text-[#004b79] text-center">
                  {tooltipState.data.name}{" "}
                  <span className="text-slate-400 font-normal text-sm">
                    (provincia)
                  </span>
                </h4>
              </div>

              <div className="px-4 py-3 bg-[#f8fafc]">
                <div className="flex justify-between items-center gap-3">
                  <span className="text-xs text-[#004b79] font-medium leading-snug">
                    Densidad de población
                    <br />
                    (habitantes/km²):
                  </span>
                  <span className="text-2xl font-bold text-slate-800 shrink-0">
                    {tooltipState.data.density}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 flex justify-between items-center border-t border-gray-100 bg-white rounded-b-xl">
                <span className="text-xs text-[#004b79] font-medium">
                  Estado:
                </span>
                <span
                  className={`font-bold px-2 py-1 rounded-md text-xs ${statusClass}`}
                >
                  {statusLabel}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-4 flex flex-col items-center gap-1.5 text-xs font-medium text-slate-600 bg-white/90 backdrop-blur border border-gray-100 shadow-sm px-4 py-3 rounded-xl z-20 pointer-events-none w-full max-w-[260px]">
        <div className="w-full text-center mb-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
          Densidad (hab/km²)
        </div>
        <div className="flex gap-0.5 h-2.5 w-full">
          <span className="flex-1 bg-[#cc0000] rounded-l-sm" />
          <span className="flex-1 bg-[#d97878]" />
          <span className="flex-1 bg-[#b3c5d6] rounded-r-sm" />
        </div>
        <div className="flex justify-between w-full px-0.5 mt-0.5 text-[10px]">
          <span>&lt; 12</span>
          <span>12 – 30</span>
          <span>&gt; 30</span>
        </div>
      </div>
    </div>
  );
};
