import { changeDateType } from './changeDateType.js';
import { declinationDays } from './declinationDays.js';
import { allClaims } from './objects/allClaims';

export class mainClaim {

    id

    name
    name_text
    summ
    name_text
    from
    to
    without

    constructor (id, name, summ, from, to, without){
        this.id = id;
        this.name = name;
        this.summ = Number(summ.value.replace(/\s+/g, ''));
        this.from = Date.parse(changeDateType(from.value) + 'T00:00:00');
        this.to = Date.parse(changeDateType(to.value) + 'T00:00:00');
        this.without = without;

        allClaims.claims.forEach(element => {
            if (this.name == element.claim) {
                name_text = element.short
            }
        });

    }
}