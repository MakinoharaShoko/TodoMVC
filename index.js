import express from 'express';
import bodyParser from 'body-parser';
import HtmlRender from "./render.js";

const Port = process.env.PORT || 3000;
const app = express();

// 应用数据
const TodoDatas = [
    {text: '做一些初级的事情', type: 'active', id: '1'},
    {text: '做一些中级的事情', type: 'active', id: '2'},
    {text: '做一些高级的事情', type: 'done', id: '3'},
];

//allow browser access resources
app.use('/assets', express.static(process.cwd() + '/assets'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    HtmlRender('ALL', TodoDatas).then(r => res.send(r));
})
app.get('/active', (req, res) => {
    HtmlRender('active', TodoDatas).then(r => res.send(r));
})
app.get('/done', (req, res) => {
    HtmlRender('done', TodoDatas).then(r => res.send(r));
})

app.get('/status', (req, res) => {
    res.send('Express server OK !');
})

app.post('/addNew', (req, res) => {
    const AddName = req.body.name;
    const id = Math.random().toString(16);
    if (AddName !== '')
        TodoDatas.push({text: AddName, type: 'active', id});
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/deleteOne', (req, res) => {
    const deleteId = req.body.id;
    let index = mapIdtoIndex(deleteId);
    if (index !== -1)
        TodoDatas.splice(index, 1);
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/setDone', (req, res) => {
    const setId = req.body.id;
    const index = mapIdtoIndex(setId);
    if (index !== -1)
        TodoDatas[index].type = 'done';
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/setActive', (req, res) => {
    const setId = req.body.id;
    const index = mapIdtoIndex(setId);
    if (index !== -1)
        TodoDatas[index].type = 'active';
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/setAllActive', (req, res) => {
    for (const e of TodoDatas) {
        e.type = 'active';
    }
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
});

app.post('/setAllDone', (req, res) => {
    for (const e of TodoDatas) {
        e.type = 'done';
    }
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
});

app.post('/eraseAllDone', (req, res) => {
    const newList = TodoDatas.filter(e => e.type !== 'done');
    TodoDatas.splice(0, TodoDatas.length);
    TodoDatas.push(...newList);
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.listen(Port, () => console.log('Express server running at ' + Port));

function mapReferToUrl(refer) {
    if (refer === 'ALL') {
        return '/'
    }
    if (refer === 'done') {
        return '/done'
    }
    if (refer === 'active') {
        return '/active'
    }
}

function mapIdtoIndex(id) {
    let returnid = -1;
    TodoDatas.forEach(((e, i) => {
        if (e.id === id) {
            returnid = i;
        }
    }))
    return returnid;
}
