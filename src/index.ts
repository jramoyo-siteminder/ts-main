import { Person } from 'ts-npm-module';
import { Place } from 'ts-npm-module';

let jan = new Person('Jan', 'Amoyo');
let work = new Place('SiteMinder', '88 Cumberland St, The Rocks NSW 2000');

console.log(`Name: ${jan.getFullName()}`);
console.log(`Work: ${work.name}, ${work.address}`);