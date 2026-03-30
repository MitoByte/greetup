from playwright.sync_api import sync_playwright
import sys

# Check if a URL was passed as an argument
if len(sys.argv) < 2:
    print("Usage: python script.py <URL>")
    sys.exit(1)

# Get the URL from the command-line argument
url = sys.argv[1]

def get_url_contents(url: str) -> str:
    with sync_playwright() as p:
        # Launch a browser (e.g., Chromium)
        browser = p.chromium.launch(headless=True)  # Use headless=False to see the browser window
        page = browser.new_page()
    
        try:
            # Open the URL
            page.goto(url)

            # Wait for JavaScript to load (optional)
            page.wait_for_load_state("networkidle")  # Wait until network activity stops

            # Get the rendered HTML content
            html_content = page.content()
            return html_content
        finally:
            # Close the browser
            browser.close()
 
print(get_url_contents(url));