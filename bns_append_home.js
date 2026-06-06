(function () {
    "use strict";

    const CONFIG = {
        debug: true,
        targetSelector: ".game-front-wrapper",
        insertPosition: "afterend",

        fallbackSelectors: [
            ".game-front-menu",
            ".index-card",
            "main",
            "body"
        ],

        loginApiUrl: "/v2/api/account/login",
        registerApiUrl: "/api/account/register",
        captchaBaseUrl: "/captcha/login/",
        registerCaptchaBaseUrl: "/captcha/register/",
        referralParamKey: "gacor",
        forgotPasswordUrl: "https://direct.lc.chat/14169210",

        nativeLoginSelectors: [
            ".index-card > .btn-account",
            ".index-card .btn-account",
            "form#LoginForm",
            "form#HeaderLoginForm",
            "form#LoginPopup",
            '.login-container form[action*="/account/login"]'
        ],

        labels: {
            title: "Silahkan masuk",
            username: "Nama Pengguna",
            password: "Kata Sandi",
            captcha: "Captcha",
            login: "MASUK",
            register: "DAFTAR",
            forgotPassword: "Lupa Password?",
            loaderText: "Memproses…",
            usernameRequired: "Nama Pengguna wajib diisi.",
            usernameMinLength: "Minimal 5 karakter.",
            passwordRequired: "Password wajib diisi.",
            passwordMinLength: "Minimal 6 karakter.",
            captchaRequired: "Captcha wajib diisi.",
            captchaError: "Captcha salah. Silakan ulangi.",
            loginError: "Login gagal. Periksa username/sandi & captcha.",
            loginNetworkError: "Terjadi kesalahan saat proses login."
        },

        register: {
            labels: {
                username: "Nama Pengguna",
                email: "Email",
                password: "Kata Sandi",
                confirmPassword: "Konfirmasi Sandi",
                fullName: "Nama Lengkap",
                phone: "Nomor Telepon",
                phonePlaceholder: "81261xxx",
                referral: "Kode Referral",
                bankName: "Nama Bank",
                accountNo: "Nomor Rekening",
                accountName: "Nama Rekening",
                captcha: "Captcha",
                submit: "BUAT AKUN",
                usernameRequired: "Nama Pengguna wajib diisi.",
                usernameMinLength: "Minimal 5 karakter.",
                usernameMaxLength: "Maksimal 16 karakter.",
                passwordRequired: "Kata Sandi wajib diisi.",
                passwordMinLength: "Minimal 6 karakter.",
                passwordMaxLength: "Maksimal 16 karakter.",
                confirmPasswordRequired: "Konfirmasi Sandi wajib diisi.",
                confirmPasswordMismatch: "Konfirmasi Sandi tidak cocok.",
                fullNameRequired: "Nama Lengkap wajib diisi.",
                fullNameAlphaOnly: "Hanya huruf dan spasi yang diperbolehkan.",
                phoneRequired: "Nomor Telepon wajib diisi.",
                phoneMinLength: "Minimal 7 digit.",
                phoneMaxLength: "Maksimal 12 digit.",
                bankRequired: "Nama Bank wajib dipilih.",
                accountNoRequired: "Nomor Rekening wajib diisi.",
                accountNoLength: "Panjang nomor rekening tidak sesuai.",
                accountNameRequired: "Nama Rekening wajib diisi.",
                accountNameAlphaOnly: "Hanya huruf dan spasi yang diperbolehkan.",
                captchaRequired: "Captcha wajib diisi.",
                registerError: "Pendaftaran gagal. Silakan coba lagi.",
                registerNetworkError: "Terjadi kesalahan saat proses pendaftaran."
            }
        }
    };

    let currentTab = "login";
    let hasRendered = false;

    function $(selector, root = document) {
        return root.querySelector(selector);
    }

    function $all(selector, root = document) {
        return Array.from(root.querySelectorAll(selector));
    }

    function log() {
        if (!CONFIG.debug || !window.console) return;
        console.log.apply(console, arguments);
    }

    function injectStyle() {
        if (document.getElementById("zappend-auth-style-bonus138")) return;

        const style = document.createElement("style");
        style.id = "zappend-auth-style-bonus138";

        style.textContent = `
#inline-login-host.login-hidden,
.native-login-hidden {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
}

#inline-login-host {
    width: 100%;
    max-width: 520px;
    margin: 10px auto 18px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
}

#inline-login-host .card {
    position: relative;
    overflow: hidden;
    color: #f4d172;
    border-radius: 8px;
    padding: 16px 14px 15px;
    border: 1.5px solid #f4d172;
    background:
        radial-gradient(circle at 18% 0%, rgba(244, 209, 114, 0.18), transparent 35%),
        radial-gradient(circle at 88% 12%, rgba(240, 0, 24, 0.16), transparent 33%),
        linear-gradient(rgb(53 53 53) 0%, rgb(30 30 30) 100%);
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #000000,
        inset 0 0 4px 3px #000000;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
}

#inline-login-host .card::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(255,255,255,.06), transparent 45%);
}

#inline-login-host .card > * {
    position: relative;
    z-index: 1;
}

#inline-login-host .group {
    margin-bottom: 8px;
}

#inline-login-host .group.tight {
    margin-bottom: 7px;
}

#inline-login-host label,
#inline-login-host .reg-label {
    display: block;
    font-size: 13px;
    color: #f4d172;
    margin: 0 0 6px;
    text-shadow: 0 2px 6px rgba(0,0,0,.58);
}

#inline-login-host .reg-label {
    font-size: 12px;
    opacity: 0.92;
}

#inline-login-host input.login-form,
#inline-login-host select.login-form {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1.5px solid #f4d172;
    color: #1e1e1e;
    border-radius: 6px;
    padding: 11px 12px;
    transition: border-color .15s, box-shadow .15s, background .15s, transform .06s;
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.40),
        0 2px 5px rgba(0,0,0,.35);
    font-size: 16px;
    font-family: inherit;
}

#inline-login-host input.login-form::placeholder {
    color: #686868;
    opacity: 0.88;
}

#inline-login-host input.login-form:focus,
#inline-login-host select.login-form:focus {
    outline: 0;
    border-color: #fbf6bc;
    background: #fffef3;
    box-shadow:
        0 0 0 3px rgba(244, 209, 114, 0.30),
        0 0 14px rgba(244, 209, 114, 0.22),
        inset 0 1px 0 rgba(255,255,255,.42);
}

#inline-login-host .msg {
    font-size: 12px;
    color: #fbf6bc;
    text-shadow: 0 1px 3px rgba(0,0,0,.62);
    margin-top: 5px;
    min-height: 14px;
}

#inline-login-host .msg.hide {
    display: none;
}

#inline-login-host .field-rel {
    position: relative;
}

#inline-login-host .field-rel input.login-form {
    padding-right: 42px;
}

#inline-login-host .eye {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    text-decoration: none;
    opacity: 0.95;
    color: #1e1e1e;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
}

#inline-login-host .eye:hover {
    background: rgba(244, 209, 114, 0.34);
    opacity: 1;
}

#inline-login-host .eye svg {
    display: block;
    pointer-events: none;
}

#inline-login-host .forgot-wrap {
    margin-top: 2px;
    text-align: right;
}

#inline-login-host .forgot-link {
    color: #f4d172;
    font-size: 12px;
    font-weight: 800;
    text-decoration: none;
    text-shadow: 0 1px 3px rgba(0,0,0,.68);
}

#inline-login-host .forgot-link:hover {
    color: #fbf6bc;
    text-decoration: underline;
}

#inline-login-host .captcha-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

#inline-login-host .captcha-row input.login-form {
    flex: 1 1 118px;
    max-width: 132px;
}

#inline-login-host #loginImgCaptcha,
#inline-login-host #regImgCaptcha {
    height: 42px;
    max-width: 112px;
    background: #000;
    padding: 4px 8px;
    border: 1.5px solid #f4d172;
    border-radius: 6px;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 3px 1px #ac6e1f,
        inset 0 0 3px 2px #f4d172;
    object-fit: contain;
}

#inline-login-host #loginReloadCaptcha,
#inline-login-host #regReloadCaptcha {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    margin-left: 0;
    padding: 0;
    border: 1.5px solid #f4d172;
    background: linear-gradient(rgb(53 53 53) 0%, rgb(30 30 30) 100%);
    border-radius: 6px;
    cursor: pointer;
    color: #f4d172;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #000000,
        inset 0 0 4px 3px #000000;
    transition: border-color .15s, box-shadow .15s, transform .06s, filter .15s, background .15s;
}

#inline-login-host #loginReloadCaptcha:hover,
#inline-login-host #regReloadCaptcha:hover {
    border-color: #fbf6bc;
    color: #fbf6bc;
    filter: brightness(1.08);
}

#inline-login-host #loginReloadCaptcha:active,
#inline-login-host #regReloadCaptcha:active {
    transform: translateY(1px);
}

#inline-login-host .actions {
    display: flex;
    gap: 10px;
    margin-top: 11px;
    justify-content: space-between;
}

#inline-login-host .btn {
    flex: 1 1 0;
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 14px;
    border-radius: 6px;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: .45px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1.5px solid #f4d172;
    font-family: 'Bungee', 'Dangrek', cursive, inherit;
    transition: filter .15s, transform .06s, box-shadow .15s;
}

#inline-login-host .btn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgba(255,255,255,.18) inset;
    pointer-events: none;
}

#inline-login-host .btn:hover {
    filter: brightness(1.06);
}

#inline-login-host .btn:active {
    transform: translateY(1px);
}

#inline-login-host .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    filter: grayscale(0.15);
}

#inline-login-host .btn-gold {
    color: #1e1e1e;
    background: linear-gradient(360deg, #f4d172, #f4d172, #fbf6bc);
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #ac6e1f,
        inset 0 0 4px 3px #f4d172;
    text-shadow: 0 1px 0 rgba(255,255,255,.32);
}

#inline-login-host .btn-red {
    color: #f4d172;
    background: linear-gradient(360deg,#9d0101,#f00018,#ff6c6c);
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #b20000,
        inset 0 0 4px 3px #ff6c6c;
    text-shadow: 0 1px 2px rgba(0,0,0,.68);
}

#inline-login-host .auth-tabs {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
    padding-top: 0;
    border-radius: 6px;
    overflow: visible;
    border: 0;
    background: transparent;
}

#inline-login-host .auth-tab {
    min-height: 44px;
    padding: 10px 9px;
    border: 1.5px solid #f4d172;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .45px;
    font-size: 14px;
    transition: all .2s;
    background: linear-gradient(rgb(53 53 53) 0%, rgb(30 30 30) 100%);
    color: #f4d172;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #000000,
        inset 0 0 4px 3px #000000;
    font-family: 'Bungee', 'Dangrek', cursive, inherit;
}

#inline-login-host .auth-tab.active {
    background: linear-gradient(360deg, #f4d172, #f4d172, #fbf6bc);
    border-color: #f4d172;
    color: #1e1e1e;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #ac6e1f,
        inset 0 0 4px 3px #f4d172;
}

#inline-login-host .auth-tab[data-tab="register"].active {
    background: linear-gradient(360deg,#9d0101,#f00018,#ff6c6c);
    border-color: #f4d172;
    color: #f4d172;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #b20000,
        inset 0 0 4px 3px #ff6c6c;
    text-shadow: 0 1px 2px rgba(0,0,0,.68);
}

#inline-login-host .auth-tab:not(.active):hover {
    color: #fbf6bc;
    border-color: #fbf6bc;
}

#inline-login-host select.login-form {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231e1e1e' fill='none' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
    cursor: pointer;
    text-overflow: ellipsis;
}

#inline-login-host select.login-form option {
    background: #1e1e1e;
    color: #f4d172;
}

#inline-login-host .input-group {
    display: flex;
    align-items: stretch;
}

#inline-login-host .input-prefix {
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: linear-gradient(rgb(53 53 53) 0%, rgb(30 30 30) 100%);
    border: 1.5px solid #f4d172;
    border-right: none;
    border-radius: 6px 0 0 6px;
    color: #f4d172;
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
    box-sizing: border-box;
}

#inline-login-host .input-has-prefix {
    border-radius: 0 6px 6px 0 !important;
}

#inline-login-host .reg-section {
    font-size: 12px;
    font-weight: 900;
    color: #f4d172;
    text-transform: uppercase;
    letter-spacing: .5px;
    opacity: .98;
    margin: 10px 0 7px;
    padding-top: 8px;
    border-top: 1px solid rgba(244, 209, 114, 0.32);
    font-family: 'Dangrek', cursive, inherit;
}

#page-loader-inline {
    position: fixed;
    inset: 0;
    display: none;
    z-index: 99999;
    background: rgba(0,0,0,.72);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    align-items: center;
    justify-content: center;
}

#page-loader-inline .kps-loader-content {
    padding: 11px 15px;
    border-radius: 6px;
    background: linear-gradient(rgb(53 53 53) 0%, rgb(30 30 30) 100%);
    border: 1.5px solid #f4d172;
    color: #f4d172;
    font-weight: 800;
    box-shadow:
        3px 4px 1px #00000054,
        3px 3px 4px 0px #000000a8,
        inset 0 0 5px 2px #000000,
        inset 0 0 4px 3px #000000;
}

@media (max-width: 420px) {
    #inline-login-host {
        padding: 0 8px;
        margin-bottom: 16px;
        font-size: 13px;
    }

    #inline-login-host .card {
        padding: 14px 11px;
        border-radius: 7px;
    }

    #inline-login-host .auth-tabs {
        gap: 7px;
        padding-top: 0;
    }

    #inline-login-host .auth-tab {
        min-height: 42px;
        font-size: 13px;
        padding: 9px 7px;
    }

    #inline-login-host input.login-form,
    #inline-login-host select.login-form {
        min-height: 42px;
        padding: 10px 11px;
        font-size: 16px;
    }

    #inline-login-host .captcha-row {
        gap: 6px;
    }

    #inline-login-host #loginImgCaptcha,
    #inline-login-host #regImgCaptcha {
        height: 40px;
        max-width: 102px;
        padding: 4px 6px;
    }

    #inline-login-host #loginReloadCaptcha,
    #inline-login-host #regReloadCaptcha {
        width: 42px;
        height: 42px;
        flex-basis: 42px;
    }

    #inline-login-host .btn {
        min-height: 44px;
        border-radius: 6px;
    }
}

@media (max-width: 340px) {
    #inline-login-host .captcha-row input.login-form {
        max-width: 116px;
    }

    #inline-login-host #loginImgCaptcha,
    #inline-login-host #regImgCaptcha {
        max-width: 92px;
    }
}
`;

        document.head.appendChild(style);
    }

    function normalizeConsoleAndErrors() {
        const oldConsole = window.console;
        if (!oldConsole) return;

        window.console = {
            ...oldConsole,
            log: oldConsole.log.bind(oldConsole),
            info: oldConsole.info.bind(oldConsole),
            warn: oldConsole.warn.bind(oldConsole),
            error: oldConsole.error.bind(oldConsole),
            debug: oldConsole.debug.bind(oldConsole)
        };

        window.addEventListener("error", function () {}, true);
        window.addEventListener("unhandledrejection", function () {}, true);
    }

    function setupAxios() {
        if (!window.axios) return;

        window.axios.defaults.withCredentials = true;
        window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        window.axios.defaults.headers.post.Accept = "application/json, text/plain, */*";
    }

    async function sha256(text) {
        if (window.sha256) return window.sha256(text);

        const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));

        return Array.from(new Uint8Array(buffer))
            .map(function (byte) {
                return byte.toString(16).padStart(2, "0");
            })
            .join("");
    }

    function localId(key) {
        try {
            const storageKey = "login_" + key;
            let value = localStorage.getItem(storageKey);

            if (!value) {
                value = crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now().toString(36) + Math.random().toString(36).slice(2);

                localStorage.setItem(storageKey, value);
            }

            return value;
        } catch (err) {
            return "";
        }
    }

    function getLocalStorage(key) {
        try {
            return localStorage.getItem(key);
        } catch (err) {
            return null;
        }
    }

    function getCookie(name) {
        const parts = document.cookie.split("; ");

        for (const part of parts) {
            const split = part.split("=");
            const cookieName = split.shift();
            const value = split.join("=");

            if (cookieName === name) return decodeURIComponent(value);
        }

        return null;
    }

    async function getToken() {
        let token = $("input#token")?.value || "";
        if (token) return token;

        const endpoints = [
            "/token",
            "/api/token",
            "/v2/api/token",
            "/api/security/token",
            "/v2/api/security/token"
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, {
                    credentials: "include"
                });

                if (!response.ok) continue;

                const json = await response.json().catch(function () {
                    return null;
                });

                const foundToken = json?.token || json?.data?.token || json?.data || "";

                if (foundToken) {
                    let tokenInput = $("input#token");

                    if (!tokenInput) {
                        tokenInput = document.createElement("input");
                        tokenInput.type = "hidden";
                        tokenInput.id = "token";
                        tokenInput.name = "token";
                        document.body.appendChild(tokenInput);
                    }

                    tokenInput.value = foundToken;
                    return foundToken;
                }
            } catch (err) {}
        }

        console.warn("[login] Token tidak tersedia.");
        return "";
    }

    async function postData(url, payload) {
        if (window.axios?.post) {
            try {
                return await window.axios.post(url, payload);
            } catch (err) {
                const status = err?.response?.status;
                if (status !== 415 && status !== 406) throw err;
            }
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            const json = await response.json().catch(function () {
                return {};
            });

            if (response.ok) {
                return {
                    status: response.status,
                    data: json
                };
            }
        } catch (err) {}

        const encoded = new URLSearchParams(payload).toString();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: encoded
        });

        const json = await response.json().catch(function () {
            return {};
        });

        return {
            status: response.status,
            data: json
        };
    }

    async function checkCaptcha(captcha, type = "login") {
        try {
            const response = await fetch("/api/security/checkCaptcha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    type: type,
                    captcha: captcha
                })
            });

            if (response.status === 404) return true;

            const json = await response.json().catch(function () {
                return { success: 0 };
            });

            return !!json.success;
        } catch (err) {
            return true;
        }
    }

    function createLoader(text = "Memproses…") {
        if ($("#page-loader-inline")) return;

        const loader = document.createElement("div");
        loader.id = "page-loader-inline";
        loader.innerHTML = `<div class="kps-loader-content">${text}</div>`;
        document.body.appendChild(loader);
    }

    function showLoader(show) {
        const loader = $("#page-loader-inline");
        if (loader) loader.style.display = show ? "flex" : "none";
    }

    function hideInlineLogin() {
        const host = $("#inline-login-host");
        if (host) host.classList.add("login-hidden");
    }

    function showInlineLogin() {
        const host = $("#inline-login-host");
        if (host) host.classList.remove("login-hidden");
    }

    function findNativeLoginContainers(selectors) {
        const result = [];

        selectors.forEach(function (selector) {
            $all(selector).forEach(function (el) {
                const wrapper =
                    el.closest(".btn-account") ||
                    el.closest(".login-container") ||
                    el.closest(".card,.panel,.box") ||
                    el;

                if (wrapper && !result.includes(wrapper)) result.push(wrapper);
            });
        });

        return result;
    }

    function hideNativeLogin(selectors) {
        findNativeLoginContainers(selectors).forEach(function (el) {
            el.classList.add("native-login-hidden");
            el.setAttribute("data-native-login-hidden", "1");
        });
    }

    function isLoggedIn() {
        const sessionInput = $("#hdnLoginSession");

        if (sessionInput) {
            const value = (sessionInput.value || sessionInput.getAttribute("value") || "")
                .toString()
                .trim()
                .toLowerCase();

            if (
                value &&
                value !== "0" &&
                value !== "false" &&
                value !== "null" &&
                value !== "undefined"
            ) {
                return true;
            }
        }

        if (
            document.querySelector('a[href*="logout" i], button[data-action="logout"], a[href*="keluar" i]') ||
            document.querySelector("[data-user],[data-username],.user-name,.account-menu,.after-login")
        ) {
            return true;
        }

        return !!((document.body.innerText || "").match(/\bhai[,! ]/i));
    }

    async function hasCloudflareSession() {
        return !!(getCookie("_cf_tkn") || getLocalStorage("_cf_X2NmX29k"));
    }

    async function refreshVisibility(config) {
        hideNativeLogin(config.nativeLoginSelectors);

        if (isLoggedIn() || await hasCloudflareSession()) {
            hideInlineLogin();
        } else {
            showInlineLogin();
        }
    }

    function setMessage(el, message) {
        if (!el) return;

        el.textContent = message || "";
        el.classList.toggle("hide", !message);
    }

    function parseBankList(raw) {
        const payload = raw?.data || raw || {};
        const defaultBank = payload.defaultValue || payload.defaultBank || {};
        const defaultCode = String(defaultBank.code ?? defaultBank.defaultValue ?? "").trim();

        const list =
            Array.isArray(payload.bank) ? payload.bank :
            Array.isArray(payload.slBankList) ? payload.slBankList :
            Array.isArray(payload.msbankList) ? payload.msbankList :
            Array.isArray(payload.banks) ? payload.banks :
            Array.isArray(payload) ? payload :
            [];

        return list
            .filter(function (bank) {
                const eligibleOk = bank.eligible === undefined || Number(bank.eligible) === 1;
                const statusOk = bank.st === undefined || Number(bank.st) === 1;
                return eligibleOk && statusOk;
            })
            .map(function (bank) {
                const value = String(bank.code ?? bank.defaultValue ?? bank.value ?? "").trim();
                const min = Number(bank.accnomnlgth ?? bank.min ?? bank.minLength ?? 0);
                const max = Number(bank.accnomxlgth ?? bank.max ?? bank.maxLength ?? 0);

                return {
                    id: bank.id,
                    code: value,
                    defaultValue: value,
                    name: bank.name ?? bank.label ?? bank.bankName ?? bank.text ?? value,
                    min: min,
                    max: max,
                    selected: defaultCode ? value === defaultCode : false
                };
            })
            .filter(function (bank) {
                return bank.defaultValue && bank.name && bank.min > 0 && bank.max >= bank.min;
            });
    }

    async function getBanks() {
        try {
            const response = await fetch("/api/bank/list", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: "{}"
            });

            if (!response.ok) throw new Error("HTTP " + response.status);

            const json = await response.json().catch(function () {
                return null;
            });

            const banks = parseBankList(json);

            if (banks.length) return banks;
        } catch (err) {
            console.warn("[auth] Gagal ambil bank list dari /api/bank/list", err);
        }

        return [];
    }

    async function buildLoginPayload(host, config) {
        try {
            const username = $("#loginUsername", host).value.trim();
            const captcha = $("#loginCaptcha", host).value.trim();
            let token = $("input#token")?.value || "";

            if (!token) token = await getToken();

            const password = $("#loginPassword", host).value;
            const firstHash = await sha256(password);
            const finalHash = await sha256(firstHash + token);

            return {
                type: "login",
                username: username,
                password: finalHash,
                token: token,
                captcha: captcha,
                devicetoken: $("#DeviceToken")?.value || localId("devicetoken"),
                deviceid: $("#DeviceID")?.value || localId("deviceid"),
                lang: document.documentElement.getAttribute("lang") || "id"
            };
        } catch (err) {
            return null;
        }
    }

    function validateLoginUsername(host, labels) {
        const value = ($("#loginUsername", host).value || "").trim();
        const msg = $("#loginMsgUser", host);

        if (!value) {
            setMessage(msg, labels.usernameRequired);
            return false;
        }

        if (value.length < 5) {
            setMessage(msg, labels.usernameMinLength);
            return false;
        }

        setMessage(msg, "");
        return true;
    }

    function validateLoginPassword(host, labels) {
        const value = $("#loginPassword", host).value || "";
        const msg = $("#loginMsgPass", host);

        if (!value) {
            setMessage(msg, labels.passwordRequired);
            return false;
        }

        if (value.length < 6) {
            setMessage(msg, labels.passwordMinLength);
            return false;
        }

        setMessage(msg, "");
        return true;
    }

    function bindLogin(host, config) {
        const labels = config.labels;
        const form = $("#InlineLoginForm", host);
        const captchaImage = $("#loginImgCaptcha", host);
        const captchaInput = $("#loginCaptcha", host);

        $("#loginPwdToggle", host)?.addEventListener("click", function (event) {
            event.preventDefault();

            const passwordInput = $("#loginPassword", host);

            if (passwordInput) {
                passwordInput.type = passwordInput.type === "password" ? "text" : "password";
                passwordInput.focus();
            }
        });

        $("#loginReloadCaptcha", host)?.addEventListener("click", function () {
            if (captchaImage) captchaImage.src = config.captchaBaseUrl + Date.now();

            if (captchaInput) {
                captchaInput.value = "";
                captchaInput.focus();
            }
        });

        const usernameInput = $("#loginUsername", host);

        if (usernameInput) {
            usernameInput.addEventListener("blur", function () {
                validateLoginUsername(host, labels);
            });

            usernameInput.addEventListener("input", function () {
                const msg = $("#loginMsgUser", host);

                if (msg && !msg.classList.contains("hide")) {
                    validateLoginUsername(host, labels);
                }
            });
        }

        const passwordInput = $("#loginPassword", host);

        if (passwordInput) {
            passwordInput.addEventListener("blur", function () {
                validateLoginPassword(host, labels);
            });

            passwordInput.addEventListener("input", function () {
                const msg = $("#loginMsgPass", host);

                if (msg && !msg.classList.contains("hide")) {
                    validateLoginPassword(host, labels);
                }
            });
        }

        form?.addEventListener("submit", async function (event) {
            event.preventDefault();

            const usernameOk = validateLoginUsername(host, labels);
            const passwordOk = validateLoginPassword(host, labels);

            if (!usernameOk || !passwordOk) return;

            const submitButton = $("#AuthSubmitBtn", host);

            submitButton.disabled = true;
            showLoader(true);

            try {
                const payload = await buildLoginPayload(host, config);

                if (!payload) {
                    alert(labels.loginError);
                    return;
                }

                if (!await checkCaptcha(payload.captcha, "login")) {
                    alert(labels.captchaError);

                    if (captchaImage) captchaImage.src = config.captchaBaseUrl + Date.now();

                    if (captchaInput) {
                        captchaInput.value = "";
                        captchaInput.focus();
                    }

                    return;
                }

                const response = await postData(config.loginApiUrl, payload);
                const success =
                    response?.data?.success === 1 ||
                    response?.data?.success === true ||
                    response?.data?.success === "1";

                if (success) {
                    const data = response.data.data || {};

                    alert((data.message || "Login berhasil") + (data.lastLogin ? "\n" + data.lastLogin : ""));

                    hideInlineLogin();
                    hideNativeLogin(config.nativeLoginSelectors);

                    if (data.redirect) {
                        location.href = data.redirect;
                    } else {
                        location.reload();
                    }
                } else {
                    alert(response?.data?.data?.message || response?.data?.message || labels.loginError);

                    if (passwordInput) passwordInput.value = "";
                    if (captchaInput) captchaInput.value = "";
                    if (captchaImage) captchaImage.src = config.captchaBaseUrl + Date.now();

                    usernameInput?.focus();
                }
            } catch (err) {
                alert(labels.loginNetworkError);
            } finally {
                submitButton.disabled = false;
                showLoader(false);
            }
        });
    }

    function validateField(host, inputId, msgId, rules) {
        const input = $("#" + inputId, host);
        const msg = $("#" + msgId, host);
        const value = input?.value || "";

        for (const rule of rules) {
            const validator = rule[0];
            const message = rule[1];

            if (!validator(value, input)) {
                setMessage(msg, message);
                return false;
            }
        }

        setMessage(msg, "");
        return true;
    }

    function registerValidationRules(host, config) {
        const labels = config.register.labels;
        const banks = config.register._banks;

        return [
            {
                id: "regUsername",
                msg: "regMsgUsername",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.trim().length > 0; }, labels.usernameRequired],
                        [function (value) { return value.trim().length >= 5; }, labels.usernameMinLength],
                        [function (value) { return value.trim().length <= 16; }, labels.usernameMaxLength]
                    ];
                }
            },
            {
                id: "regPassword",
                msg: "regMsgPassword",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.length > 0; }, labels.passwordRequired],
                        [function (value) { return value.length >= 6; }, labels.passwordMinLength],
                        [function (value) { return value.length <= 16; }, labels.passwordMaxLength]
                    ];
                }
            },
            {
                id: "regCPassword",
                msg: "regMsgCPassword",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.length > 0; }, labels.confirmPasswordRequired],
                        [function (value) { return value === ($("#regPassword", host)?.value || ""); }, labels.confirmPasswordMismatch]
                    ];
                }
            },
            {
                id: "regFirstName",
                msg: "regMsgFirstName",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.trim().length > 0; }, labels.fullNameRequired],
                        [function (value) { return /^[a-zA-Z\s]+$/.test(value.trim()); }, labels.fullNameAlphaOnly]
                    ];
                }
            },
            {
                id: "regMobileNumber",
                msg: "regMsgPhone",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.trim().length > 0; }, labels.phoneRequired],
                        [function (value) { return value.trim().length >= 7; }, labels.phoneMinLength],
                        [function (value) { return value.trim().length <= 12; }, labels.phoneMaxLength]
                    ];
                }
            },
            {
                id: "regBankName",
                msg: "regMsgBank",
                ev: "change",
                rules: function () {
                    return [
                        [function (value) { return value.length > 0; }, labels.bankRequired]
                    ];
                }
            },
            {
                id: "regAccountNo",
                msg: "regMsgAccountNo",
                ev: "input",
                rules: function () {
                    const bankValue = $("#regBankName", host)?.value;
                    const selectedBank = banks.find(function (bank) {
                        return String(bank.defaultValue) === String(bankValue);
                    });

                    return [
                        [function (value) { return value.trim().length > 0; }, labels.accountNoRequired],
                        [
                            function (value) {
                                return selectedBank
                                    ? value.trim().length >= selectedBank.min && value.trim().length <= selectedBank.max
                                    : false;
                            },
                            selectedBank
                                ? labels.accountNoLength + " (" + selectedBank.min + "-" + selectedBank.max + " digit)"
                                : labels.bankRequired
                        ]
                    ];
                }
            },
            {
                id: "regAccountName",
                msg: "regMsgAccountName",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.trim().length > 0; }, labels.accountNameRequired],
                        [function (value) { return /^[a-zA-Z\s]+$/.test(value.trim()); }, labels.accountNameAlphaOnly]
                    ];
                }
            },
            {
                id: "regCaptcha",
                msg: "regMsgCaptcha",
                ev: "input",
                rules: function () {
                    return [
                        [function (value) { return value.trim().length > 0; }, labels.captchaRequired]
                    ];
                }
            }
        ];
    }

    function bindRegisterValidation(host, config) {
        const rules = registerValidationRules(host, config);

        for (const item of rules) {
            const input = $("#" + item.id, host);
            if (!input) continue;

            const validate = function () {
                return validateField(host, item.id, item.msg, item.rules());
            };

            input.addEventListener("blur", validate);

            input.addEventListener(item.ev, function () {
                const msg = $("#" + item.msg, host);

                if (msg && !msg.classList.contains("hide")) {
                    validate();
                }
            });
        }

        const passwordInput = $("#regPassword", host);

        if (passwordInput) {
            passwordInput.addEventListener("input", function () {
                const msg = $("#regMsgCPassword", host);

                if (msg && !msg.classList.contains("hide")) {
                    const confirmRule = rules.find(function (item) {
                        return item.id === "regCPassword";
                    });

                    if (confirmRule) {
                        validateField(host, confirmRule.id, confirmRule.msg, confirmRule.rules());
                    }
                }
            });
        }

        const bankSelect = $("#regBankName", host);

        if (bankSelect) {
            bankSelect.addEventListener("change", function () {
                const msg = $("#regMsgAccountNo", host);

                if (msg && !msg.classList.contains("hide")) {
                    const accountRule = rules.find(function (item) {
                        return item.id === "regAccountNo";
                    });

                    if (accountRule) {
                        validateField(host, accountRule.id, accountRule.msg, accountRule.rules());
                    }
                }
            });
        }

        return function validateAll() {
            let ok = true;

            for (const item of rules) {
                if (!validateField(host, item.id, item.msg, item.rules())) {
                    ok = false;
                }
            }

            return ok;
        };
    }

    function bindRegister(host, config) {
        const registerConfig = config.register;
        const form = $("#InlineRegisterForm", host);
        const captchaImage = $("#regImgCaptcha", host);
        const captchaInput = $("#regCaptcha", host);
        const validateAll = bindRegisterValidation(host, config);

        if (form) {
            form.method = "post";
            form.action = config.registerApiUrl;
        }

        $("#regReloadCaptcha", host)?.addEventListener("click", function () {
            if (captchaImage) captchaImage.src = config.registerCaptchaBaseUrl + Date.now();

            if (captchaInput) {
                captchaInput.value = "";
                captchaInput.focus();
            }
        });

        const bankSelect = $("#regBankName", host);
        const accountNoInput = $("#regAccountNo", host);

        function updateAccountNumberLimit() {
            if (!accountNoInput) return;

            const selectedBank = registerConfig._banks.find(function (bank) {
                return String(bank.defaultValue) === String(bankSelect?.value || "");
            });

            if (!selectedBank) {
                accountNoInput.removeAttribute("minlength");
                accountNoInput.removeAttribute("maxlength");
                accountNoInput.placeholder = registerConfig.labels.accountNo;
                return;
            }

            accountNoInput.setAttribute("minlength", selectedBank.min);
            accountNoInput.setAttribute("maxlength", selectedBank.max);
            accountNoInput.placeholder = selectedBank.min + "-" + selectedBank.max + " digit";

            if (accountNoInput.value.length > selectedBank.max) {
                accountNoInput.value = accountNoInput.value.slice(0, selectedBank.max);
            }
        }

        bankSelect?.addEventListener("change", function () {
            updateAccountNumberLimit();

            const msg = $("#regMsgAccountNo", host);

            if (msg) {
                msg.textContent = "";
                msg.classList.add("hide");
            }
        });

        updateAccountNumberLimit();

        accountNoInput?.addEventListener("input", function () {
            const selectedBank = registerConfig._banks.find(function (bank) {
                return String(bank.defaultValue) === String(bankSelect?.value || "");
            });

            this.value = this.value.replace(/\D/g, "");

            if (selectedBank && this.value.length > selectedBank.max) {
                this.value = this.value.slice(0, selectedBank.max);
            }
        });

        $("#regMobileNumber", host)?.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
        });

        $("#regFirstName", host)?.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
        });

        $("#regAccountName", host)?.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
        });

        const referralInput = $("#regReferral", host);

        if (referralInput) {
            try {
                let referralCode = new URLSearchParams(location.search).get(config.referralParamKey) || "";

                if (referralCode) {
                    localStorage.setItem("referral_code", referralCode);
                } else {
                    referralCode = localStorage.getItem("referral_code") || "";
                }

                if (referralCode) {
                    referralInput.value = referralCode;
                }
            } catch (err) {}
        }

        form?.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!validateAll()) return;

            const submitButton = $("#AuthSubmitBtn", host);

            submitButton.disabled = true;
            showLoader(true);

            try {
                let token = $("input#token")?.value || "";

                if (!token) token = await getToken();

                const payload = {
                    username: $("#regUsername", host).value.trim(),
                    email: $("#regEmail", host)?.value.trim() || "",
                    password: $("#regPassword", host).value,
                    cpassword: $("#regCPassword", host).value,
                    firstname: $("#regFirstName", host).value.trim(),
                    countrycode: $("#regCountryCode", host).value,
                    mobilenumber: $("#regMobileNumber", host).value.trim(),
                    referral: $("#regReferral", host)?.value.trim() || "",
                    bankCode: $("#regBankName", host).value,
                    accountNo: $("#regAccountNo", host).value.trim(),
                    accountName: $("#regAccountName", host).value.trim(),
                    captcha: $("#regCaptcha", host).value.trim(),
                    token: token,
                    devicetoken: "",
                    deviceid: "",
                    lang: document.documentElement.getAttribute("lang") || "id"
                };

                const response = await (
                    window.axios?.post
                        ? function (url, data) {
                            return window.axios.post(url, data);
                        }
                        : async function (url, data) {
                            const fetchResponse = await fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify(data)
                            });

                            return {
                                status: fetchResponse.status,
                                data: await fetchResponse.json().catch(function () {
                                    return {};
                                })
                            };
                        }
                )(config.registerApiUrl, payload);

                const success =
                    response.data?.code === 0 ||
                    response.data?.success === 1 ||
                    response.data?.success === true;

                if (success) {
                    const redirect = response.data?.data?.redirect;

                    if (redirect) {
                        location.href = redirect;
                    } else {
                        location.reload();
                    }
                } else {
                    alert(response.data?.data?.message || response.data?.message || registerConfig.labels.registerError);

                    if (captchaImage) captchaImage.src = config.registerCaptchaBaseUrl + Date.now();
                    if (captchaInput) captchaInput.value = "";
                }
            } catch (err) {
                const message =
                    err?.response?.data?.data?.message ||
                    err?.response?.data?.message ||
                    registerConfig.labels.registerNetworkError;

                alert(message);

                if (captchaImage) captchaImage.src = config.registerCaptchaBaseUrl + Date.now();
                if (captchaInput) captchaInput.value = "";
            } finally {
                submitButton.disabled = false;
                showLoader(false);
            }
        });
    }

    function bindTabs(host, config) {
        const tabs = $all(".auth-tab", host);
        const loginPanel = $("#login-panel", host);
        const registerPanel = $("#register-panel", host);
        const submitButton = $("#AuthSubmitBtn", host);

        tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                const tabName = tab.dataset.tab;

                currentTab = tabName;

                tabs.forEach(function (item) {
                    item.classList.toggle("active", item.dataset.tab === tabName);
                });

                loginPanel.style.display = tabName === "login" ? "" : "none";
                registerPanel.style.display = tabName === "register" ? "" : "none";

                submitButton.textContent = tabName === "login"
                    ? config.labels.login
                    : config.register.labels.submit;

                submitButton.classList.toggle("btn-gold", tabName === "login");
                submitButton.classList.toggle("btn-red", tabName === "register");
            });
        });

        submitButton.addEventListener("click", function () {
            const form = $(currentTab === "login" ? "#InlineLoginForm" : "#InlineRegisterForm", host);

            if (!form) return;

            if (form.requestSubmit) {
                form.requestSubmit();
            } else {
                form.dispatchEvent(new Event("submit", {
                    cancelable: true
                }));
            }
        });
    }

    function bankOptionsHtml(banks) {
        return banks.map(function (bank) {
            return (
                '<option value="' + bank.defaultValue + '"' +
                (bank.selected ? " selected" : "") +
                ">" + bank.name + "</option>"
            );
        }).join("");
    }

    function bindPasswordToggle(button, input) {
        button?.addEventListener("click", function (event) {
            event.preventDefault();

            if (!input) return;

            input.type = input.type === "password" ? "text" : "password";
            input.focus();
        });
    }

    function findPlacementTarget(config) {
        const selectors = [config.targetSelector].concat(config.fallbackSelectors || []);

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }

        return null;
    }

    function placeHost(placementTarget, html, config) {
        if (!placementTarget) return false;

        if (placementTarget.matches("body")) {
            placementTarget.insertAdjacentHTML("afterbegin", html);
            return true;
        }

        if (placementTarget.matches(".index-card") || placementTarget.matches("main")) {
            placementTarget.insertAdjacentHTML("afterbegin", html);
            return true;
        }

        placementTarget.insertAdjacentHTML(config.insertPosition || "afterend", html);
        return true;
    }

    function waitForBonusReplacementReady(config, timeoutMs = 12000) {
        return new Promise(function (resolve) {
            const existing = findPlacementTarget(config);

            if (existing) {
                resolve(existing);
                return;
            }

            const startedAt = Date.now();

            const observer = new MutationObserver(function () {
                const found = findPlacementTarget(config);

                if (found) {
                    observer.disconnect();
                    resolve(found);
                    return;
                }

                if (Date.now() - startedAt > timeoutMs) {
                    observer.disconnect();
                    resolve(document.body || null);
                }
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });

            setTimeout(function () {
                const found = findPlacementTarget(config);
                observer.disconnect();
                resolve(found || document.body || null);
            }, timeoutMs);
        });
    }

    async function renderAuth(config) {
        if (hasRendered || document.getElementById("inline-login-host")) {
            hideNativeLogin(config.nativeLoginSelectors);
            return;
        }

        const placementTarget = await waitForBonusReplacementReady(config);

        if (!placementTarget) {
            console.warn("[auth] Target homepage Bonus138 tidak ditemukan.");
            return;
        }

        config.register._banks = await getBanks();
        const token = $("input#token")?.value || "";

        const html = `
  <div id="inline-login-host" class="login-embed">
    <div class="card">
      <div class="auth-tabs">
        <button class="auth-tab active" type="button" data-tab="login">${config.labels.login}</button>
        <button class="auth-tab" type="button" data-tab="register">${config.labels.register}</button>
      </div>

      <div class="auth-panel" id="login-panel">
        <form id="InlineLoginForm" autocomplete="off" novalidate>
          <div class="group tight">
            <input class="login-form" name="username" id="loginUsername" type="text"
                   minlength="5" maxlength="16" required placeholder="${config.labels.username}">
            <div class="msg hide" id="loginMsgUser"></div>
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="password" id="loginPassword" type="password"
                     minlength="6" maxlength="64" required placeholder="${config.labels.password}">
              <a href="#" id="loginPwdToggle" class="eye" aria-label="Toggle password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
            </div>
            <div class="msg hide" id="loginMsgPass"></div>

            <div class="forgot-wrap">
              <a class="forgot-link" href="${config.forgotPasswordUrl}" target="_blank" rel="noopener noreferrer">${config.labels.forgotPassword}</a>
            </div>
          </div>

          <div class="group tight">
            <div class="captcha-row">
              <input class="login-form" type="text" name="captcha" id="loginCaptcha"
                     maxlength="4" required placeholder="${config.labels.captcha}" style="width:120px">
              <img loading="lazy" src="${config.captchaBaseUrl}${Date.now()}" alt="captcha" id="loginImgCaptcha">
              <button type="button" id="loginReloadCaptcha" class="btn-reload" title="Reload captcha" aria-label="Reload captcha">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
                  <path d="M21 3v6h-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <input type="hidden" id="token" name="token" value="${token}">
          <button type="submit" hidden></button>
        </form>
      </div>

      <div class="auth-panel" id="register-panel" style="display:none">
        <form id="InlineRegisterForm" action="${config.registerApiUrl}" method="post" autocomplete="off" novalidate>
          <div class="group tight">
            <input class="login-form" name="username" id="regUsername" type="text"
                   minlength="5" maxlength="16" required placeholder="${config.register.labels.username}">
            <div class="msg hide" id="regMsgUsername"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="email" id="regEmail" type="email"
                   placeholder="${config.register.labels.email}">
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="password" id="regPassword" type="password"
                     minlength="6" maxlength="16" required placeholder="${config.register.labels.password}">
              <a href="#" id="regPwdToggle" class="eye" aria-label="Toggle password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
            </div>
            <div class="msg hide" id="regMsgPassword"></div>
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="cpassword" id="regCPassword" type="password"
                     minlength="6" maxlength="16" required placeholder="${config.register.labels.confirmPassword}">
              <a href="#" id="regCPwdToggle" class="eye" aria-label="Toggle confirm password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
            </div>
            <div class="msg hide" id="regMsgCPassword"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="firstName" id="regFirstName" type="text"
                   required placeholder="${config.register.labels.fullName}">
            <div class="msg hide" id="regMsgFirstName"></div>
          </div>

          <div class="group tight">
            <div class="input-group">
              <span class="input-prefix">+62</span>
              <input class="login-form input-has-prefix" name="mobileNumber" id="regMobileNumber" type="tel"
                     minlength="7" maxlength="12" required placeholder="${config.register.labels.phonePlaceholder}">
            </div>
            <input type="hidden" id="regCountryCode" name="countryCode" value="62">
            <div class="msg hide" id="regMsgPhone"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="referral" id="regReferral" type="text"
                   placeholder="${config.register.labels.referral}">
          </div>

          <div class="reg-section">Rekening Bank</div>

          <div class="group tight">
            <label class="reg-label" for="regBankName">${config.register.labels.bankName}</label>
            <select class="login-form" name="BankName" id="regBankName" required>
              <option value="" disabled ${config.register._banks.some(function (bank) { return bank.selected; }) ? "" : "selected"}>-- Pilih Bank --</option>
              ${bankOptionsHtml(config.register._banks)}
            </select>
            <div class="msg hide" id="regMsgBank"></div>
          </div>

          <div class="group tight">
            <label class="reg-label" for="regAccountNo">${config.register.labels.accountNo}</label>
            <input class="login-form" name="AccountNo" id="regAccountNo" type="text" inputmode="numeric"
                   required placeholder="${config.register.labels.accountNo}">
            <div class="msg hide" id="regMsgAccountNo"></div>
          </div>

          <div class="group tight">
            <label class="reg-label" for="regAccountName">${config.register.labels.accountName}</label>
            <input class="login-form" name="AccountName" id="regAccountName" type="text"
                   required placeholder="${config.register.labels.accountName}">
            <div class="msg hide" id="regMsgAccountName"></div>
          </div>

          <div class="group tight">
            <div class="captcha-row">
              <input class="login-form" type="text" name="captcha" id="regCaptcha"
                     maxlength="4" required placeholder="${config.register.labels.captcha}" style="width:120px">
              <img loading="lazy" src="${config.registerCaptchaBaseUrl}${Date.now()}" alt="captcha" id="regImgCaptcha">
              <button type="button" id="regReloadCaptcha" class="btn-reload" title="Reload captcha" aria-label="Reload captcha">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
                  <path d="M21 3v6h-6"></path>
                </svg>
              </button>
            </div>
            <div class="msg hide" id="regMsgCaptcha"></div>
          </div>

          <button type="submit" hidden></button>
        </form>
      </div>

      <div class="actions">
        <button class="btn btn-gold" type="button" id="AuthSubmitBtn">${config.labels.login}</button>
      </div>
    </div>
  </div>`;

        if (!placeHost(placementTarget, html, config)) return;

        hasRendered = true;
        hideNativeLogin(config.nativeLoginSelectors);

        const host = $("#inline-login-host");

        bindPasswordToggle($("#regPwdToggle", host), $("#regPassword", host));
        bindPasswordToggle($("#regCPwdToggle", host), $("#regCPassword", host));

        bindTabs(host, config);
        bindLogin(host, config);
        bindRegister(host, config);

        document.addEventListener("click", function (event) {
            const button = event.target.closest("a,button");

            if (!button) return;

            const href = button.getAttribute("href") || "";
            const text = (button.innerText || "").toLowerCase();

            if (/logout/i.test(href) || /logout|keluar/i.test(text) || button.dataset.action === "logout") {
                setTimeout(function () {
                    refreshVisibility(config);
                }, 1200);
            }
        }, true);

        refreshVisibility(config);

        setTimeout(function () {
            refreshVisibility(config);
        }, 800);

        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) {
                refreshVisibility(config);
            }
        });

        log("[auth] Bonus138 inline login injected after", placementTarget);
    }

    function setupSocialLogin() {
        window.loginWithSocial = function (provider) {
            const base = typeof window.baseUrl === "function" ? window.baseUrl() : location.origin;
            location.href = "/v2/api/account/login/" + encodeURIComponent(provider) + "?d=" + encodeURIComponent(base);
        };
    }

    function init() {
        injectStyle();
        normalizeConsoleAndErrors();
        setupAxios();
        createLoader(CONFIG.labels.loaderText);
        setupSocialLogin();
        renderAuth(CONFIG);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();