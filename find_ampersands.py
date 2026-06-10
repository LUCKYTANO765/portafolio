import re

def find_ampersands():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
        
    pattern = r'&(?!([lL][tT]|[gG][tT]|[aA][mM][pP]|[qQ][uU][oO][tT]|[aA][pP][oO][sS]|[cC][oO][pP][yY]|[nN][bB][sS][pP]);)'
    matches = list(re.finditer(pattern, html))
    if not matches:
        print("No literal ampersands found!")
        return
        
    for m in matches:
        start = max(0, m.start() - 40)
        end = min(len(html), m.end() + 40)
        snippet = html[start:end].replace('\n', ' ')
        print(f"Index {m.start()}: {snippet}")

if __name__ == '__main__':
    find_ampersands()
