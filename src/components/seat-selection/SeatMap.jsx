import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import SeatLegend from './SeatLegend.jsx';
import Icon from '../common/Icon.jsx';
import {
  seatLayouts,
  getLayoutType,
  getEllipsePoint,
  SEAT_PRICES,
  ZONE_NAMES,
} from '../../data/seatLayouts.js';

export default function SeatMap({ event, selectedSeats, onSeatToggle }) {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const viewportRef = useRef(null);
  const seatTexturesRef = useRef({});
  const spriteMapRef = useRef(new Map());
  const hoveredSectionIdRef = useRef(null);
  const selectedSeatsRef = useRef(selectedSeats);
  const isDraggingRef = useRef(false);

  // HTML tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: '',
    zoneName: '',
    price: 0,
  });

  // Zoom scale state for UI display
  const [zoomPercent, setZoomPercent] = useState(100);

  const layoutType = getLayoutType(event);
  const layout = seatLayouts[layoutType] || seatLayouts.indoor;

  // Keep selectedSeats ref updated so Pixi events always read the latest selection state
  useEffect(() => {
    selectedSeatsRef.current = selectedSeats;
  }, [selectedSeats]);

  // Redraw section highlights
  const highlightGraphicsRef = useRef(null);

  const drawSectionHighlights = () => {
    const g = highlightGraphicsRef.current;
    if (!g) return;
    g.clear();

    const hoveredSecId = hoveredSectionIdRef.current;
    if (!hoveredSecId) return;

    const cx = layout.cx;
    const cy = layout.cy;

    // Helper to draw curved section highlight
    const drawAnnulusSlice = (stand, color, fillA, strokeA) => {
      const rx = stand.baseR;
      const ry = rx * 0.95; // Match seat generation ovalness
      const innerR = rx - 10;
      // Calculate outer radius based on row count
      const outerR = rx + (stand.rows - 1) * stand.rowGap + 12;

      const startRad = ((stand.startA - 90) * Math.PI) / 180;
      const endRad = ((stand.endA - 90) * Math.PI) / 180;

      g.moveTo(cx + innerR * Math.cos(startRad), cy + innerR * Math.sin(startRad));
      g.arc(cx, cy, innerR, startRad, endRad, false);
      g.lineTo(cx + outerR * Math.cos(endRad), cy + outerR * Math.sin(endRad));
      g.arc(cx, cy, outerR, endRad, startRad, true);
      g.closePath();

      g.fill({ color, alpha: fillA });
      g.stroke({ color, width: 2, alpha: strokeA });
    };

    // Helper to draw flat section highlight
    const drawFlatHighlight = (minX, maxX, minY, maxY, color, fillA, strokeA) => {
      const margin = 10;
      const x = minX - margin;
      const y = minY - margin;
      const w = (maxX - minX) + margin * 2;
      const h = (maxY - minY) + margin * 2;

      g.roundRect(x, y, w, h, 8);
      g.fill({ color, alpha: fillA });
      g.stroke({ color, width: 2, alpha: strokeA });
    };

    // Check if the hovered section is a curved stand
    const curvedConfig = (layout.stands || []).find((s) => s.id === hoveredSecId) ||
                         (layout.sections || []).find((s) => s.id === hoveredSecId);

    const highlightColor = 0x4f46e5; // Indigo glow

    if (curvedConfig && curvedConfig.startA !== undefined) {
      drawAnnulusSlice(curvedConfig, highlightColor, 0.12, 0.45);
    } else {
      // Find bounding box from seats
      const secSeats = layout.seats.filter((s) => s.sectionId === hoveredSecId);
      if (secSeats.length > 0) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        secSeats.forEach((s) => {
          if (s.x < minX) minX = s.x;
          if (s.x > maxX) maxX = s.x;
          if (s.y < minY) minY = s.y;
          if (s.y > maxY) maxY = s.y;
        });
        drawFlatHighlight(minX, maxX, minY, maxY, highlightColor, 0.12, 0.45);
      }
    }
  };

  // Compile Pixi seat textures
  const generateSeatTextures = (app) => {
    const textures = {};

    const renderFlatTexture = (key, cushionColor, strokeColor, nubColor, showCross = false) => {
      const w = 14;
      const h = 11;
      const nubH = 2.5;
      const rx = 2.5;

      const container = new PIXI.Container();
      const g = new PIXI.Graphics();

      // Back nub (centered)
      g.roundRect(-w / 2, -h / 2 - nubH, w, nubH, 1.5);
      g.fill({ color: nubColor, alpha: 0.55 });

      // Cushion (centered)
      g.roundRect(-w / 2, -h / 2, w, h, rx);
      g.fill({ color: cushionColor });
      g.stroke({ color: strokeColor, width: 0.8 });

      if (showCross) {
        g.moveTo(-w / 2 + 3, -h / 2 + 2)
         .lineTo(w / 2 - 3, h / 2 - 2)
         .stroke({ color: 0x111827, width: 1.2 });
        g.moveTo(w / 2 - 3, -h / 2 + 2)
         .lineTo(-w / 2 + 3, h / 2 - 2)
         .stroke({ color: 0x111827, width: 1.2 });
      }

      container.addChild(g);
      textures[`flat_${key}`] = app.renderer.generateTexture({ target: container });
    };

    const renderStadiumTexture = (key, cushionColor, strokeColor, nubColor, showCross = false) => {
      const container = new PIXI.Container();
      const g = new PIXI.Graphics();

      // Back nub: centered x=-3.5, y=-6.5, w=7, h=3
      g.roundRect(-3.5, -6.5, 7, 3, 1.5);
      g.fill({ color: nubColor, alpha: 0.6 });

      // Cushion: centered x=-5, y=-4, w=10, h=8
      g.roundRect(-5, -4, 10, 8, 2);
      g.fill({ color: cushionColor });
      g.stroke({ color: strokeColor, width: 0.8 });

      if (showCross) {
        g.moveTo(-5 + 2, -4 + 1.5)
         .lineTo(5 - 2, 4 - 1.5)
         .stroke({ color: 0x111827, width: 1.2 });
        g.moveTo(5 - 2, -4 + 1.5)
         .lineTo(-5 + 2, 4 - 1.5)
         .stroke({ color: 0x111827, width: 1.2 });
      }

      container.addChild(g);
      textures[`stadium_${key}`] = app.renderer.generateTexture({ target: container });
    };

    const states = [
      { key: 'vip', cushion: 0x9333ea, stroke: 0x7e22ce, nub: 0xcbd5e1 },
      { key: 'vip_hover', cushion: 0xa855f7, stroke: 0x9333ea, nub: 0xcbd5e1 },
      { key: 'vip_reserved', cushion: 0xc4b5fd, stroke: 0xa78bfa, nub: 0xe5e7eb },

      { key: 'premium', cushion: 0x4f46e5, stroke: 0x4338ca, nub: 0xcbd5e1 },
      { key: 'premium_hover', cushion: 0x6366f1, stroke: 0x4f46e5, nub: 0xcbd5e1 },
      { key: 'premium_reserved', cushion: 0xbfdbfe, stroke: 0x93c5fd, nub: 0xe5e7eb },

      { key: 'standard', cushion: 0x06b6d4, stroke: 0x0891b2, nub: 0xcbd5e1 },
      { key: 'standard_hover', cushion: 0x22d3ee, stroke: 0x06b6d4, nub: 0xcbd5e1 },
      { key: 'standard_reserved', cushion: 0xb2ebf2, stroke: 0x67e8f9, nub: 0xe5e7eb },

      { key: 'economy', cushion: 0xf59e0b, stroke: 0xd97706, nub: 0xcbd5e1 },
      { key: 'economy_hover', cushion: 0xfbbf24, stroke: 0xf59e0b, nub: 0xcbd5e1 },
      { key: 'economy_reserved', cushion: 0xfde68a, stroke: 0xfcd34d, nub: 0xe5e7eb },

      { key: 'accessible', cushion: 0x22c55e, stroke: 0x16a34a, nub: 0xcbd5e1 },
      { key: 'accessible_hover', cushion: 0x4ade80, stroke: 0x22c55e, nub: 0xcbd5e1 },
      { key: 'accessible_reserved', cushion: 0xbbf7d0, stroke: 0x86efac, nub: 0xe5e7eb },

      { key: 'corporate', cushion: 0xf59e0b, stroke: 0xd97706, nub: 0xcbd5e1 },
      { key: 'corporate_hover', cushion: 0xfbbf24, stroke: 0xf59e0b, nub: 0xcbd5e1 },
      { key: 'corporate_reserved', cushion: 0xfde68a, stroke: 0xfcd34d, nub: 0xe5e7eb },

      { key: 'selected', cushion: 0x16a34a, stroke: 0x14532d, nub: 0xa7f3d0 },
      { key: 'selected_hover', cushion: 0x15803d, stroke: 0x14532d, nub: 0x6ee7b7 },
      
      { key: 'blocked', cushion: 0x64748b, stroke: 0x475569, nub: 0x94a3b8, showCross: true },
    ];

    states.forEach((s) => {
      renderFlatTexture(s.key, s.cushion, s.stroke, s.nub, s.showCross);
      renderStadiumTexture(s.key, s.cushion, s.stroke, s.nub, s.showCross);
    });

    return textures;
  };

  // Zoom/Pan Helpers
  const resetViewport = () => {
    const app = appRef.current;
    const viewport = viewportRef.current;
    if (!app || !viewport) return;

    const padding = 50;
    const viewW = app.screen.width;
    const viewH = app.screen.height;
    const layoutW = layout.width;
    const layoutH = layout.height;

    // Scale to fit layout inside canvas container
    const scaleX = (viewW - padding * 2) / layoutW;
    const scaleY = (viewH - padding * 2) / layoutH;
    const newScale = Math.max(0.1, Math.min(scaleX, scaleY, 1.0)); // Fit nicely

    viewport.scale.set(newScale);
    setZoomPercent(Math.round(newScale * 100));

    // Center viewport container
    viewport.position.set(
      (viewW - layoutW * newScale) / 2,
      (viewH - layoutH * newScale) / 2
    );
  };

  const handleZoom = (factor) => {
    const viewport = viewportRef.current;
    const app = appRef.current;
    if (!viewport || !app) return;

    let newScale = viewport.scale.x * factor;
    newScale = Math.max(0.15, Math.min(newScale, 4.0)); // Constraint boundaries

    const cx = app.screen.width / 2;
    const cy = app.screen.height / 2;

    const localX = (cx - viewport.position.x) / viewport.scale.x;
    const localY = (cy - viewport.position.y) / viewport.scale.y;

    viewport.scale.set(newScale);
    setZoomPercent(Math.round(newScale * 100));

    viewport.position.set(cx - localX * newScale, cy - localY * newScale);
  };

  // Initialize PixiJS canvas app
  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    const app = new PIXI.Application();
    appRef.current = app;

    let destroyed = false;

    const initPixi = async () => {
      try {
        await app.init({
          resizeTo: wrapper,
          antialias: true,
          backgroundAlpha: 0,
        });

        if (destroyed) {
          try {
            app.destroy(true, { children: true });
          } catch (err) {
            console.warn("Error destroying Pixi App in init:", err);
          }
          return;
        }

      wrapper.appendChild(app.canvas);

      // Create root zoom & pan viewport container
      const viewport = new PIXI.Container();
      viewportRef.current = viewport;
      app.stage.addChild(viewport);

      // Compile seat textures
      const textures = generateSeatTextures(app);
      seatTexturesRef.current = textures;

      // ─── BACKGROUND SECTION HIGHLIGHTS ───────────────────
      const highlightGraphics = new PIXI.Graphics();
      highlightGraphicsRef.current = highlightGraphics;
      viewport.addChild(highlightGraphics);

      // ─── VENUE GEOMETRY (FIELD/STAGE) ────────────────────
      const venueGraphics = new PIXI.Graphics();
      viewport.addChild(venueGraphics);

      // Draw Pitch
      if (layout.pitch) {
        const p = layout.pitch;
        // Outer field (dark green)
        venueGraphics
          .ellipse(p.cx, p.cy, p.rxOuter, p.ryOuter)
          .fill({ color: 0x064e3b, alpha: 0.35 })
          .stroke({ color: 0x10b981, width: 1.5, alpha: 0.6 });

        // Inner circle (medium dark green)
        venueGraphics
          .ellipse(p.cx, p.cy, p.rxInner, p.ryInner)
          .fill({ color: 0x064e3b, alpha: 0.5 })
          .stroke({ color: 0x34d399, width: 1.2, alpha: 0.7 });

        // Pitch strip
        venueGraphics
          .rect(p.cx - 10, p.cy - 40, 20, 80)
          .fill({ color: 0xfef08a, alpha: 0.2 })
          .stroke({ color: 0xfacc15, width: 1, alpha: 0.5 });

        // Crease lines
        venueGraphics.moveTo(p.cx - 9, p.cy - 35).lineTo(p.cx + 9, p.cy - 35).stroke({ color: 0xffffff, width: 1.2, alpha: 0.6 });
        venueGraphics.moveTo(p.cx - 9, p.cy + 35).lineTo(p.cx + 9, p.cy + 35).stroke({ color: 0xffffff, width: 1.2, alpha: 0.6 });

        // Vector labels
        const pitchText = new PIXI.Text({
          text: 'CRICKET PITCH',
          style: { fontSize: 9, fontWeight: '900', fill: 0xa7f3d0, letterSpacing: 2, fontFamily: 'Inter' },
        });
        pitchText.anchor.set(0.5);
        pitchText.position.set(p.cx, p.cy);
        viewport.addChild(pitchText);
      }

      // Draw Stage
      if (layout.hasStage) {
        const sx = layout.stageX;
        const sy = layout.stageY;
        const sw = layout.stageWidth;
        const sh = layout.stageHeight;

        // Stage backing shadow
        venueGraphics.roundRect(sx - 3, sy - 2, sw + 6, sh + 5, 8).fill({ color: 0x000000, alpha: 0.4 });

        // Stage board
        venueGraphics
          .roundRect(sx, sy, sw, sh, 6)
          .fill({ color: 0x1e293b, alpha: 0.85 })
          .stroke({ color: 0x3b82f6, width: 1.5, alpha: 0.8 });

        // stage flare glow effect
        venueGraphics
          .ellipse(sx + sw / 2, sy + sh + 2, sw * 0.45, 6)
          .fill({ color: 0x60a5fa, alpha: 0.3 });

        const stageText = new PIXI.Text({
          text: layout.stageLabel,
          style: { fontSize: 10, fontWeight: '900', fill: 0xf8fafc, letterSpacing: 3, fontFamily: 'Inter' },
        });
        stageText.anchor.set(0.5);
        stageText.position.set(sx + sw / 2, sy + sh / 2);
        viewport.addChild(stageText);
      }

      // ─── STAND / SECTION LABELS (VECTORS) ─────────────────
      const drawCurvedStandBadge = (stand) => {
        const midA = (stand.startA + stand.endA) / 2;
        const rx = stand.baseR + stand.rows * stand.rowGap + 20;
        const ry = rx * 0.95;
        const pt = getEllipsePoint(layout.cx, layout.cy, rx, ry, midA);

        const badgeColor = {
          vip: 0x9333ea, corporate: 0xf59e0b, premium: 0x4f46e5,
          standard: 0x06b6d4, economy: 0xf59e0b, accessible: 0x22c55e,
        }[stand.zone] || 0x475569;

        const badgeStroke = {
          vip: 0xa855f7, corporate: 0xfbbf24, premium: 0x6366f1,
          standard: 0x22d3ee, economy: 0xfbbf24, accessible: 0x4ade80,
        }[stand.zone] || 0x64748b;

        const textColor = {
          vip: 0xf3e8ff, corporate: 0xfef9c3, premium: 0xe0e7ff,
          standard: 0xecfeff, economy: 0xfef9c3, accessible: 0xf0fdf4,
        }[stand.zone] || 0xf8fafc;

        const labelText = new PIXI.Text({
          text: stand.label,
          style: { fontSize: 8.5, fontWeight: '800', fill: textColor, fontFamily: 'Inter' },
        });
        labelText.anchor.set(0.5);

        const paddingX = 12;
        const paddingY = 6;
        const w = labelText.width + paddingX * 2;
        const h = labelText.height + paddingY * 2;

        const badgeGraphics = new PIXI.Graphics()
          .roundRect(-w / 2, -h / 2, w, h, 8)
          .fill({ color: badgeColor, alpha: 0.2 })
          .stroke({ color: badgeStroke, width: 1, alpha: 0.6 });

        badgeGraphics.position.set(pt.x, pt.y);
        labelText.position.set(pt.x, pt.y);

        viewport.addChild(badgeGraphics);
        viewport.addChild(labelText);
      };

      if (layout.stands) {
        layout.stands.forEach((s) => drawCurvedStandBadge(s));
      }
      if (layout.sections) {
        // Draw Curved labels for Theatre
        layout.sections.forEach((s) => {
          if (s.startA !== undefined) {
            drawCurvedStandBadge(s);
          }
        });
      }

      // ─── SEAT SPRITES CREATION ────────────────────────────
      spriteMapRef.current.clear();
      layout.seats.forEach((seat) => {
        const isSelected = selectedSeatsRef.current.some((s) => s.key === seat.key);
        let stateKey = seat.zone;
        if (seat.isReserved) stateKey = `${seat.zone}_reserved`;
        else if (isSelected) stateKey = 'selected';

        const textureType = seat.angle !== 0 ? 'stadium' : 'flat';
        const texture = textures[`${textureType}_${stateKey}`];

        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.position.set(seat.x, seat.y);

        if (seat.angle !== 0) {
          sprite.rotation = (seat.angle * Math.PI) / 180;
        }

        // Add interactivity if not reserved
        if (!seat.isReserved) {
          sprite.eventMode = 'static';
          sprite.cursor = 'pointer';

          sprite.on('pointerover', () => {
            const isSelectedNow = selectedSeatsRef.current.some((s) => s.key === seat.key);
            const hoverState = isSelectedNow ? 'selected_hover' : `${seat.zone}_hover`;
            sprite.texture = textures[`${textureType}_${hoverState}`];
            sprite.scale.set(1.15); // Subtle size highlight

            // Set section hover highlight
            hoveredSectionIdRef.current = seat.sectionId;
            drawSectionHighlights();

            // Calculate global screen position for HTML tooltip
            const globalPos = sprite.toGlobal(new PIXI.Point(0, 0));
            setTooltip({
              visible: true,
              x: globalPos.x,
              y: globalPos.y,
              label: seat.label,
              zoneName: ZONE_NAMES[seat.zone] || seat.zone.toUpperCase(),
              price: seat.price,
            });
          });

          sprite.on('pointerout', () => {
            const isSelectedNow = selectedSeatsRef.current.some((s) => s.key === seat.key);
            const normalState = isSelectedNow ? 'selected' : seat.zone;
            sprite.texture = textures[`${textureType}_${normalState}`];
            sprite.scale.set(1.0);

            // Clear section highlight
            hoveredSectionIdRef.current = null;
            drawSectionHighlights();

            setTooltip((prev) => ({ ...prev, visible: false }));
          });

          sprite.on('pointerdown', (e) => {
            // Stop propagation to prevent canvas drag trigger
            e.stopPropagation();
          });

          sprite.on('pointertap', (e) => {
            e.stopPropagation();
            onSeatToggle({
              key: seat.key,
              label: seat.label,
              zone: seat.zone,
              price: seat.price,
            });
          });
        }

        viewport.addChild(sprite);
        spriteMapRef.current.set(seat.key, sprite);
      });

      // Fit and center viewport immediately
      resetViewport();

      // Hook canvas events for drag to pan
      const canvas = app.canvas;
      let startX = 0;
      let startY = 0;

      const onPointerDown = (e) => {
        if (e.button !== 0) return; // Left mouse button only
        isDraggingRef.current = true;
        startX = e.clientX - viewport.position.x;
        startY = e.clientY - viewport.position.y;
        canvas.style.cursor = 'grabbing';
      };

      const onPointerMove = (e) => {
        if (!isDraggingRef.current) return;
        viewport.position.set(e.clientX - startX, e.clientY - startY);
      };

      const onPointerUp = () => {
        isDraggingRef.current = false;
        canvas.style.cursor = 'default';
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // Hook mouse wheel zoom (centered on cursor)
      const onWheel = (e) => {
        e.preventDefault();
        const factor = 1.06;
        const zoomDirection = e.deltaY < 0 ? 1 : -1;
        let scaleVal = viewport.scale.x;

        if (zoomDirection > 0) {
          scaleVal *= factor;
        } else {
          scaleVal /= factor;
        }

        scaleVal = Math.max(0.15, Math.min(scaleVal, 4.0)); // Constraints

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const localX = (mouseX - viewport.position.x) / viewport.scale.x;
        const localY = (mouseY - viewport.position.y) / viewport.scale.y;

        viewport.scale.set(scaleVal);
        setZoomPercent(Math.round(scaleVal * 100));
        viewport.position.set(mouseX - localX * scaleVal, mouseY - localY * scaleVal);
      };

      canvas.addEventListener('wheel', onWheel, { passive: false });

      // Handle window resize centering
      const onResize = () => {
        resetViewport();
      };
      window.addEventListener('resize', onResize);

      // Store cleanup function
      app.cleanup = () => {
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('wheel', onWheel);
        window.removeEventListener('resize', onResize);
      };
      } catch (err) {
        console.error("PixiJS initialization error:", err);
      }
    };

    initPixi();

    return () => {
      destroyed = true;
      const currentApp = appRef.current;
      if (currentApp) {
        if (currentApp.cleanup) {
          try {
            currentApp.cleanup();
          } catch (e) {
            console.warn("Cleanup error:", e);
          }
        }
        try {
          // Only destroy synchronously if initialization has finished (app.renderer exists)
          if (currentApp.renderer) {
            currentApp.destroy(true, { children: true });
          }
        } catch (e) {
          console.warn("Destroy error in cleanup:", e);
        }
        appRef.current = null;
      }
    };
  }, [layoutType]);

  // Sync React selections down to PixiJS sprites textures
  useEffect(() => {
    const spriteMap = spriteMapRef.current;
    const textures = seatTexturesRef.current;
    if (!spriteMap || spriteMap.size === 0 || !textures) return;

    layout.seats.forEach((seat) => {
      const sprite = spriteMap.get(seat.key);
      if (!sprite) return;

      const isSelected = selectedSeats.some((s) => s.key === seat.key);
      let stateKey = seat.zone;
      if (seat.isReserved) stateKey = `${seat.zone}_reserved`;
      else if (isSelected) stateKey = 'selected';

      const textureType = seat.angle !== 0 ? 'stadium' : 'flat';
      const texture = textures[`${textureType}_${stateKey}`];

      if (texture && sprite.texture !== texture) {
        sprite.texture = texture;
      }
    });
  }, [selectedSeats, layout.seats]);

  return (
    <div className="flex flex-col items-center w-full min-w-0">
      {/* Venue Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-black tracking-tight text-on-surface">
          {event?.venue || layout.venueName} — Seat Map
        </h2>
        <p className="text-xs text-outline mt-1">
          Click a seat to select · drag to pan · wheel to zoom
        </p>
      </div>

      {/* Map Window Container */}
      <div
        className="w-full flex justify-center border rounded-3xl p-0 overflow-hidden h-[540px] md:h-[600px] relative select-none shadow-2xl transition-all"
        style={{
          background: 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)',
          borderColor: '#1e293b'
        }}
      >
        {/* Pixi Canvas Mount Wrapper */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab" />

        {/* Zoom Controls Overlay UI */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 bg-[#0F172A]/85 backdrop-blur-md rounded-2xl p-2 border border-slate-700/50 shadow-2xl z-10">
          <button
            onClick={() => handleZoom(1.2)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all hover:scale-105 active:scale-95"
            title="Zoom In"
          >
            <Icon name="add" style={{ fontSize: 18, fontWeight: 'bold' }} />
          </button>
          <div className="text-[10px] font-black text-center text-slate-400 py-0.5 border-y border-slate-800 select-none">
            {zoomPercent}%
          </div>
          <button
            onClick={() => handleZoom(1 / 1.2)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all hover:scale-105 active:scale-95"
            title="Zoom Out"
          >
            <Icon name="remove" style={{ fontSize: 18, fontWeight: 'bold' }} />
          </button>
          <button
            onClick={resetViewport}
            className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all hover:scale-105 active:scale-95 mt-1"
            title="Fit Map"
          >
            <Icon name="crop_free" style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* Legends Summary */}
      <div className="w-full mt-6">
        <SeatLegend layout={layout} />
      </div>

      {/* HTML Floating Tooltip Overlay - Positioned ABOVE cursor to avoid blocking seat view */}
      {tooltip.visible && (
        <div
          className="fixed pointer-events-none z-[9999] shadow-2xl"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 88, // Appear ABOVE the cursor
            transform: 'translateY(0)',
          }}
        >
          <div className="bg-[#0f0f0f] text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-white/10 flex flex-col gap-0.5 min-w-[140px] opacity-95">
            <span className="text-[9px] text-indigo-300 font-extrabold uppercase tracking-widest">
              {tooltip.zoneName}
            </span>
            <span className="text-white/90 font-bold leading-tight text-[11px]">
              {tooltip.label.split('·')[1]?.trim() || tooltip.label}
            </span>
            <span className="text-white font-black text-sm tracking-tight mt-0.5">
              ₹{tooltip.price.toLocaleString('en-IN')}
            </span>
          </div>
          {/* Small downward arrow pointing to the seat */}
          <div className="absolute left-4 -bottom-1.5 w-3 h-1.5 overflow-hidden">
            <div className="w-2.5 h-2.5 bg-[#0f0f0f] border-r border-b border-white/10 rotate-45 translate-x-0.5 -translate-y-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}
