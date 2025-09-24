export default defineBackground(() => {
  console.log('Hello background!');
  
  // detects when you change problems
  let prevProblem: string = '';
  browser.tabs.onUpdated.addListener((id, change, tab) => {
    if (change.title) {
      let problem = change.title.slice(0, -11);
      if (problem != prevProblem) {
        prevProblem = problem;
        browser.tabs.sendMessage(tab.id!, {type: 'NEW_PROBLEM'});
      }      
    }
  });
});

