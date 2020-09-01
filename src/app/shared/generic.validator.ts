export class GenericValidator{

  constructor(private validationMessage:{[key: string} : {[key: string]: string}){

  }

  processMessage(container: FormGroup):{ [key: stting]: string }{
    const messages = {};
    for(const controlKey in container.controls){
      if(container.controls.hasOwnProperty(controlKey)){
        const c = container.controls[controlKey];
        if(c instanceof FormGroup){
          const childMessages = this.processMessage(c);
          Object.assign(messages, childMessages);
        }else{
          if(this.validationMessage[controlKey]){
            messages[controlKey] = ''
            if((c.dirty || c.touched) && c.errors){
              Object.keys(c.errors).map( messageKey =>{
                if(this.validationMessage[controlKey][messageKey]){
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }

          }
        }

      }
    }
    return messages;
  }

  getErrorCount(container: FormGroup): number{
    let errorCount = 0 ;
    for(const controlKey in container.controls){
      if(container.controls.hasOwnProperty(controlKey)){
        if(container.controls[controlKey].errors){
          errorCount += Object.keys(container.controls[controlKey].errors).length;
          console.log(errorCount);
        }
      }

    }
    return errorCount;
  }


}