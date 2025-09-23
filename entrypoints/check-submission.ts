export default defineUnlistedScript(() => {
  const origFetch = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const response = await origFetch(...args);

    try {
      const clone = response.clone();
      const url = typeof args[0] === "string" ? args[0] : args[0].toString();
      if (url.includes("/check")) {
        const data = await clone.json();

        // GraphQL case: sometimes nested in data.submissionResult
        const statusMsg: string | undefined =
          data.status_msg ??
          data.data?.submissionResult?.status_msg ??
          data.data?.checkSubmissionResult?.status_msg;

        if (statusMsg) {
          window.postMessage(
            {
              type: "LEETCODE_SUBMISSION",
              status: statusMsg,
            },
            "*"
          );
        }
      }
    } catch (err) {
      console.error("Error parsing LeetCode response:", err);
    }

    return response;
  }
});