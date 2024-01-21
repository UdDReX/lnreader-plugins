"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var NovelsOnline = /** @class */ (function () {
    function NovelsOnline() {
        this.id = "NO.net";
        this.name = "novelsOnline";
        this.site = "https://novelsonline.net";
        this.icon = "src/coverNotAvailable.jpg";
        this.version = "1.0.0";
    }
    NovelsOnline.prototype.popularNovels = function (pageNo, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []]; /** TO DO */
            });
        });
    };
    NovelsOnline.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var novel, result, $;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        novel = {
                            url: novelUrl,
                            chapters: [],
                        };
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl).then(function (res) { return res.text(); })];
                    case 1:
                        result = _a.sent();
                        $ = (0, cheerio_1.load)(result);
                        novel.name = $("h1").text();
                        novel.cover = $(".novel-cover").find("a > img").attr("src");
                        novel.author = $("div.novel-details > div:nth-child(5) > div.novel-detail-body")
                            .find("li")
                            .map(function (_, el) { return $(el).text(); })
                            .get()
                            .join(", ");
                        novel.genres = $("div.novel-details > div:nth-child(2) > div.novel-detail-body")
                            .find("li")
                            .map(function (_, el) { return $(el).text(); })
                            .get()
                            .join(",");
                        novel.summary = $("div.novel-right > div > div:nth-child(1) > div.novel-detail-body").text();
                        novel.chapters = $("ul.chapter-chs > li > a")
                            .map(function (_, el) {
                            var chapterUrl = $(el).attr("href");
                            var chapterName = $(el).text();
                            return {
                                name: chapterName,
                                releaseTime: "",
                                url: chapterUrl,
                            };
                        })
                            .get();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    NovelsOnline.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl).then(function (res) { return res.text(); })];
                    case 1:
                        result = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(result);
                        chapterText = loadedCheerio("#contentall").html() || "";
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    NovelsOnline.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var result, $, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)("https://novelsonline.net/sResults.php", {
                            headers: {
                                Accept: "*/*",
                                "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            },
                            method: "POST",
                            body: "q=" + encodeURIComponent(searchTerm),
                        }).then(function (res) { return res.text(); })];
                    case 1:
                        result = _a.sent();
                        $ = (0, cheerio_1.load)(result);
                        headers = $("li");
                        return [2 /*return*/, headers
                                .map(function (i, h) {
                                var novelName = $(h).text();
                                var novelUrl = $(h).find("a").attr("href");
                                var novelCover = $(h).find("img").attr("src");
                                if (!novelUrl) {
                                    return null;
                                }
                                return {
                                    name: novelName,
                                    cover: novelCover,
                                    url: novelUrl,
                                };
                            })
                                .get()
                                .filter(function (sr) { return sr !== null; })];
                }
            });
        });
    };
    NovelsOnline.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, fetch_1.fetchFile)(url)];
            });
        });
    };
    return NovelsOnline;
}());
exports.default = new NovelsOnline();