// Gerekli Node.js modülleri
const http = require('http'); // Web sunucusu kurmak için
const vm = require('vm');     // Kullanıcı kodunu GÜVENLİ çalıştırmak için (ÇOK ÖNEMLİ)

const port = 3000;

// === Gelişmiş Ders Veritabanımız ===
const lessons = {
    '1': {
        title: "Ders 1: Değişkenler ve console.log",
        prompt: "Bir 'mesaj' adında değişken oluşturun ve içine 'Merhaba Dünya' yazın. Sonra bu değişkeni console.log ile ekrana basın.",
        starterCode: "const mesaj = 'Merhaba Dünya';\nconsole.log(mesaj);",
        check: { type: 'output', value: 'Merhaba Dünya' }
    },
    '2': {
        title: "Ders 2: Fonksiyonlar",
        prompt: "İki sayıyı toplayan ve sonucu döndüren 'topla' adında bir fonksiyon yazın. Sonra 'topla(5, 3)' fonksiyonunu console.log ile ekrana basın.",
        starterCode: "function topla(a, b) {\n  return a + b;\n}\n\nconsole.log(topla(5, 3));",
        check: { type: 'output', value: '8' }
    },
    '3': {
        title: "Ders 3: Döngüler",
        prompt: "1'den 5'e kadar olan sayıları (5 dahil) alt alta console.log ile yazdıran bir 'for' döngüsü oluşturun.",
        starterCode: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
        check: { type: 'output', value: '1\n2\n3\n4\n5' }
    },
    '4': {
        title: "Ders 4: 'var' vs 'let' (Tekrar Tanımlama)",
        prompt: "Aşağıdaki kod çalışır çünkü 'var', aynı değişkeni tekrar tanımlamana izin verir. Şimdi, her iki 'var' kelimesini de 'let' ile değiştirin. 'Çalıştır'a bastığınızda bir 'SyntaxError' almanız, bu dersi geçtiğiniz anlamına gelir!",
        starterCode: "var mesaj = \"Merhaba\";\nvar mesaj = \"Dünya\";\nconsole.log(mesaj);",
        check: { type: 'error', value: "Identifier 'mesaj' has already been declared" }
    },
    '5': {
        title: "Ders 5: Block Scope vs Function Scope",
        prompt: "'var' fonksiyon kapsamlıdır (function-scoped), 'let' ise blok kapsamlıdır (block-scoped). Aşağıdaki kod, 'let' ile tanımlanan 'bScope' değişkenine blok dışından erişmeye çalıştığı için hata verecektir. Dersi geçmek için hata veren 'console.log(bScope);' satırını silin veya yorum satırı yapın.",
        starterCode: "if (true) {\n  var fScope = \"Ben dışarı sızarım!\";\n  let bScope = \"Ben bu bloktayım...\";\n}\n\nconsole.log(fScope);\nconsole.log(bScope); // Bu satır hata verir!",
        check: { type: 'output', value: 'Ben dışarı sızarım!' }
    },
    '6': {
        title: "Ders 6: Hoisting (Yukarı Taşınma)",
        prompt: "'var' ile tanımlanan değişkenler 'hoist' edilir (yukarı taşınır) ve 'undefined' olarak başlatılır. 'let' ise hoist edilir ama 'Geçici Ölü Bölge' (TDZ) denen bir durumda kalır ve erişilemez. Bu yüzden ilk console.log 'undefined' çıktısı verirken, ikincisi 'ReferenceError' verir. Dersi geçmek için hata veren ikinci bloğu yorum satırı yapın.",
        starterCode: "// 1. 'var' ile Hoisting:\nconsole.log(hoistedVar);\nvar hoistedVar = \"Ben varım\";\n\n// 2. 'let' ile TDZ Hatası:\nconsole.log(hoistedLet);\nlet hoistedLet = \"Ben de varım\";",
        check: { type: 'output', value: 'undefined' }
    },
    '7': {
        title: "Ders 7: const ve Immutability",
        prompt: "'const', bir değişkene yeniden atama yapılmasını engeller (re-assignment). Aşağıdaki kod, 'pi' sabitine yeniden atama yapmaya çalıştığı için bir 'TypeError' fırlatacaktır. Bu hatayı görmeniz dersin amacıdır! Başka bir şeye dokunmadan 'Çalıştır'a basın.",
        starterCode: "const pi = 3.14;\n\npi = 3; // Hata! Bir sabiti değiştiremezsin.\n\nconsole.log(pi);",
        check: { type: 'error', value: 'Assignment to constant variable' }
    }
};

