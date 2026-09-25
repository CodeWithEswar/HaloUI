import cp from 'child_process';
import http from 'http';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = cp.spawn(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9224',
  'http://localhost:3000/components/file-input'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9224/json');
    const pages = await res.json();
    const page = pages.find(p => p.url.includes('components/file-input'));
    if (!page) {
      console.log('No page found');
      proc.kill();
      return;
    }
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(async () => {
            let el = document.querySelector('input[type="file"]');
            for (let i = 0; i < 30 && !el; i++) {
              await new Promise(r => setTimeout(r, 200));
              el = document.querySelector('input[type="file"]');
            }
            if (!el) return { error: 'Element not found after waiting' };
            const field = el.closest('[data-slot="field"]') || el.parentElement;

            // Inject CSS test
            let style = document.querySelector('#test-file-style');
            if (!style) {
              style = document.createElement('style');
              style.id = 'test-file-style';
              document.head.appendChild(style);
            }
            
            // Test 1:
            style.textContent = [
              '#stage-file-input {',
              '  display: flex !important;',
              '  align-items: center !important;',
              '  padding-top: 0 !important;',
              '  padding-bottom: 0 !important;',
              '  padding-left: 0.5rem !important;',
              '  padding-right: 0.75rem !important;',
              '  line-height: normal !important;',
              '}',
              '#stage-file-input::file-selector-button {',
              '  display: inline-flex !important;',
              '  align-items: center !important;',
              '  justify-content: center !important;',
              '  vertical-align: middle !important;',
              '  margin-top: auto !important;',
              '  margin-bottom: auto !important;',
              '  margin-right: 0.75rem !important;',
              '  height: 1.75rem !important;',
              '  line-height: 1 !important;',
              '  padding: 0 0.75rem !important;',
              '  border-radius: 0.5rem !important;',
              '}'
            ].join('\\n');

            el.scrollIntoView({ block: 'center', inline: 'center' });
            const r = (field || el).getBoundingClientRect();
            return {
              clip: {
                x: Math.max(0, Math.round(r.x - 30)),
                y: Math.max(0, Math.round(r.y - 30)),
                width: Math.round(r.width + 60),
                height: Math.round(r.height + 60),
                scale: 1
              }
            };
          })()`,
          awaitPromise: true,
          returnByValue: true
        }
      }));
    });
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        const val = msg.result.result.value;
        if (val.error) {
          console.error(val.error);
          proc.kill();
          return;
        }
        // Capture screenshot of the clip
        ws.send(JSON.stringify({
          id: 2,
          method: 'Page.captureScreenshot',
          params: {
            clip: val.clip
          }
        }));
      } else if (msg.id === 2) {
        const base64 = msg.result.data;
        const buf = Buffer.from(base64, 'base64');
        import('fs').then(fs => {
          fs.writeFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/009455c7-c3d4-4692-8eb7-27dec90bfa21/test_alignment.png', buf);
          console.log('Saved test_alignment.png');
          ws.close();
          proc.kill();
          process.exit(0);
        });
      }
    });
  } catch(e) {
    console.error(e);
    proc.kill();
  }
}, 2000);
