describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
      expect(await page.title()).to.eql('Koa • Todo');
    })

    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    })
    
    it('should have todolist', async function() {
      let todoList = await page.waitFor('#todo-list');
      expect(!todoList).to.eql(false);
    })

    it('should delete todo correct', async function() {
      let todoList = await page.waitFor('#todo-list');
      const expectContent1 = await page.evaluate(x => x.firstChild.querySelector('label').textContent, todoList);
      await page.click('#todo-list > li:nth-child(1) > div > input',{delay:500});
      const expectContent2 = await page.evaluate(x => x.firstChild.querySelector('label').textContent, todoList);
      expect(expectContent1).to.eql(expectContent2);
    })

  });