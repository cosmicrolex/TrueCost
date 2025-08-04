from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup

app = FastAPI()

@app.get("/compare")
def compare_products(product: str):
    # Dummy static results for now
    return {
        "Amazon": f"https://www.amazon.in/s?k={product}",
        "Flipkart": f"https://www.flipkart.com/search?q={product}",
        "Myntra": f"https://www.myntra.com/{product.replace(' ', '-')}"
    }
