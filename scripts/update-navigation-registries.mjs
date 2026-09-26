import fs from 'fs';

const componentsToSync = [
  { name: 'sidebar', file: 'components/ui/sidebar.tsx' },
  { name: 'dock', file: 'components/ui/dock.tsx' },
  { name: 'menubar', file: 'components/ui/menubar.tsx' },
  { name: 'sidebar-rail', file: 'components/ui/sidebar-rail.tsx' },
];

for (const { name, file } of componentsToSync) {
  const jsonPath = `public/r/${name}.json`;
  if (fs.existsSync(jsonPath)) {
    const item = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const content = fs.readFileSync(file, 'utf8');
    const targetFile = item.files.find(f => f.path === file || f.target === file);
    if (targetFile) {
      targetFile.content = content;
    }
    fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2), 'utf8');
    console.log(`✓ Updated public/r/${name}.json with latest content`);
  }
}
