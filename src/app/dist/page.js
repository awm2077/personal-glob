"use client";
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
        while (_) try {
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
exports.__esModule = true;
var react_1 = require("react");
var East_1 = require("@mui/icons-material/East");
var react_query_1 = require("@tanstack/react-query");
var axios_1 = require("axios");
var navigation_1 = require("next/navigation");
var nextjs_1 = require("@clerk/nextjs");
function Home() {
    var _this = this;
    var _a = react_1.useState(""), input = _a[0], setInput = _a[1];
    var _b = react_1.useState("deepseek-v3"), model = _b[0], setModel = _b[1];
    var handleChangeModel = function () {
        setModel(model === "deepseek-v3" ? "deepseek-r1" : "deepseek-v3");
    };
    var queryClient = react_query_1.useQueryClient();
    var router = navigation_1.useRouter();
    var user = nextjs_1.useUser().user;
    // Mutations
    var createChat = react_query_1.useMutation({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post("/api/create-chat", {
                            title: input,
                            model: model
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        onSuccess: function (res) {
            router.push("/chat/" + res.data.id);
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        }
    }).mutate;
    var handleSubmit = function () {
        if (input.trim() === "")
            return;
        if (!user) {
            router.push("/sign-in");
            return;
        }
        createChat();
    };
    return (React.createElement("div", { className: "flex h-screen flex-col items-center" },
        React.createElement("div", { className: "h-1/5" }),
        React.createElement("div", { className: "w-1/2" },
            React.createElement("p", { className: "text-blod text-2xl text-center" }, "\u6709\u4EC0\u4E48\u53EF\u4EE5\u5E2E\u52A9\u60A8\u7684\u5417\uFF1F"),
            React.createElement("div", { className: "flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg" },
                React.createElement("textarea", { className: "w-full rounded-lg p-3 h-30 focus:outline-none", placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898", value: input, onChange: function (e) { return setInput(e.target.value); } }),
                React.createElement("div", { className: "flex flex-row items-center justify-between w-full h-12 mb-2" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "\n                flex flex-row items-center \n                justify-center rounded-lg \n                border-[1px] px-2 py-1 ml-2 \n                cursor-pointer \n                " + (model === "deepseek-r1"
                                ? "border-blue-300 bg-blue-200"
                                : "border-gray-300"), onClick: handleChangeModel },
                            React.createElement("p", { className: "text-sm" }, "\u6DF1\u5EA6\u601D\u8003"))),
                    React.createElement("div", { className: "flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full", onClick: handleSubmit },
                        React.createElement(East_1["default"], null)))))));
}
exports["default"] = Home;