// === NODE.JS SUNUCUMUZ ===
// 'http.createServer' içindeki bu fonksiyon HER istekte çalışır
const server = http.createServer((req, res) => {
    
    // Gelen isteğin URL'sini ve metodunu al
    const { url, method } = req;

    // === Geliştirilmiş Yönlendirme (Routing) ===
    // Artık 'if... else if... else' kullanarak her isteğin
    // sadece BİR bloğa girmesini sağlıyoruz.

    try {
        // 1. ANA SAYFA İSTEĞİ (GET /)
        if (url === '/' && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(LABORATUVAR_ARAYUZU_HTML());
        } 
        
        // 2. DERS BİLGİSİ İSTEĞİ (GET /lesson?id=...)
        else if (url.startsWith('/lesson') && method === 'GET') {
            const urlParams = new URL(url, `http://${req.headers.host}`);
            const lessonId = urlParams.searchParams.get('id');
            const lesson = lessons[lessonId];

            if (lesson) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(lesson));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Ders bulunamadı.' }));
            }
        } 
        
        // 3. KOD ÇALIŞTIRMA İSTEĞİ (POST /execute)
        else if (url === '/execute' && method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const { code, lessonId } = JSON.parse(body);
                    const lesson = lessons[lessonId];
                    if (!lesson) throw new Error("Geçersiz ders ID'si");

                    const result = executeCodeSafely(code);
                    const check = lesson.check;
                    const outputString = result.logs.join('\n');
                    result.success = false;

                    if (check.type === 'output') {
                        if (outputString === check.value && !result.error) {
                            result.success = true;
                        }
                    } else if (check.type === 'error') {
                        if (result.error && result.error.includes(check.value)) {
                            result.success = true;
                        }
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));

                } catch (err) {
                    // JSON parse hatası veya iç mantık hatası
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Geçersiz istek: ' + err.message }));
                }
            });
        } 
        
        // 4. BULUNAMAYAN SAYFALAR
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Kayboldun. Laboratuvara dön: http://localhost:3000');
        }

    } catch (serverError) {
        // Sunucuda beklenmedik bir hata olursa
        console.error("Sunucu Hatası:", serverError);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Sunucuda bir hata oluştu.");
    }
});

/**
 * == GÜVENLİK MERKEZİ (VM Modülü) ==
 */
function executeCodeSafely(userCode) {
    const consoleLogs = []; 
    const sandbox = {
        console: {
            log: (...args) => {
                consoleLogs.push(args.map(String).join(' '));
            }
        }
    };
    const context = vm.createContext(sandbox);

    try {
        vm.runInContext(userCode, context, { timeout: 1000 });
        return { logs: consoleLogs, error: null, success: false };
    } catch (err) {
        // SyntaxError, ReferenceError, TypeError vb. hataları yakala
        return { logs: consoleLogs, error: err.toString(), success: false };
    }
}

// Sunucuyu başlat
server.listen(port, () => {
    console.log(`🚀 JavaScript Laboratuvarı (Gelişmiş Sürüm) çalışıyor!`);
    console.log(`🚀 http://localhost:${port} adresine git ve öğrenmeye başla!`);
});

