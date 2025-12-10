// Advanced Screenshot and Screen Recording Protection
// This script prevents screenshots, screen recording, and content theft

(function () {
    'use strict';

    // 1. Disable right-click context menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showWarning('⚠️ النسخ والحفظ ممنوع!');
        return false;
    });

    // 2. Disable common screenshot keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Prevent PrintScreen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            showWarning('⚠️ السكرين شوت ممنوع!');
            // Only clear clipboard if we can do it without prompt (user interaction context)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText('').catch(function () { });
            }
            return false;
        }

        // Prevent Ctrl+Shift+S (Windows Snipping Tool)
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            showWarning('⚠️ السكرين شوت ممنوع!');
            return false;
        }

        // Prevent Windows+Shift+S (Windows Screenshot)
        if (e.metaKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            showWarning('⚠️ السكرين شوت ممنوع!');
            return false;
        }

        // Prevent F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            showWarning('⚠️ أدوات المطور ممنوعة!');
            return false;
        }

        // Prevent Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showWarning('⚠️ أدوات المطور ممنوعة!');
            return false;
        }

        // Prevent Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showWarning('⚠️ أدوات المطور ممنوعة!');
            return false;
        }

        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showWarning('⚠️ عرض الكود ممنوع!');
            return false;
        }

        // Prevent Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showWarning('⚠️ حفظ الصفحة ممنوع!');
            return false;
        }
    });

    // 3. Detect when user switches tabs (possible screen recording)
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            // User switched tabs - might be recording
            console.clear();
        }
    });

    // 4. Disable text selection
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 5. Disable drag and drop
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 6. Disable copy
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        showWarning('⚠️ النسخ ممنوع!');
        return false;
    });

    // 7. Disable cut
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // 8. Disable paste (for security)
    document.addEventListener('paste', function (e) {
        e.preventDefault();
        return false;
    });

    // 12. Show warning message
    function showWarning(message) {
        // Remove existing warning if any
        const existingWarning = document.getElementById('protection-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        const warning = document.createElement('div');
        warning.id = 'protection-warning';
        warning.textContent = message;
        warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff1493, #ff6b9d);
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 18px;
            font-weight: bold;
            z-index: 9999999;
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.5);
            animation: warningPulse 0.5s ease;
            text-align: center;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes warningPulse {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(warning);

        // Remove warning after 2 seconds
        setTimeout(function () {
            warning.style.animation = 'warningPulse 0.3s ease reverse';
            setTimeout(function () {
                warning.remove();
            }, 300);
        }, 2000);
    }
    window.addEventListener('load', function () {
        // Disable image dragging
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('dragstart', function (e) {
                e.preventDefault();
                return false;
            });
            images[i].style.userSelect = 'none';
            images[i].style.pointerEvents = 'none';
        }

        // Add CSS to prevent selection
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-touch-callout: none;
            }
            input, textarea {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
            }
        `;
        document.head.appendChild(style);
    });

    // Note: Removed blur/focus handlers as they interfere with iframe interactions

    // 15. CSS Print Protection
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
        @media print {
            html, body { display: none !important; }
        }
    `;
    document.head.appendChild(printStyle);

    // 16. Clear clipboard on copy attempt
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('').catch(function () { });
        }
    });

    // 17. Aggressive Key Blocking
    window.addEventListener('keyup', function (e) {
        if (e.key == 'PrintScreen') {
            navigator.clipboard.writeText('');
            alert('⚠️ السكرين شوت ممنوع!');
            document.body.style.visibility = 'hidden';
            setTimeout(() => {
                document.body.style.visibility = 'visible';
            }, 1000);
        }
    });

})();
