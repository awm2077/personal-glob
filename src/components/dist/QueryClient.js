"use client";
"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
// Create a client
var queryClient = new react_query_1.QueryClient();
function App(_a) {
    var children = _a.children;
    return (
    // Provide the client to your App
    react_1["default"].createElement(react_query_1.QueryClientProvider, { client: queryClient }, children));
}
exports["default"] = App;
