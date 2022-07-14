import express from 'express';
import bodyParser from 'body-parser';
import HTMLrender from "./render.js";

const Port = process.env.PORT || 3000;
const app = express();

const TodoDatas = [
    {text: '做一些初级的事情', type: 'active', id: '1'},
    {text: '做一些中级的事情', type: 'active', id: '2'},
    {text: '做一些高级的事情', type: 'done', id: '3'},
];

app.use('/assets', express.static(process.cwd() + '/assets'));//allow browser access resources
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    HTMLrender('ALL', TodoDatas).then(r => res.send(r));
})
app.get('/active', (req, res) => {
    HTMLrender('active', TodoDatas).then(r => res.send(r));
})
app.get('/done', (req, res) => {
    HTMLrender('done', TodoDatas).then(r => res.send(r));
})

app.get('/status', (req, res) => {
    res.send('Express server OK !');
})

app.post('/addNew', (req, res) => {
    const AddName = req.body.name;
    const id = Math.random().toString(16);
    TodoDatas.push({text: AddName, type: 'active', id});
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/deleteOne', (req, res) => {
    const deleteId = req.body.id;
    let index = -1;
    TodoDatas.forEach(((e, i) => {
        if (e.id === deleteId) {
            index = i;
        }
    }))
    if (index !== -1)
        TodoDatas.splice(index, 1);
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/setDone', (req, res) => {
    const setId = parseInt(req.body.id);
    TodoDatas[setId].type = 'done';
    const refer = req.body.refer;
    const url = mapReferToUrl(refer);
    res.redirect(url);
})

app.post('/setActive', (req, res) => {
    const setId = parseInt(req.body.id);
    TodoDatas[setId].type = 'active';
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
