import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = await readFile(path.join(root, "app", "icon.svg"));
const sizes = [16, 32, 48, 64];
const images = await Promise.all(
  sizes.map((size) => sharp(source, { density: 384 }).resize(size, size).png().toBuffer()),
);

const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(0, 0);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);

let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory.writeUInt8(sizes[index], entry);
  directory.writeUInt8(sizes[index], entry + 1);
  directory.writeUInt8(0, entry + 2);
  directory.writeUInt8(0, entry + 3);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});

await writeFile(path.join(root, "app", "favicon.ico"), Buffer.concat([directory, ...images]));
await writeFile(path.join(root, "public", "brand", "haloui-mark-64.png"), images.at(-1));

