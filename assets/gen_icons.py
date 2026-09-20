"""Icônes PWA — ouroboros raffiné (corps dégradé, tête sculptée, œil)."""
import math
from PIL import Image, ImageDraw

IVORY = (248, 244, 236, 255)
SAGE = (127, 168, 154)      # accent
SAGE_DEEP = (74, 108, 96)   # accent profond

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def draw_icon(size, maskable=False):
    S = size * 4
    base = IVORY if not maskable else (SAGE + (255,))
    img = Image.new("RGBA", (S, S), base)
    d = ImageDraw.Draw(img)
    c = S / 2
    R = S * 0.30
    w = S * 0.060
    ring_col = SAGE if not maskable else IVORY[:3]
    ring_deep = SAGE_DEEP if not maskable else IVORY[:3]

    def pt(angle_deg, r=R):
        a = math.radians(angle_deg)
        return (c + r * math.cos(a), c + r * math.sin(a))

    # Corps : anneau dégradé, tracé en petits segments (queue -> tête)
    a_tail, a_head = 195, 235          # gap en haut-gauche
    sweep = 360 - (a_head - a_tail)    # long way
    steps = 240
    for i in range(steps):
        t = i / (steps - 1)
        ang = a_head + sweep * t       # de la tête, tour complet, vers la queue
        col = lerp(ring_deep, ring_col, t)          # dégradé
        ww = w * (1 - 0.45 * t)                     # s'effile vers la queue
        x, y = pt(ang)
        rr = ww / 2
        d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=col + (255,))

    # Anneau interne fin
    ri = R * 0.66
    d.ellipse([c - ri, c - ri, c + ri, c + ri], outline=(ring_col + (90,)) if not maskable else (IVORY[:3] + (90,)), width=max(1, int(S * 0.006)))

    # Tête (bulbe sculpté) à l'extrémité tête
    hx, hy = pt(a_head + 2, R)
    # léger décalage vers l'extérieur/haut
    ox, oy = pt(a_head - 6, R + w * 0.5)
    hr = w * 1.35
    d.ellipse([ox - hr, oy - hr, ox + hr, oy + hr], fill=ring_deep + (255,))
    # museau vers la queue
    mx, my = pt(a_head + 14, R)
    d.ellipse([mx - w * 0.55, my - w * 0.55, mx + w * 0.55, my + w * 0.55], fill=ring_deep + (255,))

    # Œil
    ex, ey = ox, oy
    er = max(2, int(w * 0.28))
    eye_col = IVORY[:3] if not maskable else SAGE
    d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=eye_col + (255,))

    return img.resize((size, size), Image.LANCZOS)

draw_icon(192).save("assets/icon-192.png")
draw_icon(512).save("assets/icon-512.png")
draw_icon(512, maskable=True).save("assets/icon-maskable-512.png")
print("icons ok")
