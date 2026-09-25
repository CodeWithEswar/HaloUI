import fs from 'fs';
import path from 'path';

console.log('--- Verifying Pagination (Navigation 03) ---');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

// 1. Component file
const compPath = 'D:/HaloUI/components/ui/pagination.tsx';
assert(fs.existsSync(compPath), 'components/ui/pagination.tsx exists');

const compContent = fs.readFileSync(compPath, 'utf8');

// Exports
assert(compContent.includes('export {'), 'Exports block exists');
assert(compContent.includes('Pagination,'), 'Pagination exported');
assert(compContent.includes('PaginationContent,'), 'PaginationContent exported');
assert(compContent.includes('PaginationItem,'), 'PaginationItem exported');
assert(compContent.includes('PaginationLink,'), 'PaginationLink exported');
assert(compContent.includes('PaginationPrevious,'), 'PaginationPrevious exported');
assert(compContent.includes('PaginationNext,'), 'PaginationNext exported');
assert(compContent.includes('PaginationEllipsis,'), 'PaginationEllipsis exported');

// Zero Lucide
assert(!compContent.includes('lucide-react'), 'Zero Lucide imports in pagination.tsx');

// Correct utils
assert(compContent.includes('@/lib/utils'), 'Correct @/lib/utils cn import');

// 2. Registry file
const regPath = 'D:/HaloUI/public/r/pagination.json';
assert(fs.existsSync(regPath), 'public/r/pagination.json exists');

const regJson = JSON.parse(fs.readFileSync(regPath, 'utf8'));
assert(regJson.name === 'pagination', 'Registry item name is "pagination"');
assert(regJson.dependencies.includes('@hugeicons/core-free-icons'), 'Declared "@hugeicons/core-free-icons" dependency');
assert(regJson.dependencies.includes('@hugeicons/react'), 'Declared "@hugeicons/react" dependency');

// 3. registry.json
const rootRegPath = 'D:/HaloUI/public/r/registry.json';
assert(fs.existsSync(rootRegPath), 'public/r/registry.json exists');
const rootReg = JSON.parse(fs.readFileSync(rootRegPath, 'utf8'));
assert(rootReg.items.some(i => i.name === 'pagination'), 'pagination registered in public/r/registry.json');

// 4. Docs files
assert(fs.existsSync('D:/HaloUI/app/components/pagination/layout.tsx'), 'app/components/pagination/layout.tsx exists');
assert(fs.existsSync('D:/HaloUI/app/components/pagination/page.tsx'), 'app/components/pagination/page.tsx exists');
assert(fs.existsSync('D:/HaloUI/app/components/pagination/pagination-preview-stage.tsx'), 'app/components/pagination/pagination-preview-stage.tsx exists');
assert(fs.existsSync('D:/HaloUI/app/components/pagination/pagination-demonstrations.tsx'), 'app/components/pagination/pagination-demonstrations.tsx exists');

console.log('\n🎉 ALL PAGINATION CHECKS PASSED PERFECTLY!\n');
