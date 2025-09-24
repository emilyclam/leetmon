import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "LeetMon",
    permissions: ['storage', 'tabs'],
    web_accessible_resources: [{
      "resources": ["check-submission.js"],
      "matches": ["https://leetcode.com/*"]
    }]
  },
});
