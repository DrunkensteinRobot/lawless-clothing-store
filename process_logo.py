from PIL import Image, ImageOps
import sys

try:
    img_path = r"c:\Users\KHASHANE MUELETSHEDZ\.gemini\antigravity\brain\7745cc1d-098b-4cf6-a3ff-28fbf787139f\media__1780678328651.png"
    out_path = r"c:\Users\KHASHANE MUELETSHEDZ\Documents\WebProjects\Lawless Clothing\storefront\public\logo.png"
    
    img = Image.open(img_path).convert("L")
    alpha = ImageOps.invert(img)
    
    new_img = Image.new("RGBA", img.size, (255, 255, 255, 255))
    new_img.putalpha(alpha)
    new_img.save(out_path, "PNG")
    print("Logo processed and saved as transparent white.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
