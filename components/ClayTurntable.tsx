'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

type V3 = [number, number, number]
type Mats = { clay: THREE.Material; dark: THREE.Material; metal: THREE.Material; lens: THREE.Material; clayTwoSided: THREE.Material }

// ---- Geometry helpers -------------------------------------------------------

// Flat normals give crisp, faceted hard-surface edges instead of soft shading.
function hard<T extends THREE.BufferGeometry>(g: T): THREE.BufferGeometry {
    const out = g.index ? g.toNonIndexed() : g
    if (out !== g) g.dispose()
    out.computeVertexNormals()
    return out
}
const prism = (rTop: number, rBottom: number, h: number, sides: number) => hard(new THREE.CylinderGeometry(rTop, rBottom, h, sides))
const cyl = (r: number, h: number, seg = 28) => new THREE.CylinderGeometry(r, r, h, seg)

const extrudeOpts = (depth: number, c: number) => ({ depth, bevelEnabled: true, bevelSize: c, bevelThickness: c, bevelSegments: 1, curveSegments: 6 })

// Box with chamfered edges (overall size w × h × d).
function slab(w: number, h: number, d: number, c = 0.05) {
    const x = w / 2 - c, y = h / 2 - c
    const s = new THREE.Shape()
    s.moveTo(-x, -y); s.lineTo(x, -y); s.lineTo(x, y); s.lineTo(-x, y); s.closePath()
    const g = new THREE.ExtrudeGeometry(s, extrudeOpts(Math.max(d - 2 * c, 0.001), c))
    g.center()
    return g
}

// Side profile (XY) extruded along Z, centred on Z, keeping the profile's own origin.
function profile(points: [number, number][], depth: number, c = 0.06) {
    const s = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)))
    const g = new THREE.ExtrudeGeometry(s, extrudeOpts(depth - 2 * c, c))
    g.translate(0, 0, -(depth - 2 * c) / 2)
    return g
}

function group(parent: THREE.Object3D, p: V3 = [0, 0, 0], r: V3 = [0, 0, 0]) {
    const g = new THREE.Group()
    g.position.set(...p)
    g.rotation.set(...r)
    parent.add(g)
    return g
}

function mesh(parent: THREE.Object3D, g: THREE.BufferGeometry, m: THREE.Material, p: V3 = [0, 0, 0], r: V3 = [0, 0, 0]) {
    const o = new THREE.Mesh(g, m)
    o.position.set(...p)
    o.rotation.set(...r)
    o.castShadow = true
    o.receiveShadow = true
    parent.add(o)
    return o
}

// Many copies of one small part (bolts, gear teeth, vent slats) in a single draw call.
function scatter(parent: THREE.Object3D, g: THREE.BufferGeometry, m: THREE.Material, items: { p: V3; r?: V3; s?: V3 }[]) {
    const inst = new THREE.InstancedMesh(g, m, items.length)
    const dummy = new THREE.Object3D()
    items.forEach(({ p, r = [0, 0, 0], s = [1, 1, 1] }, i) => {
        dummy.position.set(...p)
        dummy.rotation.set(...r)
        dummy.scale.set(...s)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
    })
    inst.instanceMatrix.needsUpdate = true
    inst.castShadow = true
    inst.receiveShadow = true
    parent.add(inst)
    return inst
}

function cable(parent: THREE.Object3D, m: THREE.Material, pts: V3[], r = 0.05, ties = 0, tieMat: THREE.Material = m) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
    const tube = mesh(parent, new THREE.TubeGeometry(curve, 48, r, 10, false), m)
    if (ties > 0) {
        const up = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion(), e = new THREE.Euler()
        scatter(parent, cyl(r * 1.4, r * 1.3, 12), tieMat, Array.from({ length: ties }, (_, i) => {
            const u = (i + 1) / (ties + 1)
            const p = curve.getPointAt(u)
            e.setFromQuaternion(q.setFromUnitVectors(up, curve.getTangentAt(u)))
            return { p: [p.x, p.y, p.z] as V3, r: [e.x, e.y, e.z] as V3 }
        }))
    }
    return tube
}

// Deterministic random numbers so the greebles land in the same place every load.
function rng(seed: number) {
    return () => {
        seed |= 0; seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

// Small surface details on a flat face. The face's local +x points outward,
// y runs up (height h) and z runs across (width w).
function greebles(face: THREE.Object3D, seed: number, w: number, h: number, count: number, m: { a: THREE.Material; b: THREE.Material; pipe: THREE.Material; bolt: THREE.Material }) {
    const rand = rng(seed)
    const unit = slab(1, 1, 1, 0.12)
    const plates: { a: { p: V3; s: V3 }[]; b: { p: V3; s: V3 }[] } = { a: [], b: [] }
    const bolts: { p: V3; r: V3 }[] = []
    const pipes: { p: V3; r: V3; s: V3 }[] = []
    for (let i = 0; i < count; i++) {
        const sw = 0.04 + rand() * 0.18, sh = 0.03 + rand() * 0.15, d = 0.012 + rand() * 0.04
        const y = (rand() - 0.5) * (h - sh), z = (rand() - 0.5) * (w - sw)
        ;(rand() < 0.4 ? plates.a : plates.b).push({ p: [d / 2, y, z], s: [d, sh, sw] })
        if (rand() < 0.45 && sw > 0.08 && sh > 0.06) {
            for (const [dy, dz] of [[1, 1], [-1, -1]]) bolts.push({ p: [d + 0.004, y + dy * (sh / 2 - 0.018), z + dz * (sw / 2 - 0.018)], r: [0, 0, -Math.PI / 2] })
        }
    }
    for (let i = 0; i < Math.ceil(count / 5); i++) {
        const len = 0.12 + rand() * 0.3, r = 0.008 + rand() * 0.014, vertical = rand() < 0.5
        const y = (rand() - 0.5) * (h - (vertical ? len : 0.05)), z = (rand() - 0.5) * (w - (vertical ? 0.05 : len))
        pipes.push({ p: [0.05 + rand() * 0.02, y, z], r: vertical ? [0, 0, 0] : [Math.PI / 2, 0, 0], s: [r, len, r] })
    }
    scatter(face, unit, m.a, plates.a)
    scatter(face, unit, m.b, plates.b)
    scatter(face, prism(0.011, 0.011, 0.012, 6), m.bolt, bolts)
    scatter(face, cyl(1, 1, 10), m.pipe, pipes)
}

// Cylinder spanning two points (pistons, tubes, rods).
function between(parent: THREE.Object3D, r: number, a: V3, b: V3, m: THREE.Material, seg = 16) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b)
    const d = B.clone().sub(A)
    const o = mesh(parent, cyl(r, d.length(), seg), m)
    o.position.copy(A).addScaledVector(d, 0.5)
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())
    return o
}
const lerp3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