// -----------------------------------------------------------------
// ARAYÜZ BÖLÜMÜ: Tarayıcıya Gönderilecek Dev HTML/CSS/JS
// -----------------------------------------------------------------
function LABORATUVAR_ARAYUZU_HTML() {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Interaktif JS Laboratuvarı</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #1e1e1e; color: #d4d4d4;
            margin: 0; display: flex; height: 100vh; flex-direction: column;
        }
        header {
            background: #333; padding: 10px 20px; border-bottom: 2px solid #569cd6;
            display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;
        }
        header h1 { color: #569cd6; margin: 0; font-size: 1.5rem; }
        #lesson-nav { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 5px; }
        #lesson-nav button {
            background: #444; color: white; border: none; padding: 10px 15px;
            cursor: pointer; font-size: 0.9rem; border-radius: 5px;
        }
        #lesson-nav button.active { background: #569cd6; }

        main { display: flex; flex: 1; overflow: hidden; }
        
        #sidebar {
            width: 30%; background: #252526; padding: 20px;
            display: flex; flex-direction: column; border-right: 1px solid #444;
            overflow-y: auto;
        }
        #sidebar h2 { margin-top: 0; color: #569cd6; }
        #lesson-prompt { font-size: 1.1rem; line-height: 1.6; white-space: pre-wrap; }
        #sidebar code { background: #333; padding: 2px 5px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; }

        #editor-container {
            width: 70%; display: flex; flex-direction: column;
        }
        #code-editor {
            flex: 1; background: #1e1e1e; color: #d4d4d4;
            border: none; padding: 20px; font-family: 'Courier New', Courier, monospace;
            font-size: 1.2rem; line-height: 1.5; outline: none;
            resize: none;
        }
        
        #controls { background: #252526; padding: 10px; border-top: 1px solid #444; }
        #run-btn {
            background: #4CAF50; color: white; border: none; padding: 10px 20px;
            font-size: 1.1rem; cursor: pointer; border-radius: 5px;
            float: right;
        }
        #run-btn:hover { background: #45a049; }

        #console-container {
            height: 250px; background: #1e1e1e; border-top: 1px solid #444;
            display: flex; flex-direction: column;
        }
        #console-header {
            background: #333; padding: 5px 10px; font-weight: bold;
        }
        #console-output {
            flex: 1; padding: 10px; font-family: 'Courier New', Courier, monospace;
            white-space: pre-wrap;
            overflow-y: auto;
            font-size: 1.1rem;
        }
        .console-success { color: #4CAF50; }
        .console-error { color: #f44336; }
        .console-info { color: #d4d4d4; }
    </style>
</head>
<body>
    <header>
        <h1>Node.js Interaktif JS Laboratuvarı</h1>
        <nav id="lesson-nav">
            <button data-lesson="1" class="active">Ders 1</button>
            <button data-lesson="2">Ders 2</button>
            <button data-lesson="3">Ders 3</button>
            <button data-lesson="4">Ders 4</button>
            <button data-lesson="5">Ders 5</button>
            <button data-lesson="6">Ders 6</button>
            <button data-lesson="7">Ders 7</button>
        </nav>
    </header>

    <main>
        <section id="sidebar">
            <h2 id="lesson-title">Ders Yükleniyor...</h2>
            <p id="lesson-prompt">Lütfen bekleyin...</p>
        </section>

        <section id="editor-container">
            <textarea id="code-editor" spellcheck="false"></textarea>
            
            <div id="controls">
                <button id="run-btn">Çalıştır (Run)</button>
            </div>
            
            <div id="console-container">
                <div id="console-header">Konsol Çıktısı</div>
                <pre id="console-output"></pre>
            </div>
        </section>
    </main>

    <script>
        // === TARAYICI TARAFLI JAVASCRIPT ===

        const lessonNav = document.getElementById('lesson-nav');
        const lessonTitle = document.getElementById('lesson-title');
        const lessonPrompt = document.getElementById('lesson-prompt');
        const codeEditor = document.getElementById('code-editor');
        const runBtn = document.getElementById('run-btn');
        const consoleOutput = document.getElementById('console-output');

        let currentLessonId = '1';

        // 1. Dersi Yükleme Fonksiyonu
        async function fetchLesson(lessonId) {
            try {
                const response = await fetch('/lesson?id=' + lessonId);
                if (!response.ok) {
                    throw new Error(\`Sunucudan ders alınamadı: \${response.status}\`);
                }
                
                const lesson = await response.json();

                if (lesson.error) {
                    throw new Error(lesson.error);
                }

                currentLessonId = lessonId;
                lessonTitle.innerText = lesson.title;
                // HTML etiketlerini (code gibi) düz metin yerine yorumlayabilmesi için innerHTML kullan
                lessonPrompt.innerHTML = lesson.prompt; 
                codeEditor.value = lesson.starterCode;
                consoleOutput.innerText = "// Başlamak için 'Çalıştır' düğmesine basın.";
                consoleOutput.className = 'console-info';

                document.querySelectorAll('#lesson-nav button').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.lesson === lessonId);
                });

            } catch (err) {
                // HATA OLURSA ARTIK BURASI ÇALIŞACAK VE KULLANICIYI BİLGİLENDİRECEK
                lessonTitle.innerText = "Hata!";
                lessonPrompt.innerText = "Ders yüklenemedi. Sunucu çalışıyor mu? Hata: " + err.message;
                consoleOutput.innerText = err.toString();
                consoleOutput.className = 'console-error';
            }
        }

        // 2. Kodu Çalıştırma Fonksiyonu
        async function executeCode() {
            const codeToRun = codeEditor.value;
            consoleOutput.innerText = 'Çalıştırılıyor...';
            consoleOutput.className = 'console-info';

            try {
                const response = await fetch('/execute', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: codeToRun, lessonId: currentLessonId })
                });

                const result = await response.json();
                
                let outputMsg = "";
                if (result.logs.length > 0) {
                    outputMsg += "ÇIKTI:\n" + result.logs.join('\\n') + "\\n\\n";
                }
                
                if (result.error) {
                    outputMsg += "ALINAN HATA:\n" + result.error + "\\n\\n";
                }

                if (result.success) {
                    outputMsg += "BAŞARILI! 🎉 Bir sonraki derse geçebilirsin.";
                    consoleOutput.className = 'console-success';
                } else {
                    if (!result.error && result.logs.length === 0) {
                         outputMsg += "(Hiçbir şey loglanmadı)\n\n";
                    }
                    outputMsg += "BAŞARISIZ. ❌ Lütfen dersin yönergelerini ve kodunu kontrol et.";
                    consoleOutput.className = 'console-error';
                }
                
                consoleOutput.innerText = outputMsg.trim(); // Baştaki/sondaki boşlukları temizle

            } catch (err) {
                consoleOutput.innerText = 'Sunucuyla bağlantı hatası: ' + err.toString();
                consoleOutput.className = 'console-error';
            }
        }

        // 3. Olayları Bağlama
        runBtn.addEventListener('click', executeCode);
        lessonNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const id = e.target.dataset.lesson;
                fetchLesson(id);
            }
        });
        window.addEventListener('load', () => fetchLesson('1'));

    </script>
</body>
</html>
    `;
}