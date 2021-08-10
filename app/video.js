const puppeteer = require('puppeteer');
const mysql     = require('mysql');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
console.log(process.env);

(async () => {
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }catch(e){
        console.log(e);     
    }

    const [rows, fields] = await connection.query('SELECT * FROM channels WHERE is_enabled = 1');
    console.log("rows:",rows);

    if( connection ){
        connection.end();
    }
})()

/*
(async () => {
    // Puppeteerの起動.
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let url = "";
    if (process.argv.length >= 3){
    url = process.argv[2];
    console.log("url:" + url);
    }

    if (!url){
    //URL未入力の場合終了
    console.log("URLが未入力の為終了");
    process.exit(1);
    }

    // 新しい空のページを開く.
    const page = await browser.newPage();

    const viewportHeight = 1200;
    const viewportWidth = 1200;

    // view portの設定.
    await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    });
    await page.goto(url);
    await scrollToBottom(page, viewportHeight);

    const today = moment().format("YYYYMMDD");

    // await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
    //            .catch(e => console.log('timeout exceed. proceed to next operation'))
    await page.screenshot({ path: outputDir + '/' + today + '.png', fullPage: true });

    // ブラウザを終了.
    await browser.close();
})();
*/