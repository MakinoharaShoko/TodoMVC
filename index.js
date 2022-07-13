import express from 'express';
import bodyParser from 'body-parser';
import HTMLrender from "./render.js";

const Port = process.env.PORT || 3000;
const app = express();

const TodoDatas = [
    '做一些初级的事情',
    '做一些中级的事情'
];

app.use('/assets', express.static(process.cwd()+ '/assets'));//allow browser access resources
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    HTMLrender('ALL', TodoDatas).then(r=>res.send(r));
})

app.get('/status', (req, res) => {
    res.send('Express server OK !');
})

app.post('/addNew',(req,res)=>{
    const AddName = req.body.name;
    TodoDatas.push(AddName);
    res.redirect('/');
})

app.listen(Port, () => console.log('Express server running at ' + Port));
