const express = require('express');
// const app = require('./routes/MyAPI');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


const orderList = [
    {
        "name": "chatGPT_20",
        "price": "20",
        "type": "รายวัน",
        "email": "n/a",
        "pass": "n/a",
        "date": "n/a"
    },
    {
        "name": "chatGPT_130",
        "price": "130",
        "type": "รายเดือน",
        "email": "n/a",
        "pass": "n/a",
        "date": "n/a"
    },
    {
        "name": "chatGPT_199",
        "price": "199",
        "type": "รายเดือน",
        "email": "n/a",
        "pass": "n/a",
        "date": "n/a"
    },
    {
        "name": "cluadeAI",
        "price": "250",
        "type": "รายเดือน",
        "email": "n/a",
        "pass": "n/a",
        "date": "n/a"
    }
]

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('./bashboard.ejs', { order: orderList });
})

app.get('/getMailGPT/:name', (req, res) => {
    const ordering = req.params.name;
    console.log(ordering);

    const user = orderList.find(o => o.name === ordering);

    const orderText = `
    ❣️ ลงชื่อเข้าใช้ใน chatGPT ด้วย EMAIL ไม่ใช่ Google นะคะ ถ้าแอคล็อคปรับ 1,000฿ ค่ะ❣️

    ${user.email}
Pass: ${user.pass}

หมดอายุ ${user.date}

✅ ข้อตกลงการใช้งาน ✅
1.ไม่เปลี่ยนรหัสผ่านของเมล ต้องใช้ร่วมกันนะคะ
2.ไม่ลบประวัติข้อมูลการค้นหาหรือเข้าถึงข้อมูลของผู้ใช้รายอื่น (ประวัติการเสิร์ชของคนอื่นที่ไม่ใช่ของตัวเอง)
3.ถ้าต้องการใช้ 2 อุปกรณ์กรุณาออกจากเครื่องเก่าแล้วเข้าสู่ระบบใหม่ ห้ามใช้ 2 เครื่องพร้อมกันค่ะ
4.หาก chatGPT เกิดข้อผิดพลาดหรือปิดแอคโดย chatGPT เอง โดยไม่ได้มีปัญหาที่ทางร้าน ทางร้านจะขออนุญาตไม่รับเคลมนะคะ

🌷 วิธีการเข้าสู่ระบบ 🌷
1. เข้าapp chatGPT หรือบนเบราว์เซอร์ https://chatgpt.com/auth/login เท่านั้น
2. กด LOGIN  นะคะ ไม่ใช่ sign up หรือลงชื่อเข้าใช้ใหม่ค่ะ
3. ลงชื่อเข้าใช้ด้วย EMAIL ไม่ใช่ Google นะคะ  ย้ำว่า email นะคะ เพราะถ้าเข้าด้วย Google จะทำให้แอคมีปัญหาค่ะ ถ้าแอคล็อคปรับ 1,000฿ ค่ะ
4. ถ้าในกรณีที่ใส่รหัสผ่านแล้วเข้าไม่ได้ ให้คัดลอกรหัสแล้วไปใส่อีกครั้ง เผื่อมีติดเว้นวรรคด้านหลังค่ะ 

💕พิมพ์ 4 เพื่อดูวิธีการเข้าสู่ระบบ💕
💗พิมพ์ 9 เพื่อดูวิธีการแก้ปัญหาเบื้องต้น💗

ขอบคุณที่ใช้บริการนะคะ หากมีปัญหาเพิ่มเติมทักมาสอบถามได้เลยนะคะ สามารถรีวิวให้ได้ที่ #0109รีวิว ในทวิตเตอร์ค่ะ ขอบคุณมากๆเลยค่า🥺
    `
    if (user) {
        res.send(orderText);
        // res.send(`Name: ${user.name}, Email: ${user.email}, Password: ${user.pass}`);
    } else {
        res.status(404).send("User not found");
    }

})

app.get('/getSummary/:price', (req, res) => { 
    const orderText = `
    🖐🏽ขออนุญาตรวมยอดนะค้าบ :🍎)

🎱 ยอดโอน : ${req.params.price}฿

✿ Surachet S.

Bangkok Bank : 585-7-28800-4

โอนแล้วส่งสลิปมาหน่อยน้า 🫑

THANK YOU FOR SUPPORT =͟͟͞͞♡
    `

    console.log("price: ",orderText);
    res.send(orderText);
    
})

app.get('/manage', (req, res) => {
    res.render('./mangeGoods.ejs', { order: orderList });
})

app.post('/edit', (req, res) => {
    const edit_name = req.body.edit_name;

    const detail = orderList.find(o => o.name === edit_name);

    res.render('./edit.ejs', { details: detail });
});

app.post('/update', (req, res) => {
    const update_name = req.body.update_name;

    // Find index of the item you want to replace
    const index = orderList.findIndex(order => order.name === update_name);

    if (index !== -1) {
        // Replace the item at the found index
        orderList[index] = {
            "name": req.body.name,
            "price": req.body.price,
            "type": req.body.type,
            "email": req.body.email,
            "pass": req.body.pass,
            "date": req.body.date
        };
    }

    res.redirect('/manage');
})

app.get('/delete/:name', (req, res) => {
    // Find index of the item to delete
    const index = orderList.findIndex(order => order.name === req.params.name);

    if (index !== -1) {
        // Remove the item at the found index
        orderList.splice(index, 1);
    }
    res.redirect('/manage');
})

app.get('/add_new', (req, res) => {
    res.render('./formInsert.ejs');
})
app.post('/insert', (req, res) => {
    orderList.push({
        "name": req.body.name,
        "price": req.body.price,
        "type": req.body.type,
        "email": req.body.email,
        "pass": req.body.pass,
        "date": req.body.date
    })

    res.redirect('/');
})




exports.module = app;