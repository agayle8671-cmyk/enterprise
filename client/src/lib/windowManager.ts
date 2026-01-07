/**
 * Sovereign OS - Tiling Window Manager
 * 
 * Binary Space Partitioning (BSP) layout algorithm.
 * Productivity-focused window management like bspwm/i3.
 */

import { useState, useCallback, useMemo } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface WindowState {
    id: string;
    title: string;
    component: React.ComponentType<any>;
    props?: Record<string, any>;
    geometry: WindowGeometry;
    state: 'floating' | 'tiled' | 'maximized' | 'minimized';
    zIndex: number;
}

export interface WindowGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BSPNode {
    id: string;
    type: 'leaf' | 'horizontal' | 'vertical';
    ratio: number; // Split ratio (0-1)
    windowId?: string; // Only for leaf nodes
    children?: [BSPNode, BSPNode]; // Only for split nodes
}

export type TilingDirection = 'horizontal' | 'vertical' | 'auto';

// ============================================================================
// BSP TREE OPERATIONS
// ============================================================================

/**
 * Create initial BSP tree with single window
 */
function createBSPTree(windowId: string): BSPNode {
    return {
        id: crypto.randomUUID(),
        type: 'leaf',
        ratio: 1,
        windowId,
    };
}

/**
 * Insert a window into the BSP tree
 */
function insertWindow(
    tree: BSPNode,
    targetId: string,
    newWindowId: string,
    direction: TilingDirection
): BSPNode {
    if (tree.type === 'leaf' && tree.windowId === targetId) {
        // Split this leaf
        const splitType = direction === 'auto'
            ? (Math.random() > 0.5 ? 'horizontal' : 'vertical')
            : direction;

        return {
            id: crypto.randomUUID(),
            type: splitType,
            ratio: 0.5,
            children: [
                { ...tree, id: crypto.randomUUID() },
                {
                    id: crypto.randomUUID(),
                    type: 'leaf',
                    ratio: 1,
                    windowId: newWindowId,
                },
            ],
        };
    }

    if (tree.children) {
        return {
            ...tree,
            children: [
                insertWindow(tree.children[0], targetId, newWindowId, direction),
                insertWindow(tree.children[1], targetId, newWindowId, direction),
            ],
        };
    }

    return tree;
}

/**
 * Remove a window from the BSP tree
 */
function removeWindow(tree: BSPNode, windowId: string): BSPNode | null {
    if (tree.type === 'leaf') {
        return tree.windowId === windowId ? null : tree;
    }

    if (tree.children) {
        const left = removeWindow(tree.children[0], windowId);
        const right = removeWindow(tree.children[1], windowId);

        if (!left && !right) return null;
        if (!left) return right;
        if (!right) return left;

        return { ...tree, children: [left, right] };
    }

    return tree;
}

/**
 * Calculate window geometries from BSP tree
 */
function calculateGeometries(
    tree: BSPNode,
    bounds: WindowGeometry
): Map<string, WindowGeometry> {
    const geometries = new Map<string, WindowGeometry>();

    function traverse(node: BSPNode, nodeBounds: WindowGeometry) {
        if (node.type === 'leaf' && node.windowId) {
            geometries.set(node.windowId, { ...nodeBounds });
            return;
        }

        if (node.children) {
            const [first, second] = node.children;

            if (node.type === 'horizontal') {
                const splitY = nodeBounds.y + nodeBounds.height * node.ratio;
                traverse(first, {
                    x: nodeBounds.x,
                    y: nodeBounds.y,
                    width: nodeBounds.width,
                    height: nodeBounds.height * node.ratio,
                });
                traverse(second, {
                    x: nodeBounds.x,
                    y: splitY,
                    width: nodeBounds.width,
                    height: nodeBounds.height * (1 - node.ratio),
                });
            } else {
                const splitX = nodeBounds.x + nodeBounds.width * node.ratio;
                traverse(first, {
                    x: nodeBounds.x,
                    y: nodeBounds.y,
                    width: nodeBounds.width * node.ratio,
                    height: nodeBounds.height,
                });
                traverse(second, {
                    x: splitX,
                    y: nodeBounds.y,
                    width: nodeBounds.width * (1 - node.ratio),
                    height: nodeBounds.height,
                });
            }
        }
    }

    traverse(tree, bounds);
    return geometries;
}

/**
 * Resize a split in the BSP tree
 */
function resizeSplit(
    tree: BSPNode,
    nodeId: string,
    newRatio: number
): BSPNode {
    if (tree.id === nodeId) {
        return { ...tree, ratio: Math.max(0.1, Math.min(0.9, newRatio)) };
    }

    if (tree.children) {
        return {
            ...tree,
            children: [
                resizeSplit(tree.children[0], nodeId, newRatio),
                resizeSplit(tree.children[1], nodeId, newRatio),
            ],
        };
    }

    return tree;
}

// ============================================================================
// TILING WINDOW MANAGER HOOK
// ============================================================================

interface TilingWMState {
    tree: BSPNode | null;
    windows: Map<string, WindowState>;
    focusedId: string | null;
    bounds: WindowGeometry;
}

