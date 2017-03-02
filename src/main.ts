import { Person } from 'ts-npm-module';
import { Place } from 'ts-npm-module';

let person = new Person('Jan', 'Amoyo');
let place = new Place('SiteMinder', '88 Cumberland St, The Rocks NSW 2000');

console.log(`Name: ${person.getFullName()}`);
console.log(`Work: ${place.getFullAddress()}`);