// ---- The model ---------------------------------------------------------------
// A hard-surface sentry: stepped octagonal plinth, hydraulic stabiliser legs,
// geared slewing ring, armoured yaw housing with cabling, and a chamfered head
// with finned twin barrels, sensor optic, radar dish and antennas. Moving parts:
// head scan and pitch with live hydraulic rams, slewing pinion, cooling fan,
// rotating radar, alternating recoil with muzzle flash, blinking beacon.
function buildModel({ clay, dark, metal, lens, clayTwoSided }: Mats) {
    const model = new THREE.Group()
    const lensMat = lens as THREE.MeshStandardMaterial
    const beacon = lensMat.clone()
    const glass = new THREE.MeshStandardMaterial({ color: 0xe9ebee, roughness: 0.05, metalness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.25 })
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xfff1d6, transparent: true, opacity: 0.85, depthWrite: false })
    const mid = new THREE.MeshStandardMaterial({ color: 0x3e4147, roughness: 0.5, metalness: 0.16 })
    const gm = { a: mid, b: dark, pipe: metal, bolt: metal }
    const rivetGeo = prism(0.016, 0.016, 0.018, 6)
    const o8 = Math.PI / 8

    // Plinth: stacked chamfered octagon tiers
    mesh(model, prism(2.6, 2.5, 0.08, 8), clay, [0, 0.04, 0], [0, o8, 0])
    mesh(model, prism(2.6, 2.6, 0.24, 8), clay, [0, 0.2, 0], [0, o8, 0])
    mesh(model, prism(2.35, 2.6, 0.12, 8), clay, [0, 0.38, 0], [0, o8, 0])
    mesh(model, prism(2.02, 2.02, 0.1, 8), dark, [0, 0.49, 0], [0, o8, 0])
    mesh(model, prism(1.95, 2.05, 0.2, 8), clay, [0, 0.64, 0], [0, o8, 0])
    mesh(model, prism(1.8, 1.95, 0.08, 8), clay, [0, 0.78, 0], [0, o8, 0])
    // Bolt ring on the lower tier
    scatter(model, prism(0.05, 0.05, 0.06, 6), dark,
        Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return { p: [Math.cos(a) * 2.2, 0.47, Math.sin(a) * 2.2] as V3 } }))
    // Access hatches on the plinth faces
    for (let i = 0; i < 8; i += 2) {
        const a = (i / 8) * Math.PI * 2
        const g = group(model, [Math.cos(a) * 2.405, 0.2, Math.sin(a) * 2.405], [0, -a, 0])
        mesh(g, slab(0.04, 0.14, 0.9, 0.015), dark, [0.01, 0, 0])
    }
    // Rivet rows and seams on every plinth face
    const plinthRivets: { p: V3; r: V3 }[] = []
    const plinthSeams: { p: V3; r: V3 }[] = []
    for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2
        const n = [Math.cos(a), Math.sin(a)], t = [-Math.sin(a), Math.cos(a)]
        for (const y of [0.11, 0.29]) for (let i = 0; i <= 12; i++) {
            const u = -0.9 + i * 0.15
            plinthRivets.push({ p: [n[0] * 2.41 + t[0] * u, y, n[1] * 2.41 + t[1] * u], r: [0, -a, -Math.PI / 2] })
        }
        for (const u of [-0.56, 0.56]) plinthSeams.push({ p: [n[0] * 2.405 + t[0] * u, 0.2, n[1] * 2.405 + t[1] * u], r: [0, -a, 0] })
    }
    scatter(model, rivetGeo, metal, plinthRivets)
    // Dark inset panels and floor grates on the lower ledge
    scatter(model, slab(0.5, 0.02, 0.22, 0.008), dark, [0, 1, 2, 3].map(k => {
        const a = (k / 4) * Math.PI * 2 + 0.35
        return { p: [Math.cos(a) * 2.18, 0.445, Math.sin(a) * 2.18] as V3, r: [0, -a + Math.PI / 2, 0] as V3 }
    }))
    scatter(model, new THREE.BoxGeometry(0.012, 0.012, 0.3), metal, [0, 1, 2, 3].flatMap(k => {
        const a = (k / 4) * Math.PI * 2 + 0.35
        return [-0.18, -0.09, 0, 0.09, 0.18].map(u => ({ p: [Math.cos(a) * 2.18 - Math.sin(a) * u, 0.46, Math.sin(a) * 2.18 + Math.cos(a) * u] as V3, r: [0, -a + Math.PI / 2, 0] as V3 }))
    }))
    scatter(model, new THREE.BoxGeometry(0.014, 0.22, 0.012), dark, plinthSeams)

    // Hydraulic stabiliser legs
    const theta = -0.37
    const dir = new THREE.Vector2(Math.cos(theta), Math.sin(theta))
    for (let k = 0; k < 4; k++) {
        const a = Math.PI / 4 + k * (Math.PI / 2)
        const leg = group(model, [0, 0, 0], [0, -a, 0])
        mesh(leg, slab(0.55, 0.42, 0.62, 0.06), dark, [2.0, 0.66, 0])
        mesh(leg, slab(1.45, 0.22, 0.38, 0.05), clay, [2.62, 0.38, 0], [0, 0, theta])
        mesh(leg, prism(0.46, 0.56, 0.12, 8), dark, [3.32, 0.06, 0], [0, o8, 0])
        mesh(leg, prism(0.32, 0.44, 0.08, 8), clay, [3.32, 0.16, 0], [0, o8, 0])
        mesh(leg, slab(0.2, 0.26, 0.3, 0.04), dark, [3.1, 0.38, 0], [0, 0, theta])
        // Piston: housing + chrome rod, parallel above the strut
        const p0 = new THREE.Vector2(2.1, 0.9)
        const at = (t: number): V3 => [p0.x + dir.x * t, p0.y + dir.y * t, 0]
        mesh(leg, cyl(0.085, 0.62, 18), dark, at(0.32), [0, 0, theta - Math.PI / 2])
        mesh(leg, cyl(0.1, 0.06, 18), clay, at(0.64), [0, 0, theta - Math.PI / 2])
        mesh(leg, cyl(0.042, 0.5, 14), metal, at(0.88), [0, 0, theta - Math.PI / 2])
        // Hinge pin and hydraulic hose
        mesh(leg, cyl(0.06, 0.74, 16), metal, [2.0, 0.66, 0], [Math.PI / 2, 0, 0])
        scatter(leg, cyl(0.09, 0.04, 16), dark, [{ p: [2.0, 0.66, 0.37], r: [Math.PI / 2, 0, 0] }, { p: [2.0, 0.66, -0.37], r: [Math.PI / 2, 0, 0] }])
        cable(leg, dark, [[1.92, 0.86, 0.18], [2.1, 1.02, 0.22], [2.32, 0.86, 0.1]], 0.022, 2, metal)
        scatter(leg, prism(0.03, 0.03, 0.03, 6), metal,
            Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + 0.5; return { p: [3.32 + Math.cos(a) * 0.38, 0.135, Math.sin(a) * 0.38] as V3 } }))
    }

    // Slewing ring with gear teeth
    mesh(model, cyl(1.55, 0.22, 64), dark, [0, 0.93, 0])
    scatter(model, new THREE.BoxGeometry(0.09, 0.18, 0.11), dark,
        Array.from({ length: 56 }, (_, i) => { const a = (i / 56) * Math.PI * 2; return { p: [Math.cos(a) * 1.58, 0.93, Math.sin(a) * 1.58] as V3, r: [0, -a, 0] as V3 } }))
    mesh(model, prism(1.42, 1.5, 0.1, 32), clay, [0, 1.09, 0])

    // Slewing drive: motor and gearbox turning a pinion against the ring
    const drive = group(model, [-1.84, 0, 0])
    const pinion = group(drive, [0.04, 0.93, 0])
    mesh(pinion, cyl(0.14, 0.2, 24), dark)
    scatter(pinion, new THREE.BoxGeometry(0.05, 0.18, 0.06), dark,
        Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return { p: [Math.cos(a) * 0.155, 0, Math.sin(a) * 0.155] as V3, r: [0, -a, 0] as V3 } }))
    mesh(drive, cyl(0.04, 0.16, 12), metal, [0.04, 1.1, 0])
    mesh(drive, slab(0.12, 0.7, 0.42, 0.03), dark, [-0.3, 0.79, 0])
    mesh(drive, slab(0.46, 0.22, 0.42, 0.04), dark, [-0.06, 1.17, 0])
    mesh(drive, cyl(0.15, 0.42, 28), clay, [-0.06, 1.49, 0])
    scatter(drive, cyl(0.18, 0.022, 28), dark, Array.from({ length: 6 }, (_, i) => ({ p: [-0.06, 1.34 + i * 0.06, 0] as V3 })))
    mesh(drive, cyl(0.1, 0.05, 20), metal, [-0.06, 1.725, 0])
    mesh(drive, slab(0.12, 0.14, 0.18, 0.025), dark, [-0.25, 1.52, 0])
    cable(drive, dark, [[-0.3, 1.5, 0.06], [-0.42, 1.3, 0.1], [-0.4, 0.95, 0.12]], 0.025, 2, metal)

    // Power feed: connector on the plinth and a cable trailing off across the floor
    mesh(model, slab(0.24, 0.2, 0.14, 0.03), dark, [0.62, 0.22, 2.44])
    mesh(model, cyl(0.07, 0.08, 18), metal, [0.62, 0.22, 2.53], [Math.PI / 2, 0, 0])
    cable(model, dark, [[0.62, 0.22, 2.56], [0.56, 0.12, 2.85], [0.2, 0.06, 3.25], [-0.8, 0.06, 3.7], [-2.1, 0.06, 3.95]], 0.06, 5, metal)

    // Junction box on the lower ledge
    mesh(model, slab(0.42, 0.26, 0.2, 0.03), dark, [0.6, 0.57, -2.15], [0, 0.28, 0])
    mesh(model, slab(0.36, 0.2, 0.03, 0.01), clay, [0.62, 0.57, -2.26], [0, 0.28, 0])
    cable(model, dark, [[0.48, 0.66, -2.08], [0.32, 0.72, -1.98], [0.18, 0.7, -1.9]], 0.03, 1, metal)

    // ---- Yaw assembly (scans left/right) ----
    const yaw = group(model, [0, 1.14, 0])
    yaw.name = 'yaw'
    mesh(yaw, prism(0.78, 1.08, 1.6, 6), clay, [0, 0.8, 0])
    mesh(yaw, prism(0.82, 0.82, 0.08, 6), dark, [0, 1.3, 0])

    // Bolted flange where the housing meets the slewing ring
    mesh(yaw, cyl(1.22, 0.12, 64), dark, [0, 0.06, 0])
    mesh(yaw, cyl(1.12, 0.05, 64), clay, [0, 0.145, 0])
    scatter(yaw, prism(0.035, 0.035, 0.05, 6), metal,
        Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2; return { p: [Math.cos(a) * 1.17, 0.135, Math.sin(a) * 1.17] as V3 } }))

    // Panel bands following the pedestal taper
    const pedR = (y: number) => 1.08 - 0.175 * y
    const apothem = (y: number) => 0.866 * pedR(y)
    const tilt = 0.151
    for (const y of [0.55, 1.08]) mesh(yaw, prism(pedR(y + 0.025) + 0.03, pedR(y - 0.025) + 0.03, 0.05, 6), dark, [0, y, 0])
    // Greebles on the four side faces of the housing
    ;[60, 120, 240, 300].forEach((deg, i) => {
        const a = (deg * Math.PI) / 180
        const face = group(yaw, [apothem(0.78) * Math.cos(a), 0.78, apothem(0.78) * Math.sin(a)], [0, -a, tilt])
        greebles(face, 11 + i * 7, 0.62, 0.9, 34, gm)
    })
    // Dark seams down every housing face
    scatter(yaw, new THREE.BoxGeometry(0.012, 1.5, 0.012), dark, Array.from({ length: 12 }, (_, i) => {
        const a = Math.floor(i / 2) * (Math.PI / 3), u = i % 2 ? 0.34 : -0.34, ap = apothem(0.8) + 0.004
        return { p: [ap * Math.cos(a) - u * Math.sin(a), 0.8, ap * Math.sin(a) + u * Math.cos(a)] as V3, r: [0, -a, tilt] as V3 }
    }))
    // Rivets along the panel bands
    scatter(yaw, rivetGeo, metal, [0.55, 1.08].flatMap(y => Array.from({ length: 6 * 5 }, (_, i) => {
        const a = Math.floor(i / 5) * (Math.PI / 3), u = ((i % 5) - 2) * 0.16
        const ap = apothem(y) + 0.035
        return { p: [ap * Math.cos(a) - u * Math.sin(a), y, ap * Math.sin(a) + u * Math.cos(a)] as V3, r: [0, -a, tilt - Math.PI / 2] as V3 }
    })))

    // Front access panel: louvres, gauge, handles, status light
    const fp = group(yaw, [apothem(0.78), 0.78, 0], [0, 0, tilt])
    mesh(fp, slab(0.05, 0.95, 0.66, 0.02), dark, [0, 0, 0])
    mesh(fp, slab(0.06, 0.86, 0.56, 0.025), clay, [0.025, 0, 0])
    scatter(fp, slab(0.04, 0.03, 0.42, 0.008), dark, Array.from({ length: 5 }, (_, i) => ({ p: [0.065, -0.36 + i * 0.065, 0] as V3 })))
    mesh(fp, slab(0.02, 0.1, 0.34, 0.008), dark, [0.065, 0.33, 0])
    mesh(fp, cyl(0.022, 0.03, 12), lens, [0.075, 0.33, 0.12], [0, 0, Math.PI / 2])
    mesh(fp, cyl(0.075, 0.04, 28), dark, [0.07, 0.12, 0], [0, 0, Math.PI / 2])
    mesh(fp, cyl(0.055, 0.03, 28), clay, [0.09, 0.12, 0], [0, 0, Math.PI / 2])
    for (const z of [-0.21, 0.21]) {
        scatter(fp, slab(0.06, 0.04, 0.04, 0.01), dark, [{ p: [0.08, 0.02, z] }, { p: [0.08, 0.22, z] }])
        mesh(fp, cyl(0.016, 0.24, 10), metal, [0.11, 0.12, z])
    }
    scatter(fp, prism(0.022, 0.022, 0.03, 6), metal,
        ([[0.4, 0.24], [0.4, -0.24], [-0.4, 0.24], [-0.4, -0.24]] as [number, number][]).map(([y, z]) => ({ p: [0.07, y, z] as V3, r: [0, 0, Math.PI / 2] as V3 })))

    // Rear cooling fan (spins)
    const rear = group(yaw, [-apothem(0.8), 0.8, 0], [0, Math.PI, tilt])
    mesh(rear, cyl(0.4, 0.08, 6), dark, [0.02, 0, 0], [Math.PI / 6, 0, Math.PI / 2])
    mesh(rear, cyl(0.33, 0.1, 40), clay, [0.06, 0, 0], [0, 0, Math.PI / 2])
    mesh(rear, cyl(0.29, 0.11, 40), dark, [0.07, 0, 0], [0, 0, Math.PI / 2])
    const fan = group(rear, [0.12, 0, 0])
    fan.name = 'fan'
    scatter(fan, slab(0.012, 0.22, 0.09, 0.004), clay,
        Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return { p: [0, Math.cos(a) * 0.15, Math.sin(a) * 0.15] as V3, r: [a, 0.5, 0] as V3 } }))
    mesh(fan, cyl(0.07, 0.06, 20), metal, [0.01, 0, 0], [0, 0, Math.PI / 2])
    mesh(rear, new THREE.TorusGeometry(0.3, 0.018, 8, 48), clay, [0.15, 0, 0], [0, Math.PI / 2, 0])
    scatter(rear, new THREE.BoxGeometry(0.014, 0.6, 0.014), clay, [0, Math.PI / 3, (2 * Math.PI) / 3].map(a => ({ p: [0.155, 0, 0] as V3, r: [a, 0, 0] as V3 })))

    // Side armour with vents
    const armour: [number, number][] = [[-0.95, 0], [0.95, 0], [0.75, 0.62], [0.58, 1.55], [-0.48, 1.55], [-0.8, 0.72]]
    for (const side of [1, -1]) {
        const plate = group(yaw, [0, 0.02, side * 0.98], [-side * 0.1, 0, 0])
        mesh(plate, profile(armour, 0.16, 0.04), clay)
        scatter(plate, slab(0.62, 0.05, 0.05, 0.012), dark,
            Array.from({ length: 6 }, (_, i) => ({ p: [0.02, 0.38 + i * 0.13, side * 0.1] as V3 })))
        scatter(plate, prism(0.035, 0.035, 0.05, 6), dark,
            ([[-0.7, 0.12], [0.7, 0.12], [-0.38, 1.42], [0.45, 1.42]] as [number, number][])
                .map(([x, y]) => ({ p: [x, y, side * 0.1] as V3, r: [Math.PI / 2, 0, 0] as V3 })))
        scatter(plate, rivetGeo, metal, [
            ...Array.from({ length: 9 }, (_, i) => ({ p: [-0.85 + i * 0.13, 0.07, side * 0.1] as V3, r: [Math.PI / 2, 0, 0] as V3 })),
            ...Array.from({ length: 9 }, (_, i) => ({ p: [-0.4 + i * 0.11, 1.47, side * 0.1] as V3, r: [Math.PI / 2, 0, 0] as V3 })),
        ])
        const plateFace = group(plate, [-0.35, 0.95, side * 0.08], [0, -side * Math.PI / 2, 0])
        greebles(plateFace, side > 0 ? 301 : 337, 0.5, 0.5, 16, gm)
        scatter(plate, new THREE.BoxGeometry(1.6, 0.012, 0.012), dark, [{ p: [0, 0.3, side * 0.085] }, { p: [0.05, 1.2, side * 0.085] }])
        // Stowage bin and grab rail
        mesh(plate, slab(0.5, 0.3, 0.14, 0.03), clay, [0.55, 0.22, side * 0.15])
        mesh(plate, new THREE.BoxGeometry(0.5, 0.012, 0.15), dark, [0.55, 0.3, side * 0.155])
        mesh(plate, slab(0.08, 0.06, 0.03, 0.01), metal, [0.55, 0.2, side * 0.23])
        cable(plate, metal, [[-0.4, 1.5, side * 0.1], [-0.36, 1.66, side * 0.15], [0.42, 1.66, side * 0.15], [0.48, 1.5, side * 0.1]], 0.02)
    }

    // Trunnion yokes
    for (const side of [1, -1]) {
        mesh(yaw, slab(0.66, 1.05, 0.2, 0.05), clay, [0, 1.95, side * 0.95])
        scatter(yaw, rivetGeo, metal, [
            ...Array.from({ length: 6 }, (_, i) => ({ p: [-0.25 + i * 0.1, 1.5, side * 1.055] as V3, r: [Math.PI / 2, 0, 0] as V3 })),
            ...[-0.27, 0.27].flatMap(x => [1.6, 1.7, 1.8].map(y => ({ p: [x, y, side * 1.055] as V3, r: [Math.PI / 2, 0, 0] as V3 }))),
        ])
        mesh(yaw, cyl(0.3, 0.14, 32), dark, [0, 2.15, side * 1.1], [Math.PI / 2, 0, 0])
        mesh(yaw, cyl(0.15, 0.08, 24), metal, [0, 2.15, side * 1.2], [Math.PI / 2, 0, 0])
        scatter(yaw, prism(0.03, 0.03, 0.04, 6), dark,
            Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2; return { p: [Math.cos(a) * 0.23, 2.15 + Math.sin(a) * 0.23, side * 1.18] as V3, r: [Math.PI / 2, 0, 0] as V3 } }))
    }

    // Searchlight on the right yoke
    mesh(yaw, slab(0.14, 0.16, 0.14, 0.03), dark, [0, 2.55, 0.95])
    const light = group(yaw, [0.02, 2.72, 0.95])
    mesh(light, cyl(0.12, 0.28, 28), clay, [0, 0, 0], [0, 0, Math.PI / 2])
    mesh(light, cyl(0.14, 0.05, 28), dark, [0.15, 0, 0], [0, 0, Math.PI / 2])
    mesh(light, cyl(0.105, 0.02, 28), glass, [0.17, 0, 0], [0, 0, Math.PI / 2])
    scatter(light, new THREE.BoxGeometry(0.012, 0.21, 0.012), dark, [-0.06, 0, 0.06].map(z => ({ p: [0.185, 0, z] as V3 })))
    scatter(light, cyl(0.13, 0.015, 24), dark, Array.from({ length: 4 }, (_, i) => ({ p: [-0.12 + i * 0.035, 0, 0] as V3, r: [0, 0, Math.PI / 2] as V3 })))

    // Cable runs from the ring up into the head
    cable(yaw, dark, [[-0.85, 0.15, 0.45], [-1.25, 0.7, 0.55], [-1.18, 1.5, 0.5], [-0.95, 2.05, 0.4]], 0.055, 4, metal)
    cable(yaw, dark, [[-0.9, 0.15, 0.2], [-1.32, 0.8, 0.28], [-1.25, 1.55, 0.24], [-1.0, 2.0, 0.18]], 0.045, 4, metal)
    for (const y of [0.75, 1.45]) mesh(yaw, slab(0.18, 0.12, 0.5, 0.03), clay, [-1.24, y, 0.4])

    // Ammunition box hung on the left yoke, with a feed chute into the head
    mesh(yaw, slab(0.78, 0.6, 0.36, 0.05), clay, [-0.15, 1.7, -1.28])
    mesh(yaw, slab(0.6, 0.04, 0.38, 0.015), dark, [-0.15, 1.82, -1.28])
    mesh(yaw, slab(0.16, 0.08, 0.06, 0.02), metal, [-0.15, 1.62, -1.48])
    cable(yaw, clay, [[0.15, 1.95, -1.28], [0.45, 2.2, -1.22], [0.62, 2.35, -1.0], [0.62, 2.35, -0.75]], 0.07, 5, dark)

    // ---- Head ----
    const head = group(yaw, [0, 2.15, 0])
    const headProfile: [number, number][] = [[-1.35, -0.38], [0.5, -0.52], [1.38, -0.22], [1.44, 0.1], [0.92, 0.46], [-0.88, 0.52], [-1.42, 0.2]]
    mesh(head, profile(headProfile, 1.52, 0.07), clay)

    // Hydraulic elevation rams: they extend and retract as the head pitches
    const up = new THREE.Vector3(0, 1, 0)
    const place = (o: THREE.Object3D, from: THREE.Vector3, dir: THREE.Vector3, s0: number, s1: number, stretch = true) => {
        o.position.copy(from).addScaledVector(dir, (s0 + s1) / 2)
        o.quaternion.setFromUnitVectors(up, dir)
        if (stretch) o.scale.set(1, s1 - s0, 1)
    }
    const rams: (() => void)[] = []
    for (const side of [1, -1]) {
        const a = new THREE.Vector3(0.62, 1.0, side * 0.55)
        const bLocal = new THREE.Vector2(0.95, -0.35)
        mesh(yaw, slab(0.24, 0.2, 0.22, 0.04), dark, [a.x, a.y, a.z])
        mesh(yaw, cyl(0.045, 0.16, 14), metal, [a.x, a.y, a.z], [Math.PI / 2, 0, 0])
        const housing = mesh(yaw, cyl(0.075, 1, 20), dark)
        const collar = mesh(yaw, cyl(0.088, 0.07, 20), clay)
        const rod = mesh(yaw, cyl(0.036, 1, 14), metal)
        const pin = mesh(yaw, cyl(0.05, 0.18, 14), dark, [0, 0, 0], [Math.PI / 2, 0, 0])
        mesh(head, slab(0.2, 0.14, 0.2, 0.03), dark, [bLocal.x, bLocal.y + 0.04, side * 0.55])
        const b = new THREE.Vector3(), d = new THREE.Vector3()
        const update = () => {
            const c = Math.cos(head.rotation.z), sn = Math.sin(head.rotation.z)
            b.set(head.position.x + bLocal.x * c - bLocal.y * sn, head.position.y + bLocal.x * sn + bLocal.y * c, a.z)
            d.subVectors(b, a)
            const len = d.length()
            d.divideScalar(len)
            place(housing, a, d, 0, 0.5)
            place(collar, a, d, 0.46, 0.53, false)
            place(rod, a, d, 0.45, len)
            pin.position.copy(b)
        }
        update()
        rams.push(update)
    }

    // Greebles and grilles on the rear head sides, rivets around the armour cap
    for (const side of [1, -1]) {
        const face = group(head, [-0.85, -0.04, side * 0.76], [0, -side * Math.PI / 2, 0])
        greebles(face, side > 0 ? 101 : 131, 0.85, 0.48, 30, gm)
        scatter(head, slab(0.03, 0.025, 0.22, 0.006), dark, Array.from({ length: 5 }, (_, i) => ({ p: [0.95 + i * 0.07, -0.3, side * 0.77] as V3, r: [0, Math.PI / 2, 0] as V3 })))
    }
    scatter(head, rivetGeo, metal, [-0.49, 0.49].flatMap(z => Array.from({ length: 10 }, (_, i) => -0.72 + i * 0.12)
        .filter(x => Math.abs(x + 0.05) > 0.09).map(x => ({ p: [x, 0.61, z] as V3 }))))

    // Dark recessed panels and seam grid on the head cap and front cheeks
    scatter(head, new THREE.BoxGeometry(0.012, 0.01, 1.0), dark, [-0.62, -0.32, 0.1].map(x => ({ p: [x, 0.607, 0] as V3 })))
    scatter(head, new THREE.BoxGeometry(1.2, 0.01, 0.012), dark, [-0.3, 0.3].map(z => ({ p: [-0.18, 0.607, z] as V3 })))
    for (const side of [1, -1]) {
        const cheek = group(head, [1.0, -0.12, side * 0.76], [0, -side * Math.PI / 2, 0])
        greebles(cheek, side > 0 ? 211 : 233, 0.5, 0.3, 14, gm)
        scatter(head, new THREE.BoxGeometry(1.9, 0.012, 0.012), dark, [{ p: [-0.35, -0.36, side * 0.765] }])
    }

    // Reactive armour tiles on the front slope
    const slope = Math.atan2(0.1 - 0.46, 1.44 - 0.92)
    const nx = -Math.sin(slope), ny = Math.cos(slope)
    const tiles: { p: V3; r: V3 }[] = []
    const tileBolts: { p: V3; r: V3 }[] = []
    for (const s of [0.3, 0.68]) for (const z of [-0.27, -0.09, 0.09, 0.27]) {
        const x = 0.92 + 0.52 * s, y = 0.46 - 0.36 * s
        tiles.push({ p: [x + nx * 0.035, y + ny * 0.035, z], r: [0, 0, slope] })
        tileBolts.push({ p: [x + nx * 0.065, y + ny * 0.065, z], r: [0, 0, slope] })
    }
    scatter(head, slab(0.18, 0.05, 0.16, 0.015), clay, tiles)
    scatter(head, prism(0.02, 0.02, 0.02, 6), metal, tileBolts)

    // Rear bustle rack with stowed crates and a rolled tarp
    const rack = group(head, [-1.72, 0, 0])
    mesh(rack, slab(0.5, 0.04, 1.2, 0.015), dark, [0, -0.12, 0])
    for (const z of [-0.58, 0.58]) for (const x of [-0.24, 0.22]) between(rack, 0.018, [x, -0.12, z], [x, 0.32, z], metal, 8)
    for (const y of [0.1, 0.32]) {
        between(rack, 0.018, [-0.24, y, -0.58], [-0.24, y, 0.58], metal, 8)
        between(rack, 0.018, [-0.24, y, -0.58], [0.22, y, -0.58], metal, 8)
        between(rack, 0.018, [-0.24, y, 0.58], [0.22, y, 0.58], metal, 8)
    }
    scatter(rack, slab(0.3, 0.06, 0.06, 0.015), dark, [{ p: [0.32, -0.12, -0.45] }, { p: [0.32, -0.12, 0.45] }])
    mesh(rack, slab(0.36, 0.26, 0.4, 0.03), clay, [-0.02, 0.03, -0.3])
    mesh(rack, new THREE.BoxGeometry(0.37, 0.012, 0.41), dark, [-0.02, 0.1, -0.3])
    mesh(rack, slab(0.3, 0.18, 0.28, 0.03), clay, [0, -0.01, 0.12])
    mesh(rack, cyl(0.09, 0.26, 20), clay, [-0.05, -0.01, 0.43], [Math.PI / 2, 0, 0])
    scatter(rack, cyl(0.095, 0.02, 20), dark, [0.36, 0.5].map(z => ({ p: [-0.05, -0.01, z] as V3, r: [Math.PI / 2, 0, 0] as V3 })))

    // GPS puck, rear camera, casing ejection chute
    mesh(head, cyl(0.08, 0.035, 24), clay, [-0.95, 0.57, 0.15])
    mesh(head, slab(0.16, 0.12, 0.14, 0.025), dark, [-1.47, 0.3, -0.55])
    mesh(head, cyl(0.04, 0.04, 16), glass, [-1.56, 0.3, -0.55], [0, 0, Math.PI / 2])
    mesh(head, slab(0.3, 0.05, 0.34, 0.02), dark, [1.1, -0.5, 0], [0, 0, -0.6])
    // Armour cap and panel seams
    mesh(head, slab(1.25, 0.09, 1.05, 0.03), clay, [-0.18, 0.56, 0])
    scatter(head, new THREE.BoxGeometry(0.02, 0.012, 1.3), dark, [{ p: [0.62, 0.48, 0] }, { p: [-1.05, 0.5, 0] }])
    scatter(head, prism(0.035, 0.035, 0.03, 6), dark,
        ([[-0.72, -0.43], [-0.72, 0.43], [0.36, -0.43], [0.36, 0.43]] as [number, number][]).map(([x, z]) => ({ p: [x, 0.62, z] as V3 })))
    // Rear heat sink
    scatter(head, slab(0.06, 0.05, 1.15, 0.012), dark,
        Array.from({ length: 6 }, (_, i) => ({ p: [-1.45, -0.24 + i * 0.09, 0] as V3 })))
    // Mantlet
    mesh(head, slab(0.34, 0.66, 1.12, 0.06), dark, [1.46, -0.06, 0])
    scatter(head, prism(0.025, 0.025, 0.03, 6), metal,
        ([[0.2, -0.48], [0.2, 0.48], [-0.32, -0.48], [-0.32, 0.48]] as [number, number][]).map(([y, z]) => ({ p: [1.64, y, z] as V3, r: [0, 0, Math.PI / 2] as V3 })))
    // Coaxial gun
    mesh(head, slab(0.22, 0.12, 0.16, 0.03), dark, [1.68, 0.2, 0])
    between(head, 0.032, [1.75, 0.2, 0], [2.45, 0.2, 0], metal, 12)
    between(head, 0.045, [2.38, 0.2, 0], [2.48, 0.2, 0], dark, 12)

    // Side seams and rivet rows
    for (const side of [1, -1]) {
        scatter(head, new THREE.BoxGeometry(0.016, 0.6, 0.012), dark, [{ p: [0.72, -0.02, side * 0.765] }, { p: [1.1, -0.05, side * 0.765] }])
        scatter(head, prism(0.022, 0.022, 0.025, 6), metal,
            Array.from({ length: 5 }, (_, i) => ({ p: [0.45 + i * 0.2, 0.28 - i * 0.03, side * 0.77] as V3, r: [Math.PI / 2, 0, 0] as V3 })))
    }

    // Smoke launchers, three tubes each side
    for (const side of [1, -1]) {
        mesh(head, slab(0.3, 0.1, 0.36, 0.03), dark, [0.86, 0.5, side * 0.6])
        for (const dz of [-0.12, 0, 0.12]) {
            const a: V3 = [0.86, 0.54, side * 0.6 + dz]
            const b: V3 = [0.86 + 0.55 * 0.34, 0.54 + 0.8 * 0.34, side * 0.6 + dz + side * 0.05]
            between(head, 0.05, a, b, clay, 16)
            mesh(head, cyl(0.04, 0.02, 16), dark, b).quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0.55, 0.8, side * 0.05 / 0.34).normalize())
        }
    }

    // Commander hatch, hinge, handle, vision blocks, lifting eyes
    mesh(head, cyl(0.3, 0.03, 40), dark, [-0.3, 0.62, 0.05])
    mesh(head, cyl(0.26, 0.05, 40), clay, [-0.3, 0.645, 0.05])
    mesh(head, cyl(0.035, 0.32, 12), metal, [-0.6, 0.655, 0.05], [Math.PI / 2, 0, 0])
    cable(head, metal, [[-0.18, 0.665, -0.05], [-0.15, 0.72, 0], [-0.15, 0.72, 0.1], [-0.18, 0.665, 0.15]], 0.014)
    for (const z of [0.02, 0.3]) {
        mesh(head, slab(0.12, 0.1, 0.22, 0.02), clay, [0.36, 0.66, z])
        mesh(head, slab(0.02, 0.05, 0.18, 0.006), dark, [0.425, 0.67, z], [0, 0, -0.3])
    }
    for (const z of [-0.48, 0.48]) mesh(head, new THREE.TorusGeometry(0.055, 0.016, 8, 20), metal, [-0.05, 0.66, z], [0, Math.PI / 2, 0])

    // Twin finned barrels
    const slides: THREE.Object3D[] = []
    const flashes: THREE.Object3D[] = []
    for (const z of [-0.3, 0.3]) {
        const b = group(head, [1.6, -0.06, z], [0, 0, -Math.PI / 2])
        mesh(b, cyl(0.17, 0.3), dark, [0, 0.15, 0])
        mesh(b, cyl(0.13, 0.75), clay, [0, 0.675, 0])
        mesh(b, new THREE.CylinderGeometry(0.135, 0.18, 0.1, 28), dark, [0, 0.35, 0])
        scatter(b, cyl(0.17, 0.035), dark, Array.from({ length: 7 }, (_, i) => ({ p: [0, 0.4 + i * 0.09, 0] as V3 })))
        // The barrel, brake and flash slide back on each shot
        const slide = group(b)
        slides.push(slide)
        mesh(slide, cyl(0.065, 0.8, 20), metal, [0, 1.45, 0])
        mesh(slide, cyl(0.085, 0.06, 20), dark, [0, 1.2, 0])
        mesh(slide, cyl(0.078, 0.04, 20), dark, [0, 1.62, 0])
        mesh(slide, prism(0.11, 0.11, 0.3, 6), dark, [0, 1.98, 0])
        mesh(slide, cyl(0.118, 0.05), clay, [0, 1.94, 0])
        scatter(slide, new THREE.BoxGeometry(0.26, 0.035, 0.07), dark, [1.9, 1.98, 2.06].map(y => ({ p: [0, y, 0] as V3 })))
        const flash = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.42, 14, 1, true), flashMat)
        flash.position.set(0, 2.34, 0)
        flash.visible = false
        slide.add(flash)
        flashes.push(flash)
    }

    // Sensor optic, kept in the site’s cobalt accent color.
    mesh(head, cyl(0.1, 0.22, 18), dark, [0.5, 0.66, -0.45])
    mesh(head, slab(0.46, 0.28, 0.34, 0.05), clay, [0.55, 0.88, -0.45])
    mesh(head, cyl(0.11, 0.06, 28), dark, [0.8, 0.88, -0.45], [0, 0, Math.PI / 2])
    mesh(head, cyl(0.075, 0.07, 28), lens, [0.82, 0.88, -0.45], [0, 0, Math.PI / 2])

    // Radar dish on a mast
    mesh(head, cyl(0.045, 0.62, 12), clay, [-0.62, 0.84, 0.45])
    mesh(head, cyl(0.07, 0.08, 16), dark, [-0.62, 1.15, 0.45])
    const dishSpin = group(head, [-0.62, 1.2, 0.45])
    mesh(dishSpin, slab(0.05, 0.16, 0.05, 0.01), dark, [0, 0.06, 0])
    const dish = group(dishSpin, [0, 0.1, 0], [-1.0, 0, 0])
    const dishPts = Array.from({ length: 10 }, (_, i) => { const r = (0.4 * i) / 9; return new THREE.Vector2(r, 0.85 * r * r) })
    mesh(dish, new THREE.LatheGeometry(dishPts, 40), clayTwoSided)
    mesh(dish, cyl(0.016, 0.3, 8), dark, [0, 0.15, 0])
    mesh(dish, new THREE.SphereGeometry(0.035, 12, 8), dark, [0, 0.3, 0])

    // Antennas
    for (const [x, z, len] of [[-1.05, -0.5, 1.35], [-1.22, -0.22, 0.85]] as [number, number, number][]) {
        mesh(head, cyl(0.07, 0.14, 14), dark, [x, 0.6, z])
        mesh(head, cyl(0.018, len, 8), clay, [x, 0.67 + len / 2, z])
        mesh(head, cyl(0.032, 0.05, 10), dark, [x, 0.67 + len * 0.55, z])
        mesh(head, new THREE.SphereGeometry(0.035, 12, 8), len > 1 ? beacon : clay, [x, 0.67 + len, z])
    }

    model.position.y = -1.7

    const animate = (t: number) => {
        yaw.rotation.y = Math.sin(t * 0.35) * 0.55
        head.rotation.z = Math.sin(t * 0.5 + 1) * 0.09
        rams.forEach(update => update())
        pinion.rotation.y = -yaw.rotation.y * (56 / 12)
        fan.rotation.x = t * 5
        dishSpin.rotation.y = t * 1.2
        // Short alternating burst every six seconds
        const cycle = t % 6
        slides.forEach((slide, i) => {
            const tau = cycle - 3 - i * 0.22
            const kick = tau < 0 || tau > 1.2 ? 0 : tau < 0.04 ? tau / 0.04 : Math.exp(-(tau - 0.04) * 7)
            slide.position.y = -0.16 * kick
            flashes[i].visible = tau >= 0 && tau < 0.06
        })
        lensMat.emissiveIntensity = 1.3 + Math.sin(t * 2.2) * 0.35
        beacon.emissiveIntensity = t % 1.6 < 0.12 ? 3 : 0.2
    }
    return { model, animate }
}

