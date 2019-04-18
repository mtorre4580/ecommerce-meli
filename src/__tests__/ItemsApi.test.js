import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ItemsApi from '../services/ItemsApi';

// Mocks response API
const responseMockSearch = {author:{name:'Matias Daniel',lastname:'Torre'},categories:['Electrónica, Audio y Video','Audio','Reproductores Portátiles','iPod','iPod classic','80 GB'],items:[{id:'MLA772322281',title:'Ipod Touch 4ta Generacion 32 Gb',price:{currency:'ARS',amount:680,decimals:null},picture:'http://mla-s2-p.mlstatic.com/738532-MLA25881108346_082017-I.jpg',condition:'used',location:'Capital Federal'},{id:'MLA766877875',title:'Ipod Classic 60gb',price:{currency:'ARS',amount:1250,decimals:null},picture:'http://mla-s2-p.mlstatic.com/947045-MLA29185741092_012019-I.jpg',condition:'used',location:'Buenos Aires'},{id:'MLA777676864',title:'Ipod Classic 30gb',price:{currency:'ARS',amount:1000,decimals:null},picture:'http://mla-s1-p.mlstatic.com/809984-MLA29730910940_032019-I.jpg',condition:'used',location:'Buenos Aires'},{id:'MLA769088925',title:'Ipod Touch 5g 32gb',price:{currency:'ARS',amount:3200,decimals:null},picture:'http://mla-s2-p.mlstatic.com/720812-MLA25738240210_072017-I.jpg',condition:'used',location:'Buenos Aires'}]};
const responseMockDetail = {author:{name:'Matias Daniel',lastname:'Torre'},item:{id:'MLA772322281',title:'Ipod Touch 4ta Generacion 32 Gb',price:{currency:'ARS',amount:680,decimals:null},picture:'https://mla-s2-p.mlstatic.com/738532-MLA25881108346_082017-O.jpg',condition:'used',free_shipping: false,sold_quantity:0,description:'iPod Touch 4\nCapacidad 32 gB\nPantalla Retina de 3,5 pulgadas\n\nEl producto no esta funcionando\nLa pantalla se salio del chasis'},categories:['Electrónica, Audio y Video','Audio','Reproductores Portátiles','iPod','iPod touch','32 GB']};

describe('Items Api Service', () => {

    let mock;
    let itemsApi;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        itemsApi = new ItemsApi();
    });

    it('should fetch all results for query ipod API /items', async () => {
        mock.onGet('/items').reply(200, responseMockSearch);
        const { data } = await itemsApi.search('ipod');
        expect(data).toEqual(responseMockSearch);
    });

    it('should fetch detail item by id /items', async () => {
        const id = 'MLA772322281';
        mock.onGet(`/items/${id}`).reply(200, responseMockDetail);
        const { data } = await itemsApi.getDetail(id);
        expect(data).toEqual(responseMockDetail);
    });
    
});