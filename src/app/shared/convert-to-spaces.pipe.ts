import { Pipe, PipeTransform} from '@angular/core';

@pipe([
  name: 'converToSpaces'
])
export class converToSpacesPipe implements PipeTransform {

   transform(value: string, character: string): string{
     return value.replace(character, ' ');

   }


}