export function useTilingWindowManager(containerBounds: WindowGeometry) {
    const [state, setState] = useState<TilingWMState>({
        tree: null,
        windows: new Map(),
        focusedId: null,
        bounds: containerBounds,
    });

    const openWindow = useCallback((window: Omit<WindowState, 'geometry' | 'zIndex'>) => {
        setState(prev => {
            const newWindow: WindowState = {
                ...window,
                geometry: { x: 0, y: 0, width: 100, height: 100 },
                zIndex: prev.windows.size + 1,
            };

            const newWindows = new Map(prev.windows);
            newWindows.set(window.id, newWindow);

            let newTree: BSPNode;
            if (!prev.tree) {
                newTree = createBSPTree(window.id);
            } else {
                const targetId = prev.focusedId || Array.from(prev.windows.keys())[0];
                newTree = insertWindow(prev.tree, targetId, window.id, 'auto');
            }

            return {
                ...prev,
                tree: newTree,
                windows: newWindows,
                focusedId: window.id,
            };
        });
    }, []);

    const closeWindow = useCallback((windowId: string) => {
        setState(prev => {
            const newWindows = new Map(prev.windows);
            newWindows.delete(windowId);

            const newTree = prev.tree ? removeWindow(prev.tree, windowId) : null;
            const newFocusedId = prev.focusedId === windowId
                ? Array.from(newWindows.keys())[0] || null
                : prev.focusedId;

            return {
                ...prev,
                tree: newTree,
                windows: newWindows,
                focusedId: newFocusedId,
            };
        });
    }, []);

    const focusWindow = useCallback((windowId: string) => {
        setState(prev => ({
            ...prev,
            focusedId: windowId,
        }));
    }, []);

    const resizeWindow = useCallback((nodeId: string, ratio: number) => {
        setState(prev => ({
            ...prev,
            tree: prev.tree ? resizeSplit(prev.tree, nodeId, ratio) : null,
        }));
    }, []);

    const toggleFloat = useCallback((windowId: string) => {
        setState(prev => {
            const window = prev.windows.get(windowId);
            if (!window) return prev;

            const newWindows = new Map(prev.windows);
            newWindows.set(windowId, {
                ...window,
                state: window.state === 'floating' ? 'tiled' : 'floating',
            });

            return { ...prev, windows: newWindows };
        });
    }, []);

    const maximize = useCallback((windowId: string) => {
        setState(prev => {
            const window = prev.windows.get(windowId);
            if (!window) return prev;

            const newWindows = new Map(prev.windows);
            newWindows.set(windowId, {
                ...window,
                state: window.state === 'maximized' ? 'tiled' : 'maximized',
            });

            return { ...prev, windows: newWindows };
        });
    }, []);

    // Calculate geometries from BSP tree
    const geometries = useMemo(() => {
        if (!state.tree) return new Map<string, WindowGeometry>();
        return calculateGeometries(state.tree, state.bounds);
    }, [state.tree, state.bounds]);

    // Merge geometries into window states
    const windowsWithGeometry = useMemo(() => {
        const result = new Map<string, WindowState>();

        state.windows.forEach((window, id) => {
            const geo = geometries.get(id);
            if (window.state === 'maximized') {
                result.set(id, { ...window, geometry: state.bounds });
            } else if (window.state === 'floating' || !geo) {
                result.set(id, window);
            } else {
                result.set(id, { ...window, geometry: geo });
            }
        });

        return result;
    }, [state.windows, geometries, state.bounds]);

    return {
        windows: windowsWithGeometry,
        focusedId: state.focusedId,
        openWindow,
        closeWindow,
        focusWindow,
        resizeWindow,
        toggleFloat,
        maximize,
        tree: state.tree,
    };
}

/**
 * Snap zones for Windows 11-style snap assist
 */
export const SNAP_ZONES = {
    left: { x: 0, y: 0, width: 0.5, height: 1 },
    right: { x: 0.5, y: 0, width: 0.5, height: 1 },
    topLeft: { x: 0, y: 0, width: 0.5, height: 0.5 },
    topRight: { x: 0.5, y: 0, width: 0.5, height: 0.5 },
    bottomLeft: { x: 0, y: 0.5, width: 0.5, height: 0.5 },
    bottomRight: { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
    maximize: { x: 0, y: 0, width: 1, height: 1 },
} as const;

export type SnapZone = keyof typeof SNAP_ZONES;

/**
 * Detect which snap zone the cursor is in
 */
export function detectSnapZone(
    x: number,
    y: number,
    bounds: WindowGeometry,
    edgeThreshold = 20
): SnapZone | null {
    const relX = x - bounds.x;
    const relY = y - bounds.y;

    const nearLeft = relX < edgeThreshold;
    const nearRight = relX > bounds.width - edgeThreshold;
    const nearTop = relY < edgeThreshold;
    const nearBottom = relY > bounds.height - edgeThreshold;

    if (nearTop && nearLeft) return 'topLeft';
    if (nearTop && nearRight) return 'topRight';
    if (nearBottom && nearLeft) return 'bottomLeft';
    if (nearBottom && nearRight) return 'bottomRight';
    if (nearLeft) return 'left';
    if (nearRight) return 'right';
    if (nearTop) return 'maximize';

    return null;
}