export default function ClayTurntable({ className = '' }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        } catch {
            return
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 0.85
        renderer.domElement.style.touchAction = 'pan-y'
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const pmrem = new THREE.PMREMGenerator(renderer)
        const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        scene.environment = envMap
        scene.environmentIntensity = 0.3

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.set(9.5, 6.4, 9.5)

        scene.add(new THREE.HemisphereLight(0xeef1f5, 0x2a2c30, 0.55))
        const key = new THREE.DirectionalLight(0xffffff, 2.9)
        key.position.set(6, 10, 4)
        key.castShadow = true
        key.shadow.mapSize.set(2048, 2048)
        Object.assign(key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 })
        key.shadow.radius = 5
        key.shadow.bias = -0.0004
        key.shadow.normalBias = 0.025
        scene.add(key)
        const rim = new THREE.DirectionalLight(0xdfe6ff, 1.3)
        rim.position.set(-8, 4, -6)
        scene.add(rim)

        const clay = new THREE.MeshStandardMaterial({ color: 0x6b6f76, roughness: 0.48, metalness: 0.1 })
        const mats: Mats = {
            clay,
            dark: new THREE.MeshStandardMaterial({ color: 0x1f2125, roughness: 0.5, metalness: 0.2 }),
            metal: new THREE.MeshStandardMaterial({ color: 0x9a9ea5, roughness: 0.22, metalness: 0.92 }),
            lens: new THREE.MeshStandardMaterial({ color: 0x1b1c1f, emissive: 0x3f62ad, emissiveIntensity: 1.6, roughness: 0.15 }),
            clayTwoSided: new THREE.MeshStandardMaterial({ color: 0x6b6f76, roughness: 0.48, metalness: 0.1, side: THREE.DoubleSide }),
        }
        const { model, animate } = buildModel(mats)
        scene.add(model)

        const floor = new THREE.Mesh(new THREE.CircleGeometry(10, 64), new THREE.ShadowMaterial({ opacity: 0.38 }))
        floor.rotation.x = -Math.PI / 2
        floor.position.y = -1.7
        floor.receiveShadow = true
        scene.add(floor)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableDamping = true
        controls.minPolarAngle = Math.PI / 5
        controls.maxPolarAngle = Math.PI / 2.15
        controls.autoRotate = !reducedMotion
        controls.autoRotateSpeed = 0.6
        controls.target.set(0, 0.55, 0)

        const resize = () => {
            const { clientWidth, clientHeight } = mount
            if (!clientWidth || !clientHeight) return
            renderer.setSize(clientWidth, clientHeight)
            camera.aspect = clientWidth / clientHeight
            // Pull back on tall, narrow viewports so the barrels and antennas stay in frame
            const distance = camera.aspect < 1 ? 16.5 / Math.max(camera.aspect, 0.6) * 0.62 + 7 : 16.5
            camera.position.setLength(distance)
            camera.updateProjectionMatrix()
        }
        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(mount)

        let frame = 0
        let visible = true
        const clock = new THREE.Clock()
        const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
        io.observe(mount)
        const tick = () => {
            frame = requestAnimationFrame(tick)
            if (!visible) return
            // The head scans and pitches, the dish turns and the guns fire a short burst
            if (!reducedMotion) animate(clock.getElapsedTime())
            controls.update()
            renderer.render(scene, camera)
        }
        tick()

        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
            io.disconnect()
            controls.dispose()
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose()
                    const material = object.material as THREE.Material | THREE.Material[]
                    if (Array.isArray(material)) material.forEach(m => m.dispose()); else material.dispose()
                }
            })
            envMap.dispose()
            pmrem.dispose()
            renderer.dispose()
            renderer.domElement.remove()
        }
    }, [])

    return <div ref={mountRef} className={`cursor-grab active:cursor-grabbing ${className}`} role="img" aria-label="Clay render of a detailed hard-surface sentry turret with twin barrels and moving parts, turning slowly. Drag to orbit." />
}
