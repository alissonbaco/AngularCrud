
//usado para busca


import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(records: Array<any>, searchText?: string): any {
        if(searchText == null) return records;
    
        return records.filter(rec => {
            
            return Object.keys(rec).some( x=> String(rec[x]).toLowerCase().includes(searchText.toLowerCase()));
        })
    }
}