export default defineUnlistedScript(() => {
  const origFetch = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const response = await origFetch(...args);

    try {
      const clone = response.clone();
      const url = typeof args[0] === "string" ? args[0] : args[0].toString();
      if (url.includes("/check")) {
        const data = await clone.json();

        // checks that the /check is for a code submission, not just running the code
        const taskType: string | undefined = data.task_name;
        if (!taskType || taskType != 'judger.judgetask.Judge') return response;

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