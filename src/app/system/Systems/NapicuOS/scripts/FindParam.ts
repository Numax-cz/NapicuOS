export function FindParam(params: string[], searchParam: string): boolean{
  if(params?.length){
    for (const i of params){
      if(i === searchParam) {
        return true;
      }
    }
  }
  return false;
}
