import os
import re

directories = ['c:/Users/aarya/Desktop/idbi/src/features', 'c:/Users/aarya/Desktop/idbi/src/app/(dashboard)', 'c:/Users/aarya/Desktop/idbi/src/components']

replacements = {
    r'(?<![a-zA-Z0-9:-])grid-cols-4(?![a-zA-Z0-9:-])': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    r'(?<![a-zA-Z0-9:-])grid-cols-3(?![a-zA-Z0-9:-])': 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    r'(?<![a-zA-Z0-9:-])grid-cols-2(?![a-zA-Z0-9:-])': 'grid-cols-1 md:grid-cols-2',
    # Replace hardcoded gaps/paddings occasionally
    r'(?<![a-zA-Z0-9:-])p-8(?![a-zA-Z0-9:-])': 'p-4 md:p-6 lg:p-8',
    r'(?<![a-zA-Z0-9:-])p-6(?![a-zA-Z0-9:-])': 'p-4 md:p-6',
    r'(?<![a-zA-Z0-9:-])gap-8(?![a-zA-Z0-9:-])': 'gap-4 md:gap-6 lg:gap-8',
    r'(?<![a-zA-Z0-9:-])gap-6(?![a-zA-Z0-9:-])': 'gap-4 md:gap-6',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content)
        
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